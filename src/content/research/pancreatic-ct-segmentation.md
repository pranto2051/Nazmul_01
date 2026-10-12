---
title: "3D Pancreatic CT Image Analysis & Volumetric Segmentation"
subtitle: "Deep Learning & Vision Transformer Frameworks for Abdominal CT Soft-Tissue Segmentation"
period: "2025/26 – Present"
role: "Placement Researcher & MSc Candidate"
status: "ongoing"
stack:
  - "Python"
  - "PyTorch"
  - "MONAI"
  - "Vision Transformers"
  - "SimpleITK"
  - "3D Slicer"
results:
  - label: "Target Dice Similarity (DSC)"
    value: "≥ 0.82"
    kind: "target"
  - label: "Target 95% Hausdorff Distance"
    value: "≤ 8.5 mm"
    kind: "target"
  - label: "Validation Cohort"
    value: "Clinical Abdominal CT"
    kind: "target"
resultsVerified: false
figures:
  - key: "pancreaticCtScan"
    category: "Segmentation"
    aspect: "square"
    caption: "Axial abdominal contrast-enhanced CT slice showing ambiguous pancreas boundaries"
    credit: "Clinical Research Dataset (Anonymised)"
  - key: "pancreaticSegmentationMask"
    category: "Segmentation"
    aspect: "square"
    caption: "Automated volumetric prediction mask isolating pancreatic parenchyma"
    credit: "Research Prototype Pipeline"
  - key: "pancreaticVitArchitecture"
    category: "Architecture"
    aspect: "wide"
    caption: "Hybrid Vision Transformer and 3D U-Net encoder-decoder workflow"
    credit: "Research Pipeline Schema"
relatedPublicationIds: []
featured: true
verified: true
---

## Summary
The pancreas is one of the most challenging abdominal organs to segment automatically due to its small anatomical volume, highly variable morphology between patients, and extremely low soft-tissue contrast with surrounding duodenum and splenic vasculature. This ongoing placement research investigates volumetric deep learning and hybrid Vision Transformer architectures implemented in MONAI to achieve reliable, clinically actionable automated segmentations.

## Problem
In standard axial computed tomography (CT), the pancreas occupies less than 1% of the total abdominal scan volume, inducing severe foreground-background voxel imbalance. Furthermore, inflammatory changes, anatomical proximity to adjacent fatty tissues, and partial-volume artifacts lead standard 2D convolutional networks to over-segment or miss irregular tail boundaries. Accurate delineation is vital for radiotherapy planning, surgical resection margins, and early adenocarcinoma screening.

## Approach
Our methodological framework addresses three primary engineering bottlenecks:
1. **Intensity Standardization & Windowing:** Applying tailored Hounsfield Unit (HU) windowing (-100 to +240 HU) and anisotropic resampling to standardize voxel spacing across varied clinical scanners.
2. **Volumetric Context Preservation:** Utilizing 3D patch-based architectures that retain spatial inter-slice anatomical coherence rather than treating slices in isolation.
3. **Hybrid Spatial-Transformer Encoding:** Combining convolutional feature extractors for fine boundary edges with multi-head self-attention mechanisms to model long-range global organ context.

## Results
Because this project represents active ongoing research at Canterbury Christ Church University (CCCU), benchmark evaluation metrics remain under formal experimental validation and peer-review preparation:
- **Dice Similarity Coefficient (DSC):** Target threshold set at ≥ 0.82 across heterogeneous validation cohorts.
- **Surface Boundary Distance (HD95):** Target precision set within clinically acceptable surgical tolerances.

## Interpretability / Validation
Clinical adoption hinges on clinician interpretability. Predictions are evaluated in 3D Slicer alongside expert radiological annotations. Error distribution maps and spatial uncertainty heatmaps highlight slices where low contrast produces anatomical ambiguity, providing radiologist-in-the-loop oversight rather than black-box outputs.

## Limitations & Next Steps
- **Ongoing Challenges:** Handling severe inter-scanner contrast variations and motion artifacts in contrast-enhanced arterial phases.
- **Future Work:** Integration of self-supervised 3D foundation models pre-trained on large-scale public organ registries (e.g., TotalSegmentator, Decathlon) followed by fine-tuning on targeted pancreatic cohorts.
