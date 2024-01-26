import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { Users } from './users.entity';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // SIGNUP
  async signUp(registerCredentialDto: RegisterCredentialDto): Promise<boolean> {
    const { username, email, password } = registerCredentialDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      return false;
    }

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password);

    await this.userRepository.save(user);
    return true;
  }

  // SIGN IN
  async validateUserPassword(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
