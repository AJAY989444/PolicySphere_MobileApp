import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { PendingUnderwritingItem } from '../../types/package5';
import { COLORS } from '../../constants/colors';

interface Props {
  item: PendingUnderwritingItem;
  onReview: (id: string, action: 'Approved' | 'Rejected', notes: string) => void;
}

export const OperationsQueueCard: React.FC<Props> = ({ item, onReview }) => {
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type} Review</Text>
        </View>
        <Text style={styles.scoreText}>Risk Score: {item.riskScore}/100</Text>
      </View>

      <Text style={styles.custName}>{item.customerName}</Text>
      <Text style={styles.numText}>{item.policyOrClaimNumber} • {item.categoryName}</Text>
      <Text style={styles.amountText}>Amount: ₹{item.amount.toLocaleString('en-IN')}</Text>

      {item.status === 'Pending Review' ? (
        <View style={styles.actionBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter underwriting review notes..."
            placeholderTextColor="#64748B"
            value={notes}
            onChangeText={setNotes}
          />
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => onReview(item.id, 'Rejected', notes || 'Rejected by Ops Manager')}
            >
              <Text style={styles.btnText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => onReview(item.id, 'Approved', notes || 'Approved by Ops Manager')}
            >
              <Text style={styles.btnText}>Approve & Issue</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.reviewedBox}>
          <Text style={[styles.statusText, item.status === 'Approved' ? { color: COLORS.accent } : { color: COLORS.error }]}>
            Status: {item.status}
          </Text>
          {item.reviewerNotes && <Text style={styles.notesText}>Notes: {item.reviewerNotes}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  typeBadge: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  typeText: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '700' },
  scoreText: { color: COLORS.warning, fontSize: 11, fontWeight: '700' },
  custName: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginTop: 6 },
  numText: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  amountText: { color: COLORS.accent, fontSize: 13, fontWeight: '700', marginTop: 4 },
  actionBox: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#334155' },
  input: { backgroundColor: '#0F172A', borderRadius: 8, padding: 8, color: COLORS.textPrimary, fontSize: 12, borderWidth: 1, borderColor: '#334155', marginBottom: 10 },
  btnRow: { flexDirection: 'row', gap: 10 },
  rejectBtn: { flex: 1, backgroundColor: COLORS.error, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  approveBtn: { flex: 1.5, backgroundColor: COLORS.accent, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  reviewedBox: { marginTop: 10, backgroundColor: '#0F172A', padding: 10, borderRadius: 8 },
  statusText: { fontWeight: '700', fontSize: 12 },
  notesText: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
});
