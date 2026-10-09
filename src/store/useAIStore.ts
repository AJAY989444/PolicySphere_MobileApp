import { create } from 'zustand';
import { AIRecommendation } from '../types/package4';
import { aiEngineService } from '../services/aiEngineService';

interface AIState {
  recommendations: AIRecommendation[];
  isLoading: boolean;
  predictedPremium: number | null;
  loadRecommendations: () => Promise<void>;
  calculatePrediction: (category: string, age: number, sumInsured: number) => Promise<void>;
}

export const useAIStore = create<AIState>((set) => ({
  recommendations: [],
  isLoading: false,
  predictedPremium: null,
  loadRecommendations: async () => {
    set({ isLoading: true });
    const recommendations = await aiEngineService.getPersonalizedRecommendations();
    set({ recommendations, isLoading: false });
  },
  calculatePrediction: async (category, age, sumInsured) => {
    const res = await aiEngineService.predictPremium(category, age, sumInsured);
    set({ predictedPremium: res.predictedMonthly });
  },
}));
