import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretKey', // Usando a variável de ambiente
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(), // Importando o ConfigModule para carregar variáveis de ambiente
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
