import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        example: 'Money',
        description: 'Donat qilish turini belgilovchi nom (masalan: Money, Clothes, Food)',
    })
    @IsString({ message: `ategoriya nomi matn bo'lishi kerak` })
    @IsNotEmpty({ message: `Kategoriya nomi bo'sh bo'lishi mumkin emas` })
    name: string;
    
}
