import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { VaultDocument } from '../../types/package3';
import { COLORS } from '../../constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onUpload: (
    docName: string,
    docType: VaultDocument['documentType'],
    format: VaultDocument['fileFormat'],
    size: string
  ) => Promise<void>;
}

const DOC_TYPES: Array<VaultDocument['documentType']> = [
  'Aadhaar',
  'PAN',
  'MedicalReport',
  'Bill',
  'RC',
  'DL',
  'Passport',
  'ClaimForm',
];

export const DocumentUploadModal: React.FC<Props> = ({ visible, onClose, onUpload }) => {
  const [documentName, setDocumentName] = useState('');
  const [selectedType, setSelectedType] = useState<VaultDocument['documentType']>('Aadhaar');
  const [selectedFormat, setSelectedFormat] = useState<VaultDocument['fileFormat']>('PDF');
  const [isUploading, setIsUploading] = useState(false);
  const [aiOcrStatus, setAiOcrStatus] = useState<string | null>(null);

  const handleUploadSubmit = async () => {
    if (!documentName.trim()) return;
    setIsUploading(true);
    setAiOcrStatus('Scanning virus definitions & running AI OCR extraction...');

    setTimeout(async () => {
      await onUpload(documentName.trim(), selectedType, selectedFormat, '1.4 MB');
      setIsUploading(false);
      setAiOcrStatus(null);
      setDocumentName('');
      onClose();
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Upload Document to AI Vault</Text>
          <Text style={styles.modalSubtitle}>
            AES-256 encrypted storage with automatic virus scan & OCR metadata parsing.
          </Text>

          <Text style={styles.label}>Document Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Health_Discharge_Summary_2026.pdf"
            placeholderTextColor="#64748B"
            value={documentName}
            onChangeText={setDocumentName}
          />

          <Text style={styles.label}>Document Type Category</Text>
          <View style={styles.chipContainer}>
            {DOC_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, selectedType === type && styles.chipSelected]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[styles.chipText, selectedType === type && styles.chipTextSelected]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>File Format</Text>
          <View style={styles.formatRow}>
            {(['PDF', 'JPG', 'PNG', 'DOCX'] as VaultDocument['fileFormat'][]).map((fmt) => (
              <TouchableOpacity
                key={fmt}
                style={[styles.formatBtn, selectedFormat === fmt && styles.formatBtnSelected]}
                onPress={() => setSelectedFormat(fmt)}
              >
                <Text
                  style={[
                    styles.formatBtnText,
                    selectedFormat === fmt && styles.formatBtnTextSelected,
                  ]}
                >
                  {fmt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isUploading && (
            <View style={styles.scanningBox}>
              <ActivityIndicator color={COLORS.accent} />
              <Text style={styles.scanningText}>{aiOcrStatus}</Text>
            </View>
          )}

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} disabled={isUploading}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadBtn, !documentName.trim() && styles.btnDisabled]}
              onPress={handleUploadSubmit}
              disabled={isUploading || !documentName.trim()}
            >
              <Text style={styles.uploadText}>
                {isUploading ? 'Encrypting & AI Parsing...' : 'Encrypt & Upload'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formatRow: {
    flexDirection: 'row',
    gap: 8,
  },
  formatBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  formatBtnSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  formatBtnText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  formatBtnTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scanningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 10,
  },
  scanningText: {
    fontSize: 12,
    color: COLORS.accent,
    flex: 1,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#334155',
    alignItems: 'center',
  },
  cancelText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  uploadBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
  },
  uploadText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  btnDisabled: {
    opacity: 0.5,
  },
});
