import {Gql} from './typings';
import {UserResolver} from './components/User';

const query = new Gql.ObjectType({
    name: 'Query',
    description: 'Root query schema for all services',
    fields: () => ({
        ...UserResolver.Query,
    }),
});

const mutation = new Gql.ObjectType({
    name: 'Mutation',
    description: 'Root query schema for all services',
    fields: () => ({
        ...UserResolver.Mutation,
    }),
});

export const schema = new Gql.Schema({query, mutation});
