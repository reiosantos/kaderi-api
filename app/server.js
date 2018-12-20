import debug from 'debug';
import http from 'http';
import env from './config/environment';
import app from './main';

const logger = debug('kaderi');
const server = http.createServer(app);

server.listen(env.PORT, () => {
	const address = server.address();
	logger(`Find me on http://localhost:${address.port}`);
});
