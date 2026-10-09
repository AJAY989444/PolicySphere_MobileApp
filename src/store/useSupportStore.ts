import { create } from 'zustand';
import { SupportTicket, KnowledgeBaseArticle } from '../types/package3';
import { supportService } from '../services/supportService';

interface SupportState {
  tickets: SupportTicket[];
  articles: KnowledgeBaseArticle[];
  isLoading: boolean;
  loadSupportData: () => Promise<void>;
  createTicket: (subject: string, category: SupportTicket['category'], initialMessage: string) => Promise<SupportTicket>;
  addMessage: (ticketId: string, message: string) => Promise<void>;
}

export const useSupportStore = create<SupportState>((set, get) => ({
  tickets: [],
  articles: [],
  isLoading: false,
  loadSupportData: async () => {
    set({ isLoading: true });
    const [tickets, articles] = await Promise.all([
      supportService.getTickets(),
      supportService.getKnowledgeBase(),
    ]);
    set({ tickets, articles, isLoading: false });
  },
  createTicket: async (subject, category, initialMessage) => {
    const newTicket = await supportService.createTicket(subject, category, initialMessage);
    set({ tickets: [newTicket, ...get().tickets] });
    return newTicket;
  },
  addMessage: async (ticketId, message) => {
    const updated = await supportService.addMessageToTicket(ticketId, message);
    if (updated) {
      set({
        tickets: get().tickets.map((t) => (t.ticketId === ticketId ? { ...updated } : t)),
      });
    }
  },
}));
