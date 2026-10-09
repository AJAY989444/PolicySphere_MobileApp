import { SystemLogEntry, LogLevel } from '../types/package7';
import { downloadBlobFile } from '../utils/downloadPdf';

const MOCK_LOGS: SystemLogEntry[] = [
  { id: 'log-101', timestamp: '2026-10-09 13:30:02', level: 'SECURITY', sourceModule: 'AuthService', message: 'Mobile OTP verified successfully for +91 98112 34567', metaData: { ip: '103.21.124.55', device: 'iOS' } },
  { id: 'log-102', timestamp: '2026-10-09 13:28:15', level: 'INFO', sourceModule: 'QuoteEngine', message: 'Calculated 18 quotes for Health Insurance Family Floater', metaData: { sumInsured: 1000000, age: 32 } },
  { id: 'log-103', timestamp: '2026-10-09 13:25:40', level: 'WARN', sourceModule: 'FraudService', message: 'Risk score elevated (78/100) due to duplicate PAN hash', metaData: { target: 'PROP-HLT-2026-99182' } },
  { id: 'log-104', timestamp: '2026-10-09 13:20:10', level: 'ERROR', sourceModule: 'PaymentGateway', message: 'UPI transaction timeout on UTR #991028371 (Auto-retry queued)', metaData: { attempt: 1 } },
  { id: 'log-105', timestamp: '2026-10-09 13:15:00', level: 'INFO', sourceModule: 'DocumentService', message: 'AES-256 encrypted Aadhaar document saved to vault', metaData: { docId: 'doc-1' } },
];

export class LoggingService {
  private logs: SystemLogEntry[] = MOCK_LOGS;

  public async getLogs(): Promise<SystemLogEntry[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.logs]), 150);
    });
  }

  public async logEvent(level: LogLevel, sourceModule: string, message: string, metaData: Record<string, any> = {}): Promise<SystemLogEntry> {
    const entry: SystemLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN'),
      level,
      sourceModule,
      message,
      metaData,
    };
    this.logs.unshift(entry);
    return entry;
  }

  public async exportLogsJSON(): Promise<void> {
    const jsonStr = JSON.stringify(this.logs, null, 2);
    downloadBlobFile('PolicySphere_System_Logs_2026.json', jsonStr);
  }
}

export const loggingService = new LoggingService();
