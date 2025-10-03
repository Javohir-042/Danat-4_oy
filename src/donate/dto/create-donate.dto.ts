import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDonateDto {

    @ApiProperty({
        example: 1,
        description: "Donat qilinadigan foydalanuvchi Recipient_ID"
    })
    @IsNumber({}, { message: "recipient_id son bo'lishi kerak" })
    @IsNotEmpty({ message: "recipient_id bo'sh bo'lishi mumkin emas" })
    recipient_id: number;


    @ApiProperty({
        example: 2,
        description: "Donat qilayotgan foydalanuvchi User_ID"
    })
    @IsNumber({}, { message: "user_id son bo'lishi kerak" })
    @IsNotEmpty({ message: "user_id bo'sh bo'lishi mumkin emas" })
    user_id: number;


    @ApiProperty({
        example: true,
        description: "Donat qilinishida foydalanuvchiga bildirishnoma yuborish"
    })
    @IsBoolean({ message: "notification faqat true yoki false bo'lishi kerak" })
    @IsNotEmpty({ message: "notification bo'sh bo'lishi mumkin emas" })
    notification: boolean;


    @ApiProperty({
        example: false,
        description: "Donat anonim bo'lishi yoki yo'qligi"
    })
    @IsBoolean({ message: "is_AnonimPay faqat true yoki false bo'lishi kerak" })
    @IsNotEmpty({ message: "is_AnonimPay bo'sh bo'lishi mumkin emas" })
    is_AnonimPay: boolean;
}
