---
title: "Threshold-Optimized Weighted Ensembles for Clinical Cohort Staging"
subtitle: "Heterogeneous Machine Learning Stacking & Calibrated Soft-Voting under Class Imbalance"
period: "2025–2026"
role: "Co-Author & ML Researcher"
status: "completed"
stack:
  - "Python"
  - "Scikit-Learn"
  - "XGBoost"
  - "LightGBM"
  - "Optuna"
  - "Matplotlib"
results:
  - label: "Validation ROC-AUC"
    value: "XX.X%"
    kind: "achieved"
  - label: "False Negative Minimization"
    value: "Calibrated"
    kind: "achieved"
  - label: "Ensemble Stability"
    value: "Robust"
    kind: "achieved"
resultsVerified: false
figures:
  - key: "aidsEnsembleFramework"
    category: "Architecture"
    aspect: "wide"
    caption: "Tiered ensemble pipeline with threshold calibration and probability alignment"
    credit: "IEEE QPAIN 2026"
  - key: "aidsThresholdOptimization"
    category: "Results"
    aspect: "square"
    caption: "Sensitivity-specificity tradeoff curves illustrating optimal decision thresholds"
    credit: "IEEE QPAIN 2026"
relatedPublicationIds:
  - "rakin-aids-ensemble-2026"
featured: false
verified: true
---

## Summary
In life-critical clinical diagnostic regimes, equal penalties for false positives and false negatives are fundamentally flawed. A false negative can delay therapeutic intervention, leading to severe health outcomes. This research develops a threshold-optimized weighted ensemble architecture integrating heterogeneous tree models and margin classifiers to optimize decision boundaries explicitly against clinically tailored utility metrics.

## Problem
Standard off-the-shelf classifiers operate under an assumed default decision threshold of $p = 0.5$. In clinical cohorts where positive diagnoses represent severe health conditions with severe class imbalance, symmetric thresholding results in unacceptable false-negative rates and degraded sensitivity.

## Approach
1. **Base Learner Diversity:** Training distinct model families (XGBoost, Random Forest, Multi-layer Perceptron, Support Vector Classifiers) to capture both linear feature boundaries and complex nonlinear interactions.
2. **Confidence-Weighted Soft Voting:** Weighting individual learner posteriors based on cross-validated validation likelihoods.
3. **Threshold Calibration:** Optimizing decision thresholds via precision-recall curve analysis and Youden's Index to achieve maximal sensitivity without collapsing precision.

## Results
Experimental validation confirmed marked improvements in diagnostic sensitivity and overall ROC-AUC compared to single baseline estimators:
- Substantial reduction in false-negative outcomes on imbalanced clinical test splits.
- Enhanced calibration curves ensuring predicted probabilities accurately reflect empirical diagnostic frequencies.

## Interpretability / Validation
Individual feature contributions and interaction terms were audited using permutation importance rankings. Feature distributions were cross-referenced with medical literature to confirm consistency with established physiological risk factors.

## Limitations & Next Steps
- **Dataset Diversity:** Validation was conducted on curated epidemiological cohorts; external cross-institution validation is necessary.
- **Future Directions:** Incorporating longitudinal clinical telemetry and real-time electronic health record stream ingestion.
