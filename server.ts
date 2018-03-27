import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema, models, authChecker, sequelize} from './src';
import {config} from './common/config';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(authChecker(models.User));

if (!isProduction) {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(
    config.graphql,
    bodyParser.json(),
    graphqlExpress(({user}: any) => ({schema, context: {models, user}})),
);
app.use(config.graphiql, graphiqlExpress({endpointURL: config.graphql}));

sequelize
    .sync()
    .then(() =>
        app.listen(config.servicePort, () =>
            console.log(`Server listening on port:${config.servicePort}`),
        ),
    );
