import { create } from 'zustand';
import { RolePermissions, RoleName, PermissionAction } from '../types/package5';
import { rbacService } from '../services/rbacService';

interface RBACState {
  roles: RolePermissions[];
  isLoading: boolean;
  loadRBACData: () => Promise<void>;
  togglePermission: (roleName: RoleName, action: PermissionAction) => Promise<void>;
  hasPermission: (roleName: RoleName, action: PermissionAction) => boolean;
}

export const useRBACStore = create<RBACState>((set, get) => ({
  roles: [],
  isLoading: false,
  loadRBACData: async () => {
    set({ isLoading: true });
    const roles = await rbacService.getRolePermissions();
    set({ roles, isLoading: false });
  },
  togglePermission: async (roleName, action) => {
    const updated = await rbacService.togglePermission(roleName, action);
    if (updated) {
      set({ roles: get().roles.map((r) => (r.role === roleName ? updated : r)) });
    }
  },
  hasPermission: (roleName, action) => {
    return rbacService.hasPermission(roleName, action);
  },
}));
