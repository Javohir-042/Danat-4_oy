import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipientSocialDto {
    @ApiProperty({
        example: 1,
        description: "Social platform ID"
    })
    @IsNotEmpty({ message: "socialId is required" })
    @IsNumber({}, { message: "socialId must be a number" })
    socialId: number;

    @ApiProperty({
        example: 1,
        description: "Recipient ID"
    })
    @IsNotEmpty({ message: "recipientId is required" })
    @IsNumber({}, { message: "recipientId must be a number" })
    recipientId: number;

    @ApiProperty({
        example: "https://facebook.com/example",
        description: "URL to the social profile"
    })
    @IsNotEmpty({ message: "social_url is required" })
    @IsString({ message: "social_url must be a string" })
    @IsUrl({}, { message: "social_url must be a valid URL" })
    social_url: string;
}
