---
title: "Explainable Compound-Scaled & Attention-Based CNN/ViT Models"
subtitle: "Architectural Innovations Across AppleNet-B1, TomatoNet-R50, MangoNet-SA, and Eggplant ViT"
period: "2025–2026"
role: "Co-Author"
status: "completed"
stack:
  - "Python"
  - "PyTorch"
  - "Vision Transformers"
  - "EfficientNet"
  - "MobileNetV2"
  - "Grad-CAM"
results:
  - label: "Benchmark Suite"
    value: "4 Models"
    kind: "achieved"
  - label: "Comparative Accuracy"
    value: "XX.X%"
    kind: "achieved"
  - label: "Edge Efficiency"
    value: "Mobile-Ready"
    kind: "achieved"
resultsVerified: false
figures:
  - key: "appleNetArchitecture"
    category: "Architecture"
    aspect: "wide"
    caption: "AppleNet-B1 compound scaling with auto-reweighted feature pyramids"
    credit: "IEEE QPAIN 2026"
  - key: "appleNetAttentionHeatmap"
    category: "XAI"
    aspect: "square"
    caption: "Self-attention distribution across pathological tissue lesions"
    credit: "IEEE QPAIN 2026"
  - key: "mangoNetSaArchitecture"
    category: "Architecture"
    aspect: "wide"
    caption: "MobileNetV2 spatial-attention block for parameter-efficient inference"
    credit: "IEEE QPAIN 2026"
relatedPublicationIds:
  - "alom-applenet-2026"
  - "alom-tomatonet-2026"
  - "alom-mangonet-2026"
  - "rakin-eggplant-vit-2026"
featured: true
verified: true
---

## Summary
Modern crop disease detection requires architectures tailored to differing hardware constraints—from resource-constrained smartphones deployed in rural agricultural extension centers to high-throughput cloud screening systems. Across four peer-reviewed conference papers accepted at IEEE QPAIN 2026, we co-developed and evaluated a suite of attention-enhanced CNNs and Vision Transformer architectures.

## Problem
Standard convolutional networks often suffer from high computational overhead, making them impractical for edge deployment. Conversely, ultra-lightweight models frequently lack sufficient receptive field capacity to disambiguate subtle color variations between closely related fungal and viral pathologies.

## Approach
This multi-model investigation developed tailored architectural enhancements across four specific disease regimes:
1. **AppleNet-B1:** Compound-scaled EfficientNet backbone equipped with automatic channel reweighting modules to emphasize necrotic patch boundaries.
2. **TomatoNet-R50:** Residual learning architecture optimized for complex foliar leaf curvature and overlapping foliar structures.
3. **MangoNet-SA:** Spatial attention mechanism integrated into MobileNetV2 inverted residual blocks to isolate symptomatic tissue while discarding background soil.
4. **Eggplant ViT:** Patch self-attention network capturing long-range spatial correlations across multi-focal infection sites.

## Results
Across extensive test splits, the custom attention modules yielded consistent improvements over vanilla baseline backbones while maintaining efficient inference latencies suitable for real-time mobile deployment.

## Interpretability / Validation
All models were subjected to rigorous visual interpretability audits (Grad-CAM and self-attention rollout maps) to confirm that discriminative activation maps closely matched verified agronomical symptom manifestations.

## Limitations & Next Steps
- **Cross-Domain Generalization:** Performance under severe atmospheric blur and non-standard camera focal lengths requires additional domain adaptation research.
- **Future Directions:** Integrating multi-spectral inputs and lightweight quantized ONNX runtimes for offline field usage.
