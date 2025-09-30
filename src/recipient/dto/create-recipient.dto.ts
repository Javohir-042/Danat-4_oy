import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateRecipientDto {
    @ApiProperty({
        example: "Sardor",
        description: "Foydalanuvchi qisqa ismi",
    })
    @IsString({ message: "name string bo'lishi kerak" })
    @IsNotEmpty({ message: "name bo'sh bo'lishi mumkin emas" })
    name: string;

    @ApiProperty({
        example: "Sardor Qodirov",
        description: "Foydalanuvchi to'liq ism-sharifi",
    })
    @IsString({ message: "full_name string bo'lishi kerak" })
    @IsNotEmpty({ message: "full_name bo'sh bo'lishi mumkin emas" })
    full_name: string;

    @ApiProperty({
        example: "sardor123@mail.uz",
        description: "Foydalanuvchi email manzili",
    })
    @IsEmail({}, { message: "email noto'g'ri formatda" })
    @IsNotEmpty({ message: "email bo'sh bo'lishi mumkin emas" })
    email: string;

    @ApiProperty({
        example: "Sardor123!",
        description: "Foydalanuvchi paroli (kuchli bo'lishi kerak)",
    })
    @IsStrongPassword({}, { message: "Parol kuchliroq bo'lishi kerak" })
    @IsNotEmpty({ message: "password bo'sh bo'lishi mumkin emas" })
    password: string;

    @ApiProperty({
        example: "Toshkent, Chilonzor tumani, 15-uy",
        description: "Foydalanuvchi yashash manzili",
    })
    @IsString({ message: "address string bo'lishi kerak" })
    @IsNotEmpty({ message: "address bo'sh bo'lishi mumkin emas" })
    addres: string;
}
