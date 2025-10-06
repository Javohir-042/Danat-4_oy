import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from '../admin/model/admin.model';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import type { Response } from 'express';

@ApiTags("Auth -- Token olish")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({summary: 'Auth yaratish'})
  @ApiResponse({
    status: 201,
    description: 'Yangi qoshilgan foydalanuvchi',
    type: Admin
  })
  @Roles('public')
  @Post("signup")
  signup(@Body() createdAdminDto: CreateAdminDto) {
    return this.authService.signup(createdAdminDto);
  }


  @ApiOperation({ summary: 'Auth token chiqarish'})
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchining tokeni',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  })
  @Roles('public')
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinAdminDto: SigninAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(signinAdminDto, res);
  }


  @HttpCode(200)
  @Post("signOut")
  signOut (
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
