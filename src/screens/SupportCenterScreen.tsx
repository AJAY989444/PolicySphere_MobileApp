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
import { useSupportStore } from '../store/useSupportStore';
import { AIChatAssistantModal } from '../components/support/AIChatAssistantModal';
import { SupportTicket } from '../types/package3';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SupportCenter'>;

export const SupportCenterScreen: React.FC<Props> = ({ navigation }) => {
  const { tickets, articles, isLoading, loadSupportData, createTicket, addMessage } =
    useSupportStore();
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);

  // New Ticket Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Claim Query');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Reply State
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    loadSupportData();
  }, []);

  const handleCreateTicketSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Missing Details', 'Please fill in subject and issue description.');
      return;
    }
    setSubmitting(true);
    await createTicket(subject.trim(), category, description.trim());
    setSubmitting(false);
    setNewTicketModal(false);
    setSubject('');
    setDescription('');
    Alert.alert('Ticket Created', 'Your support ticket was submitted with 24h SLA guarantee.');
  };

  const handleSendReply = async () => {
    if (!activeTicket || !replyText.trim()) return;
    const tktId = activeTicket.ticketId;
    const txt = replyText.trim();
    setReplyText('');
    await addMessage(tktId, txt);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Center (Module 18)</Text>
        <TouchableOpacity style={styles.aiBotBtn} onPress={() => setAiModalVisible(true)}>
          <Text style={styles.aiBotText}>🤖 24/7 AI Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* SLA Guarantee Banner */}
        <View style={styles.slaBanner}>
          <Text style={styles.slaTitle}>⚡ 24-Hour Resolution SLA Commitment</Text>
          <Text style={styles.slaSub}>
            All grievances are tracked under strict IRDAI-compliant SLA response timers with dedicated escalations.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryAction} onPress={() => setNewTicketModal(true)}>
            <Text style={styles.primaryActionText}>+ Raise Support Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction} onPress={() => setAiModalVisible(true)}>
            <Text style={styles.secondaryActionText}>Ask AI Assistant</Text>
          </TouchableOpacity>
        </View>

        {/* Open Support Tickets Section */}
        <Text style={styles.sectionTitle}>Your Support Tickets ({tickets.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : tickets.length === 0 ? (
          <Text style={styles.emptyText}>No tickets logged yet.</Text>
        ) : (
          tickets.map((tkt) => (
            <TouchableOpacity
              key={tkt.ticketId}
              style={styles.tktCard}
              onPress={() => setActiveTicket(tkt)}
            >
              <View style={styles.tktHeader}>
                <Text style={styles.tktId}>{tkt.ticketId}</Text>
                <View
                  style={[
                    styles.tktStatusBadge,
                    tkt.status === 'Resolved' && { backgroundColor: COLORS.accent },
                    tkt.status === 'In Progress' && { backgroundColor: COLORS.primaryLight },
                  ]}
                >
                  <Text style={styles.tktStatusText}>{tkt.status}</Text>
                </View>
              </View>

              <Text style={styles.tktSubject}>{tkt.subject}</Text>
              <Text style={styles.tktCategory}>Category: {tkt.category}</Text>

              <View style={styles.tktFooter}>
                <Text style={styles.tktSla}>
                  ⏱ SLA Remaining: {tkt.slaHoursRemaining > 0 ? `${tkt.slaHoursRemaining}h` : 'Resolved'}
                </Text>
                <Text style={styles.tktDate}>{tkt.createdDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Knowledge Base Articles Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Knowledge Base & FAQs</Text>
        {articles.map((art) => (
          <View key={art.id} style={styles.kbCard}>
            <View style={styles.kbHeader}>
              <Text style={styles.kbCat}>{art.category}</Text>
              <Text style={styles.kbTime}>{art.readTime}</Text>
            </View>
            <Text style={styles.kbTitle}>{art.title}</Text>
            <Text style={styles.kbSummary}>{art.summary}</Text>
          </View>
        ))}
      </ScrollView>

      {/* AI Assistant Modal */}
      <AIChatAssistantModal visible={aiModalVisible} onClose={() => setAiModalVisible(false)} />

      {/* Raise Ticket Modal */}
      <Modal visible={newTicketModal} transparent animationType="slide" onRequestClose={() => setNewTicketModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Raise Support Ticket</Text>
            <Text style={styles.modalSub}>Guaranteed 24-hour response SLA window.</Text>

            <Text style={styles.inputLabel}>Subject / Topic</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Endorsement change in nominee details"
              placeholderTextColor="#64748B"
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={styles.inputLabel}>Grievance Category</Text>
            <View style={styles.catRow}>
              {(['Claim Query', 'Policy Endorsement', 'Payment Failure', 'General'] as SupportTicket['category'][]).map(
                (c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.catBtn, category === c && styles.catBtnSelected]}
                    onPress={() => setCategory(c)}
                  >
                    <Text style={[styles.catBtnText, category === c && styles.catBtnTextSelected]}>{c}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text style={styles.inputLabel}>Detailed Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              placeholder="Explain issue details..."
              placeholderTextColor="#64748B"
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setNewTicketModal(false)}>
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitModalBtn} onPress={handleCreateTicketSubmit} disabled={submitting}>
                {submitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitModalText}>Submit Ticket</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Ticket Details & Chat Modal */}
      {activeTicket && (
        <Modal transparent animationType="slide" visible={!!activeTicket} onRequestClose={() => setActiveTicket(null)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { height: '80%' }]}>
              <View style={styles.tktModalHeader}>
                <View>
                  <Text style={styles.modalTitle}>{activeTicket.ticketId}</Text>
                  <Text style={styles.modalSub}>{activeTicket.subject}</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTicket(null)}>
                  <Text style={{ color: COLORS.textSecondary, fontSize: 18, fontWeight: '700' }}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ flex: 1, marginVertical: 12 }}>
                {activeTicket.messages.map((m, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.chatMsgBox,
                      m.sender === 'Customer' ? styles.customerMsg : styles.agentMsg,
                    ]}
                  >
                    <Text style={styles.senderText}>{m.sender}</Text>
                    <Text style={styles.chatMsgText}>{m.text}</Text>
                    <Text style={styles.chatMsgTime}>{m.timestamp}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.replyBar}>
                <TextInput
                  style={styles.replyInput}
                  placeholder="Type reply to agent..."
                  placeholderTextColor="#64748B"
                  value={replyText}
                  onChangeText={setReplyText}
                />
                <TouchableOpacity style={styles.replySendBtn} onPress={handleSendReply}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  aiBotBtn: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  aiBotText: { color: COLORS.primaryLight, fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  slaBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  slaTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 14 },
  slaSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  primaryAction: { flex: 1, backgroundColor: COLORS.accent, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  primaryActionText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  secondaryAction: { flex: 1, backgroundColor: '#1E293B', paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primaryLight },
  secondaryActionText: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 13 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  tktCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  tktHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tktId: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 14 },
  tktStatusBadge: { backgroundColor: COLORS.warning, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tktStatusText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  tktSubject: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '600', marginTop: 6 },
  tktCategory: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  tktFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#334155' },
  tktSla: { color: COLORS.accent, fontSize: 11, fontWeight: '600' },
  tktDate: { color: '#64748B', fontSize: 11 },
  kbCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  kbHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  kbCat: { color: COLORS.accent, fontSize: 11, fontWeight: '700' },
  kbTime: { color: COLORS.textSecondary, fontSize: 11 },
  kbTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700', marginTop: 4 },
  kbSummary: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  modalSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2, marginBottom: 14 },
  inputLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155', borderRadius: 8, padding: 10, color: COLORS.textPrimary, fontSize: 14 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  catBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155' },
  catBtnSelected: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  catBtnText: { color: COLORS.textSecondary, fontSize: 11 },
  catBtnTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  modalBtnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  cancelModalBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#334155', alignItems: 'center' },
  cancelModalText: { color: COLORS.textPrimary, fontWeight: '600' },
  submitModalBtn: { flex: 1.5, paddingVertical: 12, borderRadius: 8, backgroundColor: COLORS.accent, alignItems: 'center' },
  submitModalText: { color: '#FFFFFF', fontWeight: '700' },
  tktModalHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#334155', paddingBottom: 10 },
  chatMsgBox: { padding: 10, borderRadius: 8, marginBottom: 8, maxWidth: '85%' },
  customerMsg: { alignSelf: 'flex-end', backgroundColor: COLORS.primaryLight },
  agentMsg: { alignSelf: 'flex-start', backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155' },
  senderText: { fontSize: 10, color: COLORS.accent, fontWeight: '700' },
  chatMsgText: { color: '#FFFFFF', fontSize: 13, marginTop: 2 },
  chatMsgTime: { fontSize: 9, color: '#94A3B8', marginTop: 4, alignSelf: 'flex-end' },
  replyBar: { flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 10 },
  replyInput: { flex: 1, backgroundColor: '#0F172A', borderRadius: 8, padding: 8, color: COLORS.textPrimary, borderWidth: 1, borderColor: '#334155' },
  replySendBtn: { backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
});
