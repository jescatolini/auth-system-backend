import { UnauthorizedException, Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>, 
    private userService: UserService, 
    private jwtService: JwtService
  ) {}

  async register(username: string, password: string): Promise<any> {
    const userExists = await this.userModel.findOne({ username }).exec();
    if (userExists) {
      throw new ConflictException('Usuário já existe');  
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new this.userModel({ username, password: hashedPassword });
      await newUser.save();  
      return { message: 'Usuário registrado com sucesso' };
    } catch (error) {

      if (error.code === 11000) {
        throw new ConflictException('Usuário já existe');
      }
      throw error;  
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Remove a senha antes de retornar o usuário
    const { passwords, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),  
    };
  }
}
