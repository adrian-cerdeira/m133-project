import * as express from 'express';
import * as router from './routes';

const app = express();
const port = 8080;

app.use('/', router);

app.listen(port, function () {
    console.log('server is running on port 8080');
});