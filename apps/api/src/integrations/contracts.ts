/**
 * Provider boundaries are intentionally framework-agnostic. Concrete adapters
 * may be enabled only after a provider contract, encryption key, and audit
 * review have been configured for the deployment.
 */
export type BrokerConnection = { id: string; workspaceId: string; provider: string; accountReference: string; encryptedSecret: string; status: 'PENDING' | 'ACTIVE' | 'ERROR' | 'REVOKED' };
export type NormalizedExecution = { externalId: string; symbol: string; assetClass: 'STOCK' | 'FUTURE' | 'FOREX' | 'CRYPTO' | 'OPTION'; side: 'LONG' | 'SHORT'; quantity: number; price: number; commission: number; executedAt: Date; currency: string };
export interface BrokerAdapter {
  readonly provider: string;
  validateConnection(connection: BrokerConnection): Promise<void>;
  fetchExecutions(connection: BrokerConnection, cursor?: string): Promise<{ executions: NormalizedExecution[]; nextCursor?: string }>;
  revoke(connection: BrokerConnection): Promise<void>;
}
export interface MarketDataAdapter { readonly provider: string; candles(input: { symbol: string; resolution: string; from: Date; to: Date }): Promise<Array<{ time: number; open: number; high: number; low: number; close: number; volume?: number }>>; }
export interface AiProvider { readonly provider: string; review(input: { workspaceId: string; allowedTradeIds: string[]; prompt: string }): Promise<{ text: string; citations: Array<{ entity: 'trade' | 'note' | 'rule'; id: string }> }>; }

