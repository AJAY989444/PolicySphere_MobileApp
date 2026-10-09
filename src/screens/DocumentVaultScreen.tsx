import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useDocumentStore } from '../store/useDocumentStore';
import { DocumentUploadModal } from '../components/documents/DocumentUploadModal';
import { VaultDocument } from '../types/package3';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'DocumentVault'>;

export const DocumentVaultScreen: React.FC<Props> = ({ navigation }) => {
  const { documents, isLoading, loadDocuments, uploadDocument } = useDocumentStore();
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedDocForOcr, setSelectedDocForOcr] = useState<VaultDocument | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Vault & AI OCR (Module 12)</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => setUploadModalVisible(true)}>
          <Text style={styles.uploadBtnText}>+ Upload</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Security & OCR Banner */}
        <View style={styles.securityBanner}>
          <View style={styles.securityRow}>
            <Text style={styles.securityBadge}>🔒 AES-256 Encrypted</Text>
            <Text style={styles.securityBadge}>🤖 AI OCR Extractor</Text>
            <Text style={styles.securityBadge}>🛡️ Virus Cleaned</Text>
          </View>
          <Text style={styles.securityNote}>
            Your personal identity documents & claims bills are encrypted at rest with multi-tenant zero-trust security.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Stored Documents ({documents.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : documents.length === 0 ? (
          <Text style={styles.emptyText}>No documents in vault yet.</Text>
        ) : (
          documents.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docHeader}>
                <View style={styles.docIconBox}>
                  <Text style={styles.docIconText}>{doc.fileFormat}</Text>
                </View>
                <View style={styles.docMainInfo}>
                  <Text style={styles.docName} numberOfLines={1}>
                    {doc.documentName}
                  </Text>
                  <Text style={styles.docSub}>
                    {doc.documentType} • {doc.fileSize} • Uploaded {doc.uploadDate} (v{doc.version})
                  </Text>
                </View>
              </View>

              <View style={styles.tagsRow}>
                {doc.isVirusScanned && <Text style={styles.tagSuccess}>✓ Virus Clean</Text>}
                {doc.isAiVerified && <Text style={styles.tagAi}>🤖 AI Verified</Text>}
                <Text style={styles.tagEnc}>{doc.encryptionStatus}</Text>
              </View>

              {/* OCR Action */}
              <TouchableOpacity
                style={styles.ocrViewBtn}
                onPress={() => setSelectedDocForOcr(doc)}
              >
                <Text style={styles.ocrViewText}>🔍 View Extracted OCR Text Data</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        visible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        onUpload={async (docName, docType, format, size) => {
          await uploadDocument(docName, docType, format, size);
        }}
      />

      {/* OCR Inspector Modal */}
      {selectedDocForOcr && (
        <Modal transparent animationType="fade" visible={!!selectedDocForOcr} onRequestClose={() => setSelectedDocForOcr(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.ocrModalCard}>
              <Text style={styles.ocrModalTitle}>AI OCR Extracted Key-Value Text</Text>
              <Text style={styles.ocrDocName}>{selectedDocForOcr.documentName}</Text>

              <View style={styles.ocrBox}>
                <Text style={styles.ocrText}>{selectedDocForOcr.ocrExtractedText}</Text>
              </View>

              <TouchableOpacity style={styles.closeOcrBtn} onPress={() => setSelectedDocForOcr(null)}>
                <Text style={styles.closeOcrText}>Close OCR View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
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
  uploadBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  uploadBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  securityBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  securityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  securityBadge: {
    backgroundColor: COLORS.primaryDark,
    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  securityNote: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 16 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  docCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  docHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  docIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docIconText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  docMainInfo: { flex: 1 },
  docName: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  docSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  tagsRow: { flexDirection: 'row', gap: 6, marginTop: 10, flexWrap: 'wrap' },
  tagSuccess: { backgroundColor: '#064E3B', color: COLORS.accent, fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '600' },
  tagAi: { backgroundColor: '#1E3A8A', color: COLORS.primaryLight, fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '600' },
  tagEnc: { backgroundColor: '#334155', color: COLORS.textSecondary, fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ocrViewBtn: {
    marginTop: 12,
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  ocrViewText: { color: COLORS.primaryLight, fontSize: 12, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'center', padding: 20 },
  ocrModalCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  ocrModalTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  ocrDocName: { fontSize: 12, color: COLORS.accent, marginTop: 4, marginBottom: 12 },
  ocrBox: { backgroundColor: '#0F172A', padding: 14, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: COLORS.accent },
  ocrText: { color: COLORS.textPrimary, fontSize: 13, lineHeight: 20, fontFamily: 'Platform' },
  closeOcrBtn: { marginTop: 16, backgroundColor: '#334155', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  closeOcrText: { color: COLORS.textPrimary, fontWeight: '600' },
});
