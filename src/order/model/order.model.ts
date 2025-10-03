import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import { Shop } from "../../shop/model/shop.model";
import { OrderStatus } from "../../common/enum/orderStatus.enum";
import { User } from "../../user/model/user.model";
import { Payment } from "../../payments/model/payment.model";

interface IOrderCreateAttr {
    id?: number;
    sum: number;
    location: string;
    user_id: number;
    shop_id: number;
    status: OrderStatus;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, IOrderCreateAttr> {

    @ApiProperty({
        example: 1,
        description: "Buyurtma ID"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;



    @ApiProperty({
        example: 15000.50,
        description: "Buyurtma summasi"
    })
    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    declare sum: number;



    @ApiProperty({
        example: "Toshkent, Olmazor ko'chasi 12",
        description: "Buyurtma manzili"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare location: string;



    @ApiProperty({
        example: 1,
        description: "Buyurtmani beruvchi foydalanuvchi ID"
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;

    @BelongsTo(() => User)
    declare order : User


    @ApiProperty({
        example: 3,
        description: "Mahsulot (shop) ID"
    })
    @ForeignKey(() => Shop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare shop_id: number;

    @BelongsTo(() => Shop)
    declare shop: Shop;


    @ApiProperty({
        example: OrderStatus.PENDING,
        description: "Buyurtma holati",
        enum: OrderStatus
    })
    @Column({
        type: DataType.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
        defaultValue: OrderStatus.PENDING,
    })
    declare status: OrderStatus;


    @ApiProperty({
        example: new Date(),
        description: "Buyurtma yaratilgan sana"
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare createdAt: Date;


    @ApiProperty({
        example: new Date(),
        description: "Buyurtma oxirgi marta yangilangan sana"
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare updatedAt: Date;



    @HasMany(() => Payment)
    declare payments: Payment[];

}
