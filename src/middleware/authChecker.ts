import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import {Request, Response, json} from 'express';
import {Sqlz} from '../typings';
import {config} from '../../common/config';

export const authChecker = (userModel: Sqlz.ModelsMap['User']) => async (
    req: Request,
    res: Response,
    next: () => void,
) => {
    const token = req.headers.authorization as string;

    if (token) {
        try {
            const {email, updated_at} = (await jwt.verify(token, config.auth.secret)) as {
                email: string;
                updated_at: string;
            };
            const user = await userModel.findOne({where: {email}});

            if (user) {
                const isTokenDateValid = moment(updated_at).isSameOrAfter(moment(user.updated_at));
                isTokenDateValid && ((req as any).user = email);
            }
        } catch (error) {
            console.error(`@authChecker: ${error}`);
        }
    }

    next();
};
