import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { WorkspaceGuard } from './workspace.guard';
@Global() @Module({ imports: [JwtModule.register({})], controllers: [AuthController], providers: [AuthService, JwtGuard, WorkspaceGuard], exports: [AuthService, JwtGuard, WorkspaceGuard] }) export class AuthModule {}
