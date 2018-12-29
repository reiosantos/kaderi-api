import passport from 'passport';
import { USER_MODAL } from '../constants';
import Helpers from '../helpers';
import MongoWrapper from '../models';

export const signup = (req, res) => {
	const { body: user } = req;

	return MongoWrapper.createOne(USER_MODAL, user,
		(err, docs) => Helpers.userCallback(err, docs, res, 201, true));
};

export const login = (req, res, next) => {
	const { body: user } = req;

	if (!user.username) {
		return res.status(422).json({ errors: { username: 'username is required' } });
	}

	if (!user.password) {
		return res.status(422).json({ errors: { password: 'password is required' } });
	}

	return passport.authenticate('local', { session: false },
		(err, passportUser, info) => {
			// if (err) return res.status(400).json({ err });

			if (passportUser) {
				const userObject = passportUser;
				userObject.token = passportUser.generateJWTToken();
				return res.json({ user: userObject.toAuthJSON() });
			}

			return res.status(400).json(err || info);
		})(req, res, next);
};
