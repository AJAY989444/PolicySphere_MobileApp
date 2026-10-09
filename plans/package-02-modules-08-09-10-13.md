# Implementation Plan - Package 2 (Modules 8, 9, 10 & 13)

## 1. Scope of the Package
Package 2 implements the complete proposal creation, multi-step purchase checkout, policy life-cycle vault, and payment gateway infrastructure across **Modules 8, 9, 10, and 13** of the SRS:

- **Module 8 (Proposal Management)**:
  - Proposal Creation & Drafting: Save draft proposals, resume incomplete proposals, edit medical declarations, nominee details, and address details.
  - Field validation engine: Medical declaration checks, pin-code serviceability check, and premium lock countdown timer (30-minute lock).
  - Underwriting approval status tracking (`Draft` → `Locked` → `Pending Underwriting Approval` → `Approved` → `Issued`).
- **Module 9 (Policy Purchase Workflow)**:
  - End-to-end purchase pipeline step indicator: `Search` → `Compare` → `Select` → `Proposal` → `KYC` → `Payment` → `Verification` → `Policy Issued` → `Digital Dispatch (Email / SMS / WhatsApp)` → `Dashboard`.
  - Instant digital policy issuance engine creating digital policy certificate metadata and downloadable PDF stub.
- **Module 10 (Policy Management)**:
  - Active Policies Vault: Card list displaying active, expiring, and renewed insurance policies.
  - Policy operations: Download policy certificate PDF, initiate 1-click renewal, request policy upgrade/portability, add rider, update nominee details, and view full payment history.
- **Module 13 (Payments)**:
  - Multi-channel payment gateway abstraction supporting UPI / QR code payment, Credit/Debit Cards, Net Banking, EMI, Wallets, and Auto-Debit mandates (eNACH).
  - Payment failure retry mechanism, instant refund status tracker, and transaction reconciliation receipt.

---

## 2. Screens, Components & Services to be Built

### Screens
1. `src/screens/ProposalFormScreen.tsx`: Multi-step proposal creation form (Proposer Details, Insured Members, Medical Declarations, Nominee & Communication Address).
2. `src/screens/PolicyPurchaseCheckoutScreen.tsx`: Purchase review screen showing itemized premium breakdown, 30-minute premium lock timer, eKYC summary, and payment CTA.
3. `src/screens/PolicyIssuanceSuccessScreen.tsx`: Policy issuance celebration screen with instant certificate download, policy number alert, and multi-channel dispatch feedback (Email, SMS, WhatsApp).
4. `src/screens/PolicyManagementScreen.tsx`: Active Policy Vault screen showing policy details, renewal countdown, endorsement requests, rider additions, and payment history log.

### Components
- `src/components/proposal/PremiumLockTimer.tsx`: Active 30-minute countdown timer displaying premium lock guarantee.
- `src/components/proposal/PurchaseWorkflowSteps.tsx`: Visual multi-step progress bar highlighting the active purchase stage.
- `src/components/payments/PaymentGatewayModal.tsx`: Comprehensive payment selector supporting UPI ID/QR, Credit/Debit Card input, NetBanking bank list, Wallets, EMI options, and Auto-Debit setup.
- `src/components/policies/ActivePolicyCard.tsx`: Rich policy card with download certificate action, renewal alert badge, and quick endorsement actions.

### Services & Store
- `src/services/proposalService.ts`: Service managing proposal draft creation, validation, and premium locking.
- `src/services/paymentService.ts`: Payment processing engine handling UPI, Card, NetBanking transactions, retries, and refunds.
- `src/services/policyService.ts`: Active policy vault provider managing policy downloads, renewals, and endorsements.
- `src/store/useProposalStore.ts`: Zustand store for proposal form state, draft recovery, and premium lock status.
- `src/store/usePolicyStore.ts`: Zustand store for active policies list, selected policy details, and payment transaction history.

---

## 3. Data Models (`src/types/package2.ts`)
```typescript
export type ProposalStatus = 'Draft' | 'Locked' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Issued';

export interface ProposalDetails {
  proposalId: string;
  quoteId: string;
  insurerName: string;
  planName: string;
  categoryName: string;
  sumInsured: number;
  annualPremium: number;
  lockExpiryTimestamp: number; // 30 min lock
  proposer: {
    fullName: string;
    dob: string;
    gender: string;
    email: string;
    mobile: string;
    panNumber: string;
    addressLine1: string;
    pincode: string;
    city: string;
    state: string;
  };
  medicalDeclaration: {
    hasPreExistingCondition: boolean;
    conditionDetails: string;
    isSmoker: boolean;
  };
  nominee: {
    fullName: string;
    relationship: string;
    age: number;
  };
  status: ProposalStatus;
}

export type PaymentMethod = 'UPI' | 'CreditCard' | 'DebitCard' | 'NetBanking' | 'Wallet' | 'EMI' | 'AutoDebit';

export interface PaymentTransaction {
  txnId: string;
  proposalId: string;
  amount: number;
  method: PaymentMethod;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  timestamp: string;
  gatewayRef: string;
}

export interface IssuedPolicy {
  policyNumber: string;
  proposalId: string;
  insurerName: string;
  insurerLogo: string;
  categoryName: string;
  planName: string;
  sumInsured: number;
  annualPremium: number;
  policyStartDate: string;
  policyExpiryDate: string;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'LAPSED' | 'CANCELLED';
  certificatePdfUrl: string;
  nomineeName: string;
  dispatchChannels: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  paymentHistory: PaymentTransaction[];
}
```

---

## 4. Folder & File Structure Changes
```text
src/
├── types/
│   └── package2.ts
├── services/
│   ├── proposalService.ts
│   ├── paymentService.ts
│   └── policyService.ts
├── store/
│   ├── useProposalStore.ts
│   └── usePolicyStore.ts
├── components/
│   ├── proposal/
│   │   ├── PremiumLockTimer.tsx
│   │   └── PurchaseWorkflowSteps.tsx
│   ├── payments/
│   │   └── PaymentGatewayModal.tsx
│   └── policies/
│       └── ActivePolicyCard.tsx
├── screens/
│   ├── ProposalFormScreen.tsx
│   ├── PolicyPurchaseCheckoutScreen.tsx
│   ├── PolicyIssuanceSuccessScreen.tsx
│   └── PolicyManagementScreen.tsx
└── navigation/
    └── RootNavigator.tsx (updated with Proposal, Checkout, IssuanceSuccess & PolicyManagement routes)
```

---

## 5. Explicitly Out of Scope for Package 2
- Claims initiation & surveyor assignment (Module 11 - Package 3).
- Full OCR document scan AI processing (Module 12 - Package 3).
- Advisor lead assignment CRM pipeline (Module 17 - Package 4).

---

## 6. Verification Plan
- `npx tsc --noEmit` clean type check.
- Navigate from `ComparisonScreen` -> `ProposalFormScreen`. Fill proposal fields, verify validation, and save draft.
- Launch `PolicyPurchaseCheckoutScreen`, observe 30-minute premium lock timer counting down.
- Tap "Proceed to Payment", test Payment Gateway modal (select UPI / Credit Card / NetBanking / EMI), trigger simulated transaction success.
- Observe `PolicyIssuanceSuccessScreen` rendering digital policy certificate number, dispatch alerts (Email/SMS/WhatsApp), and instant PDF download button.
- Navigate to `PolicyManagementScreen` (Active Policies Vault) and test policy PDF download, renewal trigger, and payment history receipt.
