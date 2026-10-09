import { NotificationItem } from '../types/package3';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Claim Approved! ₹62,500',
    message: 'Your cashless claim CLM-HLT-99201 for Apollo Speciality Hospital has been approved.',
    channel: 'InApp',
    eventCategory: 'Claim',
    timestamp: '2026-09-29 09:05 AM',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Policy Renewal Reminder',
    message: 'Health Shield Elite (POL-HLT-2026-99182) will expire in 30 days. Renew now with No Claim Bonus.',
    channel: 'Push',
    eventCategory: 'Renewal',
    timestamp: '2026-09-25 10:00 AM',
    isRead: true,
  },
  {
    id: 'notif-3',
    title: 'Payment Successful',
    message: 'Payment of ₹18,450 for DriveSecure Motor Insurance was completed via UPI (Ref: TXN-99812).',
    channel: 'SMS',
    eventCategory: 'Payment',
    timestamp: '2026-09-10 03:45 PM',
    isRead: true,
  },
  {
    id: 'notif-4',
    title: 'Security Alert: OTP Verified',
    message: 'Login OTP verified successfully from a new mobile device.',
    channel: 'InApp',
    eventCategory: 'OTP',
    timestamp: '2026-09-01 08:20 AM',
    isRead: true,
  },
];

export class NotificationService {
  private notifications: NotificationItem[] = MOCK_NOTIFICATIONS;

  public async getNotifications(): Promise<NotificationItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.notifications]), 150);
    });
  }

  public async markAsRead(id: string): Promise<void> {
    const item = this.notifications.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
    }
  }

  public async markAllAsRead(): Promise<void> {
    this.notifications.forEach((n) => (n.isRead = true));
  }
}

export const notificationService = new NotificationService();
