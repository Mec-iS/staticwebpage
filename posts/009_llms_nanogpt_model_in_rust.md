---
title: 009_llms_nanogpt_model_in_rust
layout: blog_default
date: 2025-10-29
categories: [nanochat, karpathy, llm, language models]
---
<style>
.cta-manifold-compact {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%);
    padding: 1.5rem 2rem;
    margin: 2.5rem 0;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-manifold-compact:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(67, 97, 238, 0.4);
}

.cta-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3));
}

.cta-text {
    color: #f8f9fa;
    font-size: 1.1rem;
    line-height: 1.5;
}

.cta-text strong {
    display: block;
    color: #4cc9f0;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

@media (max-width: 768px) {
    .cta-manifold-compact {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
    }
    
    .cta-icon {
        font-size: 2rem;
    }
}
</style>

# LLMs: nanoGPT model in Rust

Just a brief announcement before starting: `arrowspace` v0.22.0 is out with improvements and a new graph motives API.

You can find `arrowspace` in the:

* [Rust repository](https://github.com/Mec-iS/arrowspace-rs) ↪️ `cargo add arrowspace`
* and [Python repository](https://github.com/tuned-org-uk/pyarrowspace) ↪️ `pip install arrowspace`

## Efficient GPT training: a dive into the architecture of a Rust-powered GPT-2

I've recently been working on a Rust porting of Andrej Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT/blob/master/model.py), and I wanted to share some of the architectural details of the model. This post is for those who are familiar with large language models but may not be up-to-date with some of the components used in this implementation. The implementation is a decoder-only transformer, built with the [burn.dev framework](https://burn.dev) in Rust, and it incorporates several modern features to optimise for performance and efficiency.

At its heart, this model is a decoder-only transformer, which is a common architecture for text generation tasks. It's composed of a stack of identical decoder blocks that process input sequences and generate output, one token at a time.

The model processes a sequence of input tokens and predicts the next token in the sequence. This is achieved by passing the input through a series of decoder blocks, which apply self-attention and feed-forward transformations. The output of the final block is then used to predict the next token.

### Pre-Norm Residual Connections

To improve the stability and performance of the model, pre-norm residual connections are used. This means that the normalisation layer is applied *before* the self-attention and feed-forward layers in each block, and the output of these layers is then added to the original input (the residual connection). This approach helps to prevent the gradients from exploding or vanishing during training, leading to more stable and efficient learning.

## Core Components

The model integrates several modern components that have been shown to improve the performance and efficiency of large language models.

### Rotary Position Embeddings (RoPE)

Instead of using traditional learned positional encodings, this model uses Rotary Position Embeddings (RoPE). RoPE applies a rotational transformation to the query and key vectors in the self-attention mechanism, which allows the model to better generalize to sequences of different lengths. The sine and cosine frequencies for RoPE are precomputed, making it an efficient way to encode positional information without adding any learnable parameters to the model.

### Multi-Query Attention (MQA)

To reduce the memory footprint of the key-value (KV) cache, the model uses Multi-Query Attention (MQA). In MQA, multiple query heads share the same key and value heads. This significantly reduces the size of the KV cache, which is particularly beneficial during inference, while maintaining a high level of performance in training. The key and value heads are repeated to match the number of query heads before the attention calculation.
```rust
// Inside scaled_dot_product_attention
let (k, v) = if self.n_head != self.n_kv_head {
    let repeat = self.n_head / self.n_kv_head;
    let k = k
        .unsqueeze::<5>(2)
        .expand([b, h_kv, repeat, t_k, d])
        .reshape([b, self.n_head, t_k, d]);
    let v = v
        .unsqueeze::<5>(2)
        .expand([b, h_kv, repeat, t_k, d])
        .reshape([b, self.n_head, t_k, d]);
    (k, v)
} else {
    (k, v)
};
```

### Normalization: RMSNorm and QK-Norm

The model uses two types of normalization to improve stability: RMSNorm and QK-norm. RMSNorm is a parameter-free normalization technique that is used as a replacement for LayerNorm in the pre-norm residual connections. QK-norm is applied to the query and key vectors *after* RoPE and before the attention calculation to prevent numerical instability.


```rust
fn rms_norm<B: Backend, const D: usize>(x: Tensor<B, D>, eps: f32) -> Tensor<B, D> {
    let dims = x.dims();
    let last = dims.len() - 1;

    let ms = x.clone().powf_scalar(2.0).mean_dim(last);
    let rms = (ms + eps).sqrt();

    let mut b_shape = dims.clone();
    b_shape[last] = 1;
    let rms_b = rms.reshape(b_shape).expand(dims);

    x / rms_b
}
```

QK-norm is applied to the query and key vectors *after* RoPE and before the attention calculation to prevent numerical instability. This is achieved by applying `rms_norm` to the query and key tensors.
```rust
// Inside CausalSelfAttention forward pass
// ... After RoPE ...

// QK-norm via RMSNorm over D
let q = rms_norm(q, 1e-6);
let k = rms_norm(k, 1e-6);
```

### MLP with Squared ReLU

The feed-forward network in each transformer block uses a multi-layer perceptron (MLP) with a squared ReLU activation function. This activation function has been shown to improve gradient flow, especially on GPUs, leading to better performance.

```rust
#[derive(Module, Debug)]
pub struct Mlp<B: Backend> {
    c_fc: Linear<B>,
    c_proj: Linear<B>,
}

impl<B: Backend> Mlp<B> {
    pub fn forward(&self, x: Tensor<B, 3>) -> Tensor<B, 3> {
        let x = self.c_fc.forward(x);
        // Squared ReLU activation
        let x = activation::relu(x).powf_scalar(2.0);
        self.c_proj.forward(x)
    }
}
```

### Softcap for Logit Stability

To prevent extreme values in the output logits, the model applies a "softcap" to the logits. This is achieved by applying a `tanh` function to the logits, which bounds their values and helps to maintain stable softmax behavior during generation.
```rust
// Inside GptModel forward pass
let mut logits = self.lm_head.forward(x);

// Safety clamp before softcap
logits = logits.clamp(-50.0, 50.0);

// Softcap
if use_softcap {
let softcap = 15.0;
logits = (logits.clone() / softcap).tanh() * softcap;
}
```

## Conclusion

This Rust implementation of nanochat is a modern, efficient, and high-performance decoder-only transformer. By incorporating features like RoPE, MQA, and specialized normalization techniques, the model is able to generate text efficiently while maintaining a high level of quality. The use of Rust and the Burn framework also provides performance and safety guarantees, making it a solid foundation for further experimentation and development. You can read the [original implementation](https://github.com/karpathy/nanoGPT/blob/master/model.py).

My implementation demonstrates how the Rust ecosystem is getting ready for LLM implementations, `burn.dev` is approaching high standard of usability and performance allowing support of multiple platforms. I hope we will start seeing soon large production installation based on Rust numerical stack (`ndalgebra`, `ndarray` and the Deep Learning and Transformer frameworks currently available). 


<img src="https://raw.githubusercontent.com/tracel-ai/burn/main/assets/logo-burn-neutral.webp" width="100px"/> is both a **tensor library and a deep learning framework** optimized for numerical computing, model inference and model training. It leverages Rust to perform optimizations normally only available in static-graph frameworks, offering optimal speed without impacting flexibility.

## Backend

Burn strives to be as fast as possible on as many hardwares as possible, with robust
implementations. We believe this flexibility is crucial for modern needs where you may train your
models in the cloud, then deploy on customer hardwares, which vary from user to user.

### Supported Backends

Most backends support all operating systems, so we don't mention them in the tables below.

**GPU Backends:**

|         | CUDA | ROCm | Metal | Vulkan | WebGPU | Candle | LibTorch |
| ------- | ---- | ---- | ----- | ------ | ------ | ------ | -------- |
| Nvidia  | ☑️   | -    | -     | ☑️     | ☑️     | ☑️     | ☑️       |
| AMD     | -    | ☑️   | -     | ☑️     | ☑️     | -      | ☑️       |
| Apple   | -    | -    | ☑️    | -      | ☑️     | -      | ☑️       |
| Intel   | -    | -    | -     | ☑️     | ☑️     | -      | -        |
| Qualcom | -    | -    | -     | ☑️     | ☑️     | -      | -        |
| Wasm    | -    | -    | -     | -      | ☑️     | -      | -        |

**CPU Backends:**

|        | Cpu (CubeCL) | NdArray | Candle | LibTorch |
| ------ | ------------ | ------- | ------ | -------- |
| X86    | ☑️           | ☑️      | ☑️     | ☑️       |
| Arm    | ☑️           | ☑️      | ☑️     | ☑️       |
| Wasm   | -            | ☑️      | ☑️     | -        |
| no-std | -            | ☑️      | -      | -        |

<br />



<div class="cta-manifold-compact">
    <div class="cta-icon">⚡</div>
    <div class="cta-text">
        <strong>Next-generation vector databases:</strong> Indices that respect the manifold structure of data, not just its geometric projection.
    </div>
</div>

Please consider **sponsoring my research** and improve your company's understanding of LLMs and vector databases.