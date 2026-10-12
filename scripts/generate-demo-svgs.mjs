import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/demo');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim(), 'utf-8');
}

// 1. Pancreatic CT Scan (Axial abdominal slice)
writeSvg('pancreatic-ct.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#0b0f17"/>
  <!-- Scan measurement grid -->
  <defs>
    <pattern id="ctgrid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#172234" stroke-width="1"/>
    </pattern>
    <radialGradient id="bodyOutline" cx="50%" cy="50%" r="45%">
      <stop offset="60%" stop-color="#1e2e42" stop-opacity="0.9"/>
      <stop offset="85%" stop-color="#141e2e" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0b0f17" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spine" cx="50%" cy="80%" r="15%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="80%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e2e42"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1000" fill="url(#ctgrid)"/>
  
  <!-- Abdominal ellipse -->
  <ellipse cx="500" cy="500" rx="380" ry="320" fill="url(#bodyOutline)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.6"/>
  
  <!-- Spine & Vertebral Body -->
  <path d="M 440 760 Q 500 700 560 760 Q 530 830 500 850 Q 470 830 440 760 Z" fill="url(#spine)"/>
  <circle cx="500" cy="770" r="24" fill="#0b0f17"/>
  
  <!-- Liver (Right Lobe) -->
  <path d="M 200 450 Q 250 300 420 340 Q 380 560 220 540 Z" fill="#2d3d54" stroke="#475569" stroke-width="1.5"/>
  
  <!-- Spleen (Left Side) -->
  <path d="M 720 420 Q 800 490 770 560 Q 700 530 710 440 Z" fill="#243447" stroke="#475569" stroke-width="1.5"/>
  
  <!-- Aorta & IVC -->
  <circle cx="470" cy="670" r="22" fill="#38bdf8" opacity="0.4"/>
  <circle cx="530" cy="670" r="26" fill="#38bdf8" opacity="0.3"/>
  
  <!-- Pancreas Parenchyma -->
  <path d="M 380 490 C 440 450, 560 460, 640 430 C 660 450, 620 500, 550 510 C 460 520, 400 520, 380 490 Z" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
  
  <!-- HUD Annotation -->
  <text x="50" y="70" font-family="monospace" font-size="20" fill="#38bdf8" letter-spacing="2">AXIAL CT · CONTRAST ENHANCED</text>
  <text x="50" y="105" font-family="monospace" font-size="16" fill="#94a3b8">W: 400  L: 40  |  SLICE: 64/128</text>
  <text x="820" y="70" font-family="monospace" font-size="20" fill="#38bdf8">R: RIGHT</text>
  <text x="50" y="940" font-family="monospace" font-size="16" fill="#64748b">SCALE: 100mm</text>
  <line x1="50" y1="955" x2="250" y2="955" stroke="#38bdf8" stroke-width="3"/>
  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(56,189,248,0.1)" stroke="#38bdf8"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 2. Pancreatic Segmentation Mask (Overlaid prediction)
writeSvg('pancreatic-mask.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#0b0f17"/>
  <defs>
    <pattern id="maskgrid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#172234" stroke-width="1"/>
    </pattern>
    <radialGradient id="maskGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f5d4" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#0284c7" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.3"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1000" fill="url(#maskgrid)"/>
  
  <!-- Underlying Anatomy (Desaturated) -->
  <ellipse cx="500" cy="500" rx="380" ry="320" fill="#141e2e" stroke="#1e2e42" stroke-width="1.5" opacity="0.7"/>
  <path d="M 440 760 Q 500 700 560 760 Q 530 830 500 850 Q 470 830 440 760 Z" fill="#2d3d54"/>
  <path d="M 200 450 Q 250 300 420 340 Q 380 560 220 540 Z" fill="#1c2839"/>
  <path d="M 720 420 Q 800 490 770 560 Q 700 530 710 440 Z" fill="#1c2839"/>
  
  <!-- Glowing Segmentation Mask Overlay -->
  <path d="M 380 490 C 440 450, 560 460, 640 430 C 660 450, 620 500, 550 510 C 460 520, 400 520, 380 490 Z" 
        fill="url(#maskGlow)" stroke="#00f5d4" stroke-width="4" filter="drop-shadow(0 0 12px #00f5d4)"/>
  
  <!-- Target Contours & Centroid -->
  <circle cx="510" cy="485" r="5" fill="#ffffff"/>
  <line x1="510" y1="460" x2="510" y2="510" stroke="#ffffff" stroke-width="1.5"/>
  <line x1="485" y1="485" x2="535" y2="485" stroke="#ffffff" stroke-width="1.5"/>
  <text x="525" y="480" font-family="monospace" font-size="14" fill="#00f5d4" font-weight="bold">PANCREAS ROI (VOXELS: 14,280)</text>

  <!-- HUD -->
  <text x="50" y="70" font-family="monospace" font-size="20" fill="#00f5d4" letter-spacing="2">PREDICTED SEGMENTATION MASK</text>
  <text x="50" y="105" font-family="monospace" font-size="16" fill="#94a3b8">MODEL: Swin-UNETR 3D  |  TARGET DSC: ≥0.82</text>
  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(0,245,212,0.15)" stroke="#00f5d4"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#00f5d4" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 3. Pancreatic 3D Mesh
writeSvg('pancreatic-3d-mesh.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#080d14"/>
  <defs>
    <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#2dd4bf"/>
    </linearGradient>
  </defs>
  <!-- Wireframe polygons simulating 3D Slicer surface -->
  <g stroke="url(#meshGrad)" stroke-width="1.2" fill="rgba(56,189,248,0.08)" transform="translate(100, 150)">
    <polygon points="200,350 280,300 360,330 300,390"/>
    <polygon points="280,300 380,260 450,290 360,330"/>
    <polygon points="380,260 500,240 560,280 450,290"/>
    <polygon points="500,240 620,230 670,270 560,280"/>
    <polygon points="620,230 720,250 710,310 670,270"/>
    <polygon points="300,390 360,330 450,370 380,430"/>
    <polygon points="360,330 450,290 540,340 450,370"/>
    <polygon points="450,290 560,280 630,330 540,340"/>
    <polygon points="560,280 670,270 690,340 630,330"/>
    <polygon points="380,430 450,370 520,420 460,470"/>
    <polygon points="450,370 540,340 600,400 520,420"/>
  </g>
  <text x="50" y="80" font-family="monospace" font-size="22" fill="#38bdf8">3D ANATOMICAL SURFACE MESH</text>
  <text x="50" y="115" font-family="monospace" font-size="16" fill="#94a3b8">ISOSURFACE RECONSTRUCTION · 3D SLICER</text>
  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(56,189,248,0.1)" stroke="#38bdf8"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 4. ViT Architecture Diagram (1600x900)
writeSvg('pancreatic-vit-arch.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <rect width="1600" height="900" fill="#0f1724"/>
  <defs>
    <linearGradient id="block1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="block2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d9488"/><stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
  </defs>
  <text x="80" y="100" font-family="monospace" font-size="32" fill="#38bdf8" font-weight="bold">HYBRID VISION TRANSFORMER (Swin-3D / UNETR) PIPELINE</text>
  <text x="80" y="145" font-family="sans-serif" font-size="20" fill="#94a3b8">Volumetric 3D CT Input → Shifted Window Multi-Head Attention → Bottleneck → Deconvolutional Decoder</text>

  <!-- Input Block -->
  <rect x="80" y="320" width="180" height="260" rx="12" fill="#1e2e42" stroke="#38bdf8" stroke-width="2"/>
  <text x="170" y="430" font-family="sans-serif" font-size="20" fill="#f1f5f9" font-weight="bold" text-anchor="middle">3D CT Volume</text>
  <text x="170" y="470" font-family="monospace" font-size="16" fill="#38bdf8" text-anchor="middle">(H × W × D × C)</text>

  <!-- Arrow -->
  <line x1="260" y1="450" x2="330" y2="450" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrow)"/>

  <!-- Patch Partition -->
  <rect x="330" y="340" width="220" height="220" rx="12" fill="url(#block1)" stroke="#38bdf8" stroke-width="2"/>
  <text x="440" y="430" font-family="sans-serif" font-size="20" fill="#ffffff" font-weight="bold" text-anchor="middle">Patch Partition</text>
  <text x="440" y="470" font-family="monospace" font-size="16" fill="#e0f2fe" text-anchor="middle">Linear Embedding</text>

  <!-- Swin Transformer Stages -->
  <rect x="610" y="280" width="300" height="340" rx="16" fill="#172234" stroke="#2dd4bf" stroke-width="2"/>
  <text x="760" y="340" font-family="sans-serif" font-size="22" fill="#2dd4bf" font-weight="bold" text-anchor="middle">Swin-3D Encoder</text>
  <rect x="640" y="380" width="240" height="60" rx="8" fill="url(#block2)"/>
  <text x="760" y="418" font-family="monospace" font-size="16" fill="#ffffff" text-anchor="middle">W-MSA (Window Attention)</text>
  <rect x="640" y="460" width="240" height="60" rx="8" fill="url(#block2)"/>
  <text x="760" y="498" font-family="monospace" font-size="16" fill="#ffffff" text-anchor="middle">SW-MSA (Shifted Window)</text>

  <!-- Decoder Block -->
  <rect x="970" y="300" width="260" height="300" rx="16" fill="#1e2e42" stroke="#38bdf8" stroke-width="2"/>
  <text x="1100" y="380" font-family="sans-serif" font-size="22" fill="#38bdf8" font-weight="bold" text-anchor="middle">3D U-Net Decoder</text>
  <text x="1100" y="430" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">Skip Connections</text>
  <text x="1100" y="470" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">Transposed Convolutions</text>

  <!-- Output Segmentation -->
  <rect x="1300" y="340" width="220" height="220" rx="12" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/>
  <text x="1410" y="430" font-family="sans-serif" font-size="20" fill="#ffffff" font-weight="bold" text-anchor="middle">Organ Segmentation</text>
  <text x="1410" y="470" font-family="monospace" font-size="16" fill="#a7f3d0" text-anchor="middle">Voxel Probabilities</text>

  <rect x="1450" y="820" width="100" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="1500" y="846" font-family="monospace" font-size="15" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 5. Guava Architecture & Grad-CAM & Confusion Matrix
writeSvg('guava-arch.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <rect width="1600" height="900" fill="#0f1724"/>
  <text x="80" y="100" font-family="monospace" font-size="32" fill="#38bdf8" font-weight="bold">CLASS-WEIGHTED RESNET50 WITH GRAD-CAM EXPLANATIONS</text>
  <text x="80" y="145" font-family="sans-serif" font-size="20" fill="#94a3b8">IEEE QPAIN 2026 Accepted · Folia Pathology Diagnosis under Real-Field Imbalance</text>
  
  <rect x="100" y="320" width="240" height="260" rx="12" fill="#1e2e42" stroke="#38bdf8" stroke-width="2"/>
  <text x="220" y="440" font-family="sans-serif" font-size="20" fill="#ffffff" font-weight="bold" text-anchor="middle">Field Leaf Capture</text>
  <text x="220" y="480" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">224 × 224 × 3</text>

  <rect x="420" y="280" width="380" height="340" rx="16" fill="#172234" stroke="#2dd4bf" stroke-width="2"/>
  <text x="610" y="350" font-family="sans-serif" font-size="22" fill="#2dd4bf" font-weight="bold" text-anchor="middle">ResNet50 Backbone</text>
  <text x="610" y="420" font-family="monospace" font-size="17" fill="#ffffff" text-anchor="middle">Bottleneck Blocks 1-4</text>
  <text x="610" y="470" font-family="monospace" font-size="17" fill="#ffffff" text-anchor="middle">Skip Identity Additions</text>
  <text x="610" y="520" font-family="monospace" font-size="17" fill="#ffffff" text-anchor="middle">Global Average Pooling</text>

  <rect x="880" y="300" width="300" height="300" rx="16" fill="#1e2e42" stroke="#38bdf8" stroke-width="2"/>
  <text x="1030" y="380" font-family="sans-serif" font-size="22" fill="#38bdf8" font-weight="bold" text-anchor="middle">Dynamic Class-Loss</text>
  <text x="1030" y="430" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">w_c = N / (C × N_c)</text>
  <text x="1030" y="480" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle">Inverse Freq Penalties</text>

  <rect x="1260" y="320" width="240" height="260" rx="12" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/>
  <text x="1380" y="430" font-family="sans-serif" font-size="20" fill="#ffffff" font-weight="bold" text-anchor="middle">Disease Classes</text>
  <text x="1380" y="470" font-family="monospace" font-size="16" fill="#a7f3d0" text-anchor="middle">+ Grad-CAM Attribution</text>

  <rect x="1450" y="820" width="100" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="1500" y="846" font-family="monospace" font-size="15" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

writeSvg('guava-gradcam.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#0b0f17"/>
  <defs>
    <radialGradient id="gradcamHeat" cx="45%" cy="40%" r="35%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#10b981" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Leaf outline -->
  <path d="M 500 150 C 750 300, 800 650, 500 850 C 200 650, 250 300, 500 150 Z" fill="#14532d" stroke="#22c55e" stroke-width="4"/>
  <path d="M 500 150 L 500 850" stroke="#15803d" stroke-width="4"/>
  
  <!-- Heatmap activation -->
  <circle cx="450" cy="420" r="220" fill="url(#gradcamHeat)"/>
  
  <text x="60" y="80" font-family="monospace" font-size="24" fill="#38bdf8">GRAD-CAM SALIENCY LOCALIZATION</text>
  <text x="60" y="115" font-family="sans-serif" font-size="18" fill="#94a3b8">Residual Layer 4 Attribution Map on Necrotic Foliar Patch</text>
  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

writeSvg('guava-confusion.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#0f1724"/>
  <text x="80" y="80" font-family="monospace" font-size="24" fill="#38bdf8">MULTI-CLASS CONFUSION MATRIX</text>
  <text x="80" y="115" font-family="sans-serif" font-size="18" fill="#94a3b8">IEEE QPAIN 2026 · Class-Weighted ResNet50 Sensitivity</text>
  
  <!-- Grid Matrix -->
  <g transform="translate(180, 200)">
    <!-- 4x4 matrix -->
    <rect x="0" y="0" width="150" height="150" fill="#0284c7" stroke="#0f1724" stroke-width="4"/>
    <text x="75" y="85" font-family="monospace" font-size="26" fill="#ffffff" font-weight="bold" text-anchor="middle">0.96</text>
    
    <rect x="150" y="0" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="225" y="85" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>
    
    <rect x="300" y="0" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="375" y="85" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.01</text>
    
    <rect x="450" y="0" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="525" y="85" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.01</text>

    <!-- Row 2 -->
    <rect x="0" y="150" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="75" y="235" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.03</text>
    
    <rect x="150" y="150" width="150" height="150" fill="#0369a1" stroke="#0f1724" stroke-width="4"/>
    <text x="225" y="235" font-family="monospace" font-size="26" fill="#ffffff" font-weight="bold" text-anchor="middle">0.94</text>
    
    <rect x="300" y="150" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="375" y="235" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>
    
    <rect x="450" y="150" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="525" y="235" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.01</text>

    <!-- Row 3 -->
    <rect x="0" y="300" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="75" y="385" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.01</text>
    
    <rect x="150" y="300" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="225" y="385" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>
    
    <rect x="300" y="300" width="150" height="150" fill="#0284c7" stroke="#0f1724" stroke-width="4"/>
    <text x="375" y="385" font-family="monospace" font-size="26" fill="#ffffff" font-weight="bold" text-anchor="middle">0.95</text>
    
    <rect x="450" y="300" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="525" y="385" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>

    <!-- Row 4 -->
    <rect x="0" y="450" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="75" y="535" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>
    
    <rect x="150" y="450" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="225" y="535" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.01</text>
    
    <rect x="300" y="450" width="150" height="150" fill="#1e2e42" stroke="#0f1724" stroke-width="4"/>
    <text x="375" y="535" font-family="monospace" font-size="24" fill="#94a3b8" text-anchor="middle">0.02</text>
    
    <rect x="450" y="450" width="150" height="150" fill="#0d9488" stroke="#0f1724" stroke-width="4"/>
    <text x="525" y="535" font-family="monospace" font-size="26" fill="#ffffff" font-weight="bold" text-anchor="middle">0.95</text>
  </g>
  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 6. ROC Curves & Threshold Optimization
writeSvg('heart-stroke-roc.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <rect width="1000" height="1000" fill="#0b0f17"/>
  <text x="80" y="80" font-family="monospace" font-size="24" fill="#38bdf8">RECEIVER OPERATING CHARACTERISTIC (ROC) CURVES</text>
  <text x="80" y="115" font-family="sans-serif" font-size="18" fill="#94a3b8">Multi-Target Cardiovascular & Cerebrovascular Risk Staging</text>

  <!-- Axes -->
  <line x1="150" y1="800" x2="850" y2="800" stroke="#334155" stroke-width="3"/>
  <line x1="150" y1="800" x2="150" y2="200" stroke="#334155" stroke-width="3"/>
  
  <!-- Diagonal Baseline -->
  <line x1="150" y1="800" x2="850" y2="200" stroke="#475569" stroke-width="2" stroke-dasharray="6 6"/>
  
  <!-- Curve 1 (Stroke AUC = 0.94) -->
  <path d="M 150 800 Q 180 320, 850 200" fill="none" stroke="#38bdf8" stroke-width="4"/>
  
  <!-- Curve 2 (Heart Disease AUC = 0.91) -->
  <path d="M 150 800 Q 240 380, 850 200" fill="none" stroke="#2dd4bf" stroke-width="4"/>

  <!-- Legend -->
  <rect x="520" y="620" width="300" height="120" rx="10" fill="#172234" stroke="#1e2e42"/>
  <line x1="540" y1="655" x2="580" y2="655" stroke="#38bdf8" stroke-width="4"/>
  <text x="595" y="662" font-family="monospace" font-size="16" fill="#f1f5f9">Stroke Risk (AUC: 0.94)</text>
  <line x1="540" y1="705" x2="580" y2="705" stroke="#2dd4bf" stroke-width="4"/>
  <text x="595" y="712" font-family="monospace" font-size="16" fill="#f1f5f9">Coronary Risk (AUC: 0.91)</text>

  <text x="500" y="860" font-family="sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">False Positive Rate (1 - Specificity)</text>
  <text x="60" y="500" font-family="sans-serif" font-size="18" fill="#94a3b8" transform="rotate(-90 60 500)" text-anchor="middle">True Positive Rate (Sensitivity)</text>

  <rect x="850" y="910" width="100" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="900" y="936" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO</text>
</svg>
`);

// 7. Certificates (CCNA and ICCIT)
writeSvg('certificate-ccna.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1100" width="1600" height="1100">
  <rect width="1600" height="1100" fill="#0f1724"/>
  <rect x="40" y="40" width="1520" height="1020" rx="20" fill="#172234" stroke="#0284c7" stroke-width="4"/>
  <rect x="70" y="70" width="1460" height="960" rx="12" fill="none" stroke="#1e2e42" stroke-width="2"/>
  
  <text x="800" y="240" font-family="serif" font-size="52" fill="#38bdf8" font-weight="bold" text-anchor="middle">CISCO SYSTEMS</text>
  <text x="800" y="320" font-family="sans-serif" font-size="28" fill="#94a3b8" letter-spacing="4" text-anchor="middle">THIS IS TO CERTIFY THAT</text>
  
  <text x="800" y="460" font-family="serif" font-size="64" fill="#ffffff" font-weight="bold" text-anchor="middle">Nazmul Hasan Shouvo</text>
  
  <text x="800" y="560" font-family="sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle">HAS SUCCESSFULLY COMPLETED ALL REQUIREMENTS TO BE RECOGNIZED AS A</text>
  <text x="800" y="640" font-family="serif" font-size="44" fill="#2dd4bf" font-weight="bold" text-anchor="middle">Cisco Certified Network Associate (CCNA)</text>
  
  <line x1="400" y1="820" x2="700" y2="820" stroke="#475569" stroke-width="2"/>
  <text x="550" y="860" font-family="sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">VERIFIED CREDENTIAL</text>
  
  <line x1="900" y1="820" x2="1200" y2="820" stroke="#475569" stroke-width="2"/>
  <text x="1050" y="860" font-family="sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">CISCO CERTIFIED PROFESSIONAL</text>
  
  <rect x="1400" y="990" width="120" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="1460" y="1016" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO CERT</text>
</svg>
`);

writeSvg('certificate-iccit.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1100" width="1600" height="1100">
  <rect width="1600" height="1100" fill="#0f1724"/>
  <rect x="40" y="40" width="1520" height="1020" rx="20" fill="#172234" stroke="#38bdf8" stroke-width="4"/>
  <rect x="70" y="70" width="1460" height="960" rx="12" fill="none" stroke="#1e2e42" stroke-width="2"/>
  
  <text x="800" y="220" font-family="serif" font-size="44" fill="#38bdf8" font-weight="bold" text-anchor="middle">27th IEEE ICCIT 2024</text>
  <text x="800" y="280" font-family="sans-serif" font-size="24" fill="#94a3b8" letter-spacing="3" text-anchor="middle">CERTIFICATE OF PAPER PRESENTATION</text>
  
  <text x="800" y="420" font-family="serif" font-size="56" fill="#ffffff" font-weight="bold" text-anchor="middle">Nazmul Hasan Shouvo</text>
  
  <text x="800" y="520" font-family="sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">FOR PRESENTING THE RESEARCH PAPER ENTITLED:</text>
  <text x="800" y="590" font-family="serif" font-size="28" fill="#2dd4bf" font-style="italic" text-anchor="middle">"An Efficient Scheduling Algorithm Based on Buffer Status and Queue Length to Satisfy Real-Time Users in 5G"</text>
  <text x="800" y="650" font-family="monospace" font-size="18" fill="#94a3b8" text-anchor="middle">IEEE Xplore Proceedings · pp. 2014–2019 · December 2024</text>
  
  <rect x="1400" y="990" width="120" height="40" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8"/>
  <text x="1460" y="1016" font-family="monospace" font-size="14" fill="#38bdf8" font-weight="bold" text-anchor="middle">DEMO CERT</text>
</svg>
`);

// 8. Default Open Graph Card (1200x630)
writeSvg('og-default.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#080d14"/>
  <defs>
    <radialGradient id="ogGlow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#080d14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogGlow)"/>
  
  <rect x="80" y="80" width="64" height="64" rx="16" fill="#0284c7"/>
  <text x="112" y="124" font-family="monospace" font-size="28" fill="#ffffff" font-weight="bold" text-anchor="middle">NHS</text>
  
  <text x="80" y="240" font-family="serif" font-size="54" fill="#ffffff" font-weight="bold">Nazmul Hasan Shouvo</text>
  <text x="80" y="310" font-family="sans-serif" font-size="28" fill="#38bdf8" font-weight="600">Research Assistant & MSc Candidate · Canterbury Christ Church University (CCCU), UK</text>
  <text x="80" y="390" font-family="sans-serif" font-size="22" fill="#94a3b8">Specializing in Medical Image Analysis, 3D Pancreatic CT Segmentation & Explainable AI (XAI)</text>
  
  <line x1="80" y1="460" x2="1120" y2="460" stroke="#1e2e42" stroke-width="2"/>
  
  <text x="80" y="530" font-family="monospace" font-size="20" fill="#2dd4bf">10 Accepted Publications · 3 Book Chapters · 2 Journal Manuscripts</text>
</svg>
`);

console.log('Successfully generated all diagnostic demo SVGs in public/demo/');
