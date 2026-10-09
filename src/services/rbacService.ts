import { RolePermissions, RoleName, PermissionAction } from '../types/package5';

const MOCK_RBAC_ROLES: RolePermissions[] = [
  {
    role: 'Customer',
    description: 'Individual policy buyer & beneficiary',
    grantedActions: ['Create', 'Read', 'Update', 'Export'],
  },
  {
    role: 'Insurance Advisor',
    description: 'Empaneled POSP agent & sales consultant',
    grantedActions: ['Create', 'Read', 'Update', 'Assign', 'Export'],
  },
  {
    role: 'Insurance Company',
    description: 'Partner insurer underwriter & product team',
    grantedActions: ['Create', 'Read', 'Update', 'Approve', 'Reject', 'Export', 'Audit'],
  },
  {
    role: 'Corporate Customer',
    description: 'Group policy HR admin & enterprise buyer',
    grantedActions: ['Create', 'Read', 'Update', 'Export'],
  },
  {
    role: 'Super Admin',
    description: 'Full platform administrative privileges',
    grantedActions: ['Create', 'Read', 'Update', 'Delete', 'Approve', 'Reject', 'Assign', 'Export', 'Import', 'Configure', 'Audit'],
  },
  {
    role: 'Operations Team',
    description: 'KYC, proposal verification & fraud review team',
    grantedActions: ['Read', 'Update', 'Approve', 'Reject', 'Assign', 'Export', 'Audit'],
  },
  {
    role: 'Customer Support',
    description: 'Helpdesk chat agent & SLA resolution desk',
    grantedActions: ['Read', 'Update', 'Assign'],
  },
];

export class RBACService {
  private roles: RolePermissions[] = MOCK_RBAC_ROLES;

  public async getRolePermissions(): Promise<RolePermissions[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.roles]), 150);
    });
  }

  public async togglePermission(roleName: RoleName, action: PermissionAction): Promise<RolePermissions | null> {
    const roleDef = this.roles.find((r) => r.role === roleName);
    if (!roleDef) return null;

    if (roleDef.grantedActions.includes(action)) {
      roleDef.grantedActions = roleDef.grantedActions.filter((a) => a !== action);
    } else {
      roleDef.grantedActions.push(action);
    }

    return { ...roleDef };
  }

  public hasPermission(roleName: RoleName, action: PermissionAction): boolean {
    const roleDef = this.roles.find((r) => r.role === roleName);
    return roleDef ? roleDef.grantedActions.includes(action) : false;
  }
}

export const rbacService = new RBACService();
