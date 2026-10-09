import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuditStore } from '../store/useAuditStore';
import { AuditTimelineItem } from '../components/audit/AuditTimelineItem';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AuditTrail'>;

export const AuditTrailScreen: React.FC<Props> = ({ navigation }) => {
  const { events, isLoading, loadAuditTrail, exportAudit } = useAuditStore();

  useEffect(() => {
    loadAuditTrail();
  }, []);

  const handleExportPress = async () => {
    await exportAudit();
    Alert.alert('Audit Trail Downloaded!', 'Immutable audit trail exported as CSV file.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Immutable Audit Trail (Module 36)</Text>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExportPress}>
          <Text style={styles.exportText}>📥 Export CSV</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <View style={styles.auditBanner}>
          <Text style={styles.bannerTitle}>🛡️ Cryptographic Tamper-Proof Audit Trail</Text>
          <Text style={styles.bannerSub}>
            Every action generates an immutable SHA-256 cryptographic hash log for IRDAI regulatory compliance and forensic auditability.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Audit Log Activity Timeline ({events.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          events.map((e) => <AuditTimelineItem key={e.auditId} event={e} />)
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
  exportBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  exportText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  auditBanner: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  bannerTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  bannerSub: { color: COLORS.borderLight, fontSize: 11, marginTop: 4, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
});
