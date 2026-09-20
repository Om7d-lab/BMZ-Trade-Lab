import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable() export class DashboardService {
  constructor(private prisma: PrismaService) {}
  async summary(workspaceId: string) {
    const trades = await this.prisma.trade.findMany({ where: { workspaceId, status: 'CLOSED' }, select: { netPnl: true, grossPnl: true, openedAt: true } });
    const pnl = trades.map((t) => Number(t.netPnl)); const wins = pnl.filter((x) => x > 0); const losses = pnl.filter((x) => x < 0);
    const netPnl = pnl.reduce((a, b) => a + b, 0); const daily = new Map<string, number>();
    trades.forEach((t) => { const key = t.openedAt.toISOString().slice(0, 10); daily.set(key, (daily.get(key) ?? 0) + Number(t.netPnl)); });
    let running = 0; let peak = 0; let maxDrawdown = 0; const equity = [...daily.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, value]) => { running += value; peak = Math.max(peak, running); maxDrawdown = Math.min(maxDrawdown, running - peak); return { date, pnl: value, cumulative: running }; });
    return { netPnl, tradeCount: trades.length, winRate: trades.length ? wins.length / trades.length : 0, profitFactor: Math.abs(losses.reduce((a, b) => a + b, 0)) ? wins.reduce((a, b) => a + b, 0) / Math.abs(losses.reduce((a, b) => a + b, 0)) : 0, maxDrawdown, equity };
  }
}

