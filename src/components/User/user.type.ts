import {Gql, Models, Sqlz} from '../../typings';

export const UserType = new Gql.ObjectType<Models.User>({
    name: 'User',
    description: 'Application user',
    fields: () => ({
        id: {
            type: new Gql.NonNull(Gql.ID),
            description: 'User id',
        },
        firstName: {
            type: Gql.Str,
            description: 'User name',
        },
        middleName: {
            type: Gql.Str,
            description: 'User middle name',
        },
        lastName: {
            type: Gql.Str,
            description: 'User surname',
        },
        role: {
            type: new Gql.Enum({
                name: 'UserRole',
                values: {
                    Admin: {value: 'Admin'},
                    User: {value: 'User'},
                },
            } as any),
            description: 'User role',
        },
        tel: {
            type: Gql.Str,
            description: 'User telephone',
        },
        email: {
            type: new Gql.NonNull(Gql.Str),
            description: 'User email',
        },
        password: {
            type: new Gql.NonNull(Gql.Str),
            description: 'User password',
        },
        created_at: {
            type: new Gql.NonNull(Gql.Str),
            description: 'Created at date',
        },
        updated_at: {
            type: new Gql.NonNull(Gql.Str),
            description: 'Updated at date',
        },
    }),
});

export const UserInputType = new Gql.InputObjectType<Models.User>({
    name: 'UserInput',
    description: 'Application user',
    fields: () => ({
        firstName: {
            type: Gql.Str,
            description: 'User name',
        },
        middleName: {
            type: Gql.Str,
            description: 'User middle name',
        },
        lastName: {
            type: Gql.Str,
            description: 'User surname',
        },
        tel: {
            type: Gql.Str,
            description: 'User telephone',
        },
        email: {
            type: Gql.Str,
            description: 'User email',
        },
        password: {
            type: Gql.Str,
            description: 'User password',
        },
    }),
});
