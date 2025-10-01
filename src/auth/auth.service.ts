import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Admin } from "../admin/model/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin) private adminRepo: typeof Admin,
        private readonly jwtService: JwtService,
    ) { }

    private async generateToken(admin: Admin) {
        const payload = { id: admin.id, email: admin.email, isActive: admin.is_active };
        return {
            token: this.jwtService.sign(payload, {
                secret: process.env.ACCESS_TOKEN_KEY || "defaultSecret",
                expiresIn: process.env.ACCESS_TOKEN_TIME || "1d",
            }),
        };
    }

    async signup(createAdminDto: CreateAdminDto) {
        const { full_name, email, password, is_active, is_creator } = createAdminDto;

        const existsEmail = await this.adminRepo.findOne({ where: { email } });
        if (existsEmail) {
            throw new ConflictException("Bunday email allaqachon mavjud");
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const newAdmin = await this.adminRepo.create({
            full_name,
            email,
            password: hashedPassword,
            is_active,
            is_creator,
        });

        const token = await this.generateToken(newAdmin);
        return { message: "Signup muvaffaqiyatli", admin: { id: newAdmin.id, email }, ...token };
    }

    async signin(signinAdminDto: SigninAdminDto) {
        const { email, password } = signinAdminDto;

        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
            throw new UnauthorizedException(`Email noto'g'ri`);
        }

        const verifyPassword = await bcrypt.compare(password, admin.password);
        if (!verifyPassword) {
            throw new UnauthorizedException(`Password noto'g'ri`);
        }

        const token = await this.generateToken(admin);
        return { message: "Signin muvaffaqiyatli", ...token };
    }
}
