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
import { useComplianceStore } from '../store/useComplianceStore';
import { DPDPConsentToggle } from '../components/compliance/DPDPConsentToggle';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'CompliancePortal'>;

export const CompliancePortalScreen: React.FC<Props> = ({ navigation }) => {
  const { consents, checks, isLoading, loadComplianceData, toggleConsent } =
    useComplianceStore();

  useEffect(() => {
    loadComplianceData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Regulatory Compliance (Module 27)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Compliance Checklist Cards */}
        <Text style={styles.sectionTitle}>IRDAI & Regulatory Framework Scorecards</Text>
        <View style={styles.checkGrid}>
          {checks.map((c) => (
            <View key={c.frameworkName} style={styles.checkCard}>
              <View style={styles.checkHeader}>
                <Text style={styles.frameName}>{c.frameworkName}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{c.status}</Text>
                </View>
              </View>
              <Text style={styles.reqText}>
                Requirements Met: {c.requirementsMetCount}/{c.totalRequirementsCount} (100% Score)
              </Text>
              <Text style={styles.auditDate}>Audited: {c.lastAuditDate}</Text>
            </View>
          ))}
        </View>

        {/* DPDP Act 2023 Consent Manager */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          India DPDP Act 2023 Customer Consent Manager
        </Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          consents.map((item) => (
            <DPDPConsentToggle key={item.id} item={item} onToggle={toggleConsent} />
          ))
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
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 10 },
  checkGrid: { gap: 8 },
  checkCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#334155' },
  checkHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  frameName: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 13, flex: 1 },
  statusBadge: { backgroundColor: '#064E3B', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { color: COLORS.accent, fontSize: 10, fontWeight: '700' },
  reqText: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4 },
  auditDate: { color: '#64748B', fontSize: 10, marginTop: 2 },
});
