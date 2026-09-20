import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { WorkspaceGuard } from '../auth/workspace.guard';
import { WorkspaceId } from '../auth/workspace.decorator';
import { DashboardService } from './dashboard.service';
@ApiTags('dashboard') @ApiBearerAuth() @UseGuards(JwtGuard, WorkspaceGuard) @Controller('dashboard') export class DashboardController { constructor(private dashboard: DashboardService) {} @Get('summary') summary(@WorkspaceId() workspaceId: string) { return this.dashboard.summary(workspaceId); } }
