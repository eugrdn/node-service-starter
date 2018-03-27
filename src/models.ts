import * as Sequelize from 'sequelize';
import {Sqlz} from './typings';
import {config} from '../common/config';
import {importUserModels} from './components/User';

const db = config.database;
export const sequelize = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    define: {
        underscored: true,
        underscoredAll: true,
    },
});

export const models = {
    ...importUserModels(sequelize),
};

Object.keys(models).forEach(name => {
    const model = (models as any)[name];
    if (model && 'associate' in model) {
        (model as any).associate(models);
    }
});
