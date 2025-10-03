import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Recipient } from "../../recipient/model/recipient.model";
import { Category } from "../../category/model/category.model";
import { Order } from "../../order/model/order.model";

interface IShopCreateAttr {
    name: string;
    count: number;
    price: number;
    title: string;
    recipent_id: number;
    category_id: number;
    description: string;
}

@Table({ tableName: 'shops' })
export class Shop extends Model<Shop, IShopCreateAttr> {

    @ApiProperty({
        example: 1,
        description: "Mahsulot ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;



    @ApiProperty({
        example: "Super Donat",
        description: "Do'kon yoki mahsulot nomi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;



    @ApiProperty({
        example: 10,
        description: "Mahsulot soni"
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare count: number;



    @ApiProperty({
        example: 15000,
        description: "Mahsulot narxi"
    })
    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare price: number;



    @ApiProperty({
        example: "Eng yaxshi sifatdagi donatlar",
        description: "Mahsulot sarlavhasi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare title: string;



    @ApiProperty({
        example: 1,
        description: "Recipient ID raqami"
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare recipent_id: number;

    @BelongsTo(() => Recipient)
    declare recipient: Recipient



    @ApiProperty({
        example: 2,
        description: "Category ID raqami"
    })
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare category_id: number;

    @BelongsTo(() => Category)
    declare category: Category



    @ApiProperty({
        example: "Bu mahsulot donorlar uchun maxsus tayyorlangan",
        description: "Mahsulot to'liq tavsifi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare description: string;

    @HasMany(() => Order)
    declare order: Order[];
}
