import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable() export class JwtGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(ctx: ExecutionContext) { try { const token = ctx.switchToHttp().getRequest().headers.authorization?.replace('Bearer ', ''); if (!token) throw new Error(); ctx.switchToHttp().getRequest().user = this.jwt.verify(token, { secret: process.env.JWT_ACCESS_SECRET }); return true; } catch { throw new UnauthorizedException(); } }
}

