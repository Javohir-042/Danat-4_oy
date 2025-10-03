import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Min } from "sequelize-typescript";

export class CreateShopDto {

    @ApiProperty({
        example: "Super Donat",
        description: "Do'kon nomi yoki mahsulot nomi"
    })
    @IsString({ message: "Name matn bo'lishi kerak" })
    @IsNotEmpty({ message: "Name bo'sh bo'lishi mumkin emas" })
    name: string;

    @ApiProperty({
        example: 10,
        description: "Mahsulot miqdori"
    })
    @Min(1)
    @IsNumber({}, { message: "Count son bo'lishi kerak" })
    @IsNotEmpty({ message: "Count bo'sh bo'lishi mumkin emas" })
    count: number;

    @ApiProperty({
        example: 15000,
        description: "Mahsulot narxi"
    })
    @Min(1)
    @IsNumber({}, { message: "Price son bo'lishi kerak" })
    @IsNotEmpty({ message: "Price bo'sh bo'lishi mumkin emas" })
    price: number;

    @ApiProperty({
        example: "Eng yaxshi sifatdagi donatlar",
        description: "Mahsulotning qisqa tavsifi yoki sarlavhasi"
    })
    @IsString({ message: "Title matn bo'lishi kerak" })
    @IsNotEmpty({ message: "Title bo'sh bo'lishi mumkin emas" })
    title: string;

    @ApiProperty({
        example: 1,
        description: "Recipient (oluvchi) ID raqami"
    })
    @IsNumber({}, { message: "Recipient ID son bo'lishi kerak" })
    @IsNotEmpty({ message: "Recipient ID bo'sh bo'lishi mumkin emas" })
    recipent_id: number;

    @ApiProperty({
        example: 1,
        description: "Category ID raqami"
    })
    @IsNumber({}, { message: "Category ID son bo'lishi kerak" })
    @IsNotEmpty({ message: "Category ID bo'sh bo'lishi mumkin emas" })
    category_id: number;

    @ApiProperty({
        example: "Bu mahsulot donorlar uchun maxsus tayyorlangan",
        description: "Mahsulot haqida to'liq tavsif"
    })
    @IsString({ message: "Description matn bo'lishi kerak" })
    @IsNotEmpty({ message: "Description bo'sh bo'lishi mumkin emas" })
    description: string;
}
