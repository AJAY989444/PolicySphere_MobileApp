import { SupportTicket, KnowledgeBaseArticle } from '../types/package3';

const MOCK_TICKETS: SupportTicket[] = [
  {
    ticketId: 'TKT-2026-901',
    subject: 'Endorsement for address update on Motor Policy',
    category: 'Policy Endorsement',
    status: 'In Progress',
    slaHoursRemaining: 14,
    createdDate: '2026-09-27 11:30 AM',
    messages: [
      { sender: 'Customer', text: 'I moved to a new address. How do I update my RC and motor policy address?', timestamp: '2026-09-27 11:30 AM' },
      { sender: 'AI Assistant', text: 'You can upload your updated Aadhaar or Rent Agreement in Document Vault, and submit an endorsement request directly.', timestamp: '2026-09-27 11:31 AM' },
      { sender: 'Support Agent', text: 'We have received your request. Document verification is underway.', timestamp: '2026-09-27 02:15 PM' },
    ],
  },
  {
    ticketId: 'TKT-2026-782',
    subject: 'Double debit during premium payment',
    category: 'Payment Failure',
    status: 'Resolved',
    slaHoursRemaining: 0,
    createdDate: '2026-09-12 09:10 AM',
    messages: [
      { sender: 'Customer', text: 'My account was debited twice for ₹18,450 during UPI payment.', timestamp: '2026-09-12 09:10 AM' },
      { sender: 'Support Agent', text: 'Duplicate payment refunded back to source bank account via UTR #991028371.', timestamp: '2026-09-12 12:45 PM' },
    ],
  },
];

const MOCK_KB_ARTICLES: KnowledgeBaseArticle[] = [
  {
    id: 'kb-1',
    category: 'Claims',
    title: 'How to file a Cashless Hospital Claim in 3 Easy Steps',
    summary: 'Guide to pre-authorization, TPA desk procedures, and network hospital search.',
    content: 'Show your PolicySphere E-Card at the hospital cashless desk 48 hours prior to planned admission, or within 24 hours for emergency admission.',
    readTime: '3 min read',
  },
  {
    id: 'kb-2',
    category: 'Vault & OCR',
    title: 'How AI Vault automatically verifies your identity documents',
    summary: 'Learn about AES-256 document encryption and automatic OCR parsing.',
    content: 'PolicySphere uses state-of-the-art OCR to read Aadhaar, PAN, and Medical Bills, removing manual form entries.',
    readTime: '2 min read',
  },
  {
    id: 'kb-3',
    category: 'Renewals',
    title: 'Understanding No Claim Bonus (NCB) transfers during renewal',
    summary: 'Retain up to 50% NCB bonus when porting or renewing your motor policy.',
    content: 'NCB belongs to the vehicle owner, not the vehicle or insurer. Transfer your NCB letter easily within PolicySphere.',
    readTime: '4 min read',
  },
];

export class SupportService {
  private tickets: SupportTicket[] = MOCK_TICKETS;
  private kbArticles: KnowledgeBaseArticle[] = MOCK_KB_ARTICLES;

  public async getTickets(): Promise<SupportTicket[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.tickets]), 150);
    });
  }

  public async getKnowledgeBase(): Promise<KnowledgeBaseArticle[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.kbArticles]), 150);
    });
  }

  public async createTicket(
    subject: string,
    category: SupportTicket['category'],
    initialMessage: string
  ): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      ticketId: `TKT-2026-${Math.floor(Math.random() * 899 + 100)}`,
      subject,
      category,
      status: 'Open',
      slaHoursRemaining: 24,
      createdDate: new Date().toLocaleString('en-IN'),
      messages: [
        { sender: 'Customer', text: initialMessage, timestamp: new Date().toLocaleTimeString('en-IN') },
        {
          sender: 'AI Assistant',
          text: `Thank you for reaching out! I've logged ticket #${subject}. A human agent will review your issue shortly.`,
          timestamp: new Date().toLocaleTimeString('en-IN'),
        },
      ],
    };

    this.tickets.unshift(newTicket);
    return newTicket;
  }

  public async addMessageToTicket(ticketId: string, text: string): Promise<SupportTicket | null> {
    const ticket = this.tickets.find((t) => t.ticketId === ticketId);
    if (!ticket) return null;

    ticket.messages.push({
      sender: 'Customer',
      text,
      timestamp: new Date().toLocaleTimeString('en-IN'),
    });

    // Auto-bot response simulator
    setTimeout(() => {
      ticket.messages.push({
        sender: 'AI Assistant',
        text: `Got your message! We're analyzing your request under SLA window (${ticket.slaHoursRemaining} hours remaining).`,
        timestamp: new Date().toLocaleTimeString('en-IN'),
      });
    }, 1000);

    return ticket;
  }
}

export const supportService = new SupportService();
