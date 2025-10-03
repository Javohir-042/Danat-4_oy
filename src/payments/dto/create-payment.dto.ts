import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { PaymentMethod } from "../../common/enum/paymentMethod.enum";
import { PaymentStatus } from "../../common/enum/paymentStatus.enum";

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: "To'lov qiluvchi foydalanuvchi ID" })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ example: 1, description: "Donate ID" })
    @IsNumber()
    @IsNotEmpty()
    donate_id: number;

    @ApiProperty({ example: 1, description: "Order ID" })
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty({ example: PaymentMethod.CLICK, enum: PaymentMethod, description: "To'lov usuli" })
    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    payment_method: PaymentMethod;

    @ApiProperty({ example: PaymentStatus.SUCCESS, enum: PaymentStatus, description: "To'lov holati" })
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    status: PaymentStatus;

    @ApiProperty({ example: 150.50, description: "To'lov miqdori" })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ example: "2025-10-03T14:48:00Z", description: "To'lov sanasi" })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    payment_date: Date;
}
