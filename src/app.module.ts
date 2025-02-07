/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://escatolini:example@cluster0.ruyql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
    AuthModule, 
    UserModule
  ],
})
export class AppModule {}
