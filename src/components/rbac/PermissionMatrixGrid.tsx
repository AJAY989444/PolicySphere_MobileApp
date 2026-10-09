import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RolePermissions, PermissionAction } from '../../types/package5';
import { COLORS } from '../../constants/colors';

interface Props {
  rolePermissions: RolePermissions[];
  onTogglePermission: (role: RolePermissions['role'], action: PermissionAction) => void;
}

const ALL_ACTIONS: PermissionAction[] = [
  'Create',
  'Read',
  'Update',
  'Delete',
  'Approve',
  'Reject',
  'Assign',
  'Export',
  'Audit',
];

export const PermissionMatrixGrid: React.FC<Props> = ({ rolePermissions, onTogglePermission }) => {
  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <View style={styles.roleCol}>
            <Text style={styles.headerText}>User Role Persona</Text>
          </View>
          {ALL_ACTIONS.map((action) => (
            <View key={action} style={styles.actionCol}>
              <Text style={styles.headerText}>{action}</Text>
            </View>
          ))}
        </View>

        {/* Table Body */}
        {rolePermissions.map((item) => (
          <View key={item.role} style={styles.bodyRow}>
            <View style={styles.roleCol}>
              <Text style={styles.roleText}>{item.role}</Text>
              <Text style={styles.roleSub} numberOfLines={1}>{item.description}</Text>
            </View>

            {ALL_ACTIONS.map((action) => {
              const isGranted = item.grantedActions.includes(action);
              return (
                <TouchableOpacity
                  key={action}
                  style={styles.actionCol}
                  onPress={() => onTogglePermission(item.role, action)}
                >
                  <View style={[styles.cellBadge, isGranted && styles.cellBadgeGranted]}>
                    <Text style={[styles.cellText, isGranted && styles.cellTextGranted]}>
                      {isGranted ? '✓ Yes' : '✕ No'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { marginVertical: 10 },
  table: { backgroundColor: '#1E293B', borderRadius: 12, borderWidth: 1, borderColor: '#334155' },
  headerRow: { flexDirection: 'row', backgroundColor: '#0F172A', borderBottomWidth: 1, borderBottomColor: '#334155', paddingVertical: 10 },
  bodyRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#334155', paddingVertical: 8, alignItems: 'center' },
  roleCol: { width: 140, paddingHorizontal: 10 },
  actionCol: { width: 70, alignItems: 'center', justifyContent: 'center' },
  headerText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 11 },
  roleText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 12 },
  roleSub: { color: COLORS.textSecondary, fontSize: 9 },
  cellBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, backgroundColor: '#334155' },
  cellBadgeGranted: { backgroundColor: '#064E3B' },
  cellText: { color: COLORS.textSecondary, fontSize: 10 },
  cellTextGranted: { color: COLORS.accent, fontWeight: '700' },
});
