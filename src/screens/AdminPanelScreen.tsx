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
import { useAdminStore } from '../store/useAdminStore';
import { OperationsQueueCard } from '../components/admin/OperationsQueueCard';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminPanel'>;

export const AdminPanelScreen: React.FC<Props> = ({ navigation }) => {
  const { queue, insurers, coupons, isLoading, loadAdminData, reviewItem, toggleCoupon } =
    useAdminStore();
  const [activeTab, setActiveTab] = useState<'Queue' | 'Insurers' | 'Coupons'>('Queue');

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Control Panel (Module 20)</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Tabs Bar */}
      <View style={styles.tabsRow}>
        {(['Queue', 'Insurers', 'Coupons'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'Queue' ? `Underwriting Queue (${queue.length})` : tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : activeTab === 'Queue' ? (
          <View>
            <Text style={styles.sectionTitle}>Operations Review & Approval Queue</Text>
            {queue.map((item) => (
              <OperationsQueueCard
                key={item.id}
                item={item}
                onReview={(id, action, notes) => {
                  reviewItem(id, action, notes);
                  Alert.alert('Decision Recorded', `${item.customerName}'s ${item.type} was ${action}.`);
                }}
              />
            ))}
          </View>
        ) : activeTab === 'Insurers' ? (
          <View>
            <Text style={styles.sectionTitle}>Empaneled Insurers ({insurers.length})</Text>
            {insurers.map((ins) => (
              <View key={ins.id} style={styles.insurerCard}>
                <View style={styles.insHeader}>
                  <Text style={styles.insName}>{ins.name}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{ins.status}</Text>
                  </View>
                </View>
                <Text style={styles.insSub}>
                  Code: {ins.code} • Claim Settlement Ratio: {ins.claimSettlementRatio}%
                </Text>
                <Text style={styles.insProd}>Active Digital Products: {ins.activeProductsCount}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Promo Coupons & Discounts ({coupons.length})</Text>
            {coupons.map((c) => (
              <View key={c.code} style={styles.couponCard}>
                <View style={styles.cHeader}>
                  <Text style={styles.cCode}>{c.code}</Text>
                  <TouchableOpacity
                    style={[styles.toggleBtn, c.isActive ? styles.btnActive : styles.btnInactive]}
                    onPress={() => toggleCoupon(c.code)}
                  >
                    <Text style={styles.toggleText}>{c.isActive ? 'Active' : 'Disabled'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cDesc}>
                  {c.discountPercentage}% OFF (Max ₹{c.maxDiscount}) on {c.validCategory}
                </Text>
                <Text style={styles.cExp}>Valid until: {c.expiryDate}</Text>
              </View>
            ))}
          </View>
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
  tabsRow: { flexDirection: 'row', backgroundColor: '#1E293B', paddingHorizontal: 16, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#334155', gap: 8 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#0F172A', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  tabBtnActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  tabText: { color: COLORS.textSecondary, fontSize: 11 },
  tabTextActive: { color: '#FFFFFF', fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  insurerCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  insHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  insName: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14, flex: 1 },
  statusBadge: { backgroundColor: COLORS.accent, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  insSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  insProd: { color: COLORS.primaryLight, fontSize: 11, marginTop: 4, fontWeight: '600' },
  couponCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  cHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cCode: { color: COLORS.accent, fontWeight: '800', fontSize: 16 },
  toggleBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  btnActive: { backgroundColor: COLORS.accent },
  btnInactive: { backgroundColor: '#334155' },
  toggleText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  cDesc: { color: COLORS.textPrimary, fontSize: 13, marginTop: 4 },
  cExp: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
});
