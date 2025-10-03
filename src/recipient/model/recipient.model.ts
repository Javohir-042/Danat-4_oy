import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { RecipientSocial } from "../../recipient-social/model/recipient-social.model";
import { Card } from "../../cards/model/card.model";
import { Role } from "../../common/enum/admin.enum";
import { Donate } from "../../donate/model/donate.model";
import { Shop } from "../../shop/model/shop.model";

interface IRecipientCreationAttr {
    name: string;
    full_name: string;
    email: string;
    password: string;
    addres: string; // address sifatida yozsangiz to'g'riroq bo'ladi
}

@Table({ tableName: "recipient" })
export class Recipient extends Model<Recipient, IRecipientCreationAttr> {
    @ApiProperty({
        example: 1,
        description: "Recipient ID",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Sardor",
        description: "Foydalanuvchi ismi",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    declare name: string;

    @ApiProperty({
        example: "Sardor Qodirov",
        description: "Foydalanuvchi to'liq ism-sharifi",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare full_name: string;

    @ApiProperty({
        example: "sardor123@mail.uz",
        description: "Foydalanuvchi email manzili",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @ApiProperty({
        example: "Sardor123!",
        description: "Foydalanuvchi paroli",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @ApiProperty({
        example: "Toshkent, Chilonzor tumani, 15-uy",
        description: "Foydalanuvchi manzili",
    })
    @Column({
        type: DataType.STRING(250),
        allowNull: false,
    })
    declare addres: string;
    

    @ApiProperty({
        example: "admin",
        description: "Foydalanuvchi roli (admin yoki user kabi)",
    })
    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
    })
    declare role: Role;



    @HasMany(() => RecipientSocial)
    declare recipientSocial: RecipientSocial[];

    @HasMany(() => Card)
    declare card: Card[];

    @HasMany(() => Donate)
    declare donate: Donate[];

    @HasMany(() => Shop)
    declare shop: Shop[];
}
