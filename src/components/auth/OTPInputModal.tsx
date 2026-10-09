import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

interface OTPInputModalProps {
  visible: boolean;
  mobileNumber: string;
  onVerify: (otp: string) => void;
  onCancel: () => void;
}

export const OTPInputModal: React.FC<OTPInputModalProps> = ({
  visible,
  mobileNumber,
  onVerify,
  onCancel,
}) => {
  const [otp, setOtp] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Mobile OTP Verification</Text>
          <Text style={styles.subtitle}>
            Enter 4-digit code sent to <Text style={styles.bold}>{mobileNumber}</Text>
          </Text>

          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="1234"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.hintText}>Demo OTP: 1234</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.verifyButton, otp.length < 4 && styles.disabledButton]}
              disabled={otp.length < 4}
              onPress={() => onVerify(otp)}
            >
              <Text style={styles.verifyText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  bold: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  otpInput: {
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 8,
    width: 160,
    height: 48,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 8,
    marginBottom: 8,
  },
  hintText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 8,
  },
  cancelText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  verifyButton: {
    flex: 1.5,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  verifyText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
