import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MonitoringHub'>;

interface TelemetrySpan {
  service: string;
  operation: string;
  durationMs: number;
  status: '200 OK' | '201 Created' | '304 Not Modified';
}

export const MonitoringHubScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'Prometheus' | 'Grafana' | 'Jaeger' | 'ELK'>('Prometheus');
  const [selectedTrace, setSelectedTrace] = useState<string>('trace-tx-9941a');

  const [spans] = useState<TelemetrySpan[]>([
    { service: 'Ingress API Gateway', operation: 'POST /v1/quotes/calculate', durationMs: 4, status: '200 OK' },
    { service: 'Identity Service', operation: 'JWT OAuth2 Scope Verification', durationMs: 12, status: '200 OK' },
    { service: 'Quote Engine Service', operation: 'Risk Score & NCB Discount Calc', durationMs: 82, status: '200 OK' },
    { service: 'PostgreSQL DB Shard 2', operation: 'SELECT * FROM insurer_tariffs', durationMs: 18, status: '200 OK' },
    { service: 'Redis Cache Node 1', operation: 'SETEX quote_cache_9941a 1800', durationMs: 2, status: '200 OK' },
  ]);

  const totalTraceDuration = spans.reduce((sum, s) => sum + s.durationMs, 0);

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enterprise Telemetry & Monitoring</Text>
        </View>

        {/* Observability Banner */}
        <View style={styles.observabilityCard}>
          <Text style={styles.obsTitle}>📊 Prometheus, Grafana & OpenTelemetry Suite</Text>
          <Text style={styles.obsSub}>
            Real-time metrics aggregation, distributed tracing, and ELK log ingestion engine
          </Text>

          <View style={styles.stackGrid}>
            <View style={styles.stackPill}>
              <Text style={styles.stackPillText}>🔥 Prometheus v2.48</Text>
            </View>
            <View style={styles.stackPill}>
              <Text style={styles.stackPillText}>📈 Grafana v10.2</Text>
            </View>
            <View style={styles.stackPill}>
              <Text style={styles.stackPillText}>🔭 OpenTelemetry</Text>
            </View>
            <View style={styles.stackPill}>
              <Text style={styles.stackPillText}>🕸️ Jaeger Tracing</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {(['Prometheus', 'Grafana', 'Jaeger', 'ELK'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Prometheus' && (
          <View>
            <Text style={styles.sectionHeader}>Prometheus Metric Scrapes & Alerts</Text>
            <View style={styles.metricCard}>
              <View style={styles.metricRow}>
                <Text style={styles.metricName}>http_requests_total</Text>
                <Text style={styles.metricVal}>4,892,104 reqs</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricName}>node_cpu_seconds_total</Text>
                <Text style={styles.metricVal}>42.1% Avg</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricName}>process_resident_memory_bytes</Text>
                <Text style={styles.metricVal}>3.42 GB</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricName}>alert_rules_active</Text>
                <Text style={styles.metricVal}>0 Firing / 28 Pending</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Jaeger' && (
          <View>
            <View style={styles.traceHeaderCard}>
              <Text style={styles.traceTitle}>🕸️ Jaeger Distributed Trace Inspector</Text>
              <Text style={styles.traceMeta}>Trace ID: {selectedTrace} • Total Latency: {totalTraceDuration} ms</Text>
            </View>

            <Text style={styles.sectionHeader}>Span Call Waterfall</Text>

            {spans.map((span, idx) => (
              <View key={idx} style={styles.spanCard}>
                <View style={styles.spanHeaderRow}>
                  <Text style={styles.spanService}>{span.service}</Text>
                  <Text style={styles.spanDuration}>{span.durationMs} ms</Text>
                </View>

                <Text style={styles.spanOp}>{span.operation}</Text>

                <View style={styles.spanBarTrack}>
                  <View
                    style={[
                      styles.spanBarFill,
                      { width: `${(span.durationMs / totalTraceDuration) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Grafana' && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📈 Grafana Executive Dashboards</Text>
            <Text style={styles.infoText}>
              Pre-configured dashboards for RED metrics (Rate, Errors, Duration) and USE metrics (Utilization, Saturation, Errors).
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLbl}>Dashboard Refresh:</Text>
              <Text style={styles.infoVal}>5 Seconds</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLbl}>Alert Notification Channels:</Text>
              <Text style={styles.infoVal}>PagerDuty, Slack #ops-alerts, Webhook</Text>
            </View>
          </View>
        )}

        {activeTab === 'ELK' && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>🪵 ELK Stack (Elasticsearch, Logstash, Kibana)</Text>
            <Text style={styles.infoText}>
              Centralized log aggregation engine processing 15,000 log events per second with automatic index rotation.
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLbl}>Log Storage Retention:</Text>
              <Text style={styles.infoVal}>90 Days Cold / 30 Days Hot</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLbl}>Index Size:</Text>
              <Text style={styles.infoVal}>48.2 GB</Text>
            </View>
          </View>
        )}
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
  observabilityCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  obsTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  obsSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  stackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stackPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stackPillText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTabButton: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  activeTabText: {
    color: COLORS.primaryLight,
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  metricCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  metricName: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  metricVal: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  traceHeaderCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  traceTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    fontSize: 14,
  },
  traceMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  spanCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spanHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  spanService: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  spanDuration: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  spanOp: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 8,
  },
  spanBarTrack: {
    height: 4,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    overflow: 'hidden',
  },
  spanBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 2,
  },
  infoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 6,
  },
  infoText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLbl: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  infoVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
