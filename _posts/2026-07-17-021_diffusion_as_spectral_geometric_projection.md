---
title: "Diffusion as spectral-geometric projection"
layout: blog_default
date: 2026-07-17
permalink: /posts/021_diffusion_as_spectral_geometric_projection/
categories: [arrowspace, diffusion, graphs, spectral-geometry, python]
excerpt: "A corrected derivation of diffusion under a metric that blends raw item geometry with an ArrowSpace feature-manifold projection"
---

# Diffusion as spectral-geometric projection

The constantly-improving [Jupyter notebooks are available on Github](https://github.com/tuned-org-uk/arrowspace-diffusion-from-scratch). Please ⭐ the repo.

Following in the spirit of the [post by Chenyang Yuan](https://chenyang.co/diffusion.html) about Diffusion From Scratch, diffusion models learn to transform noise into samples that lie near a data distribution. Let the training set be

$$
\mathcal K \subset \mathbb R^F,
$$

where each $$x\in\mathbb R^F$$ is an item vector with $$F$$ features.

Ordinary diffusion treats $$\mathcal K$$ only as a subset of Euclidean space: points are close when their raw vectors are close. ArrowSpace adds a second structure. It wires the features into a graph, constructs a feature-space Laplacian $$L_F$$, and uses that graph to identify spectral directions that represent coherent variation over the feature manifold. [^2]

The consequence is important:

> A point should be near a data item not only when its coordinates are geometrically similar, but also when its feature variation lies in similar spectral directions of the learned feature manifold.

This is still a distance in item-vector space. The feature graph does not replace the item vector with a detached score; it defines a linear operator that conditions how item-vector differences are measured. Combining the geometric and the spectral signal improves search and ranking relevantly as demonstrated in [^3].

<div class="image-box">
    <img src="/assets/blog/021/spectral_geometric_metric.svg" alt="Figure 1 — The feature graph changes the metric on item-vector differences; it does not replace them with a scalar score." width="100%"/>
</div>

*Figure 1 — Wiring the feature graph and its low-frequency projector $$\Pi_F$$; splitting an item-vector difference into spectral and residual components; measuring both under the hybrid metric $$\lambda_{0.5}^\tau=\frac12(I+\Pi_F)$$.*

---

## Feature-manifold projection

Let the symmetric feature Laplacian admit the eigendecomposition

$$
L_F = U \Lambda U^\top,
$$

where $$U=[u_1,\ldots,u_F]$$ contains feature-space eigenvectors ordered from low to high spectral frequency.

Choose a spectral subspace $$U_{\le r}$$ containing the first $$r$$ meaningful modes, excluding any trivial constant mode where appropriate. Define the spectral projection

$$
\Pi_F := U_{\le r}U_{\le r}^\top.
$$

For an item vector $$x\in\mathbb R^F$$,

$$
x_{\mathrm{spec}} := \Pi_F x
$$

is the component of the item that is smooth and coherent with the wired feature manifold.

The residual,

$$
x_{\mathrm{res}} := (I-\Pi_F)x,
$$

contains variation that the selected spectral manifold does not explain. Depending on the chosen modes, this residual can represent local novelty, high-frequency structure, noise, or off-manifold behaviour.

ArrowSpace's feature-first wiring constructs the Laplacian over feature relationships, so applying $$\Pi_F$$ to an item vector is precisely an item-space operation conditioned by the feature manifold. [^2][^1]

---

## A 50–50 hybrid distance

For two item vectors $$x,y\in\mathbb R^F$$, define the geometric distance

$$
d_{\mathrm{geo}}^2(x,y) := \|x-y\|_2^2
$$

and the spectral-projection distance

$$
d_{\mathrm{spec}}^2(x,y) := \|\Pi_Fx-\Pi_Fy\|_2^2.
$$

With $$\tau=0.5$$, define the ArrowSpace spectral-geometric distance

$$
d_{\tau}^2(x,y)
:=
\tau\,d_{\mathrm{geo}}^2(x,y)
+
(1-\tau)\,d_{\mathrm{spec}}^2(x,y),
\qquad \tau=0.5.
$$

Therefore,

$$
d_{0.5}^2(x,y)
=
\tfrac12\|x-y\|_2^2
+
\tfrac12\|\Pi_F(x-y)\|_2^2.
\tag{1}
$$

Both terms are norms of differences between item vectors; the second norm is evaluated after a feature-manifold projection.

---

## Distance to the dataset

The spectral-geometric distance from a point $$x$$ to the dataset is

$$
\operatorname{dist}^{(0.5)}_{\mathcal K}(x)
:=
\min_{x_0\in\mathcal K} d_{0.5}(x,x_0).
$$

The corresponding spectral-geometric projection is

$$
\operatorname{proj}^{(0.5)}_{\mathcal K}(x)
:=
\arg\min_{x_0\in\mathcal K}
d_{0.5}^2(x,x_0).
$$

In words, $$\operatorname{proj}^{(0.5)}_{\mathcal K}(x)$$ is the training item that is closest to $$x$$ after giving equal weight to:

- Raw displacement in the original item geometry.
- Displacement along the projected feature-manifold geometry.

This objective does not require an independent lambda-distance term. The spectral structure is already present in the transformed geometry through $$\Pi_F(x-y)$$.

---

## Smoothed hybrid distance

For a finite training set, nearest-point projection is discontinuous at boundaries where more than one item is equally close. As in standard diffusion theory, replace the hard minimum with a soft minimum.

Define the smoothed squared-distance potential

$$
\widetilde d_{\mathcal K,0.5}^2(x,\sigma)
:=
-\sigma^2
\log\left(
\sum_{x_0\in\mathcal K}
\exp
\left[
-\frac{d_{0.5}^2(x,x_0)}{2\sigma^2}
\right]
\right).
\tag{3}
$$

This function has the same role as the ordinary smoothed squared-distance potential, except that nearby points are selected by the feature-manifold-conditioned geometry.

Define the soft assignment weights

$$
w_\sigma(x_0\mid x)
=
\frac{
\exp\!\left(-d_{0.5}^2(x,x_0)/(2\sigma^2)\right)
}{
\sum_{z\in\mathcal K}
\exp\!\left(-d_{0.5}^2(x,z)/(2\sigma^2)\right)
}.
$$

The soft spectral-geometric projection is then

$$
\bar x_{0.5}(x,\sigma)
=
\sum_{x_0\in\mathcal K}
w_\sigma(x_0\mid x)\,x_0.
\tag{4}
$$

At large $$\sigma$$, the weights average broad regions of the dataset. At small $$\sigma$$, they concentrate around nearby items under the hybrid metric.

---

## Denoising as projection

Differentiating the hybrid potential gives

$$
\nabla_x\,\widetilde d_{\mathcal K,0.5}^2(x,\sigma)
=
2\,\lambda_{0.5}^\tau
\left(x-\bar x_{0.5}(x,\sigma)\right),
\tag{5}
$$

so the gradient is preconditioned by $$\lambda_{0.5}^\tau$$. This is expected: the potential measures displacement in a metric whose geometry depends on the feature-manifold projector.

To recover the actual displacement from the current noisy point to its soft projection, apply the metric correction:

$$
g_{0.5}(x,\sigma)
:=
{\lambda_{0.5}^{\tau}}^{-1}\,
\frac12\,\nabla_x\,\widetilde d_{\mathcal K,0.5}^2(x,\sigma)
=
x-\bar x_{0.5}(x,\sigma).
\tag{6}
$$

The ideal spectral-geometric denoiser is therefore

$$
\epsilon_{0.5}^*(x,\sigma)
=
\frac{1}{\sigma}\,g_{0.5}(x,\sigma)
=
\frac{x-\bar x_{0.5}(x,\sigma)}{\sigma}.
\tag{7}
$$

Its clean prediction is

$$
\hat x_0
=
x-\sigma\,\epsilon_{0.5}^*(x,\sigma)
=
\bar x_{0.5}(x,\sigma).
\tag{8}
$$

So the denoiser performs an approximate projection in the hybrid geometry: it moves toward a weighted mean of data items that are jointly close in raw coordinates and in their spectral projections.

---

## The forward process must match the metric

This is the critical correction. If noise is drawn isotropically — $$x_\sigma = x_0 + \sigma\epsilon$$ with $$\epsilon\sim\mathcal N(0,I)$$ — then the Bayes-optimal denoiser under *any* fixed positive-definite reconstruction metric $$M$$ is still the conditional mean $$\mathbb E[x_0\mid x_\sigma]$$, which is identical to the Euclidean score. Reweighting the loss by $$M$$ changes the *training emphasis* on different directions but does not change the *optimal denoiser*.

<div class="image-box">
    <img src="/assets/blog/021/metric_matched_diffusion.svg" alt="Figure 2 — Changing only the reconstruction norm is insufficient; the noising covariance must match the metric." width="100%"/>
</div>

*Figure 2 — Left: isotropic corruption produces circular likelihood contours, so soft assignments collapse to Euclidean nearest neighbours regardless of the loss weighting. Right: metric-matched corruption with covariance $$\sigma^2 {\lambda_{0.5}^\tau}^{-1}$$ produces elliptical contours aligned with the hybrid geometry, and soft projection naturally follows the spectral-geometric metric.*

To make the hybrid distance *actually govern* the soft assignment, the forward corruption must use the metric's inverse covariance:

$$
x_\sigma = x_0 + \sigma\,{\lambda_{0.5}^\tau}^{-1/2}\,\epsilon,
\qquad \epsilon\sim\mathcal N(0,I).
\tag{9}
$$

Equivalently, $$x_\sigma\mid x_0 \sim \mathcal N(x_0,\;\sigma^2 {\lambda_{0.5}^\tau}^{-1})$$. The likelihood term in the posterior is then

$$
p(x_\sigma\mid x_0)
\propto
\exp\!\left(
-\frac{(x_\sigma-x_0)^\top \lambda_{0.5}^\tau(x_\sigma-x_0)}{2\sigma^2}
\right),
$$

so the soft assignment weights $$w_\sigma$$ in Equation (4) arise from the forward process itself, not from an externally imposed distance.

At $$\tau=0.5$$, the precision matrix $$\lambda_{0.5}^\tau=\frac12(I+\Pi_F)$$ assigns:

- **Precision 1** to spectral (low-frequency) directions, where $$\Pi_F$$ acts as identity.
- **Precision $$\tfrac12$$** to residual (high-frequency) directions, where $$\Pi_F$$ acts as zero.

This means smooth, coherent feature-manifold variation is corrupted *less* than off-manifold residual variation. The denoiser learns to be more conservative along spectral directions and more aggressive along residual ones — precisely the asymmetry the hybrid metric encodes.

---

## Training objective

With metric-matched corruption, the standard noise-prediction loss

$$
\mathcal L(\theta)
=
\mathbb E_{x_0,\sigma,\epsilon}
\left[
\left\|
\epsilon_\theta(x_0+\sigma {\lambda_{0.5}^\tau}^{-1/2}\epsilon,\,\sigma)-\epsilon
\right\|_2^2
\right]
$$

already targets the hybrid-geometry score, because the model sees inputs whose noise shape is elliptical in $$\lambda_{0.5}^\tau$$.

A direct projected reconstruction objective that makes the 50–50 requirement explicit is

$$
\mathcal L_{\mathrm{SG}}(\theta)
=
\mathbb E
\left[
\tfrac12\|\hat x_0-x_0\|_2^2
+
\tfrac12\|\Pi_F\hat x_0-\Pi_F x_0\|_2^2
\right],
\tag{10}
$$

where $$\hat x_0 = x_\sigma - \sigma\,\epsilon_\theta(x_\sigma,\sigma)$$. Equivalently,

$$
\mathcal L_{\mathrm{SG}}(\theta)
=
\mathbb E
\left[
(\hat x_0-x_0)^\top
\lambda_{0.5}^\tau
(\hat x_0-x_0)
\right].
\tag{11}
$$

The first half requires fidelity to the observed vector. The second half requires fidelity after projection onto the ArrowSpace feature manifold. The model cannot improve only by matching a spectral scalar; it must predict an item vector whose manifold-projected coordinates are correct.

---

## Training pseudocode

```python
class SpectralGeometry:
    def __init__(self, projector: torch.Tensor, tau: float = 0.5):
        self.Pi = projector
        self.tau = tau
        self.M = tau * torch.eye(projector.shape[0]) + (1.0 - tau) * projector
        self.M_inv_sqrt = self._matrix_inv_sqrt(self.M)

    def project(self, x: torch.Tensor) -> torch.Tensor:
        return x @ self.Pi.T

    def squared_distance(
        self, x: torch.Tensor, y: torch.Tensor
    ) -> torch.Tensor:
        geometric = ((x - y) ** 2).sum(dim=-1)
        spectral = ((self.project(x) - self.project(y)) ** 2).sum(dim=-1)
        return self.tau * geometric + (1.0 - self.tau) * spectral

    def corrupt(
        self, x0: torch.Tensor, sigma: torch.Tensor
    ) -> tuple[torch.Tensor, torch.Tensor]:
        eps = torch.randn_like(x0)
        noise_scale = sigma[:, None] * self.M_inv_sqrt
        x_sigma = x0 + noise_scale * eps
        return x_sigma, eps

    def reconstruction_loss(
        self, x_hat: torch.Tensor, x_true: torch.Tensor
    ) -> torch.Tensor:
        geometric = ((x_hat - x_true) ** 2).mean()
        spectral = (
            (self.project(x_hat) - self.project(x_true)) ** 2
        ).mean()
        return self.tau * geometric + (1.0 - self.tau) * spectral

    @staticmethod
    def _matrix_inv_sqrt(M: torch.Tensor) -> torch.Tensor:
        eigvals, eigvecs = torch.linalg.eigh(M)
        return eigvecs @ torch.diag(1.0 / torch.sqrt(eigvals)) @ eigvecs.T
```

```python
def training_loop(loader, model, schedule, spectral_geometry, epochs):
    optimizer = torch.optim.Adam(model.parameters())

    for _ in range(epochs):
        for x0 in loader:
            optimizer.zero_grad()

            sigma = schedule.sample_batch(x0)
            x_sigma, eps = spectral_geometry.corrupt(x0, sigma)

            eps_hat = model(x_sigma, sigma)
            x_hat = x_sigma - sigma[:, None] * eps_hat

            loss_noise = ((eps_hat - eps) ** 2).mean()
            loss_projection = spectral_geometry.reconstruction_loss(x_hat, x0)

            loss = 0.5 * loss_noise + 0.5 * loss_projection
            loss.backward()
            optimizer.step()
```

The feature projector must be computed once from the ArrowSpace feature Laplacian and then held fixed during a diffusion run. Recomputing it per noisy minibatch would change the geometry being optimised and destroy the fixed-manifold interpretation. ArrowSpace similarly retains projection metadata so query and indexed vectors are evaluated consistently in the same projected feature space. [^1]

---

## Hybrid sampling

The deterministic sampling update retains its familiar form:

$$
x_{t-1}
=
x_t-
(\sigma_t-\sigma_{t-1})\,\epsilon_\theta(x_t,\sigma_t).
\tag{12}
$$

But its interpretation changes. The update is now an approximate descent step toward the spectral-geometric data manifold:

$$
x_{t-1}
\approx
x_t-
\frac{\sigma_t-\sigma_{t-1}}{\sigma_t}\,
g_{0.5}(x_t,\sigma_t).
$$

A sampled trajectory is no longer asked only to approach realistic coordinates. It is asked to approach a point whose coordinate pattern remains coherent after the feature-manifold projection.

```python
@torch.no_grad()
def sample_spectral_geometric(model, sigmas, batch_size):
    x = model.rand_input(batch_size) * sigmas[0]

    for i in range(len(sigmas) - 1):
        sigma = sigmas[i]
        sigma_prev = sigmas[i + 1]
        eps = model(x, sigma.to(x).expand(x.shape[0]))
        x = x - (sigma - sigma_prev) * eps

    return x
```

No change to the sampler is required if the denoiser has learned the spectral-geometric projection field. The distinction lies in the metric encoded by training and in the fixed ArrowSpace projector supplied to the model or loss.

---

## Interpretation

The standard Euclidean view says that denoising moves a noisy item toward the nearest plausible data vector.

The ArrowSpace view says that denoising moves a noisy item toward a plausible data vector under two equally weighted constraints:

$$
\text{plausibility}
=
50\%\ \text{raw item geometry}
+
50\%\ \text{feature-manifold geometry}.
$$

The feature manifold is not an auxiliary retrieval score added after generation. It is a linear geometric operator acting on each item vector before distance is measured. This makes diffusion trajectories sensitive to the structured co-variation of features encoded by the ArrowSpace Laplacian, whose quadratic forms capture spectral smoothness over the wired feature graph. [^2]

The key insight this post adds beyond the original adaptation: **the forward corruption must share the metric's covariance structure**. Without metric-matched noise ($$\sigma^2 {\lambda_{0.5}^\tau}^{-1}$$), the Bayes-optimal denoiser under any fixed loss weighting collapses to the Euclidean conditional mean. The spectral-geometric structure enters the model only when the noise itself is shaped by the feature manifold.

---

## Implementation notes

- This example use a 50-50 linear combination of geometric and spectral signals but it would be nice to explore potential improvements using different mixes of signals
- Construct $$L_F$$ from the training corpus, not from noisy samples generated during diffusion.
- Use a fixed eigenspace cutoff $$r$$, selected by spectral gap, explained spectral mass, or validation performance.
- Normalise item vectors and Laplacian conventions consistently before fitting $$\Pi_F$$; otherwise the geometric and projected terms will not have comparable scale.
- Keep $$\tau=0.5$$ fixed for the stated equal blend. If later made tunable, $$\tau$$ should be validated as a geometric metric parameter, not treated merely as a ranking weight.
- Compute $${\lambda_{0.5}^\tau}^{-1/2}$$ once and cache it; it is the Cholesky-like factor that maps isotropic Gaussian noise into metric-matched noise.
- Store $$\Pi_F$$, $${\lambda_{0.5}^\tau}^{-1/2}$$, the eigenspace selection rule, Laplacian configuration, and preprocessing transforms with the diffusion checkpoint. ArrowSpace's build pipeline likewise preserves projection-related state to ensure consistent query-time computation. [^1]

---

[^1]: ArrowSpace build pipeline — [pyarrowspace](https://github.com/tuned-org-uk/pyarrowspace)
[^2]: Graph Wiring: Eigenstructures for vector datasets and LLM operations — [graph_wiring.pdf](https://www.tuned.org.uk/assets/graph_wiring.pdf)
[^3]: From Embedding Geometry to Spectral Search: Energy Dispersion Networks For Vector Retrieval, Lorenzo Moriondo, Ilias Azizi, [https://arxiv.org/abs/2606.21535](https://arxiv.org/abs/2606.21535)
---

*ArrowSpace:* `pip install arrowspace`  
*Rust source:* [arrowspace-rs](https://github.com/Mec-iS/arrowspace-rs)  
*ArrowSpace paper:* [JOSS — Spectral Indexing of Embeddings](https://joss.theoj.org/papers/10.21105/joss.09002.pdf)  
*Previous post:* [ArrowSpace for Latent Spaces — part 2](https://www.tuned.org.uk/posts/020_arrowspace_semantic_basins_part2)
