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
import { useMicroserviceStore } from '../store/useMicroserviceStore';
import { ServiceHealthBadge } from '../components/microservices/ServiceHealthBadge';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'MicroservicesDashboard'>;

export const MicroservicesDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { services, isLoading, loadServices, pingCheck } = useMicroserviceStore();
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [isPingingAll, setIsPingingAll] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const handleCardPing = async (id: string, name: string) => {
    setPingingId(id);
    await pingCheck(id);
    setPingingId(null);

    const updatedService = useMicroserviceStore.getState().services.find((s) => s.id === id);
    if (updatedService) {
      Alert.alert(
        'Health Ping Response',
        `Service: ${name}\nLatency: ${updatedService.latencyMs}ms\nStatus: ${updatedService.health}\nCircuit Breaker: ${updatedService.circuitBreaker}`
      );
    }
  };

  const handlePingAll = async () => {
    setIsPingingAll(true);
    for (const svc of services) {
      await pingCheck(svc.id);
    }
    setIsPingingAll(false);
    Alert.alert('Ping Complete', 'All 24 Microservices pinged successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Microservices Hub (Module 22)</Text>
        <TouchableOpacity style={styles.pingAllBtn} onPress={handlePingAll} disabled={isPingingAll}>
          {isPingingAll ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.pingAllText}>⚡ Ping All</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Microservices System Banner */}
        <View style={styles.sysBanner}>
          <Text style={styles.bannerTitle}>🌐 24 Decentralised Microservices Architecture</Text>
          <Text style={styles.bannerSub}>
            Kubernetes & Istio Service Mesh monitored via Circuit Breakers and real-time health discovery pinging. Tap any card to test response latency!
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Registered Microservices ({services.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          services.map((svc) => (
            <TouchableOpacity
              key={svc.id}
              style={[
                styles.serviceCard,
                pingingId === svc.id && styles.serviceCardActive,
              ]}
              onPress={() => handleCardPing(svc.id, svc.name)}
              disabled={pingingId === svc.id}
            >
              <View style={styles.svcHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.svcName}>{svc.name}</Text>
                  <Text style={styles.svcCode}>Code: {svc.code} • {svc.endpoint}</Text>
                </View>
                {pingingId === svc.id ? (
                  <ActivityIndicator color={COLORS.accent} size="small" />
                ) : (
                  <ServiceHealthBadge health={svc.health} circuitBreaker={svc.circuitBreaker} />
                )}
              </View>

              <View style={styles.svcFooter}>
                <Text style={styles.latencyText}>⚡ Latency: {svc.latencyMs}ms (Tap to Ping)</Text>
                <Text style={styles.uptimeText}>Uptime: {svc.uptimePercent}%</Text>
              </View>
            </TouchableOpacity>
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
  pingAllBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  pingAllText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  sysBanner: {
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
  serviceCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  serviceCardActive: { borderColor: COLORS.accent, backgroundColor: '#0F172A' },
  svcHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  svcName: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
  svcCode: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  svcFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#334155' },
  latencyText: { color: COLORS.accent, fontSize: 11, fontWeight: '600' },
  uptimeText: { color: '#64748B', fontSize: 11 },
});
