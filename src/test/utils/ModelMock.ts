import { BaseModel, BelongsTo, DataTypes, HasMany, Model, SequelizeBaseModelAttr } from '../../lib';
/**
 * @author Humberto Machado
 *
 */
@Model({
    name: "ModelMock1",
    definition: {
        mockCol1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mockCol2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false
        }
    }
})
@BelongsTo("ModelMock2")
export class ModelMock1 extends BaseModel<Mock> {
}

export interface Mock extends SequelizeBaseModelAttr {
    mockCol1: string;
    mockCol2: number;
}

@Model({
    name: "ModelMock2",
    definition: {
        mock2Col1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mock2Col2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false
        }
    }
})
@HasMany("ModelMock1")
export class ModelMock2 extends BaseModel<Mock2> {
}

export interface Mock2 extends SequelizeBaseModelAttr {
    mock2Col1: string;
    mock2Col2: number;
}