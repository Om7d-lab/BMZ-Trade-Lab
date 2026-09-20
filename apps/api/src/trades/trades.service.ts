import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetClass, Prisma, TradeSide, TradeStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type NewTrade = { accountId: string; symbol: string; assetClass: AssetClass; side: TradeSide; openedAt: string; closedAt?: string; quantity: number; entryPrice: number; exitPrice?: number; stopLoss?: number; targetPrice?: number; fees?: number; note?: string };
@Injectable()
export class TradesService {
  constructor(private prisma: PrismaService) {}
  private calculate(input: NewTrade) { const close = input.exitPrice; const gross = close === undefined ? 0 : (input.side === 'LONG' ? close - input.entryPrice : input.entryPrice - close) * input.quantity; const fees = input.fees ?? 0; const risk = input.stopLoss === undefined ? undefined : Math.abs(input.entryPrice - input.stopLoss) * input.quantity; return { grossPnl: gross, fees, netPnl: gross - fees, rMultiple: risk ? (gross - fees) / risk : undefined, status: close === undefined ? TradeStatus.OPEN : TradeStatus.CLOSED }; }
  async list(workspaceId: string, query: { search?: string; reviewed?: string; symbol?: string }) {
    const where: Prisma.TradeWhereInput = { workspaceId, ...(query.symbol ? { symbol: query.symbol.toUpperCase() } : {}), ...(query.reviewed ? { reviewed: query.reviewed === 'true' } : {}), ...(query.search ? { OR: [{ symbol: { contains: query.search.toUpperCase() } }, { note: { contains: query.search, mode: 'insensitive' } }] } : {}) };
    return this.prisma.trade.findMany({ where, include: { account: true, tags: { include: { tag: true } }, playbooks: { include: { playbook: true } } }, orderBy: { openedAt: 'desc' }, take: 250 });
  }
  async create(workspaceId: string, input: NewTrade) {
    const calculated = this.calculate(input);
    return this.prisma.trade.create({ data: { workspaceId, ...input, symbol: input.symbol.toUpperCase(), openedAt: new Date(input.openedAt), closedAt: input.closedAt ? new Date(input.closedAt) : undefined, ...calculated }, include: { account: true } });
  }
  async review(workspaceId: string, id: string, reviewed: boolean) {
    const result = await this.prisma.trade.updateMany({ where: { id, workspaceId }, data: { reviewed } });
    if (!result.count) throw new NotFoundException('Trade not found');
    return { id, reviewed };
  }
}

