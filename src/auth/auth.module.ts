import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/model/admin.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY || 'defaultSecret', 
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME || '1d' },
    }),
    AdminModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule { }
