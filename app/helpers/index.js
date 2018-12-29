class Helpers {
	static getErrorMessage(error) {
		let message = null;
		if (error.code === 11000) {
			message = error.errmsg.includes('contact')
				? 'This phone number has already been used.' : message;

			message = error.errmsg.includes('email')
				? 'This Email has already been taken' : message;
		}
		return message || error;
	}

	static userCallback(error, resUser, res, status = 200, signup = false) {
		if (error) {
			const message = Helpers.getErrorMessage(error);
			return res.status(400).json({ error: message });
		}

		const docs = signup ? resUser.toAuthJSON() : resUser;

		let data = {};
		let newDocs = docs;

		if (docs && typeof docs.toObject === 'function') {
			newDocs = docs.toObject();
		}
		if (docs) {
			data = !Array.isArray(docs)
				? { user: { ...newDocs, password: undefined, __v: undefined } }
				: { users: docs };
		}
		return res.status(status).json({ ...data, error });
	}

	static generateOptions(options, strategy) {
		const keys = Object.keys(options);
		const orOpts = [];
		if (strategy === 'or' || strategy === 0) {
			keys.forEach((key) => {
				orOpts.push({ [key]: options[key] });
			});
			return { $or: orOpts };
		}
		return options;
	}
}

export default Helpers;
