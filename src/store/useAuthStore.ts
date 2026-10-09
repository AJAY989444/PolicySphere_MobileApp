import { create } from 'zustand';
import { UserProfile, UserRole } from '../types/package1';
import { authService } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  activeRole: UserRole;
  userProfile: UserProfile | null;
  setActiveRole: (role: UserRole) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setAuthenticated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default active session for seamless demo
  activeRole: 'Customer',
  userProfile: authService.getProfile(),
  setActiveRole: (activeRole) => set({ activeRole }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
