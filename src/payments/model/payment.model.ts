import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PaymentMethod } from "../../common/enum/paymentMethod.enum";
import { PaymentStatus } from "../../common/enum/paymentStatus.enum";
import { User } from "../../user/model/user.model";
import { Donate } from "../../donate/model/donate.model";
import { Order } from "../../order/model/order.model";

interface IPaymentCreateAttr {
    id?: number;
    user_id: number;
    donate_id: number;
    order_id: number;
    payment_method: PaymentMethod;
    status: PaymentStatus;
    amount: number;
    payment_date: Date;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreateAttr> {

    @ApiProperty({
        example: 1,
        description: "To'lov ID"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;


    @ApiProperty({
        example: 1,
        description: "Foydalanuvchi ID"
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare user_id: number;

    @BelongsTo(() => User)
    declare user: User;


    @ApiProperty({
        example: 1,
        description: "Donate ID"
    })
    @ForeignKey(() => Donate)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare donate_id: number;

    @BelongsTo(() => Donate)
    declare donate: Donate;


    @ApiProperty({
        example: 1,
        description: "Order ID"
    })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare order_id: number;

    @BelongsTo(() => Order)
    declare order: Order;


    @ApiProperty({
        example: PaymentMethod.CLICK,
        description: "To'lov usuli",
        enum: PaymentMethod
    })
    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethod)),
        allowNull: false
    })
    declare payment_method: PaymentMethod;


    @ApiProperty({
        example: PaymentStatus.SUCCESS,
        description: "To'lov holati",
        enum: PaymentStatus
    })
    @Column({
        type: DataType.ENUM(...Object.values(PaymentStatus)),
        allowNull: false
    })
    declare status: PaymentStatus;


    @ApiProperty({
        example: 150.50,
        description: "To'lov miqdori"
    })
    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare amount: number;


    @ApiProperty({
        example: "2025-10-03T14:48:00Z",
        description: "To'lov sanasi"
    })
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare payment_date: Date;
}
