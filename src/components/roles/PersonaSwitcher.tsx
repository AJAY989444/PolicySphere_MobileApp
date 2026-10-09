import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { UserRole } from '../../types/package1';
import { useAuthStore } from '../../store/useAuthStore';

const ROLES: Array<{ role: UserRole; icon: string; tag: string }> = [
  { role: 'Customer', icon: '👤', tag: 'Policyholder / Buyer' },
  { role: 'Insurance Advisor', icon: '💼', tag: 'POSP Agent & Lead Manager' },
  { role: 'Insurance Company', icon: '🏢', tag: 'Insurer Portal & Underwriting' },
  { role: 'Corporate Customer', icon: '🏬', tag: 'Group Employee Health Admin' },
  { role: 'Operations Team', icon: '⚙️', tag: 'KYC & Proposal Reviewer' },
  { role: 'Customer Support', icon: '🎧', tag: 'Helpdesk & Ticket SLA' },
  { role: 'Super Admin', icon: '👑', tag: 'Platform Master Control' },
];

export const PersonaSwitcher: React.FC = () => {
  const { activeRole, setActiveRole, isAuthenticated, setAuthenticated, setUserProfile } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [lockNoticeVisible, setLockNoticeVisible] = useState(false);
  const [devOverride, setDevOverride] = useState(false);

  const activeRoleData = ROLES.find((r) => r.role === activeRole) || ROLES[0];

  const handleTriggerPress = () => {
    if (isAuthenticated && !devOverride) {
      setLockNoticeVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleLogoutAndSwitch = () => {
    setLockNoticeVisible(false);
    setAuthenticated(false);
    setUserProfile(null);
    setModalVisible(true);
  };

  const handleDevOverride = () => {
    setLockNoticeVisible(false);
    setDevOverride(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.triggerButton, isAuthenticated && !devOverride && styles.triggerLocked]}
        onPress={handleTriggerPress}
        activeOpacity={0.8}
      >
        <Text style={styles.roleIcon}>{activeRoleData.icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.roleLabel}>
            {isAuthenticated
              ? devOverride
                ? 'Active Role (Dev Override)'
                : 'Active Role (Session Locked 🔒)'
              : 'Select Role Persona'}
          </Text>
          <Text style={styles.roleName}>{activeRole}</Text>
        </View>
        <Text style={styles.dropdownArrow}>
          {isAuthenticated && !devOverride ? '🔒' : '▼'}
        </Text>
      </TouchableOpacity>

      {/* Lock Notice Modal for Web & Mobile */}
      <Modal visible={lockNoticeVisible} transparent animationType="fade" onRequestClose={() => setLockNoticeVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.lockTitle}>🔒 Session Role Lock Active</Text>
            <Text style={styles.lockDesc}>
              You are logged in as <Text style={styles.highlightRole}>"{activeRole}"</Text>. Under IRDAI security guidelines, user roles are locked during an active session.
            </Text>

            <TouchableOpacity style={styles.lockOptionPrimary} onPress={handleLogoutAndSwitch}>
              <Text style={styles.lockOptionTextPrimary}>🚪 Log Out & Switch Role Persona</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lockOptionSecondary} onPress={handleDevOverride}>
              <Text style={styles.lockOptionTextSecondary}>🛠️ Developer / Demo Override Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lockOptionCancel} onPress={() => setLockNoticeVisible(false)}>
              <Text style={styles.lockOptionTextCancel}>Keep Current Role ({activeRole})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Persona Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Select User Role Persona</Text>
                {devOverride && <Text style={styles.devTag}>⚠️ Developer Demo Override Active</Text>}
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {ROLES.map((r) => {
              const isSelected = r.role === activeRole;
              return (
                <TouchableOpacity
                  key={r.role}
                  style={[styles.roleOption, isSelected && styles.roleOptionSelected]}
                  onPress={() => {
                    setActiveRole(r.role);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionIcon}>{r.icon}</Text>
                  <View style={styles.optionTextContainer}>
                    <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                      {r.role}
                    </Text>
                    <Text style={styles.optionTag}>{r.tag}</Text>
                  </View>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  triggerLocked: {
    borderColor: COLORS.accent,
  },
  roleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  roleLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  roleName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  dropdownArrow: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  lockDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  highlightRole: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  lockOptionPrimary: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  lockOptionTextPrimary: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  lockOptionSecondary: {
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.warning,
    marginBottom: 10,
  },
  lockOptionTextSecondary: {
    color: COLORS.warning,
    fontWeight: '700',
    fontSize: 13,
  },
  lockOptionCancel: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  lockOptionTextCancel: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  modalTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  devTag: {
    color: COLORS.warning,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  closeText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: COLORS.backgroundDark,
  },
  roleOptionSelected: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
    borderWidth: 1,
  },
  optionIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  optionTitleSelected: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  optionTag: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  checkmark: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 16,
  },
});
