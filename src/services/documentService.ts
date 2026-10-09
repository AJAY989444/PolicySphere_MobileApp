import { VaultDocument } from '../types/package3';

const MOCK_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-1',
    documentName: 'Aadhaar_Card_Front_Back.pdf',
    documentType: 'Aadhaar',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    uploadDate: '2026-09-10',
    version: 1,
    isVirusScanned: true,
    isAiVerified: true,
    ocrExtractedText: 'Aadhaar #: XXXX-XXXX-4812 | Name: Rajesh Kumar | DOB: 14/05/1992 | Address: New Delhi',
    encryptionStatus: 'AES-256 Encrypted',
  },
  {
    id: 'doc-2',
    documentName: 'PAN_Card_Identity.jpg',
    documentType: 'PAN',
    fileFormat: 'JPG',
    fileSize: '450 KB',
    uploadDate: '2026-09-10',
    version: 1,
    isVirusScanned: true,
    isAiVerified: true,
    ocrExtractedText: 'PAN #: ABCDE1234F | Name: Rajesh Kumar | Father Name: Suresh Kumar',
    encryptionStatus: 'AES-256 Encrypted',
  },
  {
    id: 'doc-3',
    documentName: 'Hospital_Discharge_Summary.pdf',
    documentType: 'MedicalReport',
    fileFormat: 'PDF',
    fileSize: '2.8 MB',
    uploadDate: '2026-09-28',
    version: 1,
    isVirusScanned: true,
    isAiVerified: true,
    ocrExtractedText: 'Apollo Hospital | Patient: Rajesh Kumar | Diagnosis: Acute Appendicitis | Procedure: Appendectomy',
    encryptionStatus: 'AES-256 Encrypted',
  },
  {
    id: 'doc-4',
    documentName: 'Hospital_Final_Itemized_Bill.pdf',
    documentType: 'Bill',
    fileFormat: 'PDF',
    fileSize: '1.9 MB',
    uploadDate: '2026-09-28',
    version: 1,
    isVirusScanned: true,
    isAiVerified: true,
    ocrExtractedText: 'Total Bill Amount: ₹65,000 | Room Rent: ₹15,000 | OT Charges: ₹25,000 | Pharmacy: ₹12,000',
    encryptionStatus: 'AES-256 Encrypted',
  },
];

export class DocumentService {
  private vaultDocuments: VaultDocument[] = MOCK_DOCUMENTS;

  public async getVaultDocuments(): Promise<VaultDocument[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.vaultDocuments), 150);
    });
  }

  public async uploadDocument(
    documentName: string,
    documentType: VaultDocument['documentType'],
    fileFormat: VaultDocument['fileFormat'],
    fileSize: string
  ): Promise<VaultDocument> {
    const ocrSnippet =
      documentType === 'Bill'
        ? `OCR Text Extracted: Total Bill Amount: ₹45,000 | Hospital ID: H-9012`
        : documentType === 'RC'
        ? `OCR Text Extracted: Vehicle Registration #: DL-01-AB-1234 | Engine #: ENG9912`
        : `OCR Text Extracted: Verified document ${documentName} via AI Scanner`;

    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      documentName,
      documentType,
      fileFormat,
      fileSize,
      uploadDate: new Date().toISOString().split('T')[0],
      version: 1,
      isVirusScanned: true,
      isAiVerified: true,
      ocrExtractedText: ocrSnippet,
      encryptionStatus: 'AES-256 Encrypted',
    };

    this.vaultDocuments.unshift(newDoc);
    return newDoc;
  }
}

export const documentService = new DocumentService();
