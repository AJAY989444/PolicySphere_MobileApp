import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../services/authService';

export const CustomerProfileScreen: React.FC = () => {
  const { userProfile, setUserProfile } = useAuthStore();
  const [kycLoading, setKycLoading] = useState(false);

  if (!userProfile) return null;

  const handleVerifyKyc = async () => {
    setKycLoading(true);
    const res = await authService.verifyAadhaarPan(userProfile.aadhaarNumber || '', userProfile.panNumber || '');
    if (res.success) {
      setUserProfile({ ...userProfile, isKycVerified: true });
      Alert.alert('eKYC Verified', `Aadhaar & PAN verified successfully via DigiLocker stub. Ref: ${res.kycRefId}`);
    }
    setKycLoading(false);
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userProfile.name.charAt(0)}</Text>
            </View>
            <View style={styles.profileTitleGroup}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileRole}>{userProfile.role} • {userProfile.occupation}</Text>
              <Text style={styles.profileContact}>{userProfile.email} | {userProfile.mobile}</Text>
            </View>
          </View>

          <View style={styles.kycStatusBox}>
            <View style={styles.kycRow}>
              <Text style={styles.kycLabel}>eKYC Compliance Status:</Text>
              <View style={[styles.kycBadge, userProfile.isKycVerified ? styles.kycOk : styles.kycPending]}>
                <Text style={styles.kycBadgeText}>
                  {userProfile.isKycVerified ? '✓ Verified (Aadhaar/PAN)' : '⚠️ Action Needed'}
                </Text>
              </View>
            </View>
            {!userProfile.isKycVerified && (
              <TouchableOpacity style={styles.kycButton} onPress={handleVerifyKyc} disabled={kycLoading}>
                <Text style={styles.kycButtonText}>{kycLoading ? 'Verifying...' : 'Complete eKYC Now'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section 1: Nominees */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Nominee Management</Text>
          {userProfile.nominees.map((nom, idx) => (
            <View key={idx} style={styles.listItem}>
              <View>
                <Text style={styles.itemTitle}>{nom.name}</Text>
                <Text style={styles.itemSub}>Relation: {nom.relation}</Text>
              </View>
              <View style={styles.shareBadge}>
                <Text style={styles.shareText}>{nom.sharePercentage}% Share</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Section 2: Covered Family Members */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Family Members (Floater Dependents)</Text>
          {userProfile.familyMembers.map((fam, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.itemTitle}>{fam.name}</Text>
              <Text style={styles.itemSub}>{fam.relation} • Age {fam.age} yrs</Text>
            </View>
          ))}
        </View>

        {/* Section 3: Existing Policies */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Existing Policies & History</Text>
          {userProfile.existingPolicies.map((pol, idx) => (
            <View key={idx} style={styles.listItem}>
              <View>
                <Text style={styles.itemTitle}>{pol.categoryName}</Text>
                <Text style={styles.itemSub}>Policy #: {pol.policyNumber}</Text>
              </View>
              <Text style={styles.expiryText}>Expires: {pol.expiryDate}</Text>
            </View>
          ))}
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
  profileHeaderCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  profileTitleGroup: {
    flex: 1,
  },
  profileName: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  profileRole: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  profileContact: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  kycStatusBox: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  kycRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kycLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  kycBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  kycOk: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  kycPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  kycBadgeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '700',
  },
  kycButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  kycButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 15,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  itemSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  shareBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  shareText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  expiryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
