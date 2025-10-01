import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core"; // qo‘shildi
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../../app.constants"; // qo‘shildi

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector, // qo‘shildi
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const ctx = context;
        const request = ctx.switchToHttp().getRequest();

        // 🔹 Roles metadata o‘qish qo‘shildi
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ])?.map(role => role.toUpperCase());

        // 🔹 Agar public bo‘lsa yoki roles bo‘lmasa → token tekshiruvini o‘tkazmasdan true qaytaradi
        if (!roles || roles.includes('PUBLIC') || roles.length === 0) {
            return true;
        }

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("Auth header topilmadi");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException("Token topilmadi");
        }

        let decodedToken: any;
        try {
            decodedToken = this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY || "defaultSecret" // qo‘shildi
            });
        } catch (error) {
            throw new UnauthorizedException({
                message: `oydalanuvchi ro'yxatdan o'tmagan`,
                error
            });
        }
        request.user = decodedToken;

        return true;
    }
}
