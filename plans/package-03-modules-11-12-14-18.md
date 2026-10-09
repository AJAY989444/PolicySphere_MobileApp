# Implementation Plan - Package 3 (Modules 11, 12, 14 & 18)

## 1. Scope of the Package
Package 3 implements the end-to-end Claims Assistance engine, Document Vault with AI/OCR capabilities, Multi-Channel Notification Hub, and Support Center with AI Chatbot across **Modules 11, 12, 14, and 18** of the SRS:

- **Module 11 (Claims Management)**:
  - Supports 5 claim types: *Cashless*, *Reimbursement*, *Vehicle Claims*, *Travel Claims*, *Property Claims*.
  - Full claim lifecycle timeline: `Create Claim` → `Upload Documents` → `Verification` → `Surveyor` → `Approval` → `Settlement` → `Payment` → `Closure`.
  - Cashless hospital network finder & surveyor assignment status.
- **Module 12 (Document Management)**:
  - Supported file types: PDF, JPG, PNG, DOCX.
  - Document categories: Aadhaar, PAN, Passport, Driving License, RC, Medical Reports, Hospital Bills, Death Certificate, FIR, Claim Forms.
  - Features: OCR text extraction, AI document authenticity validation (fake document check stub), virus scanning status, document versioning, and AES-256 encrypted vault.
- **Module 14 (Notification System)**:
  - Multi-channel notification hub: In-App Notifications, Push Notifications, SMS, WhatsApp, and Email.
  - Notification event categories: OTP, Purchase, Renewal, Claim Update, Payment Success, and Reminder alerts.
  - Interactive unread badge counter, notification drawer, and channel preferences toggle.
- **Module 18 (Support Center)**:
  - Multi-channel support: AI Live Chat Assistant, WhatsApp chat link, Voice call request, Email support, and Ticket management.
  - Features: Ticket SLA tracker, auto-escalation matrix, searchable Knowledge Base (FAQ articles), and AI support assistant.

---

## 2. Screens, Components & Services to be Built

### Screens
1. `src/screens/ClaimsManagementScreen.tsx`: Claims dashboard showing active claims timeline, cashless hospital locator, and claim intimation wizard.
2. `src/screens/DocumentVaultScreen.tsx`: Document manager allowing file upload simulation, OCR text preview, virus scan status, and encrypted file download.
3. `src/screens/NotificationCenterScreen.tsx`: Notification feed with channel filter tabs (All, Claims, Payments, Renewals) and notification settings.
4. `src/screens/SupportCenterScreen.tsx`: Support hub with AI live chat modal, ticket creation form, ticket SLA tracker, and searchable Knowledge Base FAQs.

### Components
- `src/components/claims/ClaimTimelineProgress.tsx`: Visual 8-stage claims progress indicator showing surveyor details and payout status.
- `src/components/documents/DocumentUploadModal.tsx`: Upload modal featuring file type selection, OCR extraction preview, and AI authenticity scan badge.
- `src/components/notifications/NotificationBadge.tsx`: Header notification bell icon with unread count badge.
- `src/components/support/AIChatAssistantModal.tsx`: Live chatbot drawer answering insurance questions and logging support tickets.

### Services & Store
- `src/services/claimsService.ts`: Service managing claim intimation, surveyor logs, and claim settlement history.
- `src/services/documentService.ts`: Service managing document uploads, OCR text extraction, and virus scanning.
- `src/services/notificationService.ts`: Notification feed service managing event logs and channel delivery.
- `src/services/supportService.ts`: Support ticket and Knowledge Base FAQ provider.
- `src/store/useClaimsStore.ts`: Zustand store for active claims and claim draft state.
- `src/store/useDocumentStore.ts`: Zustand store for uploaded vault documents.
- `src/store/useNotificationStore.ts`: Zustand store for unread notifications and delivery preferences.

---

## 3. Data Models (`src/types/package3.ts`)
```typescript
export type ClaimType = 'Cashless' | 'Reimbursement' | 'Vehicle' | 'Travel' | 'Property';
export type ClaimStage = 'Intimated' | 'Documents Uploaded' | 'Under Verification' | 'Surveyor Assigned' | 'Approved' | 'Settled' | 'Closed';

export interface InsuranceClaim {
  claimId: string;
  policyNumber: string;
  categoryName: string;
  claimType: ClaimType;
  incidentDate: string;
  claimedAmount: number;
  approvedAmount?: number;
  currentStage: ClaimStage;
  surveyorName?: string;
  surveyorMobile?: string;
  hospitalName?: string;
  uploadedDocumentIds: string[];
  timeline: Array<{ stage: ClaimStage; timestamp: string; note: string }>;
}

export interface VaultDocument {
  id: string;
  documentName: string;
  documentType: 'Aadhaar' | 'PAN' | 'Passport' | 'DL' | 'RC' | 'MedicalReport' | 'Bill' | 'DeathCert' | 'FIR' | 'ClaimForm';
  fileFormat: 'PDF' | 'JPG' | 'PNG' | 'DOCX';
  fileSize: string;
  uploadDate: string;
  version: number;
  isVirusScanned: boolean;
  isAiVerified: boolean;
  ocrExtractedText: string;
  encryptionStatus: 'AES-256 Encrypted';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  channel: 'InApp' | 'Push' | 'SMS' | 'WhatsApp' | 'Email';
  eventCategory: 'OTP' | 'Purchase' | 'Renewal' | 'Claim' | 'Payment' | 'Reminder';
  timestamp: string;
  isRead: boolean;
}

export interface SupportTicket {
  ticketId: string;
  subject: string;
  category: 'Claim Query' | 'Policy Endorsement' | 'Payment Failure' | 'General';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  slaHoursRemaining: number;
  createdDate: string;
  messages: Array<{ sender: 'Customer' | 'Support Agent' | 'AI Assistant'; text: string; timestamp: string }>;
}
```

---

## 4. Folder & File Structure Changes
```text
src/
├── types/
│   └── package3.ts
├── services/
│   ├── claimsService.ts
│   ├── documentService.ts
│   ├── notificationService.ts
│   └── supportService.ts
├── store/
│   ├── useClaimsStore.ts
│   ├── useDocumentStore.ts
│   └── useNotificationStore.ts
├── components/
│   ├── claims/
│   │   └── ClaimTimelineProgress.tsx
│   ├── documents/
│   │   └── DocumentUploadModal.tsx
│   ├── notifications/
│   │   └── NotificationBadge.tsx
│   └── support/
│       └── AIChatAssistantModal.tsx
├── screens/
│   ├── ClaimsManagementScreen.tsx
│   ├── DocumentVaultScreen.tsx
│   ├── NotificationCenterScreen.tsx
│   └── SupportCenterScreen.tsx
└── navigation/
    └── RootNavigator.tsx (updated with Claims, Vault, Notifications & Support routes)
```

---

## 5. Explicitly Out of Scope for Package 3
- Full AI recommendation persona model (Module 15 - Package 4).
- ElasticSearch auto-complete engine (Module 16 - Package 4).
- Fraud risk scoring algorithms (Module 33 - Package 4).

---

## 6. Verification Plan
- `npx tsc --noEmit` clean type check.
- Navigate to `ClaimsManagementScreen`. Initiate a new cashless claim, observe surveyor assignment, and track the 8-stage claim timeline.
- Navigate to `DocumentVaultScreen`. Upload a sample Medical Bill document, view simulated AI OCR text extraction (`Hospital Bill #1029, Amount: ₹45,000`), and check AES-256 encryption status.
- Open `NotificationCenterScreen`. View delivery logs across In-App, Push, SMS, WhatsApp, and Email.
- Open `SupportCenterScreen`. Launch `AIChatAssistantModal`, type a question, get AI responses, and log a support ticket with SLA tracking.
