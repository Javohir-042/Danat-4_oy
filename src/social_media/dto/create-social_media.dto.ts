import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSocialMediaDto {
    @ApiProperty({
        example: "Instagram",
        description: "Ijtimoiy tarmoq nomi (masalan: Instagram, Telegram, Facebook)",
    })
    @IsString({ message: "social_media faqat string bo'lishi kerak" })
    @IsNotEmpty({ message: "social_media bo'h bo'lishi mumkin emas" })
    social_media: string;

    @ApiProperty({
        example: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        description: "Ijtimoiy tarmoq ikonkasi uchun URL manzil",
    })
    @IsUrl({}, { message: "iconic_url to'g'ri URL bo'lishi kerak" })
    @IsNotEmpty({ message: "iconic_url bo'sh bo'lishi mumkin emas" })
    iconic_url: string;
}
