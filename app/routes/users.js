import express from 'express';
import UserActions from '../actions/users';
import UserMiddleware from '../middlewares/userMiddleware';

const userRouter = express.Router({});

userRouter
	.get('/users', UserActions.getAllUsers)
	.get('/users/:userId',
		UserMiddleware.validate('getUser'),
		UserMiddleware.returnErrors,
		UserActions.getUser)
	.post('/users',
		UserMiddleware.validate('createUser'),
		UserMiddleware.returnErrors,
		UserActions.createUser)
	.put('/users/:userId',
		UserMiddleware.validate('updateUser'),
		UserMiddleware.returnErrors,
		UserActions.updateUser)
	.delete('/users/:userId',
		UserMiddleware.validate('getUser'),
		UserMiddleware.returnErrors,
		UserActions.deleteUser);

export default userRouter;
