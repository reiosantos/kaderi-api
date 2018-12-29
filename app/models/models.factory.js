import UserSchema from './user.model';

class ModelFactory {
	/**
	 * Creates a modal of Type `name`
	 * Returns the modal matching the name or null
	 *
	 * @param name
	 * @returns {mongoose.Schema || null}
	 */
	static getModel = (name) => {
		if (!name) return null;
		const modelName = name.toLowerCase();

		if (modelName === 'user' || modelName === 'users') return UserSchema;

		return null;
	};
}

export default ModelFactory;
