export type Trade = { id: string; symbol: string; side: 'Long' | 'Short'; account: string; openedAt: string; quantity: number; entry: number; exit: number; pnl: number; fees: number; reviewed: boolean; tags: string[]; playbook: string };
export const trades: Trade[] = [
  { id: 'T-1048', symbol: 'NQ', side: 'Long', account: 'Apex 150K', openedAt: '2026-09-19 09:42', quantity: 2, entry: 18234.25, exit: 18262.5, pnl: 418, fees: 4, reviewed: true, tags: ['A+ setup', 'NY Open'], playbook: 'Opening Drive' },
  { id: 'T-1047', symbol: 'ES', side: 'Short', account: 'Apex 150K', openedAt: '2026-09-18 10:16', quantity: 3, entry: 6012.5, exit: 6004.75, pnl: 588, fees: 6, reviewed: true, tags: ['Trend day'], playbook: 'VWAP Reclaim' },
  { id: 'T-1046', symbol: 'NQ', side: 'Short', account: 'Apex 150K', openedAt: '2026-09-17 11:08', quantity: 1, entry: 18310, exit: 18325.5, pnl: -310, fees: 2, reviewed: false, tags: ['FOMO', 'Mistake'], playbook: 'Opening Drive' },
  { id: 'T-1045', symbol: 'GC', side: 'Long', account: 'Apex 150K', openedAt: '2026-09-16 08:38', quantity: 2, entry: 2650.2, exit: 2658.1, pnl: 1220, fees: 5, reviewed: true, tags: ['A+ setup'], playbook: 'London Sweep' },
  { id: 'T-1044', symbol: 'BTCUSD', side: 'Long', account: 'Binance Spot', openedAt: '2026-09-15 14:12', quantity: 0.1, entry: 112300, exit: 112860, pnl: 56, fees: 3, reviewed: true, tags: ['Swing'], playbook: 'Breakout Retest' },
];
export const equity = [{ day: 'Mon', pnl: 240, equity: 240 }, { day: 'Tue', pnl: -110, equity: 130 }, { day: 'Wed', pnl: 310, equity: 440 }, { day: 'Thu', pnl: 480, equity: 920 }, { day: 'Fri', pnl: 356, equity: 1276 }];
export const calendar = [120, -80, 0, 240, 168, -102, 330, 0, 85, -42, 610, 102, -230, 280, 0, 160, 212, -75, 321, 100, 0, 80, 350, -125, 115, 0, 192, 44, 0, 220];
