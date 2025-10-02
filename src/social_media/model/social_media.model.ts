import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { RecipientSocial } from "../../recipient-social/model/recipient-social.model";

interface ISocialMediaCreationAttr {
    social_media: string;
    iconic_url: string;
}

@Table({ tableName: "social_media" })
export class SocialMedia extends Model<SocialMedia, ISocialMediaCreationAttr> {
    
    @ApiProperty({
        example: 1,
        description: "Ijtimoiy tarmoq ID raqami",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;


    @ApiProperty({
        example: "Instagram",
        description: "Ijtimoiy tarmoq nomi",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare social_media: string;


    @ApiProperty({
        example: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        description: "Ijtimoiy tarmoq ikonkasi uchun URL manzil",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare iconic_url: string;


    @HasMany(() => RecipientSocial)
    declare recipientSocial: RecipientSocial[];
}
