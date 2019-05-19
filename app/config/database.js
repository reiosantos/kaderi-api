import mongoose from 'mongoose';
import debug from 'debug';
import env from './environment';

const logger = debug('kaderi');

class MongoClient {
	options = {
		useCreateIndex: true,
		useNewUrlParser: true,
		keepAlive: true
	};

	constructor() {
		return this.getClient();
	}

	async getClient() {
		const DB_URL = env.DATABASE_URL;
		try {
			await mongoose.connect(DB_URL, this.options);
			mongoose.Promise = global.Promise;

			const { connection } = mongoose;

			connection.on('error', (error) => { logger(`Error occurred: ${error}`); });

			MongoClient.instance = connection;
			MongoClient.exists = true;

			return MongoClient.instance;
		} catch (e) {
			throw Error(`Unable to connect to database: ${e}`);
		}
	}
}

export default MongoClient;
