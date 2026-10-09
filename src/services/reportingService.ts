import { ReportCategory, ReportSummary } from '../types/package5';
import { downloadBlobFile } from '../utils/downloadPdf';

const MOCK_REPORTS: Record<ReportCategory, ReportSummary> = {
  Sales: {
    reportType: 'Sales',
    generatedDate: '2026-10-07',
    totalRecords: 4,
    totalVolumeAmount: 184500,
    rows: [
      { id: 'r1', referenceId: 'POL-HLT-2026-99182', category: 'Health Insurance', customerName: 'Rajesh Kumar', amount: 48500, date: '2026-10-01', status: 'Completed', details: 'Family Floater 1 Crore' },
      { id: 'r2', referenceId: 'POL-MTR-2026-44102', category: 'Motor Insurance', customerName: 'Amitabh Sen', amount: 18450, date: '2026-09-28', status: 'Completed', details: 'Zero-Dep Mercedes' },
      { id: 'r3', referenceId: 'POL-LIFE-2026-1102', category: 'Term Life', customerName: 'Priya Sundaram', amount: 12500, date: '2026-09-25', status: 'Completed', details: '2 Crore Cover' },
      { id: 'r4', referenceId: 'POL-TRV-2026-7782', category: 'Travel Insurance', customerName: 'Suresh Patel', amount: 105000, date: '2026-09-20', status: 'Completed', details: 'Schengen Multi-Trip' },
    ],
  },
  Renewals: {
    reportType: 'Renewals',
    generatedDate: '2026-10-07',
    totalRecords: 2,
    totalVolumeAmount: 62000,
    rows: [
      { id: 'r5', referenceId: 'POL-HLT-2025-4410', category: 'Health Insurance', customerName: 'Vikram Mehta', amount: 34000, date: '2026-09-15', status: 'Renewed', details: 'Includes 50% NCB bonus' },
      { id: 'r6', referenceId: 'POL-MTR-2025-9981', category: 'Motor Insurance', customerName: 'Anil Gupta', amount: 28000, date: '2026-09-10', status: 'Renewed', details: 'Auto-Renew via UPI' },
    ],
  },
  Claims: {
    reportType: 'Claims',
    generatedDate: '2026-10-07',
    totalRecords: 2,
    totalVolumeAmount: 93000,
    rows: [
      { id: 'r7', referenceId: 'CLM-HLT-99201', category: 'Health Insurance', customerName: 'Rajesh Kumar', amount: 65000, date: '2026-09-28', status: 'Approved', details: 'Apollo Hospital Cashless (₹62.5k paid)' },
      { id: 'r8', referenceId: 'CLM-MTR-88102', category: 'Motor Insurance', customerName: 'Amit Sharma', amount: 28000, date: '2026-09-15', status: 'Settled', details: 'Direct Garage Payout' },
    ],
  },
  Fraud: {
    reportType: 'Fraud',
    generatedDate: '2026-10-07',
    totalRecords: 1,
    totalVolumeAmount: 78000,
    rows: [
      { id: 'r9', referenceId: 'FRD-EV-8821', category: 'Health Insurance', customerName: 'Ramesh Verma', amount: 78000, date: '2026-09-29', status: 'Flagged High Risk', details: 'Duplicate Aadhaar Hash & VPN IP' },
    ],
  },
  Commission: {
    reportType: 'Commission',
    generatedDate: '2026-10-07',
    totalRecords: 3,
    totalVolumeAmount: 13450,
    rows: [
      { id: 'r10', referenceId: 'COMM-901', category: 'Health Insurance', customerName: 'Rajesh Sharma (Advisor)', amount: 5200, date: '2026-10-02', status: 'Paid', details: '10% Advisor Comm' },
      { id: 'r11', referenceId: 'COMM-882', category: 'Motor Insurance', customerName: 'Rajesh Sharma (Advisor)', amount: 3450, date: '2026-09-29', status: 'Pending', details: 'Garage direct deal' },
      { id: 'r12', referenceId: 'COMM-751', category: 'Term Life', customerName: 'Rajesh Sharma (Advisor)', amount: 4800, date: '2026-09-25', status: 'Paid', details: 'Life term commission' },
    ],
  },
  Tax80D: {
    reportType: 'Tax80D',
    generatedDate: '2026-10-07',
    totalRecords: 2,
    totalVolumeAmount: 82500,
    rows: [
      { id: 'r13', referenceId: 'TAX-80D-2026-01', category: 'Health Insurance', customerName: 'Rajesh Kumar', amount: 48500, date: '2026-10-01', status: 'Certificate Issued', details: 'Section 80D Tax Exemption' },
      { id: 'r14', referenceId: 'TAX-80D-2026-02', category: 'Health Insurance', customerName: 'Vikram Mehta', amount: 34000, date: '2026-09-15', status: 'Certificate Issued', details: 'Section 80D Senior Parent' },
    ],
  },
  Operational: {
    reportType: 'Operational',
    generatedDate: '2026-10-07',
    totalRecords: 2,
    totalVolumeAmount: 0,
    rows: [
      { id: 'r15', referenceId: 'TKT-2026-901', category: 'Support Ticket', customerName: 'Vikramaditya Rao', amount: 0, date: '2026-09-27', status: 'Resolved under 14h SLA', details: 'Address Endorsement' },
      { id: 'r16', referenceId: 'SLA-AUDIT-99', category: 'TPA Desk Audit', customerName: 'Apollo Hospital', amount: 0, date: '2026-09-28', status: '100% SLA Met', details: 'Pre-auth turnaround < 45 mins' },
    ],
  },
};

export class ReportingService {
  public async getReport(type: ReportCategory): Promise<ReportSummary> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_REPORTS[type] || MOCK_REPORTS.Sales);
      }, 150);
    });
  }

  public async exportReportCSV(report: ReportSummary): Promise<void> {
    const csvLines = [
      `PolicySphere Enterprise Report - ${report.reportType}`,
      `Generated Date: ${report.generatedDate}, Total Volume Amount: INR ${report.totalVolumeAmount}`,
      `ID,Reference,Category,Customer,Amount (INR),Date,Status,Details`,
      ...report.rows.map(
        (r) =>
          `"${r.id}","${r.referenceId}","${r.category}","${r.customerName}",${r.amount},"${r.date}","${r.status}","${r.details}"`
      ),
    ];
    const csvContent = csvLines.join('\n');
    downloadBlobFile(`PolicySphere_Report_${report.reportType}_2026.csv`, csvContent);
  }
}

export const reportingService = new ReportingService();
