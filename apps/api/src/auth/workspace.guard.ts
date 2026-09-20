import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
/** Ensures a caller can never select another tenant merely by changing a header. */
@Injectable() export class WorkspaceGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); const workspaceId = request.headers['x-workspace-id'] ?? request.user?.workspaceId;
    if (!workspaceId || !request.user?.sub) throw new ForbiddenException('A workspace is required');
    const membership = await this.prisma.membership.findUnique({ where: { userId_workspaceId: { userId: request.user.sub, workspaceId } } });
    if (!membership) throw new ForbiddenException('You do not have access to this workspace');
    request.workspaceId = workspaceId; request.membership = membership; return true;
  }
}
