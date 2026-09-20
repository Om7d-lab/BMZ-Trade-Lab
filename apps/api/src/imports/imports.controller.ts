import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { JwtGuard } from '../auth/jwt.guard';
import { WorkspaceGuard } from '../auth/workspace.guard';
import { ImportsService } from './imports.service';
class CsvPreviewDto { @IsString() csv!: string; }
@ApiTags('imports') @ApiBearerAuth() @UseGuards(JwtGuard, WorkspaceGuard) @Controller('imports') export class ImportsController { constructor(private imports: ImportsService) {} @Post('preview') preview(@Body() body: CsvPreviewDto) { return this.imports.preview(body.csv); } }
