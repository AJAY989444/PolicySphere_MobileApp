import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useReportingStore } from '../store/useReportingStore';
import { ReportFilterBar } from '../components/reporting/ReportFilterBar';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ReportingDashboard'>;

export const ReportingDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { activeCategory, currentReport, isLoading, loadReport, exportCSV } =
    useReportingStore();

  useEffect(() => {
    loadReport('Sales');
  }, []);

  const handleExportPress = async () => {
    if (!currentReport) return;
    await exportCSV();
    Alert.alert('Report Exported!', `${currentReport.reportType} report downloaded as CSV/PDF.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reporting Hub (Module 19)</Text>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExportPress}>
          <Text style={styles.exportBtnText}>📥 Export CSV</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Category Filter Chips */}
        <ReportFilterBar
          selectedCategory={activeCategory}
          onSelectCategory={(cat) => loadReport(cat)}
        />

        {/* Report Overview Header Card */}
        {currentReport && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Text style={styles.reportTitle}>{currentReport.reportType} Report Summary</Text>
              <Text style={styles.reportDate}>Generated {currentReport.generatedDate}</Text>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Total Records</Text>
                <Text style={styles.kpiVal}>{currentReport.totalRecords}</Text>
              </View>

              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Volume Amount</Text>
                <Text style={[styles.kpiVal, { color: COLORS.accent }]}>
                  ₹{currentReport.totalVolumeAmount.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Report Data Rows Table */}
        <Text style={styles.sectionTitle}>Report Data Entries</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : !currentReport || currentReport.rows.length === 0 ? (
          <Text style={styles.emptyText}>No report entries found.</Text>
        ) : (
          currentReport.rows.map((row) => (
            <View key={row.id} style={styles.rowCard}>
              <View style={styles.rowHeader}>
                <Text style={styles.refId}>{row.referenceId}</Text>
                <Text style={styles.rowDate}>{row.date}</Text>
              </View>

              <Text style={styles.custName}>{row.customerName}</Text>
              <Text style={styles.detailsText}>{row.details}</Text>

              <View style={styles.rowFooter}>
                <Text style={styles.categoryBadge}>{row.category}</Text>
                <Text style={styles.amountText}>
                  {row.amount > 0 ? `₹${row.amount.toLocaleString('en-IN')}` : row.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: { padding: 4 },
  backText: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600' },
  headerTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  exportBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  exportBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  summaryCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginVertical: 12, borderWidth: 1, borderColor: '#334155' },
  summaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reportTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  reportDate: { color: COLORS.textSecondary, fontSize: 11 },
  kpiRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  kpiBox: { flex: 1, backgroundColor: '#0F172A', padding: 10, borderRadius: 8 },
  kpiLabel: { color: COLORS.textSecondary, fontSize: 10 },
  kpiVal: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '800', marginTop: 2 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 10 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  rowCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  refId: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 12 },
  rowDate: { color: '#64748B', fontSize: 11 },
  custName: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700', marginTop: 4 },
  detailsText: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#334155' },
  categoryBadge: { color: COLORS.accent, fontSize: 11, fontWeight: '600' },
  amountText: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
});
