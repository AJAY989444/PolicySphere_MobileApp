import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { ENV } from '../config/env';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../navigation/RootNavigator';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

interface FeatureCardProps {
  title: string;
  description: string;
  badge: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, badge }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    </View>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { setInitialized, isInitialized } = useAppStore();

  const handleGetStarted = () => {
    setInitialized(true);
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Next-Gen Enterprise Insurance Marketplace</Text>
          <Text style={styles.heroSubtitle}>
            Discover, compare, purchase, renew, and manage policies across 24+ insurance categories with AI recommendations and instant digital issuance.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Platform Core Modules</Text>
        </View>

        <FeatureCard
          title="Multi-Category Aggregation"
          description="Health, Term Life, Motor, Travel, Property, Cyber, Corporate Group, and Device Insurance."
          badge="24 Categories"
        />

        <FeatureCard
          title="Real-Time Quote Engine"
          description="Dynamic pricing rules based on risk parameters, NCB, add-ons, and instant insurer APIs."
          badge="Instant"
        />

        <FeatureCard
          title="Paperless Claims & KYC"
          description="Aadhaar, PAN, CKYC, DigiLocker integration with AI OCR validation and instant claim tracking."
          badge="Digital"
        />

        <FeatureCard
          title="AI Risk & Recommendation"
          description="Personalized coverage suggestion, fraud detection scoring, and predictive renewal reminders."
          badge="AI Powered"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Architecture Baseline</Text>
          <Text style={styles.infoText}>Version: {ENV.appVersion} | Microservice API Gateway Enabled</Text>
          <Text style={styles.infoText}>Scale Target: 10M+ Registered Users | 99.99% Availability</Text>
          {isInitialized && <Text style={styles.statusText}>Status: Platform Initialized & Objectives Active</Text>}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>
            {isInitialized ? 'View System Objectives' : 'Initialize PolicySphere Platform'}
          </Text>
        </TouchableOpacity>
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
  heroSection: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryLight,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  sectionHeader: {
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  badge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  cardDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  infoBox: {
    backgroundColor: '#1E1B4B',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  infoTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 15,
    color: '#A5B4FC',
    marginBottom: 4,
  },
  infoText: {
    ...TYPOGRAPHY.caption,
    color: '#C7D2FE',
    marginVertical: 2,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
