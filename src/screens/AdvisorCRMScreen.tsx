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
import { useCRMStore } from '../store/useCRMStore';
import { LeadStatusBadge } from '../components/crm/LeadStatusBadge';
import { AdvisorLead, LeadStage } from '../types/package4';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AdvisorCRM'>;

const STAGES: LeadStage[] = [
  'New Lead',
  'Requirement Analysis',
  'Quote Sent',
  'Underwriting',
  'Converted',
  'Lost',
];

export const AdvisorCRMScreen: React.FC<Props> = ({ navigation }) => {
  const { leads, commissionSummary, isLoading, loadCRMData, updateLeadStage, addInteractionNote, createLead } =
    useCRMStore();

  const [selectedLead, setSelectedLead] = useState<AdvisorLead | null>(null);

  // New Lead Modal State
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [custName, setCustName] = useState('');
  const [custMobile, setCustMobile] = useState('');
  const [category, setCategory] = useState('Health Insurance (Family Floater)');
  const [sumAssuredStr, setSumAssuredStr] = useState('1000000');
  const [creating, setCreating] = useState(false);

  // Interaction Note State
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    loadCRMData();
  }, []);

  const handleCreateLeadSubmit = async () => {
    if (!custName.trim() || !custMobile.trim()) {
      Alert.alert('Missing Details', 'Please enter customer name and contact number.');
      return;
    }
    const amount = parseFloat(sumAssuredStr);
    setCreating(true);
    await createLead(custName.trim(), custMobile.trim(), category, isNaN(amount) ? 1000000 : amount);
    setCreating(false);
    setNewLeadModal(false);
    setCustName('');
    setCustMobile('');
    Alert.alert('Lead Created', 'New prospect captured in advisor pipeline.');
  };

  const handleAddNoteSubmit = async () => {
    if (!selectedLead || !noteText.trim()) return;
    const lId = selectedLead.leadId;
    const txt = noteText.trim();
    setNoteText('');
    await addInteractionNote(lId, txt, 'Note');
    setSelectedLead((prev) => (prev ? { ...prev, notesCount: prev.notesCount + 1 } : null));
  };

  const activeLead = leads.find((l) => l.leadId === selectedLead?.leadId) || leads[0];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advisor CRM & Pipeline (Module 17)</Text>
        <TouchableOpacity style={styles.newLeadBtn} onPress={() => setNewLeadModal(true)}>
          <Text style={styles.newLeadText}>+ Add Lead</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Advisor KPI & Commission Summary Card */}
        {commissionSummary && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💼 Advisor Commission & Sales Dashboard</Text>
            <View style={styles.kpiGrid}>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Target Achieved</Text>
                <Text style={styles.kpiVal}>
                  ₹{(commissionSummary.achievedTarget / 1000).toFixed(0)}k / ₹
                  {(commissionSummary.totalTarget / 1000).toFixed(0)}k
                </Text>
              </View>

              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Paid Commission</Text>
                <Text style={[styles.kpiVal, { color: COLORS.accent }]}>
                  ₹{commissionSummary.paidCommission.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Pending Commission</Text>
                <Text style={[styles.kpiVal, { color: COLORS.warning }]}>
                  ₹{commissionSummary.pendingCommission.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Active Pipeline</Text>
                <Text style={styles.kpiVal}>{leads.length} Prospects</Text>
              </View>
            </View>
          </View>
        )}

        {/* Lead List & Kanban Pipeline */}
        <Text style={styles.sectionTitle}>Prospect Leads ({leads.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          leads.map((lead) => (
            <TouchableOpacity
              key={lead.leadId}
              style={[
                styles.leadCard,
                activeLead?.leadId === lead.leadId && styles.leadCardSelected,
              ]}
              onPress={() => setSelectedLead(lead)}
            >
              <View style={styles.leadHeader}>
                <View>
                  <Text style={styles.leadId}>{lead.leadId}</Text>
                  <Text style={styles.leadName}>{lead.customerName}</Text>
                </View>
                <LeadStatusBadge stage={lead.stage} />
              </View>

              <Text style={styles.leadCategory}>Interest: {lead.interestedCategory}</Text>
              <Text style={styles.leadEst}>
                Estimated Sum Assured: ₹{lead.estimatedSumAssured.toLocaleString('en-IN')} | Est. Comm: ₹{lead.estimatedCommission}
              </Text>

              <View style={styles.leadFooter}>
                <Text style={styles.contactInfo}>📞 {lead.mobile}</Text>
                <Text style={styles.contactInfo}>Last Log: {lead.lastContactedDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Lead Details & Interaction Activity Log View */}
        {activeLead && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Activity & Interaction Log: {activeLead.customerName}</Text>

            {/* Stage Selector */}
            <Text style={styles.stageLabel}>Change Pipeline Stage:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stageRow}>
              {STAGES.map((stg) => (
                <TouchableOpacity
                  key={stg}
                  style={[
                    styles.stageBtn,
                    activeLead.stage === stg && styles.stageBtnSelected,
                  ]}
                  onPress={() => updateLeadStage(activeLead.leadId, stg)}
                >
                  <Text
                    style={[
                      styles.stageBtnText,
                      activeLead.stage === stg && styles.stageBtnTextSelected,
                    ]}
                  >
                    {stg}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Interaction Log List */}
            <View style={styles.divider} />
            <Text style={styles.logListTitle}>Log Entries ({activeLead.interactionLogs.length})</Text>
            {activeLead.interactionLogs.map((log, idx) => (
              <View key={idx} style={styles.logBox}>
                <View style={styles.logHeader}>
                  <Text style={styles.logType}>[{log.type}]</Text>
                  <Text style={styles.logDate}>{log.date}</Text>
                </View>
                <Text style={styles.logText}>{log.note}</Text>
              </View>
            ))}

            {/* Quick Note Input */}
            <View style={styles.addNoteRow}>
              <TextInput
                style={styles.noteInput}
                placeholder="Log call summary or meeting notes..."
                placeholderTextColor="#64748B"
                value={noteText}
                onChangeText={setNoteText}
              />
              <TouchableOpacity style={styles.addNoteBtn} onPress={handleAddNoteSubmit}>
                <Text style={styles.addNoteText}>+ Log</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* New Lead Modal */}
      <Modal visible={newLeadModal} transparent animationType="slide" onRequestClose={() => setNewLeadModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Capture New Prospect Lead</Text>

            <Text style={styles.inputLabel}>Customer Full Name</Text>
            <TextInput style={styles.input} placeholder="e.g. Ramesh Kumar" placeholderTextColor="#64748B" value={custName} onChangeText={setCustName} />

            <Text style={styles.inputLabel}>Mobile Contact</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" placeholder="+91 98112 34567" placeholderTextColor="#64748B" value={custMobile} onChangeText={setCustMobile} />

            <Text style={styles.inputLabel}>Interested Insurance Product</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

            <Text style={styles.inputLabel}>Estimated Cover / Sum Assured (₹)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={sumAssuredStr} onChangeText={setSumAssuredStr} />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setNewLeadModal(false)}>
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitModalBtn} onPress={handleCreateLeadSubmit} disabled={creating}>
                {creating ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitModalText}>Save Lead</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  newLeadBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  newLeadText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  summaryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700', marginBottom: 10 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiItem: { width: '47%', backgroundColor: '#0F172A', padding: 10, borderRadius: 8 },
  kpiLabel: { color: COLORS.textSecondary, fontSize: 10 },
  kpiVal: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  leadCard: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  leadCardSelected: { borderColor: COLORS.accent, backgroundColor: '#0F172A' },
  leadHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadId: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 11 },
  leadName: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700', marginTop: 2 },
  leadCategory: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  leadEst: { color: COLORS.accent, fontSize: 11, fontWeight: '600', marginTop: 2 },
  leadFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#334155' },
  contactInfo: { color: '#64748B', fontSize: 11 },
  detailsCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginTop: 16, borderWidth: 1, borderColor: '#334155' },
  detailsTitle: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  stageLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 10, marginBottom: 4 },
  stageRow: { flexDirection: 'row', marginBottom: 12 },
  stageBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, backgroundColor: '#0F172A', marginRight: 6, borderWidth: 1, borderColor: '#334155' },
  stageBtnSelected: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  stageBtnText: { color: COLORS.textSecondary, fontSize: 11 },
  stageBtnTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 10 },
  logListTitle: { color: COLORS.primaryLight, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  logBox: { backgroundColor: '#0F172A', padding: 8, borderRadius: 6, marginBottom: 6 },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  logType: { color: COLORS.accent, fontSize: 10, fontWeight: '700' },
  logDate: { color: '#64748B', fontSize: 10 },
  logText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 2 },
  addNoteRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  noteInput: { flex: 1, backgroundColor: '#0F172A', borderRadius: 8, padding: 8, color: COLORS.textPrimary, fontSize: 12, borderWidth: 1, borderColor: '#334155' },
  addNoteBtn: { backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 14, justifyContent: 'center' },
  addNoteText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  inputLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155', borderRadius: 8, padding: 8, color: COLORS.textPrimary, fontSize: 14 },
  modalBtnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  cancelModalBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#334155', alignItems: 'center' },
  cancelModalText: { color: COLORS.textPrimary, fontWeight: '600' },
  submitModalBtn: { flex: 1.5, paddingVertical: 10, borderRadius: 8, backgroundColor: COLORS.accent, alignItems: 'center' },
  submitModalText: { color: '#FFFFFF', fontWeight: '700' },
});
