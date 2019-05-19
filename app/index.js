import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import expressValidator from 'express-validator';
import routes from './routes';
import env from './config/environment';
import MongoClient from './config/database';
import swaggerDocument from '../swagger';

dotenv.config();

const app = express();

if (env.NODE_ENV === 'production') {
	// noinspection JSUnusedGlobalSymbols
	app.use(morgan('common', {
		skip: (req, res) => res.statusCode < 400,
		stream: `${__dirname}/../morgan.log`
	}));
} else {
	app.use(morgan('dev'));
}

/* eslint-disable no-new */
new MongoClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use(expressValidator());

routes(app);

app.use((req, res) => res.status(404).json({
	message: 'Not Found. Use /api/v1 to access the api.'
}));

require('./config/passport');

export default app;
