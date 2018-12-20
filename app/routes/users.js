import express from 'express';

const userRouter = express.Router({});

/* GET users listing. */
userRouter.get('/users', (req, res) => {
	const message = 'I am a test';
	return res.send(message);
});
userRouter.post('/user', (req, res) => res.send('To add a new user'));

export default userRouter;
