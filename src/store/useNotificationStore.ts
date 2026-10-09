import { create } from 'zustand';
import { NotificationItem } from '../types/package3';
import { notificationService } from '../services/notificationService';

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  loadNotifications: async () => {
    set({ isLoading: true });
    const notifications = await notificationService.getNotifications();
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    set({ notifications, unreadCount, isLoading: false });
  },
  markAsRead: async (id: string) => {
    await notificationService.markAsRead(id);
    const updated = get().notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    const unreadCount = updated.filter((n) => !n.isRead).length;
    set({ notifications: updated, unreadCount });
  },
  markAllAsRead: async () => {
    await notificationService.markAllAsRead();
    const updated = get().notifications.map((n) => ({ ...n, isRead: true }));
    set({ notifications: updated, unreadCount: 0 });
  },
}));
