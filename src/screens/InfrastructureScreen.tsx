import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Infrastructure'>;

interface ClusterNode {
  id: string;
  name: string;
  role: string;
  cpuUsage: number;
  memoryUsage: number;
  podCount: number;
  status: 'Healthy' | 'Warning' | 'Scaling';
}

export const InfrastructureScreen: React.FC<Props> = ({ navigation }) => {
  const [replicas, setReplicas] = useState(12);
  const [isAutoScaling, setIsAutoScaling] = useState(true);
  const [activeTab, setActiveTab] = useState<'K8s' | 'Istio' | 'Terraform' | 'CDN'>('K8s');

  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: 'n1', name: 'k8s-node-prod-01', role: 'Worker (AP-South-1a)', cpuUsage: 42, memoryUsage: 58, podCount: 18, status: 'Healthy' },
    { id: 'n2', name: 'k8s-node-prod-02', role: 'Worker (AP-South-1b)', cpuUsage: 68, memoryUsage: 74, podCount: 22, status: 'Healthy' },
    { id: 'n3', name: 'k8s-node-prod-03', role: 'Worker (AP-South-1c)', cpuUsage: 88, memoryUsage: 82, podCount: 26, status: 'Warning' },
    { id: 'n4', name: 'k8s-node-prod-04', role: 'Control Plane (Master)', cpuUsage: 28, memoryUsage: 39, podCount: 8, status: 'Healthy' },
  ]);

  const handleScaleUp = () => {
    setReplicas((prev) => prev + 2);
    const msg = 'HPA trigger: Scaled up cluster pods from ' + replicas + ' to ' + (replicas + 2);
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Kubernetes HPA Auto-Scale', msg);
    }
  };

  const handleScaleDown = () => {
    if (replicas <= 4) return;
    setReplicas((prev) => prev - 2);
    const msg = 'HPA trigger: Scaled down cluster pods from ' + replicas + ' to ' + (replicas - 2);
    if (Platform.OS === 'web') {
      alert(msg);
    } else {
      Alert.alert('Kubernetes HPA Auto-Scale', msg);
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
          <Text style={styles.headerTitle}>Infrastructure & DevOps</Text>
        </View>

        {/* Overview Banner */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>☁️ Cloud-Native Kubernetes Topology</Text>
          <Text style={styles.overviewSub}>
            Multi-region EKS cluster running Istio Service Mesh, Cloudflare CDN, AWS ELB & Terraform IaC
          </Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{replicas}</Text>
              <Text style={styles.metricLbl}>Active Pods</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>99.99%</Text>
              <Text style={styles.metricLbl}>Uptime SLA</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>mTLS v1.3</Text>
              <Text style={styles.metricLbl}>Istio Mesh</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {(['K8s', 'Istio', 'Terraform', 'CDN'] as const).map((tab) => (
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
        {activeTab === 'K8s' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Cluster Nodes & Pod Distribution</Text>
              <TouchableOpacity
                style={[styles.hpaBadge, isAutoScaling ? styles.hpaActive : styles.hpaInactive]}
                onPress={() => setIsAutoScaling(!isAutoScaling)}
              >
                <Text style={styles.hpaBadgeText}>HPA: {isAutoScaling ? 'ENABLED' : 'MANUAL'}</Text>
              </TouchableOpacity>
            </View>

            {nodes.map((node) => (
              <View key={node.id} style={styles.nodeCard}>
                <View style={styles.nodeCardHeader}>
                  <View>
                    <Text style={styles.nodeName}>{node.name}</Text>
                    <Text style={styles.nodeRole}>{node.role}</Text>
                  </View>
                  <View style={[styles.statusTag, node.status === 'Healthy' ? styles.statusHealthy : styles.statusWarn]}>
                    <Text style={styles.statusText}>{node.status}</Text>
                  </View>
                </View>

                <View style={styles.resourceBarGroup}>
                  <View style={styles.resourceBarHeader}>
                    <Text style={styles.resourceLbl}>CPU Utilization ({node.cpuUsage}%)</Text>
                  </View>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${node.cpuUsage}%` },
                        node.cpuUsage > 85 ? { backgroundColor: COLORS.error } : { backgroundColor: COLORS.primaryLight },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.resourceBarGroup}>
                  <View style={styles.resourceBarHeader}>
                    <Text style={styles.resourceLbl}>Memory Utilization ({node.memoryUsage}%)</Text>
                  </View>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${node.memoryUsage}%` },
                        node.memoryUsage > 80 ? { backgroundColor: '#F59E0B' } : { backgroundColor: '#10B981' },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}

            {/* HPA Pod Scaling Controls */}
            <View style={styles.scaleControlCard}>
              <Text style={styles.scaleTitle}>Horizontal Pod Autoscaler (HPA) Controls</Text>
              <Text style={styles.scaleSub}>Target CPU Threshold: 75% | Min Pods: 4 | Max Pods: 64</Text>
              <View style={styles.scaleBtnGroup}>
                <TouchableOpacity style={styles.scaleBtn} onPress={handleScaleDown}>
                  <Text style={styles.scaleBtnText}>- Remove 2 Pods</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.scaleBtn, styles.scaleBtnPrimary]} onPress={handleScaleUp}>
                  <Text style={styles.scaleBtnText}>+ Scale +2 Pods</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Istio' && (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>🕸️ Istio Service Mesh & Security</Text>
            <Text style={styles.detailDesc}>
              Enforces Zero-Trust network communication between all 24 microservices using envoy sidecar proxies.
            </Text>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>mTLS Encryption:</Text>
              <Text style={styles.specValue}>STRICT (TLS v1.3 / ECDHE)</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Ingress Controller:</Text>
              <Text style={styles.specValue}>NGINX Enterprise Ingress v1.9</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Traffic Shifting:</Text>
              <Text style={styles.specValue}>Canary Deployments (90% v1 / 10% v2)</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Fault Injection:</Text>
              <Text style={styles.specValue}>Chaos Mesh (Disabled in Prod)</Text>
            </View>
          </View>
        )}

        {activeTab === 'Terraform' && (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>🏗️ Infrastructure as Code (Terraform)</Text>
            <Text style={styles.detailDesc}>
              Declarative state managed via HashiCorp Terraform Cloud with S3 remote state lock.
            </Text>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>IaC Provider:</Text>
              <Text style={styles.specValue}>AWS Provider v5.32</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>State Storage:</Text>
              <Text style={styles.specValue}>AWS S3 + DynamoDB Lock Table</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Managed Resources:</Text>
              <Text style={styles.specValue}>142 AWS Resources (EKS, RDS, Redis, S3)</Text>
            </View>
          </View>
        )}

        {activeTab === 'CDN' && (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>🌐 Global Content Delivery Network</Text>
            <Text style={styles.detailDesc}>
              Cloudflare Enterprise Edge network providing DDoS mitigation, Brotli compression, and SSL termination.
            </Text>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Edge Locations:</Text>
              <Text style={styles.specValue}>310+ Global PoPs</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Cache Hit Ratio:</Text>
              <Text style={styles.specValue}>94.2% (Static Assets & Documents)</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>WAF Filtering:</Text>
              <Text style={styles.specValue}>OWASP Top 10 Active Protection</Text>
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
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  metricLbl: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  hpaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hpaActive: {
    backgroundColor: '#064E3B',
  },
  hpaInactive: {
    backgroundColor: '#78350F',
  },
  hpaBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
  },
  nodeCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nodeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeName: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  nodeRole: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusHealthy: {
    backgroundColor: '#064E3B',
  },
  statusWarn: {
    backgroundColor: '#78350F',
  },
  statusText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
  },
  resourceBarGroup: {
    marginTop: 6,
  },
  resourceBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resourceLbl: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  track: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  scaleControlCard: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  scaleTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.primaryLight,
  },
  scaleSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 10,
  },
  scaleBtnGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  scaleBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scaleBtnPrimary: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  scaleBtnText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 6,
  },
  detailDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 14,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  specLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  specValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
