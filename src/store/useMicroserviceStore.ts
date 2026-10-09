import { create } from 'zustand';
import { MicroserviceInfo } from '../types/package6';
import { microserviceRegistry } from '../services/microserviceRegistry';

interface MicroserviceState {
  services: MicroserviceInfo[];
  isLoading: boolean;
  loadServices: () => Promise<void>;
  pingCheck: (id: string) => Promise<void>;
}

export const useMicroserviceStore = create<MicroserviceState>((set, get) => ({
  services: [],
  isLoading: false,
  loadServices: async () => {
    set({ isLoading: true });
    const services = await microserviceRegistry.getServices();
    set({ services, isLoading: false });
  },
  pingCheck: async (id) => {
    const updated = await microserviceRegistry.pingHealthCheck(id);
    if (updated) {
      set({ services: get().services.map((s) => (s.id === id ? updated : s)) });
    }
  },
}));
