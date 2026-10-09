import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { GlobalSearchModal } from '../components/search/GlobalSearchModal';
import { SearchResultItem } from '../types/package4';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'GlobalSearch'>;

export const GlobalSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleSelectResult = (item: SearchResultItem) => {
    if (item.targetRoute === 'QuoteEngine') {
      navigation.navigate('QuoteEngine', item.targetParams as any);
    } else if (item.targetRoute === 'ClaimsManagement') {
      navigation.navigate('ClaimsManagement');
    } else if (item.targetRoute === 'SupportCenter') {
      navigation.navigate('SupportCenter');
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Screen Container if Modal Closed */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Global Search Engine (Module 16)</Text>
        <TouchableOpacity style={styles.openSearchBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.openSearchText}>🔍 Open Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Elasticsearch / OpenSearch Full-Text Engine</Text>
          <Text style={styles.cardSub}>
            Provides instant sub-500ms auto-complete query matching across 24 insurance categories, 12,500+ cashless hospitals, active policies, and Knowledge Base FAQs.
          </Text>
          <TouchableOpacity style={styles.launchBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.launchBtnText}>Tap to Launch Global Voice & Text Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <GlobalSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectResult={handleSelectResult}
      />
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
  openSearchBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  openSearchText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#1E293B', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#334155' },
  cardTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  cardSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 6, lineHeight: 18 },
  launchBtn: { marginTop: 16, backgroundColor: COLORS.primaryLight, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  launchBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
});
