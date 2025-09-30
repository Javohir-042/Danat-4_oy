import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SocialMediaModule } from './social_media/social_media.module';
import { RecipientModule } from './recipient/recipient.module';
import { RecipientSocialModule } from './recipient-social/recipient-social.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      logging: false,
      // synchronize: true,
      autoLoadModels: true,
      models: []
    }),
    AdminModule,
    UserModule,
    SocialMediaModule,
    RecipientModule,
    RecipientSocialModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
