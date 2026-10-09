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
import { useSecurityStore } from '../store/useSecurityStore';
import { DataMaskingPreviewCard } from '../components/security/DataMaskingPreviewCard';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SecurityVault'>;

export const SecurityVaultScreen: React.FC<Props> = ({ navigation }) => {
  const { fields, isLoading, loadSecurityData } = useSecurityStore();

  useEffect(() => {
    loadSecurityData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enterprise Security (Module 26)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Security Vault Banner */}
        <View style={styles.vaultBanner}>
          <Text style={styles.bannerTitle}>🔐 Zero-Trust AES-256 Field Encryption Vault</Text>
          <Text style={styles.bannerSub}>
            TLS 1.3 Transport Security • JWT OAuth2 Token Hygiene • PII Data Masking & Tokenization at rest.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Field Encryption & Data Masking Inspector</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          fields.map((f, idx) => <DataMaskingPreviewCard key={idx} field={f} />)
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
  vaultBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 14 },
  bannerSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
});
