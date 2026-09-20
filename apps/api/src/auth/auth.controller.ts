import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
class CredentialsDto { @IsEmail() email!: string; @IsString() @MinLength(8) password!: string; }
class RegisterDto extends CredentialsDto { @IsString() @MinLength(2) name!: string; }
@ApiTags('auth') @Controller('auth') export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); }
  @Post('login') @HttpCode(200) login(@Body() dto: CredentialsDto) { return this.auth.login(dto.email, dto.password); }
}

