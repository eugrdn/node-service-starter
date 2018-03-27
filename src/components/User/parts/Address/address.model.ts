import {Sqlz} from '../../../../typings';

export default (sequelize: Sqlz.Instance, types: Sqlz.DataTypes) => {
    const Address = sequelize.define('address', {
        houseNo: {
            type: types.STRING,
            allowNull: false,
            field: 'house_no',
        },
        apartmentNo: {
            type: types.STRING,
            field: 'apartment_no',
        },
        index: types.STRING,
        region: types.STRING,
        district: types.STRING,
        settlement: types.STRING,
        structureNo: {
            type: types.STRING,
            field: 'structure_no',
        },
    });

    (Address as any).associate = (models: Sqlz.ModelsMap) => {
        Address.belongsTo(models.User, {onDelete: 'CASCADE'});
    };

    return Address;
};
