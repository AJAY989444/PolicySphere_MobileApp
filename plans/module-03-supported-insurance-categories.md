# Implementation Plan - Module 3: Supported Insurance Categories

## 1. Scope of the Module
Module 3 establishes the complete product taxonomy and catalog system for all **24 insurance categories** specified in SRS Section 3:
1. Health Insurance
2. Family Floater
3. Senior Citizen
4. Critical Illness
5. Term Life
6. Whole Life
7. ULIP
8. Child Plans
9. Retirement Plans
10. Motor Insurance
11. Bike Insurance
12. Commercial Vehicle
13. Travel Insurance
14. Home Insurance
15. Property Insurance
16. Fire Insurance
17. Marine Insurance
18. Cyber Insurance
19. Pet Insurance
20. Business Insurance
21. Professional Liability
22. Group Insurance
23. Employee Health Plans
24. Device Insurance

It covers:
- Structuring all 24 categories across 5 macro insurance domains (*Health & Wellness, Life & Wealth, Motor & Mobility, Property & Specialty, Business & Corporate*).
- Complete category metadata model: unique ID, code, title, icon/emoji, description, macro domain, key benefits, coverage range, tax deductions (e.g. 80D/80C), sample quote parameters, and active insurer count.
- `CategoriesCatalogScreen`: Responsive category hub featuring search, macro domain filter tabs, bookmarking, and category cards.
- `CategoryDetailModal`: Detailed modal highlighting key features, sample coverage options, required underwriting inputs, and quick quote trigger CTA.
- `categoriesService.ts` & `useCategoriesStore.ts`: Local data service and Zustand state store managing search, filtering, and bookmarks.
- Navigation integration: Linking `ObjectivesDashboardScreen` and `WelcomeScreen` to `CategoriesCatalogScreen`.

---

## 2. Screens, Components & Services to be Built
- **Screens**:
  - `src/screens/CategoriesCatalogScreen.tsx`: Grid/list view displaying all 24 insurance categories organized by macro domain tabs, keyword search bar, and bookmark toggle.
- **Components**:
  - `src/components/categories/CategoryCard.tsx`: Product card with domain color coding, icon, title, coverage range, tax benefit tag, and bookmark action button.
  - `src/components/categories/CategoryDetailModal.tsx`: Comprehensive modal presenting category overview, underwriting parameters, tax benefits, and sample insurer count.
  - `src/components/categories/DomainFilterBar.tsx`: Horizontal domain selector pills.
- **Services & Store**:
  - `src/services/categoriesService.ts`: Data service providing full 24-category taxonomy metadata.
  - `src/store/useCategoriesStore.ts`: Zustand store for active macro domain, search term, bookmarked category IDs, and detail modal state.
  - `src/types/categories.ts`: TypeScript interfaces for `InsuranceCategory`, `MacroDomain`, `CategoryDetail`, and `CategoryFilterState`.

---

## 3. Data Models (`src/types/categories.ts`)
```typescript
export type MacroDomain =
  | 'All'
  | 'Health & Wellness'
  | 'Life & Wealth'
  | 'Motor & Mobility'
  | 'Property & Specialty'
  | 'Business & Corporate';

export interface InsuranceCategory {
  id: string;
  code: string;
  name: string;
  domain: Exclude<MacroDomain, 'All'>;
  description: string;
  iconSymbol: string;
  coverageRange: string;
  taxBenefit?: string; // e.g., 'Section 80D', 'Section 80C'
  activeInsurersCount: number;
  popularAddOns: string[];
  requiredQuoteFields: string[];
  keyBenefits: string[];
}
```

---

## 4. Folder & File Structure Changes
```text
src/
├── types/
│   └── categories.ts
├── services/
│   └── categoriesService.ts
├── store/
│   └── useCategoriesStore.ts
├── components/
│   └── categories/
│       ├── CategoryCard.tsx
│       ├── CategoryDetailModal.tsx
│       └── DomainFilterBar.tsx
├── screens/
│   └── CategoriesCatalogScreen.tsx
└── navigation/
    └── RootNavigator.tsx (updated with Categories route)
```

---

## 5. Dependencies to Add
- None required (uses existing React Native, Zustand, TanStack Query, and React Navigation stack).

---

## 6. Assumptions & Risks
- **Assumptions**: Taxonomy data is mock-served via `categoriesService.ts` representing future product catalog microservice endpoints.
- **Risks**: Viewport density with 24 categories on smaller mobile screens; mitigated by responsive grid layout and macro domain filtering.

---

## 7. Integration with Earlier Modules
- Uses Module 1 design tokens, `HeaderBanner`, `AppContainer`, and error boundaries.
- Links from Module 2 `ObjectivesDashboardScreen` (OBJ-AGG card) and `WelcomeScreen`.

---

## 8. Explicitly Out of Scope for Module 3
- Live quote calculation algorithm (Module 6).
- Policy comparison matrix rendering (Module 7).
- Proposal creation and KYC form submission (Modules 5, 8).

---

## 9. Verification Plan
- `npx tsc --noEmit` clean type check.
- Navigate to `CategoriesCatalogScreen`.
- Filter all 24 categories by macro domain tabs (*Health & Wellness, Life & Wealth, Motor & Mobility, Property & Specialty, Business & Corporate*).
- Search categories by name or keyword (e.g., "Cyber", "Floater", "Marine").
- Toggle bookmark on category cards.
- Tap a category card to open `CategoryDetailModal` and verify underwriting inputs and key benefits display accurately.
