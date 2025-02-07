import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    return this.authService.login(user);
  }
}
