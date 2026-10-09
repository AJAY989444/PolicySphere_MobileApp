# Implementation Plan - Package 1 (Modules 4, 5, 6 & 7)

## 1. Scope of the Package
Package 1 implements the complete User Persona management, Authentication & Profile system, Dynamic Quote Engine, and Policy Comparison Engine spanning **Modules 4, 5, 6, and 7** of the SRS:

- **Module 4 (User Roles)**:
  - Supports all 7 SRS user roles: *Customer*, *Insurance Advisor*, *Insurance Company*, *Corporate Customer*, *Super Admin*, *Operations Team*, *Customer Support*.
  - Persona Context Switcher (`RoleContext.tsx`) & dynamic RBAC bottom/top navigation tailored per persona.
- **Module 5 (Functional Modules - Authentication, Customer Profile & Marketplace)**:
  - *Authentication*: Mobile OTP login, Email login, Social login (Google, Apple, Facebook), Aadhaar & PAN verification stubs, Biometric login toggle, MFA, and Device Fingerprint token storage.
  - *Customer Profile*: Comprehensive multi-section profile manager (Personal Details, Family Members, Medical History, Occupation, Income, Existing Policies, KYC Documents, Nominee Management, Communication Preferences).
  - *Marketplace & Filters*: Multi-attribute filter engine (Premium range, Coverage, Waiting Period, Cashless Hospitals, Claim Ratio, Insurer Rating, Add-ons, Deductibles, Co-payment, Room Rent Limit).
- **Module 6 (Quote Engine)**:
  - Real-time premium calculation rule engine considering Age, Gender, Pincode, Occupation, Vehicle details (for Motor/Bike), Medical history risk score, Sum Assured, Add-ons, Previous Claims, and No Claim Bonus (NCB).
  - Instant quote generation with breakdown of Base Premium, Rider Add-ons, Taxes (18% GST), and Net Payable.
- **Module 7 (Policy Comparison Engine)**:
  - Side-by-side comparison matrix for up to 4 selected insurance products.
  - Attribute comparison across Premium, Sum Insured, Exclusions, Waiting Periods, Network Hospitals, CSR (Claim Settlement Ratio), Solvency Ratio, Benefits, and Tax Deductions.

---

## 2. Screens, Components & Services to be Built

### Screens
1. `src/screens/AuthScreen.tsx`: Tabbed login/registration screen supporting Mobile OTP, Email, Social Login, Biometric toggle, and Aadhaar/PAN instant verification modal.
2. `src/screens/CustomerProfileScreen.tsx`: Complete profile management screen with nominee list, family members, medical history, and KYC document status.
3. `src/screens/MarketplaceScreen.tsx`: Product search and interactive filtering screen with multi-facet sliders and filter drawers.
4. `src/screens/QuoteEngineScreen.tsx`: Interactive quote calculator wizard collecting risk parameters and rendering live quotes from 10+ mock insurer APIs.
5. `src/screens/ComparisonScreen.tsx`: Sticky side-by-side comparison matrix table with attribute difference highlighting.

### Components
- `src/components/roles/PersonaSwitcher.tsx`: Header role switcher dropdown allowing switching between Customer, Advisor, Insurer, Corporate, Admin, Ops, and Support views.
- `src/components/auth/OTPInputModal.tsx`: Verification modal for Mobile OTP and eKYC.
- `src/components/marketplace/MarketplaceFilterDrawer.tsx`: Filter panel supporting 12+ SRS filter attributes (Room Rent Limit, Co-pay, CSR, etc.).
- `src/components/quotes/QuoteCard.tsx`: Instant quote card showing base premium, GST, NCB discount badge, and "Compare" checkbox.
- `src/components/comparison/ComparisonMatrixTable.tsx`: Scrollable side-by-side comparison table highlighting differences in green/red.

### Services & Store
- `src/services/authService.ts`: Authentication API stub for OTP generation, Social JWT tokens, and Aadhaar/PAN eKYC lookup.
- `src/services/quoteService.ts`: Premium calculation engine with rule-based risk scoring algorithms.
- `src/services/comparisonService.ts`: Policy comparison data provider and feature matrix generator.
- `src/store/useAuthStore.ts`: Zustand store for active session, persona role, and KYC status.
- `src/store/useQuoteStore.ts`: Zustand store for active quote inputs, generated quotes list, and selected comparison items.

---

## 3. Data Models (`src/types/package1.ts`)
```typescript
export type UserRole =
  | 'Customer'
  | 'Insurance Advisor'
  | 'Insurance Company'
  | 'Corporate Customer'
  | 'Super Admin'
  | 'Operations Team'
  | 'Customer Support';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  isKycVerified: boolean;
  aadhaarNumber?: string;
  panNumber?: string;
  nominees: Array<{ name: string; relation: string; sharePercentage: number }>;
  familyMembers: Array<{ name: string; relation: string; age: number }>;
}

export interface QuoteInputParameters {
  categoryId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  pincode: string;
  sumInsured: number;
  tobaccoUser: boolean;
  existingConditions: string[];
  vehicleDetails?: { make: string; model: string; year: number; ncbPercentage: number };
  selectedAddOns: string[];
}

export interface CalculatedQuote {
  id: string;
  insurerId: string;
  insurerName: string;
  insurerLogo: string;
  planName: string;
  claimSettlementRatio: number; // e.g. 98.5%
  solvencyRatio: number; // e.g. 2.1
  cashlessHospitalsCount: number;
  basePremium: number;
  addOnsCost: number;
  ncbDiscount: number;
  gstAmount: number;
  finalPremium: number;
  roomRentLimit: string;
  copayPercentage: number;
  waitingPeriodMonths: number;
}
```

---

## 4. Folder & File Structure Changes
```text
src/
├── types/
│   └── package1.ts
├── services/
│   ├── authService.ts
│   ├── quoteService.ts
│   └── comparisonService.ts
├── store/
│   ├── useAuthStore.ts
│   └── useQuoteStore.ts
├── components/
│   ├── roles/
│   │   └── PersonaSwitcher.tsx
│   ├── auth/
│   │   └── OTPInputModal.tsx
│   ├── marketplace/
│   │   └── MarketplaceFilterDrawer.tsx
│   ├── quotes/
│   │   └── QuoteCard.tsx
│   └── comparison/
│       └── ComparisonMatrixTable.tsx
├── screens/
│   ├── AuthScreen.tsx
│   ├── CustomerProfileScreen.tsx
│   ├── MarketplaceScreen.tsx
│   ├── QuoteEngineScreen.tsx
│   └── ComparisonScreen.tsx
└── navigation/
    └── RootNavigator.tsx (updated with Auth, Profile, Marketplace, Quote & Comparison routes)
```

---

## 5. Explicitly Out of Scope for Package 1
- Proposal drafting & policy document upload (Module 8 - Package 2).
- Payment gateway checkout processing (Module 13 - Package 2).
- Real-time claim filing workflow (Module 11 - Package 3).

---

## 6. Verification Plan
- `npx tsc --noEmit` clean type check.
- Switch personas via top `PersonaSwitcher` dropdown and verify role-tailored dashboard options.
- Complete Auth login flow via Mobile OTP / Social stub.
- Navigate to Marketplace, apply filters (e.g. CSR >95%, Cashless Hospitals, Zero Co-pay), and generate dynamic quotes in `QuoteEngineScreen`.
- Select 2 or 3 quote cards and launch `ComparisonScreen` to verify side-by-side comparison grid rendering.
