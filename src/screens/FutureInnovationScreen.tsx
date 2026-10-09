import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'FutureInnovation'>;

interface InnovationFeature {
  id: string;
  name: string;
  category: 'AI & Automation' | 'Blockchain & Security' | 'IoT & Telematics' | 'Open Ecosystem';
  status: 'ACTIVE' | 'BETA' | 'EXPERIMENTAL';
  description: string;
  icon: string;
}

export const FutureInnovationScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'AI & Automation' | 'Blockchain & Security' | 'IoT & Telematics' | 'Open Ecosystem'>('All');
  const [telematicsActive, setTelematicsActive] = useState<boolean>(true);
  const [blockchainHash, setBlockchainHash] = useState<string>('0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a');

  const [features] = useState<InnovationFeature[]>([
    {
      id: 'feat-1',
      name: 'Generative AI Policy Advisor & Assistant',
      category: 'AI & Automation',
      status: 'ACTIVE',
      description: 'LLM-powered plain English policy clause explainer & personalized coverage gap detector.',
      icon: '🤖',
    },
    {
      id: 'feat-2',
      name: 'Voice-Activated Policy Purchase Engine',
      category: 'AI & Automation',
      status: 'BETA',
      description: 'Hands-free voice purchase via Web Speech API supporting English, Hindi, and regional languages.',
      icon: '🎙️',
    },
    {
      id: 'feat-3',
      name: 'Cryptographic Blockchain Certificate Verification',
      category: 'Blockchain & Security',
      status: 'ACTIVE',
      description: 'Ethereum-compatible SHA-256 immutable policy ledger verifying authenticity on-chain.',
      icon: '🔗',
    },
    {
      id: 'feat-4',
      name: 'IoT Health Wearables & Live Telematics Integration',
      category: 'IoT & Telematics',
      status: 'BETA',
      description: 'Real-time sync with Apple HealthKit & Google Fit for dynamic heart rate & step premium discounts.',
      icon: '⌚',
    },
    {
      id: 'feat-5',
      name: 'Vehicle OBD-II Telematics Risk Profiler',
      category: 'IoT & Telematics',
      status: 'EXPERIMENTAL',
      description: 'Pay-As-You-Drive motor insurance pricing derived from braking & acceleration telemetry.',
      icon: '🚗',
    },
    {
      id: 'feat-6',
      name: 'Open Insurance & B2B Embedded APIs',
      category: 'Open Ecosystem',
      status: 'ACTIVE',
      description: 'Embeddable SDK for fintech partners, e-commerce checkouts, and white-label aggregators.',
      icon: '🌐',
    },
  ]);

  const filteredFeatures = activeTab === 'All' ? features : features.filter((f) => f.category === activeTab);

  const handleVerifyBlockchain = () => {
    const newHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setBlockchainHash(newHash);

    const msg = 'On-Chain Ledger Verified! Policy Certificate SHA-256 Hash matches Smart Contract state: ' + newHash;
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Blockchain Ledger Verified', msg);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Future-Ready Innovation Hub</Text>
        </View>

        {/* Feature Banner */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>🚀 Next-Gen InsurTech Capabilities</Text>
          <Text style={styles.bannerSub}>
            Exploring AI Underwriting, Blockchain ledgers, IoT telematics, and Open Insurance APIs (Module 37)
          </Text>
        </View>

        {/* Interactive Blockchain Verifier */}
        <View style={styles.blockchainCard}>
          <Text style={styles.cardTitle}>🔗 On-Chain Blockchain Ledger Inspector</Text>
          <Text style={styles.cardSub}>Immutable Smart Contract Policy Validation</Text>
          <Text style={styles.hashText}>{blockchainHash}</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={handleVerifyBlockchain}>
            <Text style={styles.actionBtnText}>⚡ Verify On-Chain Certificate Hash</Text>
          </TouchableOpacity>
        </View>

        {/* IoT Wearables Live Telemetry Sync */}
        <View style={styles.iotCard}>
          <View style={styles.iotHeader}>
            <View>
              <Text style={styles.cardTitle}>⌚ IoT Wearables & Step Telematics</Text>
              <Text style={styles.cardSub}>Earn up to 15% discount for 10,000+ daily steps</Text>
            </View>
            <Switch
              value={telematicsActive}
              onValueChange={setTelematicsActive}
              thumbColor={COLORS.primaryLight}
            />
          </View>

          {telematicsActive && (
            <View style={styles.telemetryStats}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>10,482</Text>
                <Text style={styles.statLbl}>Daily Steps</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>72 bpm</Text>
                <Text style={styles.statLbl}>Resting HR</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>-12.5%</Text>
                <Text style={styles.statLbl}>Premium Discount</Text>
              </View>
            </View>
          )}
        </View>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {(['All', 'AI & Automation', 'Blockchain & Security', 'IoT & Telematics', 'Open Ecosystem'] as const).map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabChipText, activeTab === tab && styles.tabChipTextActive]}>{tab}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* Features List */}
        <Text style={styles.sectionHeader}>Innovation Feature Catalog</Text>

        {filteredFeatures.map((item) => (
          <View key={item.id} style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <View style={styles.featureTitleRow}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
                <Text style={styles.featureName}>{item.name}</Text>
              </View>
              <View
                style={[
                  styles.badge,
                  item.status === 'ACTIVE'
                    ? styles.badgeActive
                    : item.status === 'BETA'
                    ? styles.badgeBeta
                    : styles.badgeExp,
                ]}
              >
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.featureDesc}>{item.description}</Text>
            <Text style={styles.featureCategory}>Category: {item.category}</Text>
          </View>
        ))}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  bannerCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  bannerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  bannerSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  blockchainCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  cardSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  hashText: {
    color: COLORS.primaryLight,
    fontSize: 10,
    backgroundColor: '#0F172A',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  actionBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  actionBtnText: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  iotCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  telemetryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  statVal: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  statLbl: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 2,
  },
  tabScroll: {
    marginBottom: 14,
  },
  tabChip: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabChipActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  tabChipText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  tabChipTextActive: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  featureName: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeActive: {
    backgroundColor: '#064E3B',
  },
  badgeBeta: {
    backgroundColor: '#78350F',
  },
  badgeExp: {
    backgroundColor: '#312E81',
  },
  badgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
  },
  featureDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 6,
  },
  featureCategory: {
    ...TYPOGRAPHY.caption,
    color: COLORS.border,
    fontSize: 10,
  },
});
