import { create } from 'zustand';
import { ObjectiveCategory, PlatformObjective } from '../types/objectives';

interface ObjectivesState {
  selectedCategory: ObjectiveCategory;
  searchQuery: string;
  selectedObjective: PlatformObjective | null;
  setSelectedCategory: (category: ObjectiveCategory) => void;
  setSearchQuery: (query: string) => void;
  setSelectedObjective: (obj: PlatformObjective | null) => void;
}

export const useObjectivesStore = create<ObjectivesState>((set) => ({
  selectedCategory: 'All',
  searchQuery: '',
  selectedObjective: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedObjective: (selectedObjective) => set({ selectedObjective }),
}));
