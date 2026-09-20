import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountKind, AssetClass, RuleStage } from '@prisma/client';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { JwtGuard } from '../auth/jwt.guard';
import { WorkspaceGuard } from '../auth/workspace.guard';
import { WorkspaceId } from '../auth/workspace.decorator';
import { WorkspaceService } from './workspace.service';
class AccountDto { @IsString() name!: string; @IsString() broker!: string; @IsEnum(AssetClass) assetClass!: AssetClass; @IsOptional() @IsEnum(AccountKind) kind?: AccountKind; }
class DailyNoteDto { @IsDateString() date!: string; @IsString() title!: string; content!: unknown; }
class PlaybookDto { @IsString() name!: string; @IsOptional() @IsString() description?: string; @IsOptional() @IsArray() rules?: string[]; }
class RuleDto { @IsEnum(RuleStage) stage!: RuleStage; @IsString() title!: string; @IsOptional() @IsArray() activeDays?: number[]; }
class CompleteRuleDto { @IsString() ruleId!: string; @IsDateString() date!: string; completed!: boolean; @IsOptional() lock?: boolean; }
@ApiTags('workspace') @ApiBearerAuth() @UseGuards(JwtGuard, WorkspaceGuard) @Controller('workspace') export class WorkspaceController {
  constructor(private workspace: WorkspaceService) {}
  @Get('accounts') accounts(@WorkspaceId() id: string) { return this.workspace.accounts(id); }
  @Post('accounts') createAccount(@WorkspaceId() id: string, @Body() dto: AccountDto) { return this.workspace.createAccount(id, dto); }
  @Get('notes') notes(@WorkspaceId() id: string) { return this.workspace.notes(id); }
  @Post('notes/daily') saveNote(@WorkspaceId() id: string, @Body() dto: DailyNoteDto) { return this.workspace.upsertDailyNote(id, dto); }
  @Get('playbooks') playbooks(@WorkspaceId() id: string) { return this.workspace.playbooks(id); }
  @Post('playbooks') createPlaybook(@WorkspaceId() id: string, @Body() dto: PlaybookDto) { return this.workspace.createPlaybook(id, dto); }
  @Get('rules') rules(@WorkspaceId() id: string) { return this.workspace.rules(id); }
  @Post('rules') createRule(@WorkspaceId() id: string, @Body() dto: RuleDto) { return this.workspace.createRule(id, dto); }
  @Post('rules/complete') completeRule(@WorkspaceId() id: string, @Body() dto: CompleteRuleDto) { return this.workspace.completeRule(id, dto.ruleId, dto.date, dto.completed, dto.lock); }
}
