# 🌐 Keya: All-In-One Multilingual Smart Dictionary & Translator

Keya is a modern, high-performance, offline-first dictionary and translation engine built with **React 19**, **TypeScript 5**, **Vite 7**, and **Tailwind CSS v4**. It features high-fidelity offline searching and translation in **11 major world languages**, smart irregular English verb lemmatization, Web Speech API speech-to-text and text-to-speech, and a seamless fallback to a free online translator API for extended lookups.

---

## ⚡ Quick Start: How to Run the System

Follow these simple steps to get Keya up and running locally on your computer.

### 📋 Prerequisites
Before you start, ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (Recommended version: **18.x or 20.x+**)
*   [npm](https://www.npmjs.com/) (Usually comes packaged with Node.js)

### 🛠️ Setup & Running Guide

#### **Step 1: Clone or Navigate to the Workspace**
Open your terminal and navigate to the `project` directory within the workspace:
```bash
cd project
```

#### **Step 2: Install Project Dependencies**
Install all required node packages using `npm`:
```bash
npm install
```

#### **Step 3: Start the Development Server**
Launch the Vite development server to view the application in your browser:
```bash
npm run dev
```
Once the dev server starts, it will output a local URL (usually **`http://localhost:5173`**). Copy and paste this into any modern web browser to open the application!

---

## 🚀 Key Operations & Build Commands

Inside the `project` directory, you can run the following commands:

| Command | Action / Purpose |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at `http://localhost:5173` with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and builds the production-ready optimized application inside the `dist` directory. |
| `npm run preview` | Spins up a local web server to preview your production build locally. |

---

## 🌟 Elite Features & Features Showcase

1.  **🚀 Offline-First & Sub-Millisecond Queries**: Loaded with a custom-optimized offline dictionary containing high-frequency words, phrases, grammatical metadata, synonyms, antonyms, and full pronunciation guides.
2.  **🧠 Intelligent English Lemmatizer & Stemmer**:
    *   **Regular plurals and inflections**: e.g., searching `"ranges"` $\rightarrow$ finds `"range"`; `"boxes"` $\rightarrow$ finds `"box"`; `"loving"` $\rightarrow$ finds `"love"`.
    *   **Irregular English forms**: Resolves past-tense, present-participles, and irregular plurals back to their base forms (e.g., `"done"`, `"did"` $\rightarrow$ **`do`**; `"went"` $\rightarrow$ **`go`**; `"women"` $\rightarrow$ **`woman`**).
3.  **🔌 Seamless Free Translation API Fallback**:
    *   Integrates the free **MyMemory Translation API** (no API keys required!) as a smart network fallback.
    *   If a sentence or word cannot be translated offline, the application seamlessly queries the API in real time and highlights the translated text with a custom "Translated via API" badge!
4.  **🗣️ Web Speech Integration**:
    *   **Voice Search / Input**: Speak into your microphone to record queries automatically.
    *   **Text-to-Speech (TTS)**: Crisp audio pronunciation of translations in all supported target languages using standard browser voices.
5.  **📂 Personalized Collections**:
    *   **Favorites List**: Bookmark your favorite or frequently looked-up words.
    *   **Translation History**: Tracks your recent searches. Powered by browser local storage persistence.

---

## 🌎 Supported Languages

Keya supports high-quality bidirectional translations for the following **11 languages**:

| Language Code | Language | BCP-47 Tag |
| :--- | :--- | :--- |
| **en** / **en-US** | English (US / UK) | `en-US` |
| **bn** | Bengali (বাংলা) | `bn-BD` |
| **hi** | Hindi (हिन्दी) | `hi-IN` |
| **ar** | Arabic (العربية) | `ar-SA` |
| **es** | Spanish (Español) | `es-ES` |
| **fr** | French (Français) | `fr-FR` |
| **ur** | Urdu (اردو) | `ur-PK` |
| **tr** | Turkish (Türkçe) | `tr-TR` |
| **de** | German (Deutsch) | `de-DE` |
| **pt** | Portuguese (Português) | `pt-PT` |
| **ja** | Japanese (日本語) | `ja-JP` |
| **ko** | Korean (한국어) | `ko-KR` |

---

## 📂 Codebase & Folder Directory

Below is the directory structure highlighting the critical components of the system:

```text
keya/
├── project/                     # React App codebase
│   ├── src/
│   │   ├── data/
│   │   │   └── dictionary.ts    # Multilingual dictionary & phrases dataset
│   │   ├── utils/
│   │   │   └── engine.ts        # Smart stemming, auto-detection, & MyMemory API integration
│   │   ├── App.tsx              # Main UI, speech control, and state management
│   │   └── main.tsx             # Application entrypoint
│   ├── package.json             # Scripts & dependencies configuration
│   └── vite.config.ts           # Vite Single-File bundler plugins
└── documentation/               # High-level architecture, SRS & diagrams
    ├── README.md                # Documentation overview
    ├── 8.System_Architecture.md # High-level architecture breakdown
    ├── 9.Setup_and_Run.md       # Interactive environment setup guide
    ├── 11.SRS_Report.md         # Full IEEE System Requirements Specification
    ├── 12.Project_Report.md     # Full System Design & Development Project Report
    ├── 13.University_Justification_Form.md # University Project Justification Form (OBE/CEP)
    └── 14.References.md         # Annotated Academic & Technical Master References
```

---

## ⚙️ Technical Highlights

*   **Self-Contained Inlining**: The production build is compiled into a **single `index.html` file** (using `vite-plugin-singlefile`) making it completely portable, easy to distribute, and deployable instantly on any static web host.
*   **Privacy-Friendly**: Translation operations and history are stored fully locally within your browser's private sandbox storage, with external traffic only being dispatched to MyMemory for online translation fallbacks.

---

## 📚 Project Documentation & References

Keya includes extensive academic and technical documentation mapping out functional schemas, architecture diagrams, and verification benchmarks. For a complete listing of academic citations, web standards, and Outcome-Based Education (OBE) reference works, see:
*   [Master Project References File](documentation/14.References.md)
*   [SRS Report - Section 1.5 References](documentation/11.SRS_Report.md#15-references)
*   [Project Report - Section 6.3 References](documentation/12.Project_Report.md#63-references)
*   [University Justification Form - Section 7 References](documentation/13.University_Justification_Form.md#%F0%9F%93%9A-section-7-references)

