import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SocialMediaModule } from './social_media/social_media.module';
import { RecipientModule } from './recipient/recipient.module';
import { RecipientSocialModule } from './recipient-social/recipient-social.module';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';
import { DonateModule } from './donate/donate.module';
import { PaymentsModule } from './payments/payments.module';
import { MeilModule } from './mail/meil.module';

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
      sync: { alter: true }     // force: bu tablellarni ochirib tashlaydi  alter: ishatish 
    }),
    AdminModule,
    AuthModule,
    RecipientModule,
    CardsModule,
    SocialMediaModule,
    RecipientSocialModule,
    UserModule,
    CategoryModule,
    ShopModule,
    OrderModule,
    DonateModule,
    PaymentsModule,
    MeilModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
