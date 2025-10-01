import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "../admin/model/admin.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Module({
    imports: [
        SequelizeModule.forFeature([Admin]),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_KEY || "defaultSecret",
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME || "1d" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    exports: [JwtAuthGuard]
})
export class AuthModule { }
