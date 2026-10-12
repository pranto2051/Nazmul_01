/**
 * ═════════════════════════════════════════════════════════════
 * [DATA] CENTRAL IMAGE REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all images, figures, and visual assets.
 * No page or component hardcodes image paths directly.
 * Updating the 'src' attribute in this file updates the image
 * across the entire portfolio website.
 * 
 * [MANUAL-UPDATE] To use personal images:
 * 1) Place the image in the `public/assets/` directory (e.g., `my-photo.jpg`)
 * 2) Locate its corresponding registry key below and update `src: "/assets/my-photo.jpg"`
 * 3) Set `demo: false`.
 * ═════════════════════════════════════════════════════════════
 */

export interface RegistryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: 'square' | 'wide' | 'tall' | 'portrait';
  credit?: string;
  demo: boolean;
}

export const IMG: Record<string, RegistryImage> = {
  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] portrait — Primary Researcher Profile Headshot
   * ─────────────────────────────────────────────────────────────
   * Displayed On : Home Hero, About Section, CV Page
   * Requirements : Formal academic headshot, balanced lighting, centered
   * Dimensions   : 800×800 px (1:1) · Format: .jpg/.webp · ≤ 300 KB
   * Instructions : 1) Place headshot at public/assets/portrait.jpg
   *                2) Update src to "/assets/portrait.jpg" and set demo: false
   * ═════════════════════════════════════════════════════════════
   */
  portrait: {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    alt: "Academic Portrait of Nazmul Hasan Shouvo",
    width: 800,
    height: 800,
    aspect: "square",
    credit: "Demo Headshot (Replace with personal portrait)",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] ogImage — Open Graph Social Media Sharing Banner
   * ─────────────────────────────────────────────────────────────
   * Displayed On : LinkedIn, WhatsApp, Facebook, X link previews
   * Dimensions   : 1200×630 px · Format: .jpg/.png
   * ═════════════════════════════════════════════════════════════
   */
  ogImage: {
    src: "/og/og-default.svg",
    alt: "Nazmul Hasan Shouvo — Academic Research Portfolio Social Banner",
    width: 1200,
    height: 630,
    aspect: "wide",
    credit: "Site Metadata Banner",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] heroScan — Medical Scan for Hero Viewport
   * ─────────────────────────────────────────────────────────────
   * Displayed On : Home Hero scan viewport mode
   * ═════════════════════════════════════════════════════════════
   */
  heroScan: {
    src: "/demo/pancreatic-ct.svg",
    alt: "Axial Abdominal Contrast-Enhanced CT Scan",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "Clinical Research Dataset [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] pancreaticCtScan — Axial Abdominal CT Scan Slice
   * ─────────────────────────────────────────────────────────────
   * Displayed On : Home Before/After Slider ("Before") & Research Case Study
   * Dimensions   : 1000×1000 px · HU windowed (-100 to +240 HU)
   * ═════════════════════════════════════════════════════════════
   */
  pancreaticCtScan: {
    src: "/demo/pancreatic-ct.svg",
    alt: "Axial Abdominal CT Slice showing pancreatic soft tissue",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "Clinical Dataset (Anonymised) [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] pancreaticSegmentationMask — Predicted Pancreatic Mask
   * ─────────────────────────────────────────────────────────────
   * Displayed On : Home Before/After Slider ("After")
   * ═════════════════════════════════════════════════════════════
   */
  pancreaticSegmentationMask: {
    src: "/demo/pancreatic-mask.svg",
    alt: "Predicted 3D Pancreatic Segmentation Mask Overlay",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "Deep Learning Pipeline Prototype [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] pancreaticVitArchitecture — Swin-3D / ViT UNet Architecture
   * ─────────────────────────────────────────────────────────────
   * Displayed On : Research Case Study & Gallery
   * Dimensions   : 1600×900 px (16:9)
   * ═════════════════════════════════════════════════════════════
   */
  pancreaticVitArchitecture: {
    src: "/demo/pancreatic-vit-arch.svg",
    alt: "Hybrid Vision Transformer Swin-3D Encoder-Decoder Architecture Schema",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "Research Methodology Workflow [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] pancreatic3dMesh — 3D Isosurface Surface Reconstruction
   * ═════════════════════════════════════════════════════════════
   */
  pancreatic3dMesh: {
    src: "/demo/pancreatic-3d-mesh.svg",
    alt: "3D Slicer Reconstructed Pancreatic Isosurface Mesh",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "3D Slicer Surface Reconstruction [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] guavaArchitecture — Paired ResNet50 Pipeline Diagram
   * ═════════════════════════════════════════════════════════════
   */
  guavaArchitecture: {
    src: "/demo/guava-arch.svg",
    alt: "Class-Weighted ResNet50 Pipeline Diagram",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE QPAIN 2026 Accepted Paper [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] guavaGradcam — Grad-CAM Saliency Attribution Map
   * ═════════════════════════════════════════════════════════════
   */
  guavaGradcam: {
    src: "/demo/guava-gradcam.svg",
    alt: "Grad-CAM Visual Heatmap Highlighting Foliar Lesions",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] guavaConfusionMatrix — Multi-Class Confusion Matrix
   * ═════════════════════════════════════════════════════════════
   */
  guavaConfusionMatrix: {
    src: "/demo/guava-confusion.svg",
    alt: "Normalized Confusion Matrix on Field Pathology Test Split",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] appleNetArchitecture — AppleNet-B1 EfficientNet Architecture
   * ═════════════════════════════════════════════════════════════
   */
  appleNetArchitecture: {
    src: "/demo/pancreatic-vit-arch.svg",
    alt: "AppleNet-B1 Auto-Reweighted EfficientNet Architecture",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] appleNetAttentionHeatmap — Self-Attention Heatmap Distribution
   * ═════════════════════════════════════════════════════════════
   */
  appleNetAttentionHeatmap: {
    src: "/demo/guava-gradcam.svg",
    alt: "Multi-Head Attention Coefficient Distribution Heatmap",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] tomatoNetDiagram — TomatoNet Architecture Diagram
   * ═════════════════════════════════════════════════════════════
   */
  tomatoNetDiagram: {
    src: "/demo/guava-arch.svg",
    alt: "TomatoNet-R50 Deep Learning Pipeline",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] mangoNetSaArchitecture — Spatial Attention CNN Architecture
   * ═════════════════════════════════════════════════════════════
   */
  mangoNetSaArchitecture: {
    src: "/demo/guava-arch.svg",
    alt: "MangoNet-SA MobileNetV2 Spatial Attention Architecture",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] heartStrokePipeline — Cardiovascular Multi-Task Pipeline
   * ═════════════════════════════════════════════════════════════
   */
  heartStrokePipeline: {
    src: "/demo/pancreatic-vit-arch.svg",
    alt: "Multimodal Heart Disease and Stroke Risk Stratification Pipeline",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "AI-Scientist-UK 2025 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] heartStrokeRocCurves — Multi-Target ROC Curves
   * ═════════════════════════════════════════════════════════════
   */
  heartStrokeRocCurves: {
    src: "/demo/heart-stroke-roc.svg",
    alt: "Multi-Target Receiver Operating Characteristic (ROC) Curves",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "AI-Scientist-UK 2025 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] aidsEnsembleFramework — Threshold-Optimized Ensemble Architecture
   * ═════════════════════════════════════════════════════════════
   */
  aidsEnsembleFramework: {
    src: "/demo/guava-arch.svg",
    alt: "Threshold-Optimized Weighted Ensemble Learning Workflow",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] aidsThresholdOptimization — Precision-Recall Tradeoff Curves
   * ═════════════════════════════════════════════════════════════
   */
  aidsThresholdOptimization: {
    src: "/demo/heart-stroke-roc.svg",
    alt: "Clinical Threshold Calibration Precision-Recall Trajectories",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "IEEE QPAIN 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] liverStackingPipeline — Hepatic Stacking Framework
   * ═════════════════════════════════════════════════════════════
   */
  liverStackingPipeline: {
    src: "/demo/guava-arch.svg",
    alt: "Stacking Machine Learning Ensemble for Hepatic Risk Prediction",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "IEEE ICECTE 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] liverShapSummary — SHAP Explainability Plot
   * ═════════════════════════════════════════════════════════════
   */
  liverShapSummary: {
    src: "/demo/guava-confusion.svg",
    alt: "SHAP Summary Feature Attribution Dot-Plot",
    width: 1000,
    height: 1000,
    aspect: "square",
    credit: "PECCII 2026 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] skinNetArchitecture — SkinNet Lightweight CNN Architecture
   * ═════════════════════════════════════════════════════════════
   */
  skinNetArchitecture: {
    src: "/demo/pancreatic-vit-arch.svg",
    alt: "SkinNet Lightweight CNN Architecture Schema",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "Frontiers in Complex Dynamical Systems (Accepted) [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] parkinsonsVotingWorkflow — Parkinson's Stacking Workflow
   * ═════════════════════════════════════════════════════════════
   */
  parkinsonsVotingWorkflow: {
    src: "/demo/guava-arch.svg",
    alt: "Variation-Based Weighted Voting and Stacking Ensemble Workflow",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "Engineering Reports (Wiley) Under Review [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] scheduling5gFlowchart — 5G Scheduling Flowchart
   * ═════════════════════════════════════════════════════════════
   */
  scheduling5gFlowchart: {
    src: "/demo/guava-arch.svg",
    alt: "5G Buffer Status and Queue Length Scheduling Algorithmic Flowchart",
    width: 1200,
    height: 800,
    aspect: "wide",
    credit: "IEEE ICCIT 2024 (pp. 2014–2019) [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] schedulingThroughputComparison — 5G Throughput Comparison Chart
   * ═════════════════════════════════════════════════════════════
   */
  schedulingThroughputComparison: {
    src: "/demo/heart-stroke-roc.svg",
    alt: "Empirical Throughput Comparison across 5G Buffer Regimes",
    width: 1200,
    height: 800,
    aspect: "wide",
    credit: "IEEE ICCIT 2024 [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] cccuGuestLecturePhoto — Invited Lecture Presentation
   * ═════════════════════════════════════════════════════════════
   */
  cccuGuestLecturePhoto: {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
    alt: "Invited Lecture Presentation at Canterbury Christ Church University",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "CCCU Lecture Hall (March 2026) [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] conferencePresentationQpain — Conference Presentation Stage
   * ═════════════════════════════════════════════════════════════
   */
  conferencePresentationQpain: {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    alt: "International Conference Presentation Stage",
    width: 1600,
    height: 900,
    aspect: "wide",
    credit: "Academic Conference Presentation [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] ccnaCertificate — Cisco Certified Network Associate Credential
   * ═════════════════════════════════════════════════════════════
   */
  ccnaCertificate: {
    src: "/demo/certificate-ccna.svg",
    alt: "Cisco Certified Network Associate (CCNA) Official Credential",
    width: 1600,
    height: 1100,
    aspect: "wide",
    credit: "Cisco Systems Credential Verification [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] ieeeIccitCertificate — IEEE ICCIT 2024 Presentation Certificate
   * ═════════════════════════════════════════════════════════════
   */
  ieeeIccitCertificate: {
    src: "/demo/certificate-iccit.svg",
    alt: "27th IEEE ICCIT 2024 Presentation Certificate",
    width: 1600,
    height: 1100,
    aspect: "wide",
    credit: "IEEE ICCIT 2024 Organizing Committee [DEMO]",
    demo: true,
  },

  /**
   * ═════════════════════════════════════════════════════════════
   * [IMAGE] cccuPlacementBadge — CCCU Research Placement Appointment Badge
   * ═════════════════════════════════════════════════════════════
   */
  cccuPlacementBadge: {
    src: "/favicon.svg",
    alt: "CCCU Postgraduate Research Placement Appointment Badge",
    width: 800,
    height: 800,
    aspect: "square",
    credit: "CCCU Research Office [DEMO]",
    demo: true,
  },
};
