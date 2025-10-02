import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../common/enum/admin.enum";

export class CreateAdminDto {

    @ApiProperty({
        example: 'Sobir Qodirov',
        description: `Foydalanuvchi to'liq ism-sharif`
    })
    @IsString({ message: "full_name must be a string" })
    @IsNotEmpty({ message: "full_name must be required" })
    full_name: string;

    @ApiProperty({
        example: 'javohirquromboyev933@gmail.com',
        description: 'Foydalanuvchi email'
    })
    @IsEmail({}, { message: "Email must be a valid email address" })
    @IsNotEmpty({ message: "email must be required" })
    email: string;

    @ApiProperty({
        example: 'Javohir123!',
        description: 'Foydalanuvchi password'
    })
    @IsStrongPassword({}, { message: "Password must be stronger"})
    @IsNotEmpty({ message: "Password must be required" })
    password: string;

    @ApiProperty({
        example: true,
        description: 'Foydalanuvchi ijodkormi ?'
    })
    @IsBoolean({ message: "is_creator must be a boolean value" })
    @IsNotEmpty({ message: "is_creator must be required" })
    is_creator: boolean;

    @ApiProperty({
        example: true,
        description: 'Foydalanuvchi faolmi ?'
    })
    @IsBoolean({ message: "is_active must be a boolean value" })
    @IsNotEmpty({ message: "is_active must be required" })
    is_active: boolean;


    @ApiProperty({ example: Role.ADMIN, enum: Role, required: false })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
