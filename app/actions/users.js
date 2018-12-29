import { USER_MODAL } from '../constants';
import Helpers from '../helpers';
import MongoWrapper from '../models';
import Utils from '../util';

class UserActions {
	static getAllUsers(req, res) {
		return MongoWrapper.find(USER_MODAL, {},
			(err, docs) => {
				Utils.sortListOfObjects(docs, 'firstName');
				Helpers.userCallback(err, docs, res, 200);
			});
	}

	static getUser(req, res) {
		const { userId } = req.params;

		return MongoWrapper.findOne(USER_MODAL, userId, undefined,
			(err, docs) => Helpers.userCallback(err, docs, res, 200));
	}

	static createUser(req, res) {
		const user = req.body;

		return MongoWrapper.createOne(USER_MODAL, user,
			(err, docs) => Helpers.userCallback(err, docs, res, 201));
	}

	static updateUser(req, res) {
		const { userId } = req.params;
		const user = req.body;

		return MongoWrapper.findOneAndUpdate(USER_MODAL, userId, user,
			(err, docs) => Helpers.userCallback(err, docs, res, 202));
	}

	static deleteUser(req, res) {
		const { userId } = req.params;

		return MongoWrapper.findOneAndDelete(USER_MODAL, userId,
			(err, docs) => {
				const message = !err && !docs
					? 'Could not delete this user.'
					: err;
				Helpers.userCallback(message, docs, res, message ? 400 : 204);
			});
	}
}

export default UserActions;
