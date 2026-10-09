import { create } from 'zustand';
import { VaultDocument } from '../types/package3';
import { documentService } from '../services/documentService';

interface DocumentState {
  documents: VaultDocument[];
  isLoading: boolean;
  loadDocuments: () => Promise<void>;
  uploadDocument: (
    documentName: string,
    documentType: VaultDocument['documentType'],
    fileFormat: VaultDocument['fileFormat'],
    fileSize: string
  ) => Promise<VaultDocument>;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  loadDocuments: async () => {
    set({ isLoading: true });
    const docs = await documentService.getVaultDocuments();
    set({ documents: docs, isLoading: false });
  },
  uploadDocument: async (documentName, documentType, fileFormat, fileSize) => {
    const newDoc = await documentService.uploadDocument(documentName, documentType, fileFormat, fileSize);
    set({ documents: [newDoc, ...get().documents] });
    return newDoc;
  },
}));
