import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssetClass, TradeSide } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { JwtGuard } from '../auth/jwt.guard';
import { WorkspaceGuard } from '../auth/workspace.guard';
import { WorkspaceId } from '../auth/workspace.decorator';
import { TradesService } from './trades.service';
class CreateTradeDto { @IsString() accountId!: string; @IsString() symbol!: string; @IsEnum(AssetClass) assetClass!: AssetClass; @IsEnum(TradeSide) side!: TradeSide; @IsDateString() openedAt!: string; @IsOptional() @IsDateString() closedAt?: string; @IsNumber() @Min(0) quantity!: number; @IsNumber() entryPrice!: number; @IsOptional() @IsNumber() exitPrice?: number; @IsOptional() @IsNumber() stopLoss?: number; @IsOptional() @IsNumber() targetPrice?: number; @IsOptional() @IsNumber() fees?: number; @IsOptional() @IsString() note?: string; }
@ApiTags('trades') @ApiBearerAuth() @UseGuards(JwtGuard, WorkspaceGuard) @Controller('trades') export class TradesController {
  constructor(private trades: TradesService) {}
  @Get() list(@WorkspaceId() workspaceId: string, @Query() query: { search?: string; reviewed?: string; symbol?: string }) { return this.trades.list(workspaceId, query); }
  @Post() create(@WorkspaceId() workspaceId: string, @Body() dto: CreateTradeDto) { return this.trades.create(workspaceId, dto); }
  @Patch(':id/review') review(@WorkspaceId() workspaceId: string, @Param('id') id: string, @Body('reviewed') reviewed: boolean) { return this.trades.review(workspaceId, id, reviewed); }
}
