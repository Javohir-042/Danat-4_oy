import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Donate } from "../../donate/model/donate.model";
import { Order } from "../../order/model/order.model";
import { Payment } from "../../payments/model/payment.model";

interface IUserCreationAttr {
    full_name: string;
    email: string;
    password: string;
    card_number: string;
    is_active: boolean;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
    
    @ApiProperty({
        example: 1,
        description: "Foydalanuvchi ID",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;


    @ApiProperty({
        example: "Sobir Qodirov",
        description: "Foydalanuvchi to'liq ism-sharifi",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare full_name: string;


    @ApiProperty({
        example: "sobirqodirov@gmail.com",
        description: "Foydalanuvchi email manzili",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    declare email: string;


    @ApiProperty({
        example: "Sobir123!",
        description: "Foydalanuvchi paroli (hash bo'lib saqlanadi)",
    })
    @Column({
        type: DataType.STRING(1000),
        allowNull: false,
    })
    declare password: string;


    @ApiProperty({
        example: "8600123412341234",
        description: "Foydalanuvchi karta raqami (16 xonali)",
    })
    @Column({
        type: DataType.STRING(16),
        allowNull: false,
        unique: true,
    })
    declare card_number: string;


    @ApiProperty({
        example: true,
        description: "Foydalanuvchi faol yoki yo'qligi",
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    declare is_active: boolean;

    @HasMany(() => Donate)
    declare danate: Donate[];


    @HasMany(() => Order)
    declare order: Order[];

    @HasMany(() => Payment)
    declare payment: Payment

}
