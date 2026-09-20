import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImportsModule } from './imports/imports.module';
import { PrismaModule } from './prisma/prisma.module';
import { TradesModule } from './trades/trades.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: Joi.object({ DATABASE_URL: Joi.string().required(), JWT_ACCESS_SECRET: Joi.string().min(16).required(), JWT_REFRESH_SECRET: Joi.string().min(16).required() }) }),
    PrismaModule, AuthModule, TradesModule, DashboardModule, ImportsModule, WorkspaceModule,
  ],
})
export class AppModule {}
