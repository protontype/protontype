/*import {
    BaseModel,
    BelongsTo,
    BelongsToMany,
    DataTypes,
    HasMany,
    HasOne,
    Model,
    SequelizeBaseModelAttr
} from '../../lib';
/**
 * @author Humberto Machado
 *
 *
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
@BelongsTo("ModelMock3")
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
@BelongsToMany("ModelMock3", {through: "model_mock2_mock3"})
@BelongsTo("ModelMock4")
export class ModelMock2 extends BaseModel<Mock2> {
}

export interface Mock2 extends SequelizeBaseModelAttr {
    mock2Col1: string;
    mock2Col2: number;
}

@Model({
    name: "ModelMock3",
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
@HasMany("ModelMock3")
export class ModelMock3 extends BaseModel<Mock3> {
}

export interface Mock3 extends SequelizeBaseModelAttr {
    mock3Col1: string;
    mock3Col2: number;
}

@Model({
    name: "ModelMock4",
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
@HasMany("ModelMock3")
@HasMany("ModelMock2")
@HasOne("ModelMock1")
export class ModelMock4 extends BaseModel<Mock4> {
}

export interface Mock4 extends SequelizeBaseModelAttr {
    mock4Col1: string;
    mock4Col2: number;
}*/