import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateShopDto {
    @ApiProperty({ example: "Money", description: "Donat nomi" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 10, description: "Miqdor" })
    @IsNumber()
    @IsNotEmpty()
    count: number;

    @ApiProperty({ example: 150.5, description: "Narxi" })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: "Qo'llab-quvvatlash uchun", description: "Sarlavha" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 1, description: "Recipient ID" })
    @IsNumber()
    @IsNotEmpty()
    recipent_id: number;

    @ApiProperty({ example: 1, description: "Category ID" })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({ example: "Bu donat qo'llab-quvvatlash uchun", description: "Tavsif" })
    @IsString()
    @IsNotEmpty()
    description: string;
}
