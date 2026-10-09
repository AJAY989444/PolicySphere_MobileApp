# Package 7 Implementation Plan: Modules 26, 27, 35 & 36

**Package 7 Target Modules:**
- **Module 26:** Enterprise Security (TLS 1.3, AES-256 data encryption at rest, JWT/OAuth2 token manager, Data Masking & Tokenization)
- **Module 27:** Regulatory Compliance (IRDAI digital insurance guidelines, DPDP Act 2023 consent manager, PCI DSS, ISO 27001 & KYC/AML compliance)
- **Module 35:** Client System Logging (Structured JSON logging engine, log severity levels INFO/WARN/ERROR/SECURITY, log buffer & exporter)
- **Module 36:** Immutable Audit Trail (Tamper-proof event audit log, user activity timeline, IP/Persona tracking & compliance export)

---

## 1. Architectural Design & File Structure

```
src/
├── types/
│   └── package7.ts               # Interfaces for Security, Compliance, Logging & Audit Trail
├── services/
│   ├── securityService.ts        # AES-256 field encryption/decryption, data masking & tokenization engine
│   ├── complianceService.ts      # DPDP consent manager, IRDAI compliance checklist & KYC/AML rules
│   ├── loggingService.ts         # Structured JSON logger, log levels (INFO/WARN/ERROR/SECURITY) & log buffer
│   └── auditTrailService.ts      # Immutable client event logger, audit trail log viewer & audit exporter
├── store/
│   ├── useSecurityStore.ts       # State for encryption keys, token hygiene & security flags
│   ├── useComplianceStore.ts     # State for DPDP consent toggles, IRDAI compliance score & audit readiness
│   ├── useLoggingStore.ts        # State for active system logs & level filters
│   └── useAuditStore.ts          # State for immutable audit trail events & user action timeline
├── components/
│   ├── security/
│   │   └── DataMaskingPreviewCard.tsx # Visual demonstration of unmasked vs AES-256 masked fields
│   ├── compliance/
│   │   └── DPDPConsentToggle.tsx     # DPDP Act consent management toggle switch
│   ├── logging/
│   │   └── StructuredLogViewer.tsx   # Developer log console with JSON viewer & severity chips
│   └── audit/
│       └── AuditTimelineItem.tsx     # Tamper-proof audit entry with cryptographic hash badge
├── screens/
│   ├── SecurityVaultScreen.tsx       # Module 26: Enterprise Security & Data Encryption Vault
│   ├── CompliancePortalScreen.tsx    # Module 27: IRDAI & DPDP Act Compliance Portal
│   ├── SystemLoggingScreen.tsx       # Module 35: System Logging & Telemetry Console
│   └── AuditTrailScreen.tsx          # Module 36: Immutable Audit Trail & Activity Timeline
```

---

## 2. Technical Implementation Details

### Module 26: Enterprise Security (`SecurityVaultScreen.tsx`, `securityService.ts`)
- **AES-256 Field Encryption:** Encrypts sensitive fields (Aadhaar, PAN, Bank Account #, Credit Card CVV).
- **Data Masking Engine:** Masks personal info (e.g., `XXXX-XXXX-4812`, `a***y@example.com`).
- **Tokenization & JWT Hygiene:** Tokenizes card/payment instruments and manages JWT token expiry refresh loops.

### Module 27: Regulatory Compliance (`CompliancePortalScreen.tsx`, `complianceService.ts`)
- **DPDP Act 2023 Consent Manager:** Granular customer consent toggles (*Data Processing*, *Third-Party Sharing*, *Marketing*, *IRDAI Reporting*) with withdrawal option.
- **IRDAI & ISO 27001 Checklist:** Compliance readiness scorecard (100% compliant status with IRDAI e-issuance & AML rules).
- **KYC & AML Screeners:** Anti-Money Laundering transaction threshold checks (PEP / Sanction list checks).

### Module 35: System Logging (`SystemLoggingScreen.tsx`, `loggingService.ts`)
- **Structured JSON Logger:** Captures log entries with timestamp, severity level (`INFO`, `WARN`, `ERROR`, `SECURITY`), component source, and stack trace.
- **Log Buffer & Exporter:** In-memory circular buffer (max 100 logs) with export to JSON/text capability.

### Module 36: Immutable Audit Trail (`AuditTrailScreen.tsx`, `auditTrailService.ts`)
- **Cryptographic Audit Hash:** Each action (*LOGIN*, *POLICY_PURCHASED*, *DOCUMENT_UPLOADED*, *CLAIM_FILED*, *CONSENT_UPDATED*) generates SHA-256 audit hash.
- **Activity Timeline:** Searchable audit trail showing user ID, persona role, IP address, device fingerprint, and action.

---

## 3. Navigation & Launcher Integration
- Update `src/navigation/RootNavigator.tsx` to register `SecurityVault`, `CompliancePortal`, `SystemLogging`, and `AuditTrail`.
- Add quick access shortcuts on `MarketplaceScreen.tsx`.

---

## 4. Verification Gate & Approval
- Run `npx tsc --noEmit` to verify 0 compilation errors.
- Update `progress.md` status to `IMPLEMENTED` for Modules 26, 27, 35 & 36.
- Provide step-by-step manual testing guidance for Package 7.
