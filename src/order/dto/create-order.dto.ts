import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";
import { OrderStatus } from "../../common/enum/orderStatus.enum";


export class CreateOrderDto {

    @ApiProperty({
        example: 15000.50,
        description: "Buyurtma summasi"
    })
    @IsNumber({}, { message: "Sum faqat son bo'lishi kerak" })
    @IsNotEmpty({ message: "Sum maydoni bo'sh bo'lishi mumkin emas" })
    sum: number;



    @ApiProperty({
        example: "Toshkent, Olmazor ko'chasi 12",
        description: "Buyurtma manzili"
    })
    @IsString({ message: "Location faqat matn bo'lishi kerak" })
    @IsNotEmpty({ message: "Location maydoni bo'sh bo'lishi mumkin emas" })
    location: string;



    @ApiProperty({
        example: 1,
        description: "Buyurtmani beruvchi foydalanuvchi ID"
    })
    @IsNumber({}, { message: "user_id faqat son bo'lishi kerak" })
    @IsNotEmpty({ message: "user_id maydoni bo'sh bo'lishi mumkin emas" })
    user_id: number;
    



    @ApiProperty({
        example: 3,
        description: "Mahsulot (shop) ID"
    })
    @IsNumber({}, { message: "shop_id faqat son bo'lishi kerak" })
    @IsNotEmpty({ message: "shop_id maydoni bo'sh bo'lishi mumkin emas" })
    shop_id: number;



    @ApiProperty({
        example: OrderStatus.PENDING,
        description: "Buyurtma holati",
        enum: OrderStatus
    })
    @IsEnum(OrderStatus, { message: "status noto'g'ri formatda" })
    @IsNotEmpty({ message: "status maydoni bo'sh bo'lishi mumkin emas" })
    status: OrderStatus;
}
