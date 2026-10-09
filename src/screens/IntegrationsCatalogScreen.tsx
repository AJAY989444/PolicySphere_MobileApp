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
import { useIntegrationStore } from '../store/useIntegrationStore';
import { IntegrationStatusCard } from '../components/integrations/IntegrationStatusCard';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'IntegrationsCatalog'>;

export const IntegrationsCatalogScreen: React.FC<Props> = ({ navigation }) => {
  const { integrations, digiDocs, ckyc, isLoading, loadIntegrationData } = useIntegrationStore();

  useEffect(() => {
    loadIntegrationData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Integrations Layer (Module 34)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* DigiLocker Govt Integration Card */}
        <View style={styles.govCard}>
          <Text style={styles.govTitle}>🏛️ DigiLocker Official Government Portal Integrator</Text>
          <Text style={styles.govSub}>Direct OAuth2 fetch for UIDAI Aadhaar, PAN, and Transport DL.</Text>
          <View style={styles.docList}>
            {digiDocs.map((doc) => (
              <View key={doc.docId} style={styles.docRow}>
                <Text style={styles.docName}>• {doc.name}</Text>
                <Text style={styles.verifiedTag}>✓ Verified</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CKYC Central Registry Card */}
        {ckyc && (
          <View style={styles.ckycCard}>
            <Text style={styles.ckycTitle}>🆔 Central CKYC Registry Connector</Text>
            <Text style={styles.ckycText}>• KIN / CKYC Number: {ckyc.ckycNumber}</Text>
            <Text style={styles.ckycText}>• Name: {ckyc.fullName} (DOB: {ckyc.dob})</Text>
            <Text style={styles.ckycText}>• PAN Verified: {ckyc.panNumber}</Text>
            <Text style={styles.statusTag}>Status: {ckyc.verificationStatus}</Text>
          </View>
        )}

        {/* Integrations Catalog */}
        <Text style={styles.sectionTitle}>Empaneled Partner APIs ({integrations.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          integrations.map((item) => (
            <IntegrationStatusCard key={item.id} item={item} />
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
  govCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  govTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 14 },
  govSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2, marginBottom: 10 },
  docList: { gap: 6 },
  docRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0F172A', padding: 8, borderRadius: 6 },
  docName: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '600' },
  verifiedTag: { color: COLORS.accent, fontSize: 11, fontWeight: '700' },
  ckycCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  ckycTitle: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 14, marginBottom: 6 },
  ckycText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 2 },
  statusTag: { color: COLORS.accent, fontSize: 11, fontWeight: '700', marginTop: 6 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 10 },
});
