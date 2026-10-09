import { create } from 'zustand';
import { OfflineMutationItem, StorageStats } from '../types/package6';
import { offlineStorageService } from '../services/offlineStorageService';

interface OfflineState {
  stats: StorageStats | null;
  queue: OfflineMutationItem[];
  isLoading: boolean;
  isSyncing: boolean;
  loadOfflineData: () => Promise<void>;
  syncQueue: () => Promise<void>;
}

export const useOfflineStore = create<OfflineState>((set) => ({
  stats: null,
  queue: [],
  isLoading: false,
  isSyncing: false,
  loadOfflineData: async () => {
    set({ isLoading: true });
    const [stats, queue] = await Promise.all([
      offlineStorageService.getStorageStats(),
      offlineStorageService.getMutationQueue(),
    ]);
    set({ stats, queue, isLoading: false });
  },
  syncQueue: async () => {
    set({ isSyncing: true });
    const updatedStats = await offlineStorageService.syncOfflineQueue();
    const updatedQueue = await offlineStorageService.getMutationQueue();
    set({ stats: updatedStats, queue: updatedQueue, isSyncing: false });
  },
}));
