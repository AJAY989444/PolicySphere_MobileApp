import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { PurchaseWorkflowSteps } from '../components/proposal/PurchaseWorkflowSteps';
import { PremiumLockTimer } from '../components/proposal/PremiumLockTimer';
import { PaymentGatewayModal } from '../components/payments/PaymentGatewayModal';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { useProposalStore } from '../store/useProposalStore';
import { usePolicyStore } from '../store/usePolicyStore';
import { policyService } from '../services/policyService';
import { PaymentTransaction } from '../types/package2';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type PolicyPurchaseCheckoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export const PolicyPurchaseCheckoutScreen: React.FC<PolicyPurchaseCheckoutScreenProps> = ({
  navigation,
}) => {
  const { proposal } = useProposalStore();
  const { addIssuedPolicy, setLatestTransaction } = usePolicyStore();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const handlePaymentSuccess = (txn: PaymentTransaction) => {
    setLatestTransaction(txn);
    const newPolicy = policyService.issuePolicyFromProposal(
      proposal.proposalId,
      txn,
      proposal.categoryName,
      proposal.insurerName,
      proposal.planName,
      proposal.sumInsured,
      proposal.annualPremium
    );
    addIssuedPolicy(newPolicy);
    setPaymentModalVisible(false);
    navigation.navigate('IssuanceSuccess');
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PurchaseWorkflowSteps currentStepIndex={5} />
        <PremiumLockTimer expiryTimestamp={proposal.lockExpiryTimestamp} />

        <View style={styles.summaryCard}>
          <Text style={styles.title}>Policy Purchase Checkout (Module 9 & 13)</Text>
          <Text style={styles.subtitle}>Review Order Details & Itemized Premium Breakdown</Text>

          <View style={styles.infoBox}>
            <Text style={styles.planTitle}>{proposal.planName}</Text>
            <Text style={styles.insurerText}>{proposal.insurerName}</Text>
            <Text style={styles.proposalRef}>Proposal Ref: {proposal.proposalId} • Underwriting Status: APPROVED</Text>
          </View>

          {/* Itemized Premium Calculation */}
          <Text style={styles.sectionTitle}>Itemized Premium Breakdown</Text>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Base Premium (Annual)</Text>
            <Text style={styles.calcValue}>₹{(proposal.annualPremium / 1.18).toFixed(0)}</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>GST @ 18%</Text>
            <Text style={styles.calcValue}>₹{(proposal.annualPremium - proposal.annualPremium / 1.18).toFixed(0)}</Text>
          </View>

          <View style={[styles.calcRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable Premium</Text>
            <Text style={styles.totalValue}>₹{proposal.annualPremium.toLocaleString('en-IN')}</Text>
          </View>

          {/* eKYC Verification summary */}
          <View style={styles.kycCheckRow}>
            <Text style={styles.kycCheckIcon}>✓</Text>
            <Text style={styles.kycCheckText}>eKYC Verified (Aadhaar/PAN) • IRDAI Compliant</Text>
          </View>

          <TouchableOpacity style={styles.payNowButton} onPress={() => setPaymentModalVisible(true)}>
            <Text style={styles.payNowButtonText}>
              Pay ₹{proposal.annualPremium.toLocaleString('en-IN')} via Payment Gateway →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PaymentGatewayModal
        visible={paymentModalVisible}
        proposalId={proposal.proposalId}
        amount={proposal.annualPremium}
        onSuccess={handlePaymentSuccess}
        onClose={() => setPaymentModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scrollContent: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  planTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  insurerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  proposalRef: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginBottom: 8,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  calcLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  calcValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  totalLabel: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  totalValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryLight,
  },
  kycCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  kycCheckIcon: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  kycCheckText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  payNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  payNowButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
