import { Router } from 'express';
import authRoute from './../app/modules/auth/auth.route';
import scoreRoute from './../app/modules/score/score.route';

const rootRouter = Router();

rootRouter.use("/auth", authRoute);
rootRouter.use("/score", scoreRoute)

export default rootRouter;