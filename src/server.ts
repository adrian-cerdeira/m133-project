import * as express from 'express';

const app = express();
const port = 8080;

app.listen(port, function () {
    console.log('server is running on port 8080');
});