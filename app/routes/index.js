import { login, signup } from '../actions/auth';
import UserMiddleware from '../middlewares/userMiddleware';
import auth from './auth';
import userRouter from './users';

const apiPrefix = '/api/v1';

const routes = (app) => {
	app.use(`${apiPrefix}/login`, auth.optional, login);
	app.use(`${apiPrefix}/signup`,
		auth.optional,
		UserMiddleware.validate('createUser'),
		UserMiddleware.returnErrors,
		signup);
	app.use(apiPrefix, auth.required, userRouter);
	return app;
};

export default routes;
