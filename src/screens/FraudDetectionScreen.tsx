import React, { useEffect, useState } from 'react';
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
import { useFraudStore } from '../store/useFraudStore';
import { FraudAlertBanner } from '../components/fraud/FraudAlertBanner';
import { FraudCheckResult } from '../types/package4';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'FraudDetection'>;

export const FraudDetectionScreen: React.FC<Props> = ({ navigation }) => {
  const { auditLogs, isLoading, loadAuditLogs, evaluateItem } = useFraudStore();
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const handleSimulateScan = async () => {
    setEvaluating(true);
    const result = await evaluateItem('PROP-MTR-2026-9910', 'Anil Mehta (Live Scan)');
    setEvaluating(false);
    Alert.alert(
      'Fraud Scan Evaluation Complete',
      `Proposal scanned with overall Risk Score: ${result.overallRiskScore}/100 (${result.status})`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fraud Detection Radar (Module 33)</Text>
        <TouchableOpacity style={styles.scanBtn} onPress={handleSimulateScan} disabled={evaluating}>
          {evaluating ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.scanBtnText}>⚡ Scan New</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Security & Risk Engine Banner */}
        <View style={styles.riskBanner}>
          <Text style={styles.bannerTitle}>🛡️ Enterprise Anti-Fraud & Risk Scoring Engine</Text>
          <Text style={styles.bannerSub}>
            Real-time evaluation of device fingerprinting, IP velocity, OCR document alterations, duplicate identity hashes, and geo-location anomalies.
          </Text>
        </View>

        {/* Audit Logs List */}
        <Text style={styles.sectionTitle}>Fraud Audit & Operations Review Queue ({auditLogs.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          auditLogs.map((audit) => (
            <View key={audit.evaluationId} style={styles.auditCard}>
              <View style={styles.auditHeader}>
                <View>
                  <Text style={styles.evalId}>{audit.evaluationId}</Text>
                  <Text style={styles.targetId}>Target: {audit.proposalOrClaimId}</Text>
                  <Text style={styles.custName}>{audit.customerName}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    audit.status === 'Clean'
                      ? { backgroundColor: COLORS.accent }
                      : { backgroundColor: COLORS.error },
                  ]}
                >
                  <Text style={styles.statusText}>{audit.status}</Text>
                </View>
              </View>

              {/* Fraud Risk Banner */}
              <View style={{ marginTop: 12 }}>
                <FraudAlertBanner
                  riskScore={audit.overallRiskScore}
                  riskLevel={audit.riskLevel}
                  flagsCount={audit.flagsTriggered.length}
                />
              </View>

              {/* Device Fingerprint Details */}
              <View style={styles.fingerprintBox}>
                <Text style={styles.fpTitle}>💻 Hardware & IP Device Fingerprint:</Text>
                <Text style={styles.fpText}>• IP: {audit.deviceFingerprint.ipAddress}</Text>
                <Text style={styles.fpText}>• Device Hash: {audit.deviceFingerprint.deviceId}</Text>
                <Text style={styles.fpText}>• Geo City: {audit.deviceFingerprint.geoCity}</Text>
                <Text style={styles.fpText}>
                  • VPN / Proxy Detected:{' '}
                  <Text style={{ color: audit.deviceFingerprint.vpnDetected ? COLORS.error : COLORS.accent, fontWeight: '700' }}>
                    {audit.deviceFingerprint.vpnDetected ? 'YES ⚠️' : 'NO ✓'}
                  </Text>
                </Text>
                <Text style={styles.fpText}>• 24h Velocity Count: {audit.velocityCount24h} requests</Text>
                <Text style={styles.fpText}>• KYC Doc Authenticity: {audit.kycDocAuthenticityScore}% match</Text>
              </View>

              {/* Triggered Rule Flags */}
              {audit.flagsTriggered.length > 0 && (
                <View style={styles.flagsBox}>
                  <Text style={styles.flagsTitle}>🚨 Triggered Security Rule Flags:</Text>
                  {audit.flagsTriggered.map((flag, idx) => (
                    <View key={idx} style={styles.flagItem}>
                      <Text style={styles.flagRule}>• [{flag.severity}] {flag.ruleName}</Text>
                      <Text style={styles.flagDesc}>{flag.description}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
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
  scanBtn: { backgroundColor: COLORS.error, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  scanBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  riskBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerTitle: { color: COLORS.error, fontWeight: '700', fontSize: 14 },
  bannerSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  auditCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  auditHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  evalId: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 12 },
  targetId: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14, marginTop: 2 },
  custName: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  fingerprintBox: { backgroundColor: '#0F172A', padding: 10, borderRadius: 8, marginTop: 8 },
  fpTitle: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  fpText: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 16 },
  flagsBox: { backgroundColor: '#451A1A', padding: 10, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: COLORS.error },
  flagsTitle: { color: '#FCA5A5', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  flagItem: { marginBottom: 4 },
  flagRule: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  flagDesc: { color: '#FECACA', fontSize: 11, marginLeft: 8 },
});
