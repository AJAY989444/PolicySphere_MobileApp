# Implementation Plan - Module 2: Platform Objectives & System Goals Alignment

## 1. Scope of the Module
Module 2 operationalizes the 13 core business and technical objectives specified in SRS Section 2 into a core system objectives model, state tracker, and interactive dashboard screen.
It covers:
- Modeling the 13 platform objectives (Insurance Aggregation, Digital Issuance, Premium Comparison, Quote Generation, AI Recommendations, Online Claims, Renewals, Customer Self-Service, Partner Onboarding, Agent Management, Enterprise Reporting, Fraud Detection, High Availability).
- Creating `ObjectivesDashboardScreen`: An interactive mobile overview displaying platform goals, target SLAs/KPIs, linked microservices, and live mock health status.
- Interactive `ObjectiveDetailModal`: Modal drawer providing detailed breakdown, target user personas, target SLAs, and sub-capabilities for any selected objective.
- `objectivesService.ts`: Mock API client endpoint returning system objectives metadata and target metrics.
- `useObjectivesStore.ts`: Zustand store managing objective filtering, search, and health status tracking.
- Navigation integration: Linking WelcomeScreen to ObjectivesDashboardScreen via RootNavigator.

---

## 2. Screens, Components & Services to be Built
- **Screens**:
  - `src/screens/ObjectivesDashboardScreen.tsx`: Responsive grid/list view displaying all 13 SRS objectives categorized into Customer, Advisor, Insurer, and Enterprise domains, complete with search bar and filter pills.
- **Components**:
  - `src/components/objectives/ObjectiveCard.tsx`: Card component displaying objective icon, name, category badge, target KPI/SLA, and status indicator.
  - `src/components/objectives/ObjectiveDetailModal.tsx`: Detailed view modal showing objective metrics, associated microservices (e.g. Quote Service for Quote Generation), and functional sub-goals.
  - `src/components/objectives/KPIStatSummary.tsx`: Summary header component showing overall platform metrics (e.g., 99.99% Availability, <5s SLA, 13 Objectives Active).
- **Services & Store**:
  - `src/services/objectivesService.ts`: API service fetching objective definitions and runtime metrics.
  - `src/store/useObjectivesStore.ts`: Zustand store for objective filtering, category selection, and detail modal state.
  - `src/types/objectives.ts`: TypeScript interfaces for `PlatformObjective`, `ObjectiveCategory`, `SLAParameter`, and `ObjectiveFilterState`.

---

## 3. Data Models (`src/types/objectives.ts`)
```typescript
export type ObjectiveCategory = 'Core Aggregation' | 'AI & Automation' | 'Customer Experience' | 'Operations & Enterprise';

export interface SLAParameter {
  metricName: string;
  targetValue: string;
  currentStatus: 'Optimal' | 'Degraded' | 'Pending';
}

export interface PlatformObjective {
  id: string;
  code: string;
  name: string;
  description: string;
  category: ObjectiveCategory;
  sla: SLAParameter;
  targetRoles: string[];
  associatedMicroservices: string[];
  featuresList: string[];
  iconName: string;
}
```

---

## 4. Folder & File Structure Changes
```text
src/
├── types/
│   └── objectives.ts
├── services/
│   └── objectivesService.ts
├── store/
│   └── useObjectivesStore.ts
├── components/
│   └── objectives/
│       ├── ObjectiveCard.tsx
│       ├── ObjectiveDetailModal.tsx
│       └── KPIStatSummary.tsx
├── screens/
│   └── ObjectivesDashboardScreen.tsx
└── navigation/
    └── RootNavigator.tsx (updated with Objectives route)
```

---

## 5. Dependencies to Add
- None required (uses existing React Native, Zustand, TanStack Query, and React Navigation stack built in Module 1).

---

## 6. Assumptions & Risks
- **Assumptions**: Objectives data is served locally via `objectivesService.ts` mock provider conforming to future microservice gateway schemas.
- **Risks**: Screen complexity on smaller mobile viewports; mitigated by scrollable responsive card layout.

---

## 7. Integration with Earlier Modules
- Integrates seamlessly with Module 1 `AppContainer`, design tokens (`COLORS`, `TYPOGRAPHY`), `HeaderBanner`, and `RootNavigator`.

---

## 8. Explicitly Out of Scope for Module 8
- Actual policy comparison logic (Module 7).
- Live payment integration (Module 13).
- Real-time claim filing backend execution (Module 11).

---

## 9. Verification Plan
- `npx tsc --noEmit` clean type check.
- Navigate from `WelcomeScreen` to `ObjectivesDashboardScreen`.
- Filter 13 objectives by category pills and search keyword.
- Tap an objective card to open `ObjectiveDetailModal` and verify SLA/microservice details render accurately.
