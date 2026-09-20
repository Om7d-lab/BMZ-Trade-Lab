import { TradesService } from './trades.service';
describe('TradesService calculations', () => {
  const service = new TradesService({} as never);
  it('calculates long net P&L and R multiple', () => {
    const result = (service as unknown as { calculate: (input: unknown) => { netPnl: number; rMultiple: number } }).calculate({ side: 'LONG', entryPrice: 100, exitPrice: 110, quantity: 2, fees: 2, stopLoss: 95 });
    expect(result.netPnl).toBe(18); expect(result.rMultiple).toBe(1.8);
  });
  it('calculates short net P&L', () => {
    const result = (service as unknown as { calculate: (input: unknown) => { netPnl: number } }).calculate({ side: 'SHORT', entryPrice: 100, exitPrice: 90, quantity: 3, fees: 3 });
    expect(result.netPnl).toBe(27);
  });
});
