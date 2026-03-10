#!/usr/bin/env python
# Jupyter-friendly plotting script for ArrowSpace CVE experiments
# Assumes these CSV files are in the current working directory:
# - 15_cve_summary.csv
# - 16_cve_summary.csv
# - 15_cve_comparison_metrics.csv
# - 16_cve_comparison_metrics.csv
# - 15_cve_tail_metrics.csv
# - 16_cve_tail_metrics.csv
# - 15_cve_search_results.csv
# - 16_cve_search_results.csv
#
# All figures are both shown in the notebook and saved as PNGs
# in the same directory as this script / notebook.

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# -------------------------------------------------------------------
# 0. Setup & data loading
# -------------------------------------------------------------------
sns.set(style="whitegrid", context="notebook")

summary_15 = pd.read_csv("15_cve_summary.csv")
summary_16 = pd.read_csv("16_cve_summary.csv")

comp_15 = pd.read_csv("15_cve_comparison_metrics.csv")
comp_16 = pd.read_csv("16_cve_comparison_metrics.csv")

tail_15 = pd.read_csv("15_cve_tail_metrics.csv")
tail_16 = pd.read_csv("16_cve_tail_metrics.csv")

sr_15 = pd.read_csv("15_cve_search_results.csv")
sr_16 = pd.read_csv("16_cve_search_results.csv")

TAU_LABELS = [
    "Cosine (τ=1.0)",
    "Hybrid (τ=0.72)",
    "Taumode (τ=0.42)",
]

# helper: get base directory for saving
BASE_DIR = os.getcwd()


def _save_fig(fig, filename, dpi=150):
    path = os.path.join(BASE_DIR, filename)
    fig.savefig(path, dpi=dpi, bbox_inches="tight")
    print(f"Saved figure -> {path}")


# -------------------------------------------------------------------
# 1. Summary metrics: NDCG@10, MRR-Top0, Tail/Head ratio
# -------------------------------------------------------------------
def plot_summary_metrics(summary_15, summary_16):
    fig, axes = plt.subplots(1, 3, figsize=(18, 5), constrained_layout=True)

    # --- NDCG@10 ---
    ndcg_15 = summary_15[summary_15["metric_type"] == "NDCG@10"]
    ndcg_16 = summary_16[summary_16["metric_type"] == "NDCG@10"]

    x = np.arange(len(ndcg_15))
    width = 0.35

    axes[0].bar(
        x - width / 2,
        ndcg_15["value"],
        width,
        yerr=ndcg_15["std_dev"],
        capsize=4,
        label="Test 15 (384d)",
    )
    axes[0].bar(
        x + width / 2,
        ndcg_16["value"],
        width,
        yerr=ndcg_16["std_dev"],
        capsize=4,
        label="Test 16 (1024d)",
    )
    axes[0].set_xticks(x)
    axes[0].set_xticklabels(ndcg_15["metric_name"], rotation=20)
    axes[0].set_ylabel("NDCG@10")
    axes[0].set_title("NDCG@10 summary")
    axes[0].legend()

    # --- MRR-Top0 ---
    mrr_15 = summary_15[summary_15["metric_type"] == "MRR-Top0"]
    mrr_16 = summary_16[summary_16["metric_type"] == "MRR-Top0"]

    x = np.arange(len(mrr_15))

    axes[1].bar(
        x - width / 2,
        mrr_15["value"],
        width,
        yerr=mrr_15["std_dev"],
        capsize=4,
        label="Test 15 (384d)",
    )
    axes[1].bar(
        x + width / 2,
        mrr_16["value"],
        width,
        yerr=mrr_16["std_dev"],
        capsize=4,
        label="Test 16 (1024d)",
    )
    axes[1].set_xticks(x)
    axes[1].set_xticklabels(mrr_15["metric_name"], rotation=20)
    axes[1].set_ylabel("MRR-Top0")
    axes[1].set_title("MRR-Top0 summary")
    axes[1].legend()

    # --- Tail/Head Ratio ---
    th_15 = summary_15[summary_15["metric_type"] == "Tail/Head Ratio"]
    th_16 = summary_16[summary_16["metric_type"] == "Tail/Head Ratio"]

    x = np.arange(len(th_15))

    axes[2].bar(
        x - width / 2,
        th_15["value"],
        width,
        yerr=th_15["std_dev"],
        capsize=4,
        label="Test 15 (384d)",
    )
    axes[2].bar(
        x + width / 2,
        th_16["value"],
        width,
        yerr=th_16["std_dev"],
        capsize=4,
        label="Test 16 (1024d)",
    )
    axes[2].set_xticks(x)
    axes[2].set_xticklabels(th_15["metric_name"], rotation=20)
    axes[2].set_ylabel("Tail/Head ratio")
    axes[2].set_title("Tail/Head ratio summary")
    axes[2].legend()

    plt.suptitle("ArrowSpace CVE: Summary metrics (384d vs 1024d)", y=1.02, fontsize=14)
    _save_fig(fig, "summary_metrics_384d_vs_1024d.png")
    plt.show()


plot_summary_metrics(summary_15, summary_16)


# -------------------------------------------------------------------
# 2. Per-query ranking agreement (Spearman) heatmaps
# -------------------------------------------------------------------
def plot_ranking_agreement(comp_15, comp_16):
    spear_cols = [
        "spearman_cosine_hybrid",
        "spearman_cosine_taumode",
        "spearman_hybrid_taumode",
    ]
    col_labels = ["Cos↔Hyb", "Cos↔Tau", "Hyb↔Tau"]

    z15 = comp_15[spear_cols].values
    z16 = comp_16[spear_cols].values

    q_labels = [f"Q{i}" for i in comp_15["query_id"]]

    fig, axes = plt.subplots(1, 2, figsize=(12, 6), constrained_layout=True)

    sns.heatmap(
        z15,
        vmin=-1,
        vmax=1,
        cmap="RdYlGn",
        xticklabels=col_labels,
        yticklabels=q_labels,
        annot=True,
        fmt=".2f",
        ax=axes[0],
    )
    axes[0].set_title("Spearman ρ per query (Test 15, 384d)")

    sns.heatmap(
        z16,
        vmin=-1,
        vmax=1,
        cmap="RdYlGn",
        xticklabels=col_labels,
        yticklabels=q_labels,
        annot=True,
        fmt=".2f",
        ax=axes[1],
    )
    axes[1].set_title("Spearman ρ per query (Test 16, 1024d)")

    plt.suptitle("Ranking agreement across τ-modes", y=1.02, fontsize=14)
    _save_fig(fig, "spearman_ranking_agreement.png")
    plt.show()


plot_ranking_agreement(comp_15, comp_16)


# -------------------------------------------------------------------
# 3. Per-query MRR-Top0 comparison (performance vs topological cost)
# -------------------------------------------------------------------
def plot_mrr_top0_per_query(comp_15, comp_16):
    q_labels = [f"Q{i}" for i in comp_15["query_id"]]

    fig, axes = plt.subplots(1, 2, figsize=(18, 5), constrained_layout=True)
    width = 0.25
    x = np.arange(len(q_labels))

    modes = [
        ("mrr_top0_cosine", "Cosine", 0),
        ("mrr_top0_hybrid", "Hybrid", 1),
        ("mrr_top0_taumode", "Taumode", 2),
    ]
    palette = sns.color_palette()

    for idx, (col, label, pidx) in enumerate(modes):
        axes[0].bar(
            x + (idx - 1) * width,
            comp_15[col],
            width,
            label=label,
            color=palette[idx],
        )

    axes[0].set_xticks(x)
    axes[0].set_xticklabels(q_labels, rotation=45)
    axes[0].set_ylabel("MRR-Top0")
    axes[0].set_title("Per-query MRR-Top0 (Test 15, 384d)")
    axes[0].legend()

    for idx, (col, label, pidx) in enumerate(modes):
        axes[1].bar(
            x + (idx - 1) * width,
            comp_16[col],
            width,
            label=label,
            color=palette[idx],
        )

    axes[1].set_xticks(x)
    axes[1].set_xticklabels(q_labels, rotation=45)
    axes[1].set_ylabel("MRR-Top0")
    axes[1].set_title("Per-query MRR-Top0 (Test 16, 1024d)")
    axes[1].legend()

    plt.suptitle("Topology-weighted performance per query", y=1.02, fontsize=14)
    _save_fig(fig, "mrr_top0_per_query_384d_vs_1024d.png")
    plt.show()


plot_mrr_top0_per_query(comp_15, comp_16)


# -------------------------------------------------------------------
# 4. Tail behaviour: T/H ratio improvement (Taumode vs Cosine)
# -------------------------------------------------------------------
def plot_taumode_tail_advantage(tail_15, tail_16):
    def compute_improvement(tail_df):
        cos = (
            tail_df[tail_df["tau_method"] == "Cosine (τ=1.0)"]
            .set_index("query_id")["tail_to_head_ratio"]
        )
        tau = (
            tail_df[tail_df["tau_method"] == "Taumode (τ=0.42)"]
            .set_index("query_id")["tail_to_head_ratio"]
        )
        return (tau - cos)

    adv_15 = compute_improvement(tail_15)
    adv_16 = compute_improvement(tail_16)

    q_labels = [f"Q{i}" for i in adv_15.index]
    x = np.arange(len(q_labels))
    width = 0.35

    fig, ax = plt.subplots(figsize=(14, 5))

    ax.bar(x - width / 2, adv_15.values, width, label="Test 15 (384d)")
    ax.bar(x + width / 2, adv_16.values, width, label="Test 16 (1024d)")

    ax.axhline(0.0, color="gray", linestyle="--", linewidth=1)
    ax.set_xticks(x)
    ax.set_xticklabels(q_labels, rotation=45)
    ax.set_ylabel("Δ Tail/Head (Taumode − Cosine)")
    ax.set_title("Taumode tail/head improvement over Cosine (per query)")
    ax.legend()

    plt.tight_layout()
    _save_fig(fig, "taumode_tail_head_improvement_per_query.png")
    plt.show()


plot_taumode_tail_advantage(tail_15, tail_16)


# -------------------------------------------------------------------
# 5. Tail variability: CV comparison between tests (stability cost)
# -------------------------------------------------------------------
def plot_tail_cv_scatter(tail_15, tail_16):
    fig, ax = plt.subplots(figsize=(6, 6))

    markers = ["o", "s", "^"]
    for tau_label, marker in zip(TAU_LABELS, markers):
        cv_15 = (
            tail_15[tail_15["tau_method"] == tau_label]
            .sort_values("query_id")["tail_cv"]
            .values
        )
        cv_16 = (
            tail_16[tail_16["tau_method"] == tau_label]
            .sort_values("query_id")["tail_cv"]
            .values
        )
        ax.scatter(
            cv_15,
            cv_16,
            label=tau_label,
            marker=marker,
            s=60,
            alpha=0.8,
        )

    max_val = max(tail_15["tail_cv"].max(), tail_16["tail_cv"].max()) * 1.1
    ax.plot([0, max_val], [0, max_val], "k--", linewidth=1)

    ax.set_xlabel("Tail CV (Test 15, 384d)")
    ax.set_ylabel("Tail CV (Test 16, 1024d)")
    ax.set_title("Tail coefficient of variation: 384d vs 1024d")
    ax.legend()
    plt.tight_layout()
    _save_fig(fig, "tail_cv_scatter_384d_vs_1024d.png")
    plt.show()


plot_tail_cv_scatter(tail_15, tail_16)


# -------------------------------------------------------------------
# 6. Cost diagram 1: Storage and throughput factors (384d vs 1024d)
# -------------------------------------------------------------------
def plot_cost_factors_bar():
    """
    Uses the analytic ratios from the text (no CSVs):
      - Storage: 1024/384 ≈ 2.67x more for 1024d (so 384d is 1.0, 1024d ≈ 2.67)
      - Offline compute: ≈ 2.7x
      - Online query FLOPs / throughput: ≈ 2.7x
    We plot relative cost for the two dims (1024d baseline = 1.0).
    """
    # Express everything as relative COST (higher = more expensive)
    # Take 1024d as 1.0 baseline, 384d ≈ 1 / 2.7
    factor_1024 = 1.0
    factor_384 = 1.0 / 2.7

    categories = ["Storage", "Offline compute", "Online FLOPs"]
    costs_1024 = [factor_1024] * len(categories)
    costs_384 = [factor_384] * len(categories)

    x = np.arange(len(categories))
    width = 0.35

    fig, ax = plt.subplots(figsize=(8, 5))

    ax.bar(x - width / 2, costs_384, width, label="384-d (ArrowSpace Test 15)")
    ax.bar(x + width / 2, costs_1024, width, label="1024-d (ArrowSpace Test 16)")

    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.set_ylabel("Relative cost (1024-d = 1.0)")
    ax.set_title("Cost factors: 384-d vs 1024-d (from design analysis)")
    ax.legend()
    plt.tight_layout()
    _save_fig(fig, "cost_factors_384d_vs_1024d.png")
    plt.show()


plot_cost_factors_bar()


# -------------------------------------------------------------------
# 7. Cost diagram 2: Concrete storage example (100M docs)
# -------------------------------------------------------------------
def plot_storage_example_100m():
    """
    Uses the storage example from the text:
      - 384-d: ≈ 143 GB
      - 1024-d: ≈ 381 GB
    """
    dims = ["384-d", "1024-d"]
    storage_gb = [143, 381]

    fig, ax = plt.subplots(figsize=(6, 5))

    bars = ax.bar(dims, storage_gb, color=["#4C72B0", "#DD8452"])
    ax.set_ylabel("Raw embedding storage (GB)")
    ax.set_title("Embedding storage @ 100M docs (float32 vectors)")

    for bar, val in zip(bars, storage_gb):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 5,
            f"{val} GB",
            ha="center",
            va="bottom",
        )

    plt.tight_layout()
    _save_fig(fig, "storage_100m_docs_384d_vs_1024d.png")
    plt.show()


plot_storage_example_100m()


# -------------------------------------------------------------------
# 8. Optional: score distributions for a sample query (saved)
# -------------------------------------------------------------------
def plot_score_distributions_for_query(search_df_15, search_df_16, query_id=1):
    fig, axes = plt.subplots(2, 3, figsize=(15, 6), constrained_layout=True)

    for row_idx, (df, title_prefix) in enumerate(
        [(search_df_15, "Test 15 (384d)"), (search_df_16, "Test 16 (1024d)")]
    ):
        for col_idx, tau in enumerate(TAU_LABELS):
            sub = df[
                (df["query_id"] == query_id) & (df["tau_method"] == tau)
            ].sort_values("rank")
            axes[row_idx, col_idx].plot(
                sub["rank"], sub["score"], marker="o", linestyle="-"
            )
            axes[row_idx, col_idx].set_title(f"{title_prefix} - {tau}")
            axes[row_idx, col_idx].set_xlabel("Rank")
            axes[row_idx, col_idx].set_ylabel("Score")

    plt.suptitle(
        f"Score distributions for query {query_id} across τ-modes and tests",
        y=1.02,
        fontsize=14,
    )
    filename = f"score_distributions_query_{query_id}.png"
    _save_fig(fig, filename)
    plt.show()


# Example: uncomment to generate for query 1
# plot_score_distributions_for_query(sr_15, sr_16, query_id=1)
