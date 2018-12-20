import express from 'express';

const userRouter = express.Router({});

/* GET users listing. */
userRouter.get('/users', (req, res) => res.send('To fetch all users'));
userRouter.post('/user', (req, res) => res.send('To add a new user'));

export default userRouter;
