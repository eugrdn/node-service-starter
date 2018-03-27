import * as R from 'ramda';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {UserType, UserInputType} from './user.type';
import {Gql, Models, Common} from '../../typings';
import {config} from '../../../common/config';

export const UserResolver = {
    Query: {
        users: {
            type: new Gql.NonNull(new Gql.List(new Gql.NonNull(UserType))),
            description: 'List of all users',
            resolve: (parent: any, args: any, {models, user}: Common.GqlContext) =>
                user ? models.User.findAll() : Promise.reject('401 Unauthorized'),
        },
        me: {
            type: UserType,
            description: 'User data',
            resolve: (parent: any, args: any, {models, user}: Common.GqlContext) =>
                user
                    ? models.User.findOne({where: {email: user}})
                    : Promise.reject('401 Unauthorized'),
        },
    },
    Mutation: {
        signup: {
            type: UserType,
            description: 'Registration api',
            args: {
                email: {
                    name: 'email',
                    type: new Gql.NonNull(Gql.Str),
                },
                password: {
                    name: 'Password',
                    type: new Gql.NonNull(Gql.Str),
                },
            },
            resolve: async (
                parent: any,
                {password, email}: Pick<Models.User, 'password' | 'email'>,
                {models}: Common.GqlContext,
            ) => {
                try {
                    const existedemail = await models.User.findOne({where: {email}});

                    if (existedemail) {
                        return Promise.reject(`User with ${email} already exist`);
                    }

                    const hashed = await bcrypt.hash(password, config.auth.saltRounds);

                    return models.User.create({email, password: hashed});
                } catch (error) {
                    return Promise.reject(error);
                }
            },
        },
        login: {
            type: Gql.Str,
            description: 'Login api',
            args: {
                email: {
                    name: 'email',
                    type: new Gql.NonNull(Gql.Str),
                },
                password: {
                    name: 'Password',
                    type: new Gql.NonNull(Gql.Str),
                },
            },
            resolve: async (
                parent: any,
                {email, password}: Pick<Models.User, 'password' | 'email'>,
                ctx: Common.GqlContext,
            ) => {
                if (ctx.user) {
                    return Promise.reject(`You already logged in`);
                }
                const user = await ctx.models.User.findOne({where: {email}});
                if (!user) {
                    return Promise.reject(`User with ${email} doesn't exists`);
                }

                try {
                    const valid = await bcrypt.compare(password, user.password);
                } catch {
                    return Promise.reject(`Incorrect password`);
                }

                try {
                    const token = await jwt.sign(
                        R.pick(['email', 'updated_at', 'role'], user),
                        config.auth.secret,
                        {expiresIn: '1y'},
                    );
                    return token;
                } catch (error) {
                    return Promise.reject(error);
                }
            },
        },
        updateUser: {
            type: UserType,
            description: 'Update user by email',
            args: {
                user: {
                    name: 'User',
                    type: new Gql.NonNull(UserInputType),
                },
            },
            resolve: async (
                parent: any,
                {user}: {user: Partial<Models.User>},
                ctx: Common.GqlContext,
            ) => {
                if (!ctx.user) {
                    return Promise.reject('401 Unauthorized');
                }
                const storedUser = await ctx.models.User.findOne({where: {email: ctx.user}});

                if (storedUser) {
                    const [count] = await ctx.models.User.update(user, {where: {email: ctx.user}});

                    if (count) {
                        return ctx.models.User.findById(storedUser.id);
                    } else {
                        return Promise.reject('Update failed');
                    }
                } else {
                    return Promise.reject(`User ${ctx.user} doesn't existed`);
                }
            },
        },
    },
};
