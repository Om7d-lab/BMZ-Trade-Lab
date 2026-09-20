import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async register(input: { email: string; password: string; name: string }) {
    const email = input.email.toLowerCase().trim();
    if (await this.prisma.user.findUnique({ where: { email } })) throw new ConflictException('Email is already registered');
    const user = await this.prisma.user.create({ data: { email, name: input.name.trim(), passwordHash: await argon2.hash(input.password), memberships: { create: { role: 'OWNER', workspace: { create: { name: `${input.name.trim()}'s Lab`, slug: `${email.split('@')[0].replace(/[^a-z0-9]+/g, '-')}-${Date.now()}` } } } } }, include: { memberships: true } });
    return this.tokens(user.id, user.email, user.memberships[0].workspaceId);
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase().trim() }, include: { memberships: { take: 1 } } });
    if (!user || !(await argon2.verify(user.passwordHash, password))) throw new UnauthorizedException('Invalid email or password');
    return this.tokens(user.id, user.email, user.memberships[0]?.workspaceId);
  }
  private tokens(userId: string, email: string, workspaceId?: string) {
    const payload = { sub: userId, email, workspaceId };
    return { accessToken: this.jwt.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }), refreshToken: this.jwt.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' }), workspaceId };
  }
}

