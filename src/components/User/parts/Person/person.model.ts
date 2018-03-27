import * as DataTypes from 'sequelize';

export const Person = {
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
    },
    middleName: {
        type: DataTypes.STRING,
        field: 'middle_name',
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
    },
};
