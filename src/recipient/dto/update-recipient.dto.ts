import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecipientDto } from './create-recipient.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRecipientDto extends PartialType(CreateRecipientDto) {
    @ApiProperty({
        example: 'Old password'
    })
    @IsString()
    @IsOptional()
    currentPassword?: string;
}
