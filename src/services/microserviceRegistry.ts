import { MicroserviceInfo } from '../types/package6';

const MOCK_SERVICES: MicroserviceInfo[] = [
  { id: 'ms-1', name: 'Authentication Service', code: 'AUTH_SVC', endpoint: 'https://auth.policysphere.io', health: 'Healthy', latencyMs: 28, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-2', name: 'Customer Service', code: 'CUST_SVC', endpoint: 'https://customer.policysphere.io', health: 'Healthy', latencyMs: 42, circuitBreaker: 'CLOSED', uptimePercent: 99.98 },
  { id: 'ms-3', name: 'Advisor Service', code: 'ADV_SVC', endpoint: 'https://advisor.policysphere.io', health: 'Healthy', latencyMs: 35, circuitBreaker: 'CLOSED', uptimePercent: 99.95 },
  { id: 'ms-4', name: 'Insurer Service', code: 'INS_SVC', endpoint: 'https://insurer.policysphere.io', health: 'Healthy', latencyMs: 50, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-5', name: 'Policy Service', code: 'POL_SVC', endpoint: 'https://policy.policysphere.io', health: 'Healthy', latencyMs: 45, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-6', name: 'Quote Engine Service', code: 'QUOTE_SVC', endpoint: 'https://quote.policysphere.io', health: 'Healthy', latencyMs: 65, circuitBreaker: 'CLOSED', uptimePercent: 99.97 },
  { id: 'ms-7', name: 'Comparison Service', code: 'COMP_SVC', endpoint: 'https://comparison.policysphere.io', health: 'Healthy', latencyMs: 38, circuitBreaker: 'CLOSED', uptimePercent: 99.96 },
  { id: 'ms-8', name: 'Proposal Service', code: 'PROP_SVC', endpoint: 'https://proposal.policysphere.io', health: 'Healthy', latencyMs: 52, circuitBreaker: 'CLOSED', uptimePercent: 99.98 },
  { id: 'ms-9', name: 'Claim Service', code: 'CLAIM_SVC', endpoint: 'https://claim.policysphere.io', health: 'Healthy', latencyMs: 48, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-10', name: 'Payment Gateway Service', code: 'PAY_SVC', endpoint: 'https://payment.policysphere.io', health: 'Healthy', latencyMs: 82, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-11', name: 'Notification Service', code: 'NOTIF_SVC', endpoint: 'https://notification.policysphere.io', health: 'Healthy', latencyMs: 30, circuitBreaker: 'CLOSED', uptimePercent: 99.94 },
  { id: 'ms-12', name: 'KYC & DigiLocker Service', code: 'KYC_SVC', endpoint: 'https://kyc.policysphere.io', health: 'Healthy', latencyMs: 95, circuitBreaker: 'CLOSED', uptimePercent: 99.92 },
  { id: 'ms-13', name: 'Document Vault Service', code: 'DOC_SVC', endpoint: 'https://document.policysphere.io', health: 'Healthy', latencyMs: 70, circuitBreaker: 'CLOSED', uptimePercent: 99.98 },
  { id: 'ms-14', name: 'AI Recommendation Service', code: 'AI_SVC', endpoint: 'https://ai.policysphere.io', health: 'Healthy', latencyMs: 110, circuitBreaker: 'CLOSED', uptimePercent: 99.91 },
  { id: 'ms-15', name: 'Search Engine Service', code: 'SEARCH_SVC', endpoint: 'https://search.policysphere.io', health: 'Healthy', latencyMs: 18, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-16', name: 'Fraud Radar Service', code: 'FRAUD_SVC', endpoint: 'https://fraud.policysphere.io', health: 'Healthy', latencyMs: 60, circuitBreaker: 'CLOSED', uptimePercent: 99.98 },
  { id: 'ms-17', name: 'Reporting Service', code: 'REP_SVC', endpoint: 'https://reporting.policysphere.io', health: 'Healthy', latencyMs: 55, circuitBreaker: 'CLOSED', uptimePercent: 99.95 },
  { id: 'ms-18', name: 'Analytics Service', code: 'ALY_SVC', endpoint: 'https://analytics.policysphere.io', health: 'Healthy', latencyMs: 40, circuitBreaker: 'CLOSED', uptimePercent: 99.96 },
  { id: 'ms-19', name: 'Audit Trail Service', code: 'AUDIT_SVC', endpoint: 'https://audit.policysphere.io', health: 'Healthy', latencyMs: 25, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-20', name: 'CMS & Content Service', code: 'CMS_SVC', endpoint: 'https://cms.policysphere.io', health: 'Healthy', latencyMs: 32, circuitBreaker: 'CLOSED', uptimePercent: 99.98 },
  { id: 'ms-21', name: 'Support Service', code: 'SUP_SVC', endpoint: 'https://support.policysphere.io', health: 'Healthy', latencyMs: 36, circuitBreaker: 'CLOSED', uptimePercent: 99.97 },
  { id: 'ms-22', name: 'API Gateway Service', code: 'GW_SVC', endpoint: 'https://gateway.policysphere.io', health: 'Healthy', latencyMs: 12, circuitBreaker: 'CLOSED', uptimePercent: 99.999 },
  { id: 'ms-23', name: 'Identity Service', code: 'ID_SVC', endpoint: 'https://identity.policysphere.io', health: 'Healthy', latencyMs: 22, circuitBreaker: 'CLOSED', uptimePercent: 99.99 },
  { id: 'ms-24', name: 'Integration Service', code: 'INT_SVC', endpoint: 'https://integrations.policysphere.io', health: 'Degraded', latencyMs: 240, circuitBreaker: 'HALF_OPEN', uptimePercent: 98.40 },
];

export class MicroserviceRegistry {
  private services: MicroserviceInfo[] = MOCK_SERVICES;

  public async getServices(): Promise<MicroserviceInfo[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.services]), 150);
    });
  }

  public async pingHealthCheck(serviceId: string): Promise<MicroserviceInfo | null> {
    const service = this.services.find((s) => s.id === serviceId);
    if (!service) return null;

    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly simulate normal or spike latencies for demonstration
        const isSpike = Math.random() < 0.25;
        const lat = isSpike
          ? Math.floor(Math.random() * 200 + 150) // 150ms - 350ms
          : Math.floor(Math.random() * 45 + 12);  // 12ms - 57ms

        service.latencyMs = lat;

        if (lat > 250) {
          service.health = 'Down';
          service.circuitBreaker = 'OPEN';
        } else if (lat > 150) {
          service.health = 'Degraded';
          service.circuitBreaker = 'HALF_OPEN';
        } else {
          service.health = 'Healthy';
          service.circuitBreaker = 'CLOSED';
        }

        resolve({ ...service });
      }, 300);
    });
  }
}

export const microserviceRegistry = new MicroserviceRegistry();
