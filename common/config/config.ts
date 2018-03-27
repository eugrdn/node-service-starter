import {ProjectConfiig} from '../../src/typings/config';

export const config: ProjectConfiig = {
    servicePort: 9001,
    graphql: '/graphql',
    graphiql: '/graphiql',
    database: {
        name: process.env.DB_NAME || 'starterkitdb',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        username: 'postgres',
        password: 'postgres',
    },
    auth: {
        saltRounds: 10,
        secret: 'asdsadald;aionvjxchrad;fldksfldkflsbh3s',
    },
};
