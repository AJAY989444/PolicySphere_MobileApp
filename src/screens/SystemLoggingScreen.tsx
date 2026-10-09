import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useLoggingStore } from '../store/useLoggingStore';
import { StructuredLogViewer } from '../components/logging/StructuredLogViewer';
import { LogLevel } from '../types/package7';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SystemLogging'>;

export const SystemLoggingScreen: React.FC<Props> = ({ navigation }) => {
  const { logs, selectedLevel, isLoading, loadLogs, setSelectedLevel, exportJSON } =
    useLoggingStore();

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs =
    selectedLevel === 'ALL' ? logs : logs.filter((l) => l.level === selectedLevel);

  const handleExportPress = async () => {
    await exportJSON();
    Alert.alert('Logs Downloaded!', 'System logs exported as JSON file.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>System Logging Console (Module 35)</Text>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExportPress}>
          <Text style={styles.exportText}>📥 Export JSON</Text>
        </TouchableOpacity>
      </View>

      {/* Level Filters */}
      <View style={styles.filterRow}>
        {(['ALL', 'INFO', 'WARN', 'ERROR', 'SECURITY'] as const).map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.chip, selectedLevel === lvl && styles.chipActive]}
            onPress={() => setSelectedLevel(lvl)}
          >
            <Text style={[styles.chipText, selectedLevel === lvl && styles.chipTextActive]}>
              {lvl}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          <StructuredLogViewer logs={filteredLogs} />
        )}
      </View>
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
  exportText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  filterRow: { flexDirection: 'row', backgroundColor: '#1E293B', padding: 10, gap: 6, borderBottomWidth: 1, borderBottomColor: '#334155' },
  chip: { flex: 1, paddingVertical: 6, borderRadius: 6, backgroundColor: '#0F172A', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  chipActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryLight },
  chipText: { color: COLORS.textSecondary, fontSize: 10 },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  content: { flex: 1, padding: 12 },
});
