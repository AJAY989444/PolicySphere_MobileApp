import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useClaimsStore } from '../store/useClaimsStore';
import { ClaimTimelineProgress } from '../components/claims/ClaimTimelineProgress';
import { ClaimType } from '../types/package3';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ClaimsManagement'>;

export const ClaimsManagementScreen: React.FC<Props> = ({ navigation }) => {
  const { claims, isLoading, loadClaims, intimateClaim } = useClaimsStore();
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  // New Claim Intimation State
  const [modalVisible, setModalVisible] = useState(false);
  const [policyNum, setPolicyNum] = useState('POL-HLT-2026-99182');
  const [categoryName, setCategoryName] = useState('Health Insurance');
  const [claimType, setClaimType] = useState<ClaimType>('Cashless');
  const [amountStr, setAmountStr] = useState('45000');
  const [incidentDate, setIncidentDate] = useState('2026-10-04');
  const [hospitalInfo, setHospitalInfo] = useState('Fortis Escorts Heart Institute, New Delhi');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadClaims();
  }, []);

  const handleIntimateSubmit = async () => {
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid claim amount.');
      return;
    }
    setSubmitting(true);
    await intimateClaim(policyNum, categoryName, claimType, amount, incidentDate, hospitalInfo);
    setSubmitting(false);
    setModalVisible(false);
    Alert.alert('Claim Intimated!', `New Claim ID successfully registered on TPA desk.`);
  };

  const activeClaim = claims.find((c) => c.claimId === selectedClaimId) || claims[0];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Claims Management (Module 11)</Text>
        <TouchableOpacity style={styles.newClaimBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.newClaimText}>+ Intimate Claim</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Cashless Hospital Network Banner */}
        <View style={styles.networkBanner}>
          <Text style={styles.networkTitle}>🏥 12,500+ Cashless Network Hospitals</Text>
          <Text style={styles.networkSub}>
            Show your PolicySphere Digital E-Card at hospital TPA desk for instant pre-authorization approval.
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : claims.length === 0 ? (
          <Text style={styles.emptyText}>No active or past claims found.</Text>
        ) : (
          <>
            {/* Claims Tabs */}
            <Text style={styles.sectionTitle}>Active & Historical Claims ({claims.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
              {claims.map((claim) => (
                <TouchableOpacity
                  key={claim.claimId}
                  style={[
                    styles.tabCard,
                    activeClaim?.claimId === claim.claimId && styles.tabCardSelected,
                  ]}
                  onPress={() => setSelectedClaimId(claim.claimId)}
                >
                  <Text style={styles.tabClaimId}>{claim.claimId}</Text>
                  <Text style={styles.tabCategory}>{claim.categoryName}</Text>
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{claim.currentStage}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Selected Claim Overview Card */}
            {activeClaim && (
              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View>
                    <Text style={styles.claimTitle}>{activeClaim.claimId}</Text>
                    <Text style={styles.claimSub}>Policy #: {activeClaim.policyNumber}</Text>
                  </View>
                  <View style={styles.claimTypeBadge}>
                    <Text style={styles.claimTypeText}>{activeClaim.claimType}</Text>
                  </View>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Incident Date</Text>
                    <Text style={styles.infoVal}>{activeClaim.incidentDate}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Claimed Amount</Text>
                    <Text style={styles.infoVal}>₹{activeClaim.claimedAmount.toLocaleString('en-IN')}</Text>
                  </View>

                  {activeClaim.approvedAmount !== undefined && (
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Approved Payout</Text>
                      <Text style={[styles.infoVal, { color: COLORS.accent }]}>
                        ₹{activeClaim.approvedAmount.toLocaleString('en-IN')}
                      </Text>
                    </View>
                  )}

                  {activeClaim.surveyorName && (
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Assigned Surveyor</Text>
                      <Text style={styles.infoVal}>{activeClaim.surveyorName}</Text>
                      <Text style={styles.surveyorMobile}>{activeClaim.surveyorMobile}</Text>
                    </View>
                  )}
                </View>

                {activeClaim.hospitalName && (
                  <View style={styles.hospitalCard}>
                    <Text style={styles.hospitalLabel}>Hospital Desk / Location:</Text>
                    <Text style={styles.hospitalVal}>{activeClaim.hospitalName}</Text>
                  </View>
                )}

                {/* Timeline Component */}
                <View style={styles.divider} />
                <ClaimTimelineProgress
                  currentStage={activeClaim.currentStage}
                  timeline={activeClaim.timeline}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Intimate Claim Modal */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Intimate New Claim (Instant Desk)</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.inputLabel}>Policy Number</Text>
              <TextInput style={styles.modalInput} value={policyNum} onChangeText={setPolicyNum} />

              <Text style={styles.inputLabel}>Insurance Category</Text>
              <TextInput style={styles.modalInput} value={categoryName} onChangeText={setCategoryName} />

              <Text style={styles.inputLabel}>Claim Type</Text>
              <View style={styles.claimTypeRow}>
                {(['Cashless', 'Reimbursement', 'Vehicle', 'Travel'] as ClaimType[]).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.typeBtn, claimType === t && styles.typeBtnSelected]}
                    onPress={() => setClaimType(t)}
                  >
                    <Text style={[styles.typeBtnText, claimType === t && styles.typeBtnTextSelected]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Claimed Amount (₹)</Text>
              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                value={amountStr}
                onChangeText={setAmountStr}
              />

              <Text style={styles.inputLabel}>Incident / Admission Date</Text>
              <TextInput style={styles.modalInput} value={incidentDate} onChangeText={setIncidentDate} />

              <Text style={styles.inputLabel}>Hospital / Garage / Incident Spot Details</Text>
              <TextInput style={styles.modalInput} value={hospitalInfo} onChangeText={setHospitalInfo} />
            </ScrollView>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitModalBtn} onPress={handleIntimateSubmit} disabled={submitting}>
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitModalText}>Submit Intimation</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
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
  newClaimBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  newClaimText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  networkBanner: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  networkTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  networkSub: { color: COLORS.borderLight, fontSize: 12, marginTop: 4, lineHeight: 16 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  tabsRow: { flexDirection: 'row', marginBottom: 16 },
  tabCard: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tabCardSelected: { borderColor: COLORS.accent, backgroundColor: '#0F172A' },
  tabClaimId: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 13 },
  tabCategory: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  tabBadge: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 6, alignSelf: 'flex-start' },
  tabBadgeText: { color: COLORS.primaryLight, fontSize: 10, fontWeight: '700' },
  detailCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#334155' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  claimTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700' },
  claimSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  claimTypeBadge: { backgroundColor: COLORS.accentDark, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  claimTypeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 },
  infoItem: { width: '47%', backgroundColor: '#0F172A', padding: 10, borderRadius: 8 },
  infoLabel: { color: COLORS.textSecondary, fontSize: 11 },
  infoVal: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 },
  surveyorMobile: { color: COLORS.accent, fontSize: 11, marginTop: 2 },
  hospitalCard: { backgroundColor: '#0F172A', padding: 12, borderRadius: 8, marginTop: 12, borderLeftWidth: 3, borderLeftColor: COLORS.warning },
  hospitalLabel: { color: COLORS.warning, fontSize: 11, fontWeight: '700' },
  hospitalVal: { color: COLORS.textPrimary, fontSize: 13, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 14 },
  inputLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 10, marginBottom: 4 },
  modalInput: { backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155', borderRadius: 8, padding: 10, color: COLORS.textPrimary, fontSize: 14 },
  claimTypeRow: { flexDirection: 'row', gap: 6 },
  typeBtn: { flex: 1, paddingVertical: 8, borderRadius: 6, backgroundColor: '#0F172A', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  typeBtnSelected: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  typeBtnText: { color: COLORS.textSecondary, fontSize: 11 },
  typeBtnTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  modalBtnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  cancelModalBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#334155', alignItems: 'center' },
  cancelModalText: { color: COLORS.textPrimary, fontWeight: '600' },
  submitModalBtn: { flex: 1.5, paddingVertical: 12, borderRadius: 8, backgroundColor: COLORS.accent, alignItems: 'center' },
  submitModalText: { color: '#FFFFFF', fontWeight: '700' },
});
