import Helpers from '../helpers';
import ModelFactory from './models.factory';

class MongoWrapper {
	/**
	 *
	 * @param objectName { string }
	 * @param document {Object}, the object to be saved/created
	 * @param callback
	 * @returns {document}
	 */
	static createOne(objectName, document, callback) {
		const Modal = ModelFactory.getModel(objectName);
		return Modal.create(document, callback);
	}

	/**
	 *
	 * @param objectName {string}
	 * @param query {Object}, the selection filter of records
	 * @param callback
	 * @returns {*}
	 */
	static find(objectName, query, callback) {
		const Modal = ModelFactory.getModel(objectName);
		return Modal.find(query, { password: false, __v: false }, callback);
	}

	/**
	 *
	 * @param objectName {string}
	 * @param query {String || Object}, IF string, this is object ID
	 * @param strategy {number}, 0 - for `or` condition, 1 - for `and` conditions
	 * @param callback
	 * @param withPassword {boolean}
	 * @returns {*|Query|void|Promise}
	 */
	static findOne(objectName, query, strategy = 1, callback, withPassword = false) {
		const Modal = ModelFactory.getModel(objectName);

		if (!Number.isInteger(strategy) || ![0, 1].includes(strategy)) {
			throw Error('strategy must be a number, either `0` for `or` or `1` for `and`');
		}

		let opts = query;
		if (typeof opts !== 'object') {
			opts = { _id: opts };
		}
		const projection = withPassword ? { __v: false } : { password: false, __v: false };

		return Modal.findOne(Helpers.generateOptions(opts, strategy), projection, callback);
	}

	/**
	 *
	 * @param objectName {string}
	 * @param id {String}, the ID of the object to update
	 * @param update {Object} data on the record to update
	 * @param callback
	 * @returns {Query}
	 */
	static findOneAndUpdate(objectName, id, update, callback) {
		const Modal = ModelFactory.getModel(objectName);
		return Modal.findByIdAndUpdate(id, update, { new: true }, callback);
	}

	/**
	 *
	 * @param objectName { string }
	 * @param id {string}, the ID of the object to delete
	 * @param callback
	 * @returns {Query}
	 */
	static findOneAndDelete(objectName, id, callback) {
		const Modal = ModelFactory.getModel(objectName);
		return Modal.findByIdAndDelete(id, callback);
	}
}

export default MongoWrapper;
