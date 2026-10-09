import { OfflineMutationItem, StorageStats } from '../types/package6';

const MOCK_QUEUE: OfflineMutationItem[] = [
  {
    id: 'mut-1',
    actionType: 'CLAIM_INTIMATION',
    payloadSummary: 'Cashless claim intimation for Apollo Hospital (₹45,000)',
    timestamp: '2026-10-09 12:45 PM',
    status: 'QUEUED',
  },
  {
    id: 'mut-2',
    actionType: 'LEAD_NOTE',
    payloadSummary: 'Added prospect meeting notes for Ramesh Kumar',
    timestamp: '2026-10-09 11:20 AM',
    status: 'QUEUED',
  },
];

const MOCK_STORAGE_STATS: StorageStats = {
  totalAllocatedMB: 50,
  usedMemoryMB: 12.4,
  cachedPoliciesCount: 6,
  cachedQuotesCount: 24,
  pendingSyncQueueCount: 2,
  lastSyncedTimestamp: '2026-10-09 10:00 AM',
};

export class OfflineStorageService {
  private queue: OfflineMutationItem[] = MOCK_QUEUE;
  private stats: StorageStats = MOCK_STORAGE_STATS;

  public async getStorageStats(): Promise<StorageStats> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.stats }), 150);
    });
  }

  public async getMutationQueue(): Promise<OfflineMutationItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.queue]), 150);
    });
  }

  public async syncOfflineQueue(): Promise<StorageStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.queue.forEach((q) => (q.status = 'SYNCED'));
        this.queue = [];
        this.stats.pendingSyncQueueCount = 0;
        this.stats.lastSyncedTimestamp = new Date().toLocaleString('en-IN');
        resolve({ ...this.stats });
      }, 1000);
    });
  }
}

export const offlineStorageService = new OfflineStorageService();
