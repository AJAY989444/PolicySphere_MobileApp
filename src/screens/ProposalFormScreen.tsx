import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { PurchaseWorkflowSteps } from '../components/proposal/PurchaseWorkflowSteps';
import { PremiumLockTimer } from '../components/proposal/PremiumLockTimer';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { useProposalStore } from '../store/useProposalStore';
import { proposalService } from '../services/proposalService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type ProposalFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ProposalForm'>;

export const ProposalFormScreen: React.FC<ProposalFormScreenProps> = ({ navigation }) => {
  const { proposal, updateProposer, updateMedical, updateNominee, setProposal } = useProposalStore();
  const [saving, setSaving] = useState(false);

  const handleSaveDraft = async () => {
    setSaving(true);
    await proposalService.saveProposal(proposal);
    setSaving(false);
    Alert.alert('Draft Saved', 'Proposal draft saved securely to server & local storage.');
  };

  const handleProceedCheckout = async () => {
    if (!proposal.proposer.fullName || !proposal.proposer.panNumber) {
      Alert.alert('Missing Fields', 'Please complete Proposer Name and PAN Number.');
      return;
    }
    setSaving(true);
    await proposalService.saveProposal(proposal);
    const approval = await proposalService.submitProposalForApproval(proposal.proposalId);
    setSaving(false);

    if (approval.approved) {
      setProposal({ status: 'Approved' });
      navigation.navigate('Checkout');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PurchaseWorkflowSteps currentStepIndex={3} />
        <PremiumLockTimer expiryTimestamp={proposal.lockExpiryTimestamp} />

        <View style={styles.card}>
          <Text style={styles.title}>Proposal Application</Text>
          <Text style={styles.subtitle}>
            Plan: <Text style={styles.highlight}>{proposal.planName}</Text> ({proposal.insurerName})
          </Text>

          {/* Section 1: Proposer Details */}
          <Text style={styles.sectionTitle}>1. Proposer & Member Details</Text>
          <Text style={styles.label}>Full Name (as per Aadhaar / PAN)</Text>
          <TextInput
            style={styles.input}
            value={proposal.proposer.fullName}
            onChangeText={(fullName) => updateProposer({ fullName })}
          />

          <View style={styles.row}>
            <View style={styles.halfCol}>
              <Text style={styles.label}>PAN Number</Text>
              <TextInput
                style={styles.input}
                value={proposal.proposer.panNumber}
                onChangeText={(panNumber) => updateProposer({ panNumber })}
                autoCapitalize="characters"
              />
            </View>
            <View style={styles.halfCol}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={proposal.proposer.mobile}
                onChangeText={(mobile) => updateProposer({ mobile })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <Text style={styles.label}>Communication Address</Text>
          <TextInput
            style={styles.input}
            value={proposal.proposer.addressLine1}
            onChangeText={(addressLine1) => updateProposer({ addressLine1 })}
          />

          {/* Section 2: Medical Declaration */}
          <Text style={styles.sectionTitle}>2. Medical History & Lifestyle</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Pre-existing Illness or Surgery?</Text>
            <Switch
              value={proposal.medicalDeclaration.hasPreExistingCondition}
              onValueChange={(val) => updateMedical({ hasPreExistingCondition: val })}
              thumbColor={COLORS.primaryLight}
            />
          </View>
          {proposal.medicalDeclaration.hasPreExistingCondition && (
            <TextInput
              style={styles.input}
              placeholder="Specify illness (e.g., Diabetes / Hypertension)"
              placeholderTextColor={COLORS.textSecondary}
              value={proposal.medicalDeclaration.conditionDetails}
              onChangeText={(details) => updateMedical({ conditionDetails: details })}
            />
          )}

          {/* Section 3: Nominee Information */}
          <Text style={styles.sectionTitle}>3. Nominee Designation</Text>
          <View style={styles.row}>
            <View style={styles.halfCol}>
              <Text style={styles.label}>Nominee Name</Text>
              <TextInput
                style={styles.input}
                value={proposal.nominee.fullName}
                onChangeText={(fullName) => updateNominee({ fullName })}
              />
            </View>
            <View style={styles.halfCol}>
              <Text style={styles.label}>Relationship</Text>
              <TextInput
                style={styles.input}
                value={proposal.nominee.relationship}
                onChangeText={(relationship) => updateNominee({ relationship })}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.saveDraftButton} onPress={handleSaveDraft} disabled={saving}>
              <Text style={styles.saveDraftText}>💾 Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceedCheckout} disabled={saving}>
              <Text style={styles.proceedText}>Proceed to Checkout →</Text>
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
  card: {
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
    marginBottom: 14,
  },
  highlight: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    height: 42,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCol: {
    flex: 0.48,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  switchLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveDraftButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveDraftText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  proceedButton: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  proceedText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
