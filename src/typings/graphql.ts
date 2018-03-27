import * as graphql from 'graphql';

export namespace Gql {
    export interface Argument {
        name?: string;
        type: any;
        defaultValue?: any;
        description?: string;
    }

    export interface ObjectType<T> {
        name: string;
        description: string;
        fields: () => {
            [P in keyof T]: {
                type: T[P];
                args?: {[key: string]: Argument};
                description: string;
            }
        };
        resolve?: (parent: any, args: any, context: any) => any;
    }

    export interface EnumType<T> {
        name: string;
        values: {
            [P in keyof T]: {
                value: P;
            }
        };
    }

    export const ID = (graphql.GraphQLID as any) as any;
    export const Schema = (graphql.GraphQLSchema as any) as any;
    export const Str = (graphql.GraphQLString as any) as string;
    export const Int = (graphql.GraphQLInt as any) as number;
    export const NonNull = (graphql.GraphQLNonNull as any) as new <T>(type: T) => T;
    export const ObjectType = (graphql.GraphQLObjectType as any) as new <T>(
        obj: ObjectType<T>,
    ) => T;
    export const InputObjectType = (graphql.GraphQLInputObjectType as any) as new <T>(
        obj: ObjectType<Partial<T>>,
    ) => T;
    export const List = (graphql.GraphQLList as any) as new <T>(type: T) => T[];
    export const Enum = (graphql.GraphQLEnumType as any) as new <T>(obj: EnumType<T>) => T;
}
