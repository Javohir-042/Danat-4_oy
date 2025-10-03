import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Shop } from "../../shop/model/shop.model";

interface ICategoryCreateAttr {
    name: string;
}

@Table({ tableName: 'category'})
export class Category extends Model<Category, ICategoryCreateAttr> {
    
    @ApiProperty({
        example: 1,
        description: 'Category id'
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: 'Money',
        description: `Donat qilish turini belgilovchi nom (masalan: Money)`
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare name: string;

    @HasMany(() => Shop)
    declare shop: Shop[];
    
}
