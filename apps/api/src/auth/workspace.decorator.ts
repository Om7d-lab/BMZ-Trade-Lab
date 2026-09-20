import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const WorkspaceId = createParamDecorator((_: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().workspaceId as string);
