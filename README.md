# 🌿 Krishi AI (ಕೃಷಿ AI)
### ಬೆಳೆ ರೋಗ ತಕ್ಷಣ ಪತ್ತೆ ಮಾಡಿ | Detect Crop Disease Instantly

Krishi AI is a high-fidelity, production-ready agricultural intelligence platform designed for farmers in Karnataka, India. It leverages state-of-the-art Vision AI and a multi-agent ecosystem to diagnose crop diseases in real-time, providing actionable treatment advice in both **Kannada** and **English**.

![Krishi AI Banner](https://images.unsplash.com/photo-1592919016382-354bce365312?auto=format&fit=crop&q=80&w=1000)

## 🚀 Core Intelligence Hub

- **Dual-Model Vision AI**: Powered by **Google Gemini 1.5 Flash** for high-speed analysis and **NVIDIA NIM (Llama 3.2 Vision)** for specialized diagnostic cross-verification.
- **Multi-Agent Ecosystem**: A Python-based agentic backend utilizing a **Detection Agent** and a **Recommendation Agent** to provide comprehensive treatment protocols (Organic, Chemical, and Fertilizer advice).
- **Tactical Geospatial Command Center**: A professional-grade **Outbreak Map** using MapLibre for real-time disease surveillance, featuring tactical radar scans and satellite diagnostic layers.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS (Deep Forest Premium UI) |
| **Backend (Core)** | Node.js, Express.js |
| **Backend (AI)** | FastAPI, Python (Agentic Framework) |
| **Database** | **Firebase Firestore** (Real-time data persistence) |
| **AI Models** | Google Gemini 1.5 Flash, NVIDIA Llama 3.1/3.2 |
| **Animations** | Framer Motion, GSAP (Cinematic UX) |
| **Maps** | MapLibre GL JS (Geospatial Surveillance) |

## ✨ Key Features

- **📸 Smart Image Capture**: Direct back-camera access or gallery upload optimized for field conditions.
- **🗣️ Bilingual Voice Output**: Natural language synthesis in Kannada and English for enhanced accessibility.
- **📜 Tactical History**: Persistent diagnostic logs stored in Firebase with instant retrieval.
- **🛰️ Satellite Surveillance**: View infection outbreaks on a tactical map with real-time system activity logs.
- **📱 Mobile-First Design**: Production-grade responsive UI with glassmorphism and fluid typography (`clamp()`), optimized for field use on any smartphone.
- **💬 Expert Sharing**: Instant WhatsApp integration to share diagnostics with local agricultural experts.

## 📱 Mobile-First Optimization
Krishi AI is engineered specifically for the field:
- **Fluid Typography**: Uses CSS `clamp()` for headings that scale perfectly from a 5-inch smartphone to a 32-inch monitor.
- **Touch-First UI**: Minimum 44px touch targets for all buttons and interactive elements, ensuring usability in dusty or wet field conditions.
- **Haptic Feedback**: Subtle visual press effects (`scale-95`) provide confirmation of user actions on touchscreens.
- **Data Efficiency**: Client-side image compression reduces upload payloads by up to 90% without sacrificing diagnostic accuracy.

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Firebase Project (Service Account Key)
- Google Gemini & NVIDIA API Keys

### 1. Backend Setup (Node.js)
```bash
cd backend
npm install
# Configure .env with FIREBASE_PRIVATE_KEY, GOOGLE_API_KEY, etc.
npm start
```

### 2. AI Agent Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Configure .env with VITE_FIREBASE_ keys
npm run dev
```

## 📡 API Architecture

- **`POST /api/analyze`**: Primary diagnostic endpoint (Gemini-powered).
- **`POST /api/detect`**: Multi-Agent diagnostic endpoint (FastAPI).
- **`GET /api/history`**: Retrieves all past telemetry and diagnostics.
- **`GET /api/weather`**: Real-time agricultural weather advisory.

## 🔮 Future Roadmap

- [ ] **Offline Edge Inference**: Implementing TensorFlow.js for basic disease detection without internet.
- [ ] **Sensor Telemetry Integration**: Connecting IoT soil moisture and PH sensors to the Tactical Map.
- [ ] **Community Outbreak Alerts**: Push notifications for farmers when a disease is detected within a 10km radius.
- [ ] **GPU-Accelerated Processing**: Optimizing the agent pipeline for real-time video stream analysis.

---
Developed with ❤️ for Indian Farmers to empower the next generation of agriculture.
