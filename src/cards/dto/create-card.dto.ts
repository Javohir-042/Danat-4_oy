import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty({
        example: "Visa",
        description: "Karta turi (Visa, MasterCard, Amex va hokazo)",
    })
    @IsNotEmpty({ message: "card_type is required" })
    @IsString({ message: "card_type must be a string" })
    card_type: string;

    @ApiProperty({
        example: "1234-5678-9012-3456",
        description: "Karta raqami",
    })
    @IsNotEmpty({ message: "card_number is required" })
    @IsString({ message: "card_number must be a string" })
    @Length(12, 19, { message: "card_number length must be between 12 and 19 characters" })
    card_number: string;

    @ApiProperty({
        example: 1,
        description: "Recipient ID",
    })
    @IsNotEmpty({ message: "recipientId is required" })
    @IsNumber({}, { message: "recipientId must be a number" })
    recipientId: number;

    @ApiProperty({
        example: "2025-12-31",
        description: "Karta amal qilish muddati",
    })
    @IsNotEmpty({ message: "expiry_url is required" })
    @IsString({ message: "expiry_url must be a string" })
    expiry_url: string;
}
