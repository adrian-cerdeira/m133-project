import * as express from 'express';
import * as expressLayouts from 'express-ejs-layouts';
import * as router from './routes';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
    console.log('server is running on port 8080');
});