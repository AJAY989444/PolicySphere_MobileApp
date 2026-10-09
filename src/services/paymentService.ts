import { PaymentMethod, PaymentTransaction } from '../types/package2';

export class PaymentService {
  public async processPayment(
    proposalId: string,
    amount: number,
    method: PaymentMethod
  ): Promise<PaymentTransaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const txn: PaymentTransaction = {
          txnId: `TXN-${Date.now()}`,
          proposalId,
          amount,
          method,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
          gatewayRef: `PG-RAZOR-${Math.floor(Math.random() * 899999 + 100000)}`,
        };
        resolve(txn);
      }, 500);
    });
  }

  public async requestRefund(txnId: string): Promise<{ success: boolean; refundRef: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          refundRef: `REF-${Math.floor(Math.random() * 899999 + 100000)}`,
        });
      }, 400);
    });
  }
}

export const paymentService = new PaymentService();
