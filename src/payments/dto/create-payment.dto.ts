import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum, IsDate } from "class-validator";
import { PaymentMethod } from "../../common/enum/paymentMethod.enum";
import { PaymentStatus } from "../../common/enum/paymentStatus.enum";




export class CreatePaymentDto {
    
    @ApiProperty({
        example: 1,
        description: "To'lov qiluvchi foydalanuvchi ID"
    })
    @IsNumber({}, { message: "user_id number bo'lishi kerak" })
    @IsNotEmpty()
    user_id: number;

    
    @ApiProperty({
        example: 1,
        description: "Donate ID"
    })
    @IsNumber({}, { message: "donate_id number bo'lishi kerak" })
    @IsNotEmpty()
    donate_id: number;

    
    @ApiProperty({
        example: 1,
        description: "Order ID"
    })
    @IsNumber({}, { message: "order_id number bo'lishi kerak" })
    @IsNotEmpty()
    order_id: number;

    
    @ApiProperty({
        example: PaymentMethod.CLICK,
        enum: PaymentMethod,
        description: "To'lov usuli"
    })
    @IsEnum(PaymentMethod, { message: "payment_method enum bo'lishi kerak" })
    @IsNotEmpty()
    payment_method: PaymentMethod;


    @ApiProperty({
        example: PaymentStatus.SUCCESS,
        enum: PaymentStatus,
        description: "To'lov holati"
    })
    @IsEnum(PaymentStatus, { message: "status enum bo'lishi kerak" })
    @IsNotEmpty()
    status: PaymentStatus;

    
    @ApiProperty({
        example: 150.50,
        description: "To'lov miqdori"
    })
    @IsNumber({}, { message: "amount number bo'lishi kerak" })
    @IsNotEmpty()
    amount: number;


    @ApiProperty({
        example: "2025-10-03T14:48:00Z",
        description: "To'lov sanasi"
    })
    @IsDate({ message: "payment_date Date bo'lishi kerak" })
    @IsNotEmpty()
    payment_date: Date;
}
