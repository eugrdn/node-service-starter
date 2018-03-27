import {Sqlz, Models} from './';

export namespace Common {
    export interface GqlContext {
        user: Models.User['email'];
        models: Sqlz.ModelsMap;
    }
}
