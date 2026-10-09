# Package 5 Implementation Plan: Modules 19, 20, 21 & 32

**Package 5 Target Modules:**
- **Module 19:** Enterprise Reporting System (Sales, Renewals, Claims, Fraud, Commission, Tax & Operational Reports with CSV/PDF Export)
- **Module 20:** Admin Operations Panel (User management, Insurer empanelment, Underwriting queue, Coupons & CMS management)
- **Module 21:** Dynamic RBAC (Role-Based Access Control matrix with CRUD & Approval/Export permission guardrails)
- **Module 32:** Platform Funnel & Engagement Analytics (DAU/MAU, Conversion Funnel, Retention Rate, NPS, Churn & Premium KPIs)

---

## 1. Architectural Design & File Structure

```
src/
├── types/
│   └── package5.ts               # Interfaces for Reporting, Admin Panel, RBAC & Analytics
├── services/
│   ├── reportingService.ts       # Report generation, filter aggregation & CSV/PDF export simulator
│   ├── adminService.ts           # Admin ops, user/insurer management, CMS & coupon manager
│   ├── rbacService.ts            # Dynamic permission matrix, role management & guardrails
│   └── analyticsService.ts       # Funnel analytics, DAU/MAU, conversion tracking & NPS statistics
├── store/
│   ├── useReportingStore.ts      # State for reporting filters, generated datasets & export queue
│   ├── useAdminStore.ts          # State for admin operations, insurers list, coupons & underwriting queue
│   ├── useRBACStore.ts           # State for current user permissions, role definitions & audit logs
│   └── useAnalyticsStore.ts      # State for funnel metrics, KPI summaries & retention charts
├── components/
│   ├── reporting/
│   │   └── ReportFilterBar.tsx       # Date range & domain dropdown filter bar
│   ├── admin/
│   │   └── OperationsQueueCard.tsx  # Underwriting & claim approval card with Approve/Reject actions
│   ├── rbac/
│   │   └── PermissionMatrixGrid.tsx # Interactive matrix showing CRUD & Approval toggles per role
│   └── analytics/
│       └── FunnelChartVisual.tsx    # Conversion funnel visual bar representation
├── screens/
│   ├── ReportingDashboardScreen.tsx # Module 19: Enterprise Reports & Export Center
│   ├── AdminPanelScreen.tsx         # Module 20: Super Admin Operations Control Center
│   ├── RBACManagementScreen.tsx     # Module 21: Dynamic Role & Permission Guardrails
│   └── FunnelAnalyticsScreen.tsx    # Module 32: Platform Analytics & Engagement Dashboard
```

---

## 2. Technical Implementation Details

### Module 19: Enterprise Reporting (`ReportingDashboardScreen.tsx`, `reportingService.ts`)
- **Report Types:** Sales, Renewals, Claims, Fraud, Commission, Tax 80D/80C, and Operational SLA Reports.
- **Export Functionality:** Export reports as CSV data blobs or simulated PDF files with instant download alerts.
- **Filters:** Date ranges (Today, 7 Days, 30 Days, YTD, Custom) and domain categories.

### Module 20: Admin Panel (`AdminPanelScreen.tsx`, `adminService.ts`)
- **Operations Control Center:** Tabbed views to manage Users, Insurers, Active Proposals, Claims Queue, Coupons/Promotions, and CMS FAQs.
- **Underwriting & Claims Approval:** Approve or Reject pending high-risk proposals or claim intimations with reviewer notes.
- **Coupon Manager:** Create and toggle promo codes (e.g. `SAVE10`, `HEALTH2026`).

### Module 21: Dynamic RBAC (`RBACManagementScreen.tsx`, `rbacService.ts`)
- **Permissions Matrix:** 11 permission actions (*Create, Read, Update, Delete, Approve, Reject, Assign, Export, Import, Configure, Audit*).
- **Role Assignment:** Toggle permissions for personas (*Customer, Advisor, Insurer, Corporate, Super Admin, Operations, Support Agent*).
- **Permission Guard:** Utility function `hasPermission(role, action, resource)` for runtime authorization checks.

### Module 32: Analytics Dashboard (`FunnelAnalyticsScreen.tsx`, `analyticsService.ts`)
- **KPI Summary Cards:** DAU (45,200), MAU (520,000), Total Premium Collected (₹14.8 Cr), Claims Settlement Ratio (98.4%), NPS Score (72).
- **Visual Conversion Funnel:** Search (100%) → Compare (64%) → Proposal (38%) → Payment (28%) → Issued (26.5%).
- **Customer Lifetime Value (CLV) & Churn Risk:** High/Low churn risk segmentation.

---

## 3. Navigation & Launcher Integration
- Update `src/navigation/RootNavigator.tsx` to register `ReportingDashboard`, `AdminPanel`, `RBACManagement`, and `FunnelAnalytics`.
- Add quick access launcher grid on `MarketplaceScreen.tsx`.

---

## 4. Verification Gate & Approval
- Run `npx tsc --noEmit` to confirm 0 compilation errors.
- Update `progress.md` status to `IMPLEMENTED` for Modules 19, 20, 21 & 32.
- Provide step-by-step manual testing instructions.
