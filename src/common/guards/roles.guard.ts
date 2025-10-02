import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../../app.constants";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = ctx.switchToHttp().getRequest();

        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]).map(role => role.toUpperCase());

        if (!roles || roles.includes('public') || roles.length === 0) {
            return true;
        }

        if (
            (req.user?.role && roles.includes(req.user.role)) || (roles.includes('ID') && req.user?.id === req.params.id)
        ) {
            return true;
        }

        // console.log(roles.includes('ID') && req.user?.id === req.params.id)
        return true;
    }
}