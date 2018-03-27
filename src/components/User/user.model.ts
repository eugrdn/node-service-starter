import {Person} from './parts';
import {Sqlz} from '../../typings';

export const importUserModels = (sequelize: Sqlz.Instance): Sqlz.ModelsMap => ({
    User: UserModel(sequelize, sequelize.Sequelize) as Sqlz.ModelsMap['User'],
    Address: sequelize.import('./parts/Address/address.model'),
});

const UserModel = (sequelize: Sqlz.Instance, types: Sqlz.DataTypes) => {
    const User = sequelize.define('user', {
        ...Person,
        id: {
            type: types.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: types.UUIDV4,
        },
        role: {
            type: types.ENUM('Admin', 'User'),
            allowNull: false,
            defaultValue: 'User',
        },
        tel: {
            type: types.STRING,
            allowNull: true,
        },
        email: {
            type: types.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: types.STRING,
            allowNull: false,
        },
    });

    (User as any).associate = (models: Sqlz.ModelsMap) => {
        User.hasMany(models.Address, {
            foreignKey: {
                field: 'user_id',
                name: 'userId',
            },
        });
    };

    return User;
};
