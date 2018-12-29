import passport from 'passport';
import LocalStrategy from 'passport-local';
import { USER_MODAL } from '../constants';
import MongoWrapper from '../models';

passport.use(new LocalStrategy({

	usernameField: 'username',
	passwordField: 'password'

}, (contact, password, next) => {
	MongoWrapper.findOne(USER_MODAL, { contact, email: contact }, 0,
		(err, user) => {
			if (err) return next(null, false, { err });

			if (!user) {
				return next(null, false, { errors: { user: 'username or password is invalid' } });
			}

			return user.validatePassword(password)
				.then((isValid) => {
					if (isValid) {
						return next(null, user);
					}
					return next(null, false, {
						errors: { user: 'username or password is invalid' }
					});
				}).catch(error => next(null, false, { errors: { error } }));
		}, true);
}));
