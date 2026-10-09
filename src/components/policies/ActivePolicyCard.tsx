import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { IssuedPolicy } from '../../types/package2';
import { downloadPolicyPdf } from '../../utils/downloadPdf';

interface ActivePolicyCardProps {
  policy: IssuedPolicy;
  onRenew: (policy: IssuedPolicy) => void;
  onViewReceipt: (policy: IssuedPolicy) => void;
}

export const ActivePolicyCard: React.FC<ActivePolicyCardProps> = ({
  policy,
  onRenew,
  onViewReceipt,
}) => {
  const handleDownloadPdf = () => {
    downloadPolicyPdf(
      policy.policyNumber,
      policy.planName,
      policy.insurerName,
      policy.sumInsured
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.logo}>{policy.insurerLogo}</Text>
          <View>
            <Text style={styles.categoryName}>{policy.categoryName}</Text>
            <Text style={styles.policyNumber}>{policy.policyNumber}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{policy.status}</Text>
        </View>
      </View>

      <Text style={styles.planName}>{policy.planName}</Text>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Sum Insured</Text>
          <Text style={styles.detailValue}>₹{(policy.sumInsured / 100000).toFixed(1)} Lakhs</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Annual Premium</Text>
          <Text style={styles.detailValue}>₹{policy.annualPremium.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Expiry Date</Text>
          <Text style={styles.detailValue}>{policy.policyExpiryDate}</Text>
        </View>
      </View>

      <View style={styles.dispatchRow}>
        <Text style={styles.dispatchLabel}>Digital Dispatch Status:</Text>
        <Text style={styles.dispatchBadges}>✉️ Email  💬 WhatsApp  📱 SMS</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownloadPdf}>
          <Text style={styles.actionText}>📥 Download PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onViewReceipt(policy)}>
          <Text style={styles.actionText}>🧾 Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.renewButton]} onPress={() => onRenew(policy)}>
          <Text style={styles.renewText}>🔄 1-Click Renew</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryName: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  policyNumber: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '700',
  },
  planName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  dispatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dispatchLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  dispatchBadges: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  actionButton: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  renewButton: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  renewText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
});
