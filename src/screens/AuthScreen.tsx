import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { OTPInputModal } from '../components/auth/OTPInputModal';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [authMode, setAuthMode] = useState<'otp' | 'email' | 'social'>('otp');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [email, setEmail] = useState('user@policysphere.com');
  const [password, setPassword] = useState('••••••••');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const { setAuthenticated, setUserProfile } = useAuthStore();

  const handleSendOTP = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Alert.alert('Invalid Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    await authService.sendOTP(mobileNumber);
    setOtpModalVisible(true);
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const profile = await authService.verifyOTP('txn-123', otp);
      setUserProfile(profile);
      setAuthenticated(true);
      setOtpModalVisible(false);
      navigation.navigate('Marketplace');
    } catch (err: any) {
      Alert.alert('Verification Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.authCard}>
          <Text style={styles.cardTitle}>Identity & Authentication</Text>
          <Text style={styles.cardSubtitle}>
            Secure OAuth2 / JWT / Mobile OTP login with Aadhaar & PAN eKYC compliance.
          </Text>

          {/* Mode Switcher Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, authMode === 'otp' && styles.tabActive]}
              onPress={() => setAuthMode('otp')}
            >
              <Text style={[styles.tabText, authMode === 'otp' && styles.tabTextActive]}>
                Mobile OTP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, authMode === 'email' && styles.tabActive]}
              onPress={() => setAuthMode('email')}
            >
              <Text style={[styles.tabText, authMode === 'email' && styles.tabTextActive]}>
                Email Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, authMode === 'social' && styles.tabActive]}
              onPress={() => setAuthMode('social')}
            >
              <Text style={[styles.tabText, authMode === 'social' && styles.tabTextActive]}>
                Social OAuth
              </Text>
            </TouchableOpacity>
          </View>

          {/* OTP Mode Form */}
          {authMode === 'otp' && (
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Mobile Number (+91)</Text>
              <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                placeholder="Enter 10-digit mobile"
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleSendOTP}>
                <Text style={styles.primaryButtonText}>Send Verification OTP →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email Mode Form */}
          {authMode === 'email' && (
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Corporate / Personal Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  setAuthenticated(true);
                  navigation.navigate('Marketplace');
                }}
              >
                <Text style={styles.primaryButtonText}>Sign In with Password →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Social OAuth Mode */}
          {authMode === 'social' && (
            <View style={styles.formSection}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  setAuthenticated(true);
                  navigation.navigate('Marketplace');
                }}
              >
                <Text style={styles.socialIcon}>🔍</Text>
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  setAuthenticated(true);
                  navigation.navigate('Marketplace');
                }}
              >
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialText}>Continue with Apple ID</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  setAuthenticated(true);
                  navigation.navigate('Marketplace');
                }}
              >
                <Text style={styles.socialIcon}>📘</Text>
                <Text style={styles.socialText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Biometrics & Security Banner */}
          <View style={styles.securityBox}>
            <View style={styles.securityRow}>
              <Text style={styles.securityIcon}>🔐</Text>
              <View style={styles.securityTextGroup}>
                <Text style={styles.securityTitle}>Biometric Touch ID / Face ID</Text>
                <Text style={styles.securitySub}>Fast & secure authentication enabled</Text>
              </View>
              <TouchableOpacity
                onPress={() => setBiometricsEnabled(!biometricsEnabled)}
                style={[styles.bioBadge, biometricsEnabled && styles.bioBadgeActive]}
              >
                <Text style={styles.bioText}>{biometricsEnabled ? 'Enabled' : 'Disabled'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <OTPInputModal
        visible={otpModalVisible}
        mobileNumber={`+91 ${mobileNumber}`}
        onVerify={handleVerifyOTP}
        onCancel={() => setOtpModalVisible(false)}
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
  authCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  formSection: {
    marginBottom: 16,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  socialText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  securityBox: {
    backgroundColor: '#1E1B4B',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4338CA',
    marginTop: 8,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  securityTextGroup: {
    flex: 1,
  },
  securityTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: '#A5B4FC',
    fontWeight: '700',
  },
  securitySub: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: '#C7D2FE',
  },
  bioBadge: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bioBadgeActive: {
    backgroundColor: COLORS.accentDark,
  },
  bioText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});
