import { LoginCredentialDto } from './dto/login-credential.dto';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterCredentialDto } from './dto/register-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async signUp(@Body() registerCredentialDto: RegisterCredentialDto) {
    const result = await this.authService.signUp(registerCredentialDto);

    if (!result) {
      throw new BadRequestException('Username or email already exists');
    }

    return { message: 'User created successfully' };
  }

  @Post('/signIn')
  async signIn(
    @Body() loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const result =
      await this.authService.validateUserPassword(loginCredentialDto);

    if (!result) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return result;
  }
}
