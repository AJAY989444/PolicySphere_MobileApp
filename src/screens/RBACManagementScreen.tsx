import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useRBACStore } from '../store/useRBACStore';
import { PermissionMatrixGrid } from '../components/rbac/PermissionMatrixGrid';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'RBACManagement'>;

export const RBACManagementScreen: React.FC<Props> = ({ navigation }) => {
  const { roles, isLoading, loadRBACData, togglePermission } = useRBACStore();

  useEffect(() => {
    loadRBACData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dynamic RBAC Guardrails (Module 21)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Security Banner */}
        <View style={styles.rbacBanner}>
          <Text style={styles.bannerTitle}>🔐 Role-Based Access Control (RBAC) Matrix</Text>
          <Text style={styles.bannerSub}>
            Granular permission controls enforced across 7 platform personas. Tap any matrix cell to grant or revoke real-time permissions.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Interactive Permission Matrix ({roles.length} Roles)</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          <PermissionMatrixGrid
            rolePermissions={roles}
            onTogglePermission={(roleName, action) => togglePermission(roleName, action)}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: { padding: 4 },
  backText: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600' },
  headerTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  rbacBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 14 },
  bannerSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 8 },
});
