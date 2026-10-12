# 🛡️ PolicySphere Mobile Application

> **Next-Generation Cloud-Native Digital Insurance Marketplace Platform**  
> Built with React Native, Expo (SDK 51), TypeScript, Zustand, and TanStack Query.

---

## 📌 Overview

**PolicySphere** is an enterprise-scale digital insurance marketplace designed to deliver seamless, transparent, and multi-channel insurance experiences for customers, insurance advisors, empaneled insurers, claim surveyors, compliance officers, and administrators.

The application implements all **40 Software Requirements Specification (SRS) Modules** organized into **9 comprehensive Feature Packages**, engineered with zero-trust security, IRDAI guidelines, and the India Digital Personal Data Protection (DPDP) Act 2023.

---

## 🚀 Key Features by Feature Package

### 🏛️ Foundation (Modules 1 – 3)
- **Theme Tokens & Design System:** Unified dark-mode UI with enterprise-grade typography and responsive tokens.
- **13 Platform Objectives:** Strategic KPI dashboard tracking penetration, conversion rates, NPS, and STP issuance.
- **24 Insurance Categories Taxonomy:** Life, Health, Motor, Travel, Cyber, Marine, Crop, Pet, Home, Business, and Special Risk insurance catalog.

### 👤 Package 1: Personas, Auth & Quotes (Modules 4 – 7)
- **7-Persona Role-Based Access Control:** Customer, Advisor, Insurer Admin, Claims Surveyor, Underwriter, Compliance Officer, Super Admin.
- **Omnichannel Authentication:** Mobile OTP, Biometric, Social Login (Google/Apple), and Aadhaar eKYC.
- **Real-Time Quote Engine:** Risk scoring algorithms, No-Claim Bonus (NCB) tiering, tax 80D deduction benefit calculators.
- **Policy Comparison Matrix:** Side-by-side multi-attribute matrix comparing deductibles, copay, network hospitals, and room rent capping.

### 💳 Package 2: Proposals, Checkout & Policies (Modules 8 – 10, 13)
- **Proposal Form & 30-Minute Premium Lock:** Countdown timer freezing insurer price quotes during form completion.
- **Multi-Step Checkout & Payment Gateway:** UPI (GPay/PhonePe), Credit/Debit Cards, NetBanking, and No-Cost EMI options.
- **Instant Policy Issuance (STP):** Automatic generation and download of digitally signed IRDAI Policy Certificate PDFs.
- **Active Policy Vault:** Digital management for renewals, endorsements, nomination updates, and claim filings.

### 🏥 Package 3: Claims, OCR Vault & Support (Modules 11, 12, 14, 18)
- **8-Stage Claims Lifecycle Desk:** Cashless hospital intimation, reimbursement workflows, and surveyor geo-assignment.
- **AI Document Vault & OCR Text Inspector:** Automatic text extraction from Aadhaar, PAN, Hospital Bills, and FIR copies with AES-256 badges.
- **Omnichannel Notification Hub:** Push notifications, SMS alerts, and WhatsApp status updates.
- **24/7 AI Chat Assistant & Support Desk:** Intelligent policy FAQ bot and guaranteed 24-hour SLA ticketing desk.

### 🤖 Package 4: AI, Search, CRM & Fraud (Modules 15 – 17, 33)
- **AI Policy Matcher & Plain-English Explainer:** Explains complex policy exclusions and fine print in plain language.
- **Global Full-Text & Voice Search:** Auto-complete engine integrated with native Web Speech API for voice queries.
- **Advisor CRM Pipeline:** Lead stage tracker (Prospect → Quote → Underwriting → Closed), call logs, and commission payouts.
- **Real-Time Fraud Radar:** AI risk scoring, device fingerprinting, duplicate identity detection, and suspicious claim alerts.

### 📊 Package 5: Operations, RBAC & Funnel Analytics (Modules 19 – 21, 32)
- **Enterprise Reporting & CSV Exporter:** Multi-dimensional report generator across sales, renewals, and claims ratio.
- **Super Admin Control Center:** Insurer empanelment review, underwriting queue, and coupon discount manager.
- **Dynamic 11-Action RBAC Matrix:** Granular permissions across all 7 user personas.
- **Funnel Analytics Visualizer:** Real-time drop-off rates from Search to Quote to Purchase.

### 🌐 Package 6: Microservices, APIs & Integrations (Modules 22 – 24, 34)
- **24 Microservices Registry:** Real-time health radar, ping latency monitor, and Circuit Breaker pattern states.
- **Multi-Protocol API Console:** Interactive endpoints for REST, GraphQL, gRPC, and WebSockets with OAuth2 token inspection.
- **Mobile Offline Storage Engine:** SQLite / AsyncStorage offline sync queue for poor connectivity zones.
- **Government Integrations Hub:** DigiLocker document fetch, Central KYC (CKYC) registry lookup, and Aadhaar eKYC.

### 🔒 Package 7: Security, Compliance, Logging & Audit (Modules 26, 27, 35, 36)
- **Zero-Trust Field Encryption Vault:** AES-256 cryptographic field encryption, PII data masking, and payment tokenization.
- **India DPDP Act 2023 Consent Manager:** Granular opt-in/opt-out consent toggles with right-to-be-forgotten compliance.
- **Structured JSON System Logger:** Diagnostic log viewer filtering INFO, WARN, ERROR, and SECURITY levels with log export.
- **Cryptographic SHA-256 Immutable Audit Trail:** Tamper-proof hash-chained event timeline with before/after state diffs.

### ☁️ Package 8: Infrastructure, SLAs, Scalability & DR (Modules 25, 28 – 31)
- **Cloud-Native Kubernetes & DevOps:** Node pod distribution, Horizontal Pod Autoscaler (HPA) controls, and Istio mTLS mesh.
- **Performance SLA Console:** Live benchmark pings verifying API response (<200ms cached, <500ms normal), page render (<2s), and 99.99% uptime.
- **Scalability Load Engine:** 10M+ registered users & 500k concurrent users simulation with dynamic 1k–50k RPS load testing.
- **Disaster Recovery Simulator:** Automated cross-region failover between Mumbai (`ap-south-1`) and Singapore (`ap-southeast-1`), RPO <5m, RTO <30m.
- **Observability Hub:** Full telemetry stack (Prometheus metrics, Grafana RED dashboards, ELK log indexer, Jaeger distributed tracing).

### 🚀 Package 9: Future Innovation, NFRs & Final Audit (Modules 37 – 40)
- **Future-Ready Innovation:** On-chain Ethereum-compatible blockchain ledger verifier, IoT wearable step telematics (up to 15% discount), and vehicle OBD-II telemetry.
- **NFR Compliance & i18n Switcher:** WCAG 2.2 Level AA accessibility and live in-app translation across English, Hindi, Marathi, Tamil, and Telugu.
- **Automated E2E Acceptance Test Suite:** 7/7 automated acceptance tests validating end-to-end user journeys.
- **Release Readiness Audit:** Formal production release audit scorecard and one-click downloadable certification report.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React Native (Expo SDK 51), TypeScript (Strict mode) |
| **State Management** | Zustand (Global client state & persistent stores) |
| **Server State & Data Fetching** | TanStack Query (React Query v5), Axios |
| **Navigation** | React Navigation v6 (Native Stack) |
| **Styling & Theming** | React Native StyleSheet, Design Tokens |
| **Voice & Speech** | Web Speech API (HTML5 SpeechRecognition) |
| **Security & Cryptography** | AES-256 field encryption, SHA-256 hashing |
| **Standards & Compliance** | IRDAI Guidelines, India DPDP Act 2023, WCAG 2.2 AA |

---

## 📂 Project Directory Structure

```plaintext
PolicySphere Mobile application/
├── assets/                    # Static assets, logos, and icons
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── audit/             # SHA-256 Audit timeline components
│   │   ├── auth/              # OTP modal and login controls
│   │   ├── categories/        # 24 categories cards and taxonomy filters
│   │   ├── claims/            # 8-stage claims timeline components
│   │   ├── comparison/        # Policy comparison grid matrix
│   │   ├── compliance/        # DPDP Act 2023 consent toggles
│   │   ├── documents/         # AI OCR file upload modal
│   │   ├── fraud/             # AI risk score radar banners
│   │   ├── header/            # Enterprise header banner
│   │   ├── marketplace/       # Dynamic marketplace filter drawers
│   │   ├── microservices/     # Service health radar badges
│   │   ├── objectives/        # 13 SRS objective cards & KPIs
│   │   ├── proposal/          # 30m premium lock countdown timer
│   │   ├── quotes/            # Quote cards with NCB & tax calculations
│   │   ├── rbac/              # 11-action dynamic permission grid
│   │   ├── roles/             # 7-role persona switcher
│   │   ├── search/            # Full-text & voice search modal
│   │   └── support/           # 24/7 AI chatbot assistant modal
│   ├── constants/             # Design tokens (COLORS, TYPOGRAPHY)
│   ├── navigation/            # RootNavigator (all 40 module routes)
│   ├── screens/               # 40 Screen implementations
│   ├── services/              # API clients, mock services & utilities
│   ├── store/                 # Zustand state stores
│   ├── types/                 # Strict TypeScript interfaces
│   └── utils/                 # PDF generator & file downloaders
├── App.tsx                    # Application root entry
├── package.json               # Dependencies & build scripts
├── tsconfig.json              # TypeScript strict configuration
├── SRS.md                     # Complete Software Requirements Specification
└── progress.md                # 40-Module Development Tracking Log
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or v20.x recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AJAY989444/PolicySphere_MobileApp.git
   cd PolicySphere_MobileApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   # Launch on Web Browser
   npx expo start --web

   # Or launch on Expo Go (iOS / Android)
   npx expo start
   ```

4. **Verify TypeScript type safety:**
   ```bash
   npx tsc --noEmit
   ```

---

## 🧪 Acceptance & Quality Assurance

- **TypeScript Strict Mode:** 100% type-safe with **0 compilation errors**.
- **Automated E2E Acceptance Suite:** Built-in test runner validating all 40 modules.
- **Cross-Platform Compatibility:** Runs seamlessly on Web (Desktop/Mobile browsers), iOS, and Android.

---

## 📜 Regulatory & Compliance Standards

- **IRDAI Compliant:** Digital insurance marketplace and policy issuance guidelines.
- **India DPDP Act 2023:** Explicit consent management, purpose limitation, and PII data masking.
- **Zero-Trust Security:** AES-256 field encryption, JWT OAuth2 tokenization, and SHA-256 immutable audit trails.
- **Accessibility:** WCAG 2.2 Level AA compliance with high-contrast UI and responsive touch targets.

---

## 👤 Author & Maintainer

- **Developer:** [Ajay](https://github.com/AJAY989444)
- **Repository:** [https://github.com/AJAY989444/PolicySphere_MobileApp](https://github.com/AJAY989444/PolicySphere_MobileApp)
