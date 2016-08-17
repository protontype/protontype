import { SequelizeDB } from "./SequelizeDB";
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelLoader {
    static modelsList: any[];
    static loadModels(sequelizeDB: SequelizeDB): void;
}
export declare function Model(config: ModelConfig): (constructor: Function) => void;
export interface ModelConfig {
    name: string;
    definition: {};
}
