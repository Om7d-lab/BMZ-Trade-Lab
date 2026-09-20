import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();
async function main() {
  const email = 'demo@bmztradelab.com';
  const user = await prisma.user.upsert({ where: { email }, update: {}, create: { email, name: 'Avery Morgan', passwordHash: await argon2.hash('DemoPass123!'), timezone: 'America/New_York' } });
  const workspace = await prisma.workspace.upsert({ where: { slug: 'bmz-demo' }, update: {}, create: { name: 'BMZ Demo Desk', slug: 'bmz-demo' } });
  await prisma.membership.upsert({ where: { userId_workspaceId: { userId: user.id, workspaceId: workspace.id } }, update: {}, create: { userId: user.id, workspaceId: workspace.id, role: 'OWNER' } });
  const account = await prisma.account.upsert({ where: { id: 'demo-account' }, update: {}, create: { id: 'demo-account', workspaceId: workspace.id, name: 'Apex Futures · 150K', broker: 'Apex', assetClass: 'FUTURE', kind: 'PROP', initialBalance: 150000 } });
  if (await prisma.trade.count({ where: { workspaceId: workspace.id } })) return;
  const samples = [['NQ', 'LONG', 18234, 18262, 2, 418], ['ES', 'SHORT', 6012, 6004, 3, 588], ['NQ', 'SHORT', 18310, 18325, 1, -310], ['GC', 'LONG', 2650, 2658, 2, 1220]] as const;
  for (let i = 0; i < samples.length; i++) { const [symbol, side, entry, exit, quantity, netPnl] = samples[i]; await prisma.trade.create({ data: { workspaceId: workspace.id, accountId: account.id, symbol, assetClass: 'FUTURE', side: side as 'LONG' | 'SHORT', openedAt: new Date(Date.now() - (i + 1) * 86400000), closedAt: new Date(Date.now() - (i + 1) * 86400000 + 3600000), quantity, entryPrice: entry, exitPrice: exit, grossPnl: netPnl + 4, fees: 4, netPnl, reviewed: i !== 2 } }); }
  await prisma.progressRule.createMany({ data: [{ workspaceId: workspace.id, stage: 'PREPARE', title: 'Complete pre-market plan', activeDays: [1,2,3,4,5], required: true }, { workspaceId: workspace.id, stage: 'TRADE', title: 'Respect trading window', activeDays: [1,2,3,4,5], required: true }, { workspaceId: workspace.id, stage: 'REFLECT', title: 'Review every trade', activeDays: [1,2,3,4,5], required: true }] });
}
main().finally(() => prisma.$disconnect());
