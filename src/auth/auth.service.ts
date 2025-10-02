import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/model/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { Role } from '../common/enum/admin.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin) private adminRepo: typeof Admin,
        private readonly jwtService: JwtService,
    ) { }

    private async generateToken(admin: Admin) {
        const payload = { id: admin.id, email: admin.email, isActive: admin.isNewRecord, role: admin.role || Role.ADMIN};
        return { token: this.jwtService.sign(payload) };
    }

    async signup(createAdminDto: CreateAdminDto) {
        const { full_name, email, password, is_active,is_creator, role } = createAdminDto;

        const existsEmail = await this.adminRepo.findOne({ where: { email } });
        if (existsEmail) {
            throw new ConflictException('Bunday email mavjud');
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const admin = await this.adminRepo.create({
            full_name,
            email,
            password: hashedPassword,
            is_active,
            is_creator,
            role: createAdminDto.role
        });

        return {
            message: 'success',
            data: { full_name: admin.full_name, email: admin.email }
        };
    }

    async signin(signinAdminDto: SigninAdminDto) {

        const { email, password } = signinAdminDto;

        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
            throw new UnauthorizedException("Email noto'g'ri");
        }

        const verifyPassword = await bcrypt.compare(password, admin.password);
        if (!verifyPassword) {
            throw new UnauthorizedException("Password noto'g'ri");
        }

        return this.generateToken(admin);
    }
}
