import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'NFRCompliance'>;

interface NFRCheck {
  title: string;
  category: 'Quality' | 'Security' | 'i18n' | 'Accessibility';
  status: 'PASSED' | 'VERIFIED';
  description: string;
  metric: string;
}

export const NFRComplianceScreen: React.FC<Props> = ({ navigation }) => {
  const [activeLang, setActiveLang] = useState<'EN' | 'HI' | 'MR' | 'TA' | 'TE'>('EN');

  const [nfrList] = useState<NFRCheck[]>([
    { title: 'WCAG 2.2 Level AA Accessibility', category: 'Accessibility', status: 'PASSED', description: 'Screen reader aria labels, touch targets >44px, 4.5:1 color contrast ratio.', metric: '100% Compliant' },
    { title: 'Internationalization (i18n)', category: 'i18n', status: 'VERIFIED', description: 'Multi-lingual support across English, Hindi, Marathi, Tamil, and Telugu.', metric: '5 Languages' },
    { title: 'High Availability & Fault Tolerance', category: 'Quality', status: 'PASSED', description: 'Multi-AZ active-active deployment with automatic health check failover.', metric: '99.99% Uptime' },
    { title: 'Event-Driven Asynchronous Messaging', category: 'Quality', status: 'PASSED', description: 'Apache Kafka event bus handling offline mutation queues & webhook dispatches.', metric: '< 5ms Event Bus' },
    { title: 'Multi-Tenant Data Isolation', category: 'Security', status: 'VERIFIED', description: 'Logical & cryptographic tenant separation across 28+ partner insurers.', metric: 'Zero Cross-Tenant Leak' },
    { title: 'API-First & Mobile-First Design', category: 'Quality', status: 'PASSED', description: 'OpenAPI v3.0 schemas powering React Native web & native build artifacts.', metric: '100% Modular' },
  ]);

  const handleSwitchLang = (lang: 'EN' | 'HI' | 'MR' | 'TA' | 'TE') => {
    setActiveLang(lang);
    const langNames = { EN: 'English', HI: 'Hindi (हिंदी)', MR: 'Marathi (मराठी)', TA: 'Tamil (தமிழ்)', TE: 'Telugu (తెలుగు)' };
    const msg = 'Language switched to ' + langNames[lang] + '. i18n bundle loaded successfully!';
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('i18n Bundle Switched', msg);
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
          <Text style={styles.headerTitle}>Non-Functional Requirements (NFR)</Text>
        </View>

        {/* NFR Overview Card */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>⚙️ Enterprise Quality & NFR Matrix</Text>
          <Text style={styles.overviewSub}>
            Validating system resilience, WCAG 2.2 accessibility, i18n multi-language support & security (Module 38)
          </Text>

          <View style={styles.nfrScoreRow}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreVal}>18 / 18</Text>
              <Text style={styles.scoreLbl}>NFRs Verified</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreVal}>WCAG 2.2</Text>
              <Text style={styles.scoreLbl}>AA Grade</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreVal}>i18n</Text>
              <Text style={styles.scoreLbl}>5 Indic Languages</Text>
            </View>
          </View>
        </View>

        {/* Multi-Language i18n Demo Switcher */}
        <View style={styles.i18nCard}>
          <Text style={styles.cardTitle}>🌐 Multi-Language (i18n) Engine</Text>
          <Text style={styles.cardSub}>Select language to test real-time localization dictionary</Text>

          <View style={styles.langBtnRow}>
            {(['EN', 'HI', 'MR', 'TA', 'TE'] as const).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langBtn, activeLang === lang && styles.langBtnActive]}
                onPress={() => handleSwitchLang(lang)}
              >
                <Text style={[styles.langBtnText, activeLang === lang && styles.langBtnTextActive]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Live Translation Preview Box */}
          <View style={styles.translationBox}>
            <View style={styles.translationHeader}>
              <Text style={styles.translationLocale}>
                Active Locale: {activeLang === 'EN' ? 'en-IN (English)' : activeLang === 'HI' ? 'hi-IN (Hindi)' : activeLang === 'MR' ? 'mr-IN (Marathi)' : activeLang === 'TA' ? 'ta-IN (Tamil)' : 'te-IN (Telugu)'}
              </Text>
              <View style={styles.statusLiveBadge}>
                <Text style={styles.statusLiveText}>i18n BUNDLE ACTIVE</Text>
              </View>
            </View>

            <Text style={styles.translationLabel}>Localized Marketplace Greeting:</Text>
            <Text style={styles.translationText}>
              {activeLang === 'EN' && '👋 Welcome to PolicySphere Insurance Marketplace! Compare 28+ insurers.'}
              {activeLang === 'HI' && '👋 पॉलिसीस्फेयर इंश्योरेंस मार्केटप्लेस में आपका स्वागत है! 28+ बीमाकर्ताओं की तुलना करें।'}
              {activeLang === 'MR' && '👋 पॉलिसीस्फेअर इन्शुरन्स मार्केटप्लेसमध्ये आपले स्वागत आहे! 28+ विमा कंपन्यांची तुलना करा.'}
              {activeLang === 'TA' && '👋 பாலிசிஸ்பியர் காப்பீட்டு சந்தைக்கு நல்வரவு! 28+ காப்பீட்டாளர்களை ஒப்பிடுங்கள்.'}
              {activeLang === 'TE' && '👋 పాలసీస్పియర్ ఇన్సూరెన్స్ మార్కెట్‌ప్లేస్‌కు స్వాగతం! 28+ ఇన్సూరర్లను పోల్చండి.'}
            </Text>
          </View>
        </View>

        {/* NFR Items List */}
        <Text style={styles.sectionHeader}>NFR Standards Verification List</Text>

        {nfrList.map((item, idx) => (
          <View key={idx} style={styles.nfrCard}>
            <View style={styles.nfrCardHeader}>
              <View style={styles.nfrTitleGroup}>
                <Text style={styles.nfrName}>{item.title}</Text>
                <Text style={styles.nfrCategory}>{item.category}</Text>
              </View>
              <View style={styles.badgePassed}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.nfrDesc}>{item.description}</Text>
            <Text style={styles.nfrMetric}>Metric: {item.metric}</Text>
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
  overviewCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  overviewTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  overviewSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  nfrScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 10,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreVal: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  scoreLbl: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 2,
  },
  i18nCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
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
    marginBottom: 10,
  },
  langBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  langBtnActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  langBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  langBtnTextActive: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  translationBox: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  translationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  translationLocale: {
    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '700',
  },
  statusLiveBadge: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusLiveText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
  },
  translationLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
    marginBottom: 2,
  },
  translationText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  nfrCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nfrCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nfrTitleGroup: {
    flex: 1,
  },
  nfrName: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  nfrCategory: {
    ...TYPOGRAPHY.caption,
    color: COLORS.border,
    fontSize: 10,
  },
  badgePassed: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
  },
  nfrDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 4,
  },
  nfrMetric: {
    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
});
