import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Recipient } from "../../recipient/model/recipient.model";
import { SocialMedia } from "../../social_media/model/social_media.model";

interface RecipientSocialCreationAttrs {
    socialId: number;
    recipientId: number;
    social_url: string;
}

@Table({ tableName: "recipient_socials", timestamps: true })
export class RecipientSocial extends Model<RecipientSocial, RecipientSocialCreationAttrs> {

    @ApiProperty({
        example: 1,
        description: "Unique ID for recipient social link",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;
    

    @ApiProperty({
        example: 1,
        description: "Social platform ID",
    })
    @ForeignKey(() => SocialMedia)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare socialId: number;

    @BelongsTo(() => SocialMedia)
    declare socialMedia: SocialMedia



    @ApiProperty({
        example: 123,
        description: "Recipient ID",
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @BelongsTo(() => Recipient)
    declare recipient: Recipient



    @ApiProperty({
        example: "https://facebook.com/example",
        description: "URL to the social profile",
    })
    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    declare social_url: string;
}
