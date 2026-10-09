import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { ActivePolicyCard } from '../components/policies/ActivePolicyCard';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { IssuedPolicy } from '../types/package2';
import { policyService } from '../services/policyService';
import { usePolicyStore } from '../store/usePolicyStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type PolicyManagementScreenProps = NativeStackScreenProps<RootStackParamList, 'PolicyManagement'>;

export const PolicyManagementScreen: React.FC<PolicyManagementScreenProps> = ({ navigation }) => {
  const { activePolicies, setActivePolicies } = usePolicyStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    policyService.getActivePolicies().then((policies) => {
      setActivePolicies(policies);
      setLoading(false);
    });
  }, []);

  const handleRenew = (policy: IssuedPolicy) => {
    Alert.alert(
      '1-Click Renewal Initiated',
      `Policy ${policy.policyNumber} renewal premium ₹${policy.annualPremium.toLocaleString(
        'en-IN'
      )} locked with NCB discount. Proceed to checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Renew & Pay', onPress: () => navigation.navigate('Checkout') },
      ]
    );
  };

  const handleViewReceipt = (policy: IssuedPolicy) => {
    const txn = policy.paymentHistory[0];
    if (txn) {
      Alert.alert(
        'Payment Receipt',
        `Txn ID: ${txn.txnId}\nAmount: ₹${txn.amount.toLocaleString('en-IN')}\nMethod: ${
          txn.method
        }\nTimestamp: ${txn.timestamp}\nStatus: ${txn.status}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleSection}>
          <Text style={styles.screenTitle}>Active Policies Vault</Text>
          <Text style={styles.screenSubtitle}>
            Download Certificates, Endorse Nominees, Port Insurance & Initiate 1-Click Renewals
          </Text>
        </View>

        {loading ? (
          <LoadingState message="Fetching your active insurance policy vault..." />
        ) : activePolicies.length === 0 ? (
          <EmptyState
            title="No Active Policies Found"
            description="Explore our Marketplace to browse, compare, and purchase policies instantly."
          />
        ) : (
          activePolicies.map((pol) => (
            <ActivePolicyCard
              key={pol.policyNumber}
              policy={pol}
              onRenew={handleRenew}
              onViewReceipt={handleViewReceipt}
            />
          ))
        )}

        {/* Shortcuts Bar */}
        <View style={styles.shortcutsBox}>
          <Text style={styles.shortcutTitle}>Policy Life-Cycle Services</Text>
          <View style={styles.shortcutRow}>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => navigation.navigate('Marketplace')}>
              <Text style={styles.shortcutIcon}>➕</Text>
              <Text style={styles.shortcutText}>Buy New Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.shortcutIcon}>🔍</Text>
              <Text style={styles.shortcutText}>Browse 24 Categories</Text>
            </TouchableOpacity>
          </View>
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
  headerTitleSection: {
    marginBottom: 16,
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  shortcutsBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shortcutTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginBottom: 10,
  },
  shortcutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutBtn: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shortcutIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  shortcutText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});
