import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { PurchaseWorkflowSteps } from '../components/proposal/PurchaseWorkflowSteps';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { usePolicyStore } from '../store/usePolicyStore';
import { downloadPolicyPdf } from '../utils/downloadPdf';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type PolicyIssuanceSuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'IssuanceSuccess'>;

export const PolicyIssuanceSuccessScreen: React.FC<PolicyIssuanceSuccessScreenProps> = ({
  navigation,
}) => {
  const { activePolicies, latestTransaction } = usePolicyStore();
  const latestPolicy = activePolicies[0];

  const handleDownloadPdf = () => {
    downloadPolicyPdf(
      latestPolicy?.policyNumber || 'POL-HLT-2026-99182',
      latestPolicy?.planName || 'Optima Secure Super Plan',
      latestPolicy?.insurerName || 'Star Health & Allied Insurance',
      latestPolicy?.sumInsured || 1000000
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PurchaseWorkflowSteps currentStepIndex={6} />

        <View style={styles.successCard}>
          <Text style={styles.celebrationBadge}>🎉 Congratulations!</Text>
          <Text style={styles.title}>Policy Issued Successfully</Text>
          <Text style={styles.subtitle}>
            Your insurance policy is now active & registered with IRDAI central repository.
          </Text>

          <View style={styles.policyNumBox}>
            <Text style={styles.policyNumLabel}>Policy Certificate Number</Text>
            <Text style={styles.policyNumValue}>{latestPolicy?.policyNumber || 'POL-HLT-2026-99182'}</Text>
          </View>

          {/* Dispatch Channel Alerts */}
          <Text style={styles.sectionTitle}>Digital Dispatch Status</Text>
          <View style={styles.dispatchGrid}>
            <View style={styles.dispatchItem}>
              <Text style={styles.dispatchIcon}>✉️</Text>
              <Text style={styles.dispatchName}>Email Sent</Text>
              <Text style={styles.dispatchStatus}>Delivered</Text>
            </View>
            <View style={styles.dispatchItem}>
              <Text style={styles.dispatchIcon}>💬</Text>
              <Text style={styles.dispatchName}>WhatsApp Copy</Text>
              <Text style={styles.dispatchStatus}>Delivered</Text>
            </View>
            <View style={styles.dispatchItem}>
              <Text style={styles.dispatchIcon}>📱</Text>
              <Text style={styles.dispatchName}>SMS Alert</Text>
              <Text style={styles.dispatchStatus}>Delivered</Text>
            </View>
          </View>

          {/* Transaction Metadata */}
          {latestTransaction && (
            <View style={styles.txnBox}>
              <Text style={styles.txnTitle}>Transaction Receipt</Text>
              <Text style={styles.txnText}>Txn ID: {latestTransaction.txnId}</Text>
              <Text style={styles.txnText}>
                Amount Paid: ₹{latestTransaction.amount.toLocaleString('en-IN')} ({latestTransaction.method})
              </Text>
              <Text style={styles.txnText}>Ref: {latestTransaction.gatewayRef}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPdf}>
            <Text style={styles.downloadText}>📥 Download Policy Certificate PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.vaultButton}
            onPress={() => navigation.navigate('PolicyManagement')}
          >
            <Text style={styles.vaultText}>View Active Policies Vault →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  successCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
  },
  celebrationBadge: {
    ...TYPOGRAPHY.h2,
    color: COLORS.accent,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 22,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  policyNumBox: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  policyNumLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  policyNumValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryLight,
    letterSpacing: 1,
    marginTop: 2,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  dispatchGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  dispatchItem: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dispatchIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  dispatchName: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  dispatchStatus: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '700',
  },
  txnBox: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  txnTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  txnText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginVertical: 1,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  downloadText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  vaultButton: {
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  vaultText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
});
