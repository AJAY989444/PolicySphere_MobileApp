import { APITrafficLog, RateLimitStatus, APIProtocol } from '../types/package6';

const MOCK_TRAFFIC: APITrafficLog[] = [
  {
    id: 'req-101',
    timestamp: '2026-10-09 13:15:02',
    protocol: 'REST',
    method: 'GET',
    url: '/api/v1/quotes/health?age=32&sum=1000000',
    status: 200,
    latencyMs: 45,
    idempotencyKey: 'idemp-88102-a1',
    requestHeaders: { Authorization: 'Bearer eyJhbGciOiJKV1Qi...', 'X-Client-Version': '1.0.0' },
    responsePayload: '{"quotesCount": 18, "bestMonthlyPremium": 1250}',
  },
  {
    id: 'req-102',
    timestamp: '2026-10-09 13:14:48',
    protocol: 'GraphQL',
    method: 'POST',
    url: '/graphql',
    status: 200,
    latencyMs: 62,
    requestHeaders: { 'Content-Type': 'application/json', Authorization: 'Bearer eyJhbGciOiJKV1Qi...' },
    responsePayload: '{"data": {"activePolicies": [{"policyNumber": "POL-HLT-2026-99182"}]}}',
  },
  {
    id: 'req-103',
    timestamp: '2026-10-09 13:14:10',
    protocol: 'WebSocket',
    method: 'SUBSCRIBE',
    url: 'wss://gateway.policysphere.io/ws/claims/live-tracker',
    status: 101,
    latencyMs: 12,
    requestHeaders: { Upgrade: 'websocket', Connection: 'Upgrade' },
    responsePayload: '{"event": "STAGE_UPDATED", "claimId": "CLM-HLT-99201", "newStage": "Approved"}',
  },
];

const MOCK_RATE_LIMIT: RateLimitStatus = {
  limitPerMinute: 100,
  remaining: 87,
  resetSeconds: 34,
};

export class APIClientService {
  private logs: APITrafficLog[] = MOCK_TRAFFIC;
  private rateLimit: RateLimitStatus = MOCK_RATE_LIMIT;

  public async getTrafficLogs(): Promise<APITrafficLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.logs]), 150);
    });
  }

  public async getRateLimitStatus(): Promise<RateLimitStatus> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.rateLimit }), 100);
    });
  }

  public async simulateRequest(protocol: APIProtocol, url: string): Promise<APITrafficLog> {
    const lat = Math.floor(Math.random() * 40 + 15);
    const idempKey = `idemp-${Math.floor(Math.random() * 89999 + 10000)}`;

    const log: APITrafficLog = {
      id: `req-${Math.floor(Math.random() * 899 + 100)}`,
      timestamp: new Date().toLocaleString('en-IN'),
      protocol,
      method: protocol === 'GraphQL' ? 'POST' : 'GET',
      url,
      status: 200,
      latencyMs: lat,
      idempotencyKey: idempKey,
      requestHeaders: {
        Authorization: 'Bearer eyJhbGciOiJKV1Qi...',
        'X-Idempotency-Key': idempKey,
        'X-RateLimit-Limit': '100',
      },
      responsePayload: `{"status": "SUCCESS", "protocol": "${protocol}", "latency": "${lat}ms"}`,
    };

    this.logs.unshift(log);
    this.rateLimit.remaining = Math.max(1, this.rateLimit.remaining - 1);
    return log;
  }
}

export const apiClientService = new APIClientService();
