import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/admin.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (Role | string)[]) =>           // bu bilan decorator ichiga bir nechta rollar berishimiz mumkun
    SetMetadata(ROLES_KEY, roles)