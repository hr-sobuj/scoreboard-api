import { Router } from 'express';
import authRoute from './../app/modules/auth/auth.route';
import scoreRoute from './../app/modules/score/score.route';

const routers = Router();

const rootRouter = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/score',
        route: scoreRoute
    },
]

rootRouter.forEach(route => routers.use(route.path, route.route));

export default routers;
