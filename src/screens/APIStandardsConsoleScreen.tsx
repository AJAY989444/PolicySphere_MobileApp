import React, { useEffect, useState } from 'react';
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
import { useAPIStore } from '../store/useAPIStore';
import { APIInspectorConsole } from '../components/api/APIInspectorConsole';
import { APIProtocol } from '../types/package6';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'APIStandardsConsole'>;

export const APIStandardsConsoleScreen: React.FC<Props> = ({ navigation }) => {
  const { trafficLogs, rateLimit, isLoading, loadAPIData, simulateRequest } = useAPIStore();
  const [selectedProtocol, setSelectedProtocol] = useState<APIProtocol>('REST');

  useEffect(() => {
    loadAPIData();
  }, []);

  const handleRunSimulatedCall = async () => {
    const endpoint =
      selectedProtocol === 'GraphQL'
        ? '/graphql'
        : selectedProtocol === 'WebSocket'
        ? 'wss://gateway.policysphere.io/ws/quotes'
        : '/api/v1/policies/active';
    await simulateRequest(selectedProtocol, endpoint);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>API Standards & Inspector (Module 23)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Rate Limit & Hygiene Card */}
        {rateLimit && (
          <View style={styles.rateCard}>
            <View style={styles.rateHeader}>
              <Text style={styles.rateTitle}>⚡ Rate Limiting & Auth Interceptor Status</Text>
              <Text style={styles.rateVal}>{rateLimit.remaining} / {rateLimit.limitPerMinute} Left</Text>
            </View>
            <Text style={styles.rateSub}>
              JWT OAuth2 Bearer token injected • Idempotency key headers enabled • Auto exponential backoff retry active.
            </Text>
          </View>
        )}

        {/* Protocol Switcher & Simulator */}
        <Text style={styles.sectionTitle}>Simulate Multi-Protocol API Call</Text>
        <View style={styles.protoRow}>
          {(['REST', 'GraphQL', 'WebSocket', 'gRPC'] as APIProtocol[]).map((proto) => (
            <TouchableOpacity
              key={proto}
              style={[styles.protoBtn, selectedProtocol === proto && styles.protoBtnActive]}
              onPress={() => setSelectedProtocol(proto)}
            >
              <Text style={[styles.protoText, selectedProtocol === proto && styles.protoTextActive]}>
                {proto}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.sendBtn} onPress={handleRunSimulatedCall}>
          <Text style={styles.sendBtnText}>⚡ Execute {selectedProtocol} Request</Text>
        </TouchableOpacity>

        {/* API Inspector Console */}
        <View style={{ marginTop: 16 }}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.accent} />
          ) : (
            <APIInspectorConsole logs={trafficLogs} />
          )}
        </View>
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
  rateCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  rateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rateTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 13 },
  rateVal: { color: COLORS.textPrimary, fontWeight: '800', fontSize: 13 },
  rateSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  protoRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  protoBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#1E293B', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  protoBtnActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  protoText: { color: COLORS.textSecondary, fontSize: 11 },
  protoTextActive: { color: '#FFFFFF', fontWeight: '700' },
  sendBtn: { backgroundColor: COLORS.accent, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  sendBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
});
