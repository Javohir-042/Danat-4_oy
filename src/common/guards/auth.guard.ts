import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken';                                // JWT token yaratish va tekshirish uchun
import { ROLES_KEY } from "../../app.constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(ctx: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        if (roles?.includes('public')) return true;

        const req = ctx.switchToHttp().getRequest();
        const auth = req.headers.authorization as string | undefined;

        if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException();

        const token = auth.slice(7);
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY!);
            req.user = payload;

            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    // Bu metod foydalanuvchiga token yaratadi 
    async login(user: any) {
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_KEY!,
            { expiresIn: "15h" }
        );

        return { access_token: token };
    }
}