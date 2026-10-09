# Package 6 Implementation Plan: Modules 22, 23, 24 & 34

**Package 6 Target Modules:**
- **Module 22:** Microservices Architecture (Service registry, 24 microservices clients, health check monitors & circuit breaker)
- **Module 23:** API Standards & Client Interceptors (REST, GraphQL, WebSockets, gRPC, OAuth2/JWT auth interceptors, rate limiting, idempotency keys & automatic retry)
- **Module 24:** Database Design & Offline Storage (Offline-first SQLite/AsyncStorage sync engine, cache invalidation, offline mutation queue & storage statistics)
- **Module 34:** Third-Party Service Integrations Layer (DigiLocker, CKYC, Aadhaar eKYC, PAN Verification, WhatsApp Business API & Google Maps location mocks)

---

## 1. Architectural Design & File Structure

```
src/
├── types/
│   └── package6.ts               # Core interfaces for Microservices, API Standards, Offline Sync & Integrations
├── services/
│   ├── microserviceRegistry.ts   # 24 Microservices registry, ping health monitor & circuit breaker
│   ├── apiClient.ts              # Axios HTTP client, GraphQL executor, WebSocket client & auth/rate-limit interceptors
│   ├── offlineStorageService.ts  # Local AsyncStorage/SQLite offline DB, sync engine & mutation queue
│   └── integrationsService.ts    # DigiLocker, CKYC, Aadhaar, PAN, WhatsApp & Maps integration layer
├── store/
│   ├── useMicroserviceStore.ts   # State for microservice health statuses & circuit breaker states
│   ├── useAPIStore.ts            # State for active API requests, rate limits & interceptor logs
│   ├── useOfflineStore.ts        # State for offline status, pending sync queue count & storage usage
│   └── useIntegrationStore.ts    # State for DigiLocker documents, CKYC records & integration logs
├── components/
│   ├── microservices/
│   │   └── ServiceHealthBadge.tsx # Visual indicator (Healthy / Degraded / Down) per service
│   ├── api/
│   │   └── APIInspectorConsole.tsx # Real-time API traffic inspector with headers & latency
│   ├── offline/
│   │   └── OfflineSyncBanner.tsx   # Offline status bar with "Sync Now" button
│   └── integrations/
│       └── IntegrationStatusCard.tsx # Third-party integration connector card
├── screens/
│   ├── MicroservicesDashboardScreen.tsx # Module 22: Microservices Registry & Health Radar
│   ├── APIStandardsConsoleScreen.tsx   # Module 23: API Interceptors, GraphQL & WebSocket Console
│   ├── OfflineStorageScreen.tsx        # Module 24: Offline Database, Storage & Sync Engine
│   └── IntegrationsCatalogScreen.tsx   # Module 34: Third-Party Service Integrations Portal
```

---

## 2. Technical Implementation Details

### Module 22: Microservices Architecture (`MicroservicesDashboardScreen.tsx`, `microserviceRegistry.ts`)
- **24 Microservices Registry:** Auth, Customer, Advisor, Insurer, Policy, Quote, Comparison, Proposal, Claim, Payment, Notification, KYC, Document, Recommendation, AI, Search, Fraud, Reporting, Analytics, Audit, CMS, Support, Gateway, Identity.
- **Service Discovery & Health Radar:** Real-time health pinging (`HEALTHY`, `DEGRADED`, `DOWN`) with response latencies.
- **Circuit Breaker:** Simulates automatic circuit tripping (`CLOSED`, `OPEN`, `HALF_OPEN`) when error thresholds are crossed.

### Module 23: API Standards & Client Interceptors (`APIStandardsConsoleScreen.tsx`, `apiClient.ts`)
- **Multi-Protocol Client:** REST HTTP client, GraphQL query executor, WebSocket real-time event listener, and gRPC client stubs.
- **Interceptors & Hygiene:** OAuth2 Bearer JWT injection, Idempotency-Key header generation, Client-side Rate Limiting (100 req/min), and Automatic Exponential Backoff Retry.
- **API Traffic Console:** Inspect request/response payloads, headers, status codes, and network latency.

### Module 24: Database Design & Offline Storage (`OfflineStorageScreen.tsx`, `offlineStorageService.ts`)
- **Offline-First Storage Engine:** Caches active policies, user profiles, and quotes locally using structured storage.
- **Offline Mutation Queue:** Queues claims intimation, lead notes, and document uploads when network is disconnected.
- **Storage Analytics & Sync:** Displays cache memory usage (MB), table counts, and manual "Sync Queue Now" action.

### Module 34: Third-Party Integrations (`IntegrationsCatalogScreen.tsx`, `integrationsService.ts`)
- **Govt & Identity Integrations:** DigiLocker document fetch, CKYC central registry lookup, Aadhaar eKYC OTP verification, PAN status check.
- **Communication & Location:** WhatsApp Business API message dispatcher, SMS Gateway, Google Maps hospital locator mocks.
- **Connector Status:** Live status indicators for all empaneled API partners.

---

## 3. Navigation & Screen Integration
- Update `src/navigation/RootNavigator.tsx` to register `MicroservicesDashboard`, `APIStandardsConsole`, `OfflineStorage`, and `IntegrationsCatalog`.
- Add quick access shortcuts on `MarketplaceScreen.tsx`.

---

## 4. Verification Gate & Approval
- Run `npx tsc --noEmit` to verify 0 compilation errors.
- Update `progress.md` status to `IMPLEMENTED` for Modules 22, 23, 24 & 34.
- Provide step-by-step manual testing guidance for Package 6.
