import { SequelizeDB } from "./SequelizeDB";
import { SequelizeModel } from "../models/SequelizeModel";
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelLoader {
    static modelsList: SequelizeModel[];
    static loadModels(sequelizeDB: SequelizeDB): void;
}
export declare function Model(config: ModelConfig): (constructor: Function) => void;
export interface ModelConfig {
    name: string;
    definition: {};
}
