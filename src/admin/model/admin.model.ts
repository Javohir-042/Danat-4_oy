import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../../common/enum/admin.enum";

interface IAdminCreateAttr {
    full_name: string,
    email: string,
    password: string,
    is_creator: boolean,
    is_active: boolean,
    role?: Role
}

@Table({ tableName: 'admin'})
export class Admin extends Model<Admin, IAdminCreateAttr> {
    @ApiProperty({
        example: 1,
        description: 'Foydalanuvchi id'
    })

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;


    @ApiProperty({
        example: 'Sardor Qodirov',
        description: `Foydalanuvchi to'liq ism- sharifi`
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare full_name: string;


    @ApiProperty({
        example: 'sardor123@mail.uz',
        description: 'Foydalanuvchi email manzili'
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    declare email: string;


    @ApiProperty({
        example: 'Sardor123!',
        description: 'Foydalanuvchi paroli'
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare password: string;


    @ApiProperty({
        example: true,
        description: 'Foydalanuvchi ijodkor ekanligi'
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    declare is_creator: boolean;


    @ApiProperty({
        example: true,
        description: `Foydalanuvchi faol yoki yo'qligi`
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    declare is_active: boolean;


    @ApiProperty({
        example: true,
        description: `Foydalanuvchining roli`
    })
    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
        defaultValue: Role.ADMIN,
    })
    declare role: Role;
}
