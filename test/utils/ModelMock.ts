import { Model } from './../../src/application/SequelizeModelConfig';
import { BaseModel, DataTypes, SequelizeBaseModelAttr } from './../../src/models/BaseModel';
/**
 * @author Humberto Machado
 *
 */
@Model({
    name: "ModelMock",
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
export class ModelMock extends BaseModel<Mock> {
}

export interface Mock extends SequelizeBaseModelAttr {
    column1: string;
    column2: number;
}