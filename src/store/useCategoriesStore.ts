import { create } from 'zustand';
import { MacroDomain, InsuranceCategory } from '../types/categories';

interface CategoriesState {
  selectedDomain: MacroDomain;
  searchQuery: string;
  bookmarkedCategoryIds: string[];
  selectedCategory: InsuranceCategory | null;
  setSelectedDomain: (domain: MacroDomain) => void;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (id: string) => void;
  setSelectedCategory: (cat: InsuranceCategory | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  selectedDomain: 'All',
  searchQuery: '',
  bookmarkedCategoryIds: ['cat-1', 'cat-5', 'cat-10'], // default sample bookmarks
  selectedCategory: null,
  setSelectedDomain: (selectedDomain) => set({ selectedDomain }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleBookmark: (id) =>
    set((state) => ({
      bookmarkedCategoryIds: state.bookmarkedCategoryIds.includes(id)
        ? state.bookmarkedCategoryIds.filter((bId) => bId !== id)
        : [...state.bookmarkedCategoryIds, id],
    })),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));
