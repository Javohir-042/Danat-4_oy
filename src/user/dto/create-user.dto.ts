import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'Sobir Qodirov',
        description: `Foydalanuvchi to'liq ism-sharif`
    })
    @IsString({ message: "full_name must be a string" })
    @IsNotEmpty({ message: "full_name must be required" })
    full_name: string;


    @ApiProperty({
        example: 'sobirqodirov@gmail.com',
        description: 'Foydalanuvchi email'
    })
    @IsEmail({}, { message: "Email must be a valid email address" })
    @IsNotEmpty({ message: "email must be required" })
    email: string;


    @ApiProperty({
        example: 'Sobir123!',
        description: 'Foydalanuvchi parol'
    })
    @IsStrongPassword({}, { message: "Password must be stronger" })
    @IsNotEmpty({ message: "password must be required" })
    password: string;


    @ApiProperty({
        example: '8600123412341234',
        description: 'Foydalanuvchi karta raqami (16 xonali)'
    })
    @IsString({ message: "card_number must be a string" })
    @MinLength(16)
    @MaxLength(16)
    @IsNotEmpty({ message: "card_number must be required" })
    card_number: string;

    
    @ApiProperty({
        example: true,
        description: 'Foydalanuvchi faolmi ?'
    })
    @IsBoolean({ message: "is_active must be a boolean value" })
    @IsNotEmpty({ message: "is_active must be required" })
    is_active: boolean;
}
