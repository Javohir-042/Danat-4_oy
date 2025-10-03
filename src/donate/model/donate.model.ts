import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Recipient } from "../../recipient/model/recipient.model";
import { User } from "../../user/model/user.model";
import { Payment } from "../../payments/model/payment.model";

interface IDonateCreateAttr {
    recipient_id: number;
    user_id: number;
    notification: boolean;
    is_AnonimPay: boolean;
}

@Table({ tableName: "donates" })
export class Donate extends Model<Donate, IDonateCreateAttr> {

    @ApiProperty({
        example: 1,
        description: "Donat ID"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;



    @ApiProperty({
        example: 2,
        description: "Donat qilingan recipient ID"
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipient_id: number;

    @BelongsTo(() => Recipient)
    declare recipient: Recipient;


    @ApiProperty({
        example: 5,
        description: "Donat qilgan foydalanuvchi ID"
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;

    @BelongsTo(() => User)
    declare user: User;


    @ApiProperty({
        example: true,
        description: "Donat qilganda bildirishnoma yuborilsinmi"
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare notification: boolean;



    @ApiProperty({
        example: false,
        description: "Anonim tarzda donat qilinsinmi"
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    declare is_AnonimPay: boolean;


    @HasMany(() => Payment)
    declare payment: Payment[];
    
}
