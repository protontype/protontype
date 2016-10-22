import { 
    Model, BaseModel, 
    DataTypes, SequelizeBaseModelAttr, 
    HasMany, BelongsTo 
} from './../../src';
/**
 * @author Humberto Machado
 *
 */
@Model({
    name: "ModelMock1",
    definition: {
        column1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        column2: {
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
    column1: string;
    column2: number;
}

@Model({
    name: "ModelMock2",
    definition: {
        column3: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        column4: {
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
    column3: string;
    column4: number;
}