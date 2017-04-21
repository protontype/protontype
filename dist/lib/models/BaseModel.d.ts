import { ProtonDB } from '../application/ProtonDB';
import { AssociationsConfig } from '../decorators/ProtonModelConfig';
import * as Sequelize from 'sequelize';
/**
 * @author Humberto Machado
 */
export declare abstract class BaseModel<ModelAttrinutes extends SequelizeBaseModelAttr> {
    protected model: Sequelize.Model<ModelInstance<ModelAttrinutes>, ModelAttrinutes>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;
    protected ProtonDB: ProtonDB;
    protected associations: AssociationsConfig[];
    getModelName(): string;
    defineModel(sequelize: Sequelize.Sequelize): BaseModel<ModelAttrinutes>;
    configure(): void;
    configureAssociations(): void;
    belongsTo(modelName: string, options?: Sequelize.AssociationOptionsBelongsTo): void;
    hasMany(modelName: string, options?: Sequelize.AssociationOptionsHasMany): void;
    hasOne(modelName: string, options?: Sequelize.AssociationOptionsHasOne): void;
    belongsToMany(modelName: string, options: Sequelize.AssociationOptionsBelongsToMany): void;
    getInstance(): Sequelize.Model<ModelInstance<ModelAttrinutes>, ModelAttrinutes>;
    setProtonDB(ProtonDB: ProtonDB): void;
}
export declare var DataTypes: Sequelize.DataTypes;
export interface SequelizeBaseModelAttr {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
}
export interface ModelInstance<T extends SequelizeBaseModelAttr> extends Sequelize.Instance<T> {
}
