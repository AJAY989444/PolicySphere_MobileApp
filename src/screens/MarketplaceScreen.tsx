import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { MarketplaceFilterDrawer } from '../components/marketplace/MarketplaceFilterDrawer';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { useQuoteStore, INITIAL_FILTERS } from '../store/useQuoteStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type MarketplaceScreenProps = NativeStackScreenProps<RootStackParamList, 'Marketplace'>;

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ navigation }) => {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const { filterState, setFilterState } = useQuoteStore();

  const handleLaunchQuoteEngine = (categoryName: string, categoryId: string) => {
    navigation.navigate('QuoteEngine', { categoryId, categoryName });
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Marketplace Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerHeader}>
            <View>
              <Text style={styles.bannerTitle}>Insurance Marketplace</Text>
              <Text style={styles.bannerSubtitle}>Browse, Compare & Buy across 28+ Empaneled Insurers</Text>
            </View>
            <TouchableOpacity
              style={styles.filterTriggerButton}
              onPress={() => setFilterDrawerVisible(true)}
            >
              <Text style={styles.filterTriggerText}>⚙️ Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Global Search Bar Entry */}
        <TouchableOpacity
          style={styles.searchBarEntry}
          onPress={() => navigation.navigate('GlobalSearch')}
        >
          <Text style={styles.searchBarText}>🔍 Search 24 categories, hospitals, policies, FAQs...</Text>
          <Text style={styles.micBadge}>🎙️ Voice</Text>
        </TouchableOpacity>

        {/* Quick Quote Entry Categories */}
        <Text style={styles.sectionHeader}>Select Category for Instant Quotes</Text>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handleLaunchQuoteEngine('Health Insurance', 'cat-1')}
        >
          <View style={styles.cardRow}>
            <Text style={styles.cardIcon}>🩺</Text>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>Health Insurance & Family Floater</Text>
              <Text style={styles.cardSub}>Cashless in 14,200+ hospitals • Tax 80D benefit</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handleLaunchQuoteEngine('Term Life Insurance', 'cat-5')}
        >
          <View style={styles.cardRow}>
            <Text style={styles.cardIcon}>🛡️</Text>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>Term Life Insurance</Text>
              <Text style={styles.cardSub}>High cover up to ₹2 Crore at ₹490/mo • Tax 80C</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handleLaunchQuoteEngine('Motor Insurance', 'cat-10')}
        >
          <View style={styles.cardRow}>
            <Text style={styles.cardIcon}>🚗</Text>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>Car & Motor Insurance</Text>
              <Text style={styles.cardSub}>Zero Dep + NCB retention • Instant inspection</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Future Innovation & Final Release Audit Hub */}
        <Text style={styles.sectionHeader}>Future Innovation & Final Audit</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('FutureInnovation')}
          >
            <Text style={styles.shortcutIcon}>🚀</Text>
            <Text style={styles.shortcutText}>Innovation Hub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('NFRCompliance')}
          >
            <Text style={styles.shortcutIcon}>⚙️</Text>
            <Text style={styles.shortcutText}>NFR Matrix</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('AcceptanceTestConsole')}
          >
            <Text style={styles.shortcutIcon}>🧪</Text>
            <Text style={styles.shortcutText}>E2E Test Suite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('FinalReleaseAudit')}
          >
            <Text style={styles.shortcutIcon}>🏆</Text>
            <Text style={styles.shortcutText}>Release Audit</Text>
          </TouchableOpacity>
        </View>

        {/* Infrastructure, Performance & Monitoring Hub */}
        <Text style={styles.sectionHeader}>Infrastructure, SLA & Monitoring</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('Infrastructure')}
          >
            <Text style={styles.shortcutIcon}>☁️</Text>
            <Text style={styles.shortcutText}>DevOps & K8s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('PerformanceSLAConsole')}
          >
            <Text style={styles.shortcutIcon}>⚡</Text>
            <Text style={styles.shortcutText}>SLA Console</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('ScalabilityEngine')}
          >
            <Text style={styles.shortcutIcon}>📈</Text>
            <Text style={styles.shortcutText}>Load Engine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('DisasterRecovery')}
          >
            <Text style={styles.shortcutIcon}>🛡️</Text>
            <Text style={styles.shortcutText}>Disaster Recovery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('MonitoringHub')}
          >
            <Text style={styles.shortcutIcon}>📊</Text>
            <Text style={styles.shortcutText}>Telemetry & Logs</Text>
          </TouchableOpacity>
        </View>

        {/* Security, Compliance & Audit Hub */}
        <Text style={styles.sectionHeader}>Security, Compliance & Audit</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('SecurityVault')}
          >
            <Text style={styles.shortcutIcon}>🔒</Text>
            <Text style={styles.shortcutText}>Security Vault</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('CompliancePortal')}
          >
            <Text style={styles.shortcutIcon}>🏛️</Text>
            <Text style={styles.shortcutText}>IRDAI & DPDP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('SystemLogging')}
          >
            <Text style={styles.shortcutIcon}>💻</Text>
            <Text style={styles.shortcutText}>System Logs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('AuditTrail')}
          >
            <Text style={styles.shortcutIcon}>🛡️</Text>
            <Text style={styles.shortcutText}>Audit Trail</Text>
          </TouchableOpacity>
        </View>

        {/* Microservices, API & Integrations */}
        <Text style={styles.sectionHeader}>Microservices, API & Integrations</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('MicroservicesDashboard')}
          >
            <Text style={styles.shortcutIcon}>🌐</Text>
            <Text style={styles.shortcutText}>Microservices</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('APIStandardsConsole')}
          >
            <Text style={styles.shortcutIcon}>⚡</Text>
            <Text style={styles.shortcutText}>API Console</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('OfflineStorage')}
          >
            <Text style={styles.shortcutIcon}>💾</Text>
            <Text style={styles.shortcutText}>Offline DB</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('IntegrationsCatalog')}
          >
            <Text style={styles.shortcutIcon}>🏛️</Text>
            <Text style={styles.shortcutText}>DigiLocker/APIs</Text>
          </TouchableOpacity>
        </View>

        {/* Enterprise Operations, Admin & Analytics Hub */}
        <Text style={styles.sectionHeader}>Enterprise Ops, Admin & Reporting</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('ReportingDashboard')}
          >
            <Text style={styles.shortcutIcon}>📊</Text>
            <Text style={styles.shortcutText}>Reports & CSV</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('AdminPanel')}
          >
            <Text style={styles.shortcutIcon}>⚙️</Text>
            <Text style={styles.shortcutText}>Admin Panel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('RBACManagement')}
          >
            <Text style={styles.shortcutIcon}>🔐</Text>
            <Text style={styles.shortcutText}>RBAC Matrix</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('FunnelAnalytics')}
          >
            <Text style={styles.shortcutIcon}>📈</Text>
            <Text style={styles.shortcutText}>Funnel Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* AI & Intelligence Hub */}
        <Text style={styles.sectionHeader}>AI, Search & CRM Intelligence</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('AIRecommendation')}
          >
            <Text style={styles.shortcutIcon}>🤖</Text>
            <Text style={styles.shortcutText}>AI Policy Matcher</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('GlobalSearch')}
          >
            <Text style={styles.shortcutIcon}>🔍</Text>
            <Text style={styles.shortcutText}>Search Engine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('AdvisorCRM')}
          >
            <Text style={styles.shortcutIcon}>💼</Text>
            <Text style={styles.shortcutText}>Advisor CRM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('FraudDetection')}
          >
            <Text style={styles.shortcutIcon}>🛡️</Text>
            <Text style={styles.shortcutText}>Fraud Radar</Text>
          </TouchableOpacity>
        </View>

        {/* Core Operations */}
        <Text style={styles.sectionHeader}>Claims, Vault & Support Hub</Text>
        <View style={styles.shortcutGrid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('ClaimsManagement')}
          >
            <Text style={styles.shortcutIcon}>🏥</Text>
            <Text style={styles.shortcutText}>Claims Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('DocumentVault')}
          >
            <Text style={styles.shortcutIcon}>📁</Text>
            <Text style={styles.shortcutText}>AI Vault & OCR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('NotificationCenter')}
          >
            <Text style={styles.shortcutIcon}>🔔</Text>
            <Text style={styles.shortcutText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('SupportCenter')}
          >
            <Text style={styles.shortcutIcon}>🎧</Text>
            <Text style={styles.shortcutText}>Support & AI Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MarketplaceFilterDrawer
        visible={filterDrawerVisible}
        filters={filterState}
        onApply={(updated) => setFilterState(updated)}
        onReset={() => setFilterState(INITIAL_FILTERS)}
        onClose={() => setFilterDrawerVisible(false)}
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
  banner: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  bannerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  filterTriggerButton: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  filterTriggerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  searchBarEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  searchBarText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  micBadge: {
    backgroundColor: COLORS.primaryDark,
    color: COLORS.primaryLight,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginTop: 8,
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  cardTextGroup: {
    flex: 1,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  cardSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  arrowText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryLight,
    marginLeft: 8,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  gridButton: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  shortcutIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  shortcutText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 11,
  },
});
