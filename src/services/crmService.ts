import { AdvisorLead, CommissionSummary, LeadStage } from '../types/package4';

const MOCK_LEADS: AdvisorLead[] = [
  {
    leadId: 'LD-2026-901',
    customerName: 'Vikramaditya Rao',
    mobile: '+91 98765 43210',
    email: 'vikram.rao@example.com',
    interestedCategory: 'Health Insurance (Family Floater)',
    estimatedSumAssured: 1000000,
    stage: 'Requirement Analysis',
    assignedAdvisorName: 'Rajesh Sharma (Senior Advisor)',
    lastContactedDate: '2026-10-04',
    notesCount: 4,
    estimatedCommission: 3450,
    interactionLogs: [
      { date: '2026-10-01 10:30 AM', type: 'Call', note: 'Customer interested in 1 Crore sum insured for 2 adults + 1 child.' },
      { date: '2026-10-02 02:15 PM', type: 'Meeting', note: 'Shared HDFC Optima Secure quote comparison matrix.' },
      { date: '2026-10-04 11:00 AM', type: 'Note', note: 'Awaiting medical history documents for pre-existing hypertension.' },
    ],
  },
  {
    leadId: 'LD-2026-882',
    customerName: 'Priya Sundaram',
    mobile: '+91 98112 88990',
    email: 'priya.sundaram@example.com',
    interestedCategory: 'Term Life Insurance',
    estimatedSumAssured: 20000000,
    stage: 'Quote Sent',
    assignedAdvisorName: 'Rajesh Sharma (Senior Advisor)',
    lastContactedDate: '2026-10-03',
    notesCount: 2,
    estimatedCommission: 4800,
    interactionLogs: [
      { date: '2026-10-03 04:00 PM', type: 'Email', note: 'E-mailed quote proposal for ₹2 Crore cover at ₹890/month.' },
    ],
  },
  {
    leadId: 'LD-2026-751',
    customerName: 'Amitabh Sen',
    mobile: '+91 99001 22334',
    email: 'amitabh.sen@example.com',
    interestedCategory: 'Motor Insurance (Mercedes C-Class)',
    estimatedSumAssured: 4500000,
    stage: 'Converted',
    assignedAdvisorName: 'Rajesh Sharma (Senior Advisor)',
    lastContactedDate: '2026-09-28',
    notesCount: 5,
    estimatedCommission: 5200,
    interactionLogs: [
      { date: '2026-09-28 05:30 PM', type: 'Call', note: 'Payment completed via UPI. Policy POL-MTR-2026-44102 issued.' },
    ],
  },
];

const MOCK_COMMISSION_SUMMARY: CommissionSummary = {
  totalTarget: 100000,
  achievedTarget: 78500,
  pendingCommission: 13450,
  paidCommission: 65050,
  activeLeadsCount: 18,
};

export class CRMService {
  private leads: AdvisorLead[] = MOCK_LEADS;
  private commissionSummary: CommissionSummary = MOCK_COMMISSION_SUMMARY;

  public async getLeads(): Promise<AdvisorLead[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.leads]), 150);
    });
  }

  public async getCommissionSummary(): Promise<CommissionSummary> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.commissionSummary }), 100);
    });
  }

  public async updateLeadStage(leadId: string, newStage: LeadStage): Promise<AdvisorLead | null> {
    const lead = this.leads.find((l) => l.leadId === leadId);
    if (!lead) return null;
    lead.stage = newStage;
    lead.lastContactedDate = new Date().toISOString().split('T')[0];
    lead.interactionLogs.unshift({
      date: new Date().toLocaleString('en-IN'),
      type: 'Note',
      note: `Updated lead stage to "${newStage}"`,
    });
    return { ...lead };
  }

  public async addInteractionNote(leadId: string, noteText: string, type: 'Call' | 'Meeting' | 'Note' | 'Email'): Promise<AdvisorLead | null> {
    const lead = this.leads.find((l) => l.leadId === leadId);
    if (!lead) return null;
    lead.notesCount += 1;
    lead.lastContactedDate = new Date().toISOString().split('T')[0];
    lead.interactionLogs.unshift({
      date: new Date().toLocaleString('en-IN'),
      type,
      note: noteText,
    });
    return { ...lead };
  }

  public async createLead(customerName: string, mobile: string, category: string, sumAssured: number): Promise<AdvisorLead> {
    const newLead: AdvisorLead = {
      leadId: `LD-2026-${Math.floor(Math.random() * 899 + 100)}`,
      customerName,
      mobile,
      email: `${customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      interestedCategory: category,
      estimatedSumAssured: sumAssured,
      stage: 'New Lead',
      assignedAdvisorName: 'Rajesh Sharma (Senior Advisor)',
      lastContactedDate: new Date().toISOString().split('T')[0],
      notesCount: 1,
      estimatedCommission: Math.round(sumAssured * 0.003),
      interactionLogs: [
        { date: new Date().toLocaleString('en-IN'), type: 'Note', note: 'New lead auto-captured and assigned to advisor pipeline.' },
      ],
    };
    this.leads.unshift(newLead);
    return newLead;
  }
}

export const crmService = new CRMService();
