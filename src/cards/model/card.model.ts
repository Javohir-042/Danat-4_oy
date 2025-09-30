import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Recipient } from "../../recipient/model/recipient.model";

interface ICardCreationAttr {
    card_type: string;
    card_number: string;
    recipientId: number;
    expiry_url: string;
}

@Table({ tableName: "cards", timestamps: true })
export class Card extends Model<Card, ICardCreationAttr> {

    @ApiProperty({
        example: 1,
        description: "Card ID",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;


    @ApiProperty({
        example: "Visa",
        description: "Karta turi (Visa, MasterCard, Amex va hokazo)",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare card_type: string;


    @ApiProperty({
        example: "1234-5678-9012-3456",
        description: "Karta raqami",
    })
    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    declare card_number: string;



    @ApiProperty({
        example: 1,
        description: "Recipient ID",
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;
    
    @BelongsTo(() => Recipient)
    declare recipient: Recipient;


    @ApiProperty({
        example: "2025-12-31",
        description: "Karta amal qilish muddati",
    })
    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    declare expiry_url: string;
}
