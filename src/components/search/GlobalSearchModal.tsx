import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSearchStore } from '../../store/useSearchStore';
import { SearchResultItem } from '../../types/package4';
import { COLORS } from '../../constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({ visible, onClose, onSelectResult }) => {
  const { query, results, isSearching, searchHistory, setQuery, performSearch, clearSearch } =
    useSearchStore();
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatusText, setVoiceStatusText] = useState('Listening... Speak now or auto-detecting...');

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    setVoiceStatusText('🎙️ Listening... Speak now ("Health Insurance", "Apollo Hospital", "80D")');

    // Check if Browser Web Speech API is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.interimResults = true;

          recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((result: any) => result[0])
              .map((result: any) => result.transcript)
              .join('');
            setQuery(transcript);
            performSearch(transcript);
            setVoiceStatusText(`Recognized: "${transcript}"`);
          };

          recognition.onerror = () => {
            // Fallback to sample query on error
            setQuery('Health Insurance 80D');
            performSearch('Health Insurance 80D');
            setIsVoiceActive(false);
          };

          recognition.onend = () => {
            setIsVoiceActive(false);
          };

          recognition.start();
          return;
        } catch (e) {
          // Ignore and fallback below
        }
      }
    }

    // Smooth fallback simulation if SpeechRecognition not available
    setTimeout(() => {
      setQuery('Health Insurance 80D');
      performSearch('Health Insurance 80D');
      setIsVoiceActive(false);
    }, 1400);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Search Bar Header */}
        <View style={styles.searchHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.input}
              placeholder="Search policies, hospitals, FAQs..."
              placeholderTextColor="#64748B"
              value={query}
              onChangeText={(txt) => {
                setQuery(txt);
                performSearch(txt);
              }}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.micBtn, isVoiceActive && styles.micBtnActive]}
            onPress={handleVoiceSearch}
          >
            <Text style={styles.micIcon}>{isVoiceActive ? '🔴' : '🎙️'}</Text>
          </TouchableOpacity>
        </View>

        {isVoiceActive && (
          <View style={styles.voiceBanner}>
            <ActivityIndicator color={COLORS.accent} />
            <Text style={styles.voiceText}>{voiceStatusText}</Text>
          </View>
        )}

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {/* Recent Search History if query empty */}
          {!query.trim() && (
            <View>
              <Text style={styles.sectionTitle}>Recent Searches & Trending Tags</Text>
              <View style={styles.chipRow}>
                {searchHistory.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.chip}
                    onPress={() => {
                      setQuery(item);
                      performSearch(item);
                    }}
                  >
                    <Text style={styles.chipText}>🕒 {item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Popular Categories</Text>
              <View style={styles.quickGrid}>
                {['Health Floater', 'Term Life 2 Cr', 'Zero Dep Motor', 'Schengen Travel'].map(
                  (cat, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.gridChip}
                      onPress={() => {
                        setQuery(cat);
                        performSearch(cat);
                      }}
                    >
                      <Text style={styles.gridChipText}>⚡ {cat}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          )}

          {/* Search Results */}
          {isSearching ? (
            <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
          ) : (
            query.trim().length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>
                  Search Results for "{query}" ({results.length})
                </Text>
                {results.length === 0 ? (
                  <Text style={styles.emptyText}>
                    No exact matches found for "{query}". Try searching "Health" or "Apollo".
                  </Text>
                ) : (
                  results.map((res) => (
                    <TouchableOpacity
                      key={res.id}
                      style={styles.resultCard}
                      onPress={() => {
                        onSelectResult(res);
                        onClose();
                      }}
                    >
                      <View style={styles.resultHeader}>
                        <Text style={styles.resultTitle}>{res.title}</Text>
                        {res.badgeText && (
                          <View style={styles.resultBadge}>
                            <Text style={styles.badgeText}>{res.badgeText}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.resultSub}>{res.subtitle}</Text>
                      <Text style={styles.resultType}>Type: {res.type}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
    backgroundColor: '#1E293B',
    gap: 10,
  },
  backBtn: { padding: 4 },
  backText: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '700' },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: { fontSize: 14, marginRight: 6 },
  input: { flex: 1, paddingVertical: 8, color: COLORS.textPrimary, fontSize: 14 },
  clearText: { color: COLORS.textSecondary, fontSize: 14, paddingHorizontal: 6 },
  micBtn: {
    backgroundColor: COLORS.primaryDark,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  micBtnActive: {
    backgroundColor: COLORS.error,
    borderColor: '#FFFFFF',
  },
  micIcon: { fontSize: 18 },
  voiceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    padding: 12,
    paddingHorizontal: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  voiceText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipText: { color: COLORS.textSecondary, fontSize: 12 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridChip: {
    width: '48%',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  gridChipText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '600' },
  emptyText: { color: COLORS.textSecondary, marginTop: 20, textAlign: 'center' },
  resultCard: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultTitle: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14, flex: 1 },
  resultBadge: { backgroundColor: COLORS.accent, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  resultSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  resultType: { color: COLORS.primaryLight, fontSize: 11, marginTop: 6, fontWeight: '600' },
});
