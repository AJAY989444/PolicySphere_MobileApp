# Package 4 Implementation Plan: Modules 15, 16, 17 & 33

**Package 4 Target Modules:**
- **Module 15:** AI Engine (Personalized Recommendations, Premium Prediction, Claim Probability & Plain-English Explainer)
- **Module 16:** Global Search Engine (Full-text search, Auto-complete, Typo Tolerance, Voice Search)
- **Module 17:** Advisor CRM & Lead Pipeline (Lead capture, Assignment, Call logs, Conversion tracking, Commission)
- **Module 33:** Enterprise Fraud Detection (AI Risk Scoring, Device Fingerprinting, Velocity Checks, Duplicate Identity)

---

## 1. Architectural Design & File Structure

```
src/
├── types/
│   └── package4.ts               # Core interfaces for AI, Search, CRM, Fraud Detection
├── services/
│   ├── aiEngineService.ts        # AI recommendations, risk scoring, premium predictor & policy explainer
│   ├── searchService.ts          # Full-text search engine with auto-complete & typo tolerance
│   ├── crmService.ts             # Advisor lead pipeline, activity logs & commission calculator
│   └── fraudDetectionService.ts  # Device fingerprinting, velocity checks & risk evaluation
├── store/
│   ├── useAIStore.ts             # State for recommendations, AI risk scores & chat insights
│   ├── useSearchStore.ts         # State for global search queries, history & suggestions
│   ├── useCRMStore.ts            # State for advisor leads, interaction logs & metrics
│   └── useFraudStore.ts          # State for fraud alerts, risk scores & security logs
├── components/
│   ├── ai/
│   │   ├── AIRecommendationCard.tsx  # Card showing AI match score % and rationale
│   │   └── AIPredictiveRiskBadge.tsx # Visual indicator for claim probability & risk rating
│   ├── search/
│   │   └── GlobalSearchModal.tsx     # Fullscreen overlay search with auto-complete & voice mic
│   ├── crm/
│   │   └── LeadStatusBadge.tsx       # Lead pipeline stage indicator (New, Contacted, Proposal, Converted)
│   └── fraud/
│       └── FraudAlertBanner.tsx      # Risk alert flag for high-velocity or suspicious KYC
├── screens/
│   ├── AIRecommendationScreen.tsx    # Module 15: AI-Driven Policy Matcher & Risk Predictor
│   ├── GlobalSearchScreen.tsx        # Module 16: Full-Text & Voice Search Hub
│   ├── AdvisorCRMScreen.tsx          # Module 17: Advisor Lead Management & Pipeline
│   └── FraudDetectionScreen.tsx      # Module 33: Enterprise Fraud Audit & Risk Radar
```

---

## 2. Detailed Technical Plan

### Module 15: AI Engine (`AIRecommendationScreen.tsx`, `aiEngineService.ts`)
- **AI Recommendation Algorithm:** Calculates % match score based on user age, budget, family size, pre-existing conditions, and risk tolerance.
- **Claim Probability Estimator:** Predicts claim likelihood and estimated approval rate using historical TPA data.
- **Plain-English Policy Explainer:** Generates AI summaries explaining fine print, co-payments, and exclusions in 3 bullet points.

### Module 16: Global Search Engine (`GlobalSearchScreen.tsx`, `searchService.ts`)
- **Full-Text Indexing:** Searches across all 24 insurance categories, 12,500+ network hospitals, active policies, and KB articles.
- **Auto-Complete & Typo Tolerance:** Matches terms like "helth", "carinsuranc", "apollo hospital", "80d".
- **Voice Search Simulation:** Speech-to-text mic trigger with simulated voice recognition input.

### Module 17: Advisor CRM (`AdvisorCRMScreen.tsx`, `crmService.ts`)
- **Lead Pipeline Kanban/List:** Stages: *New Lead*, *Requirement Analysis*, *Quote Sent*, *Underwriting*, *Converted*, *Lost*.
- **Advisor Activity Logs:** Record calls, meetings, follow-ups, and notes for each prospect.
- **Commission & Sales Dashboard:** Calculates estimated earnings, target progress, and conversion ratios.

### Module 33: Enterprise Fraud Detection (`FraudDetectionScreen.tsx`, `fraudDetectionService.ts`)
- **Real-Time Risk Scoring:** Analyzes submission IP, velocity, device hash, and document integrity (Low Risk: 0-20, Medium: 21-60, High: 61-100).
- **Fraud Checks:** Duplicate identity detection, fake document verification, multiple claim velocity flags, and geo-risk anomalies.
- **Operations Audit View:** Allows Operations Team persona to flag, freeze, or approve high-risk proposals.

---

## 3. Navigation & Screen Integration
- Update `src/navigation/RootNavigator.tsx` to register `AIRecommendation`, `GlobalSearch`, `AdvisorCRM`, and `FraudDetection`.
- Add quick access launchers on `MarketplaceScreen.tsx` and header search bar.

---

## 4. Verification Gate & Approval
- Run `npx tsc --noEmit` to ensure zero compilation errors.
- Update `progress.md` status to `IMPLEMENTED` for Modules 15, 16, 17 & 33.
- Provide step-by-step manual testing guidance for Package 4.
