import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { PaymentMethod, PaymentTransaction } from '../../types/package2';
import { paymentService } from '../../services/paymentService';

interface PaymentGatewayModalProps {
  visible: boolean;
  proposalId: string;
  amount: number;
  onSuccess: (txn: PaymentTransaction) => void;
  onClose: () => void;
}

const METHODS: Array<{ id: PaymentMethod; label: string; icon: string }> = [
  { id: 'UPI', label: 'UPI / GPay / PhonePe / QR', icon: '📱' },
  { id: 'CreditCard', label: 'Credit Card', icon: '💳' },
  { id: 'DebitCard', label: 'Debit Card', icon: '💳' },
  { id: 'NetBanking', label: 'Net Banking (HDFC, SBI, ICICI)', icon: '🏛️' },
  { id: 'EMI', label: 'No-Cost EMI (3/6 Months)', icon: '📅' },
  { id: 'AutoDebit', label: 'Auto-Debit eNACH Mandate', icon: '🔄' },
];

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  visible,
  proposalId,
  amount,
  onSuccess,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('user@upi');
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    setLoading(true);
    const txn = await paymentService.processPayment(proposalId, amount, selectedMethod);
    setLoading(false);
    onSuccess(txn);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Payment Gateway Abstraction</Text>
              <Text style={styles.amountText}>Amount Payable: ₹{amount.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Select Payment Method</Text>
          {METHODS.map((m) => {
            const isSelected = selectedMethod === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodRow, isSelected && styles.methodRowActive]}
                onPress={() => setSelectedMethod(m.id)}
              >
                <Text style={styles.methodIcon}>{m.icon}</Text>
                <Text style={[styles.methodLabel, isSelected && styles.methodLabelActive]}>
                  {m.label}
                </Text>
                {isSelected && <Text style={styles.radioChecked}>●</Text>}
              </TouchableOpacity>
            );
          })}

          {selectedMethod === 'UPI' && (
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Enter VPA / UPI ID</Text>
              <TextInput
                style={styles.textInput}
                value={upiId}
                onChangeText={setUpiId}
                placeholder="username@upi"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.payButton, loading && styles.disabledButton]}
            disabled={loading}
            onPress={handlePayNow}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.textPrimary} />
            ) : (
              <Text style={styles.payButtonText}>
                Pay ₹{amount.toLocaleString('en-IN')} via {selectedMethod} →
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  amountText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryLight,
    marginTop: 2,
  },
  closeText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    marginTop: 12,
    marginBottom: 8,
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodRowActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  methodIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  methodLabel: {
    ...TYPOGRAPHY.bodyMedium,
    flex: 1,
    color: COLORS.textPrimary,
  },
  methodLabelActive: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  radioChecked: {
    color: COLORS.accent,
    fontSize: 16,
  },
  inputBox: {
    marginTop: 8,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.bodyMedium,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  payButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
