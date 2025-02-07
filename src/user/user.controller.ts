import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() body: { username: string; password: string; email: string }) {
    const user = await this.userService.create(body.username, body.password, body.email);
    return { message: 'User created successfully', user };
  }
}
