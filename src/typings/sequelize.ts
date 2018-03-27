import * as Sequelize from 'sequelize';
import {Models} from './models';

/**
 * used only for type!
 */
const database = new Sequelize({});

export namespace Sqlz {
    export type DataTypes = typeof Sequelize;
    export type Instance = typeof database;
    export type Model<T, K = any> = Sequelize.Model<T, K>;

    export interface ModelsMap {
        User: Model<Models.User>;
        Address: Model<Models.Address>;
    }
}
