import * as express from 'express';
import * as expressLayouts from 'express-ejs-layouts';
import * as router from './routes';
import * as session from 'express-session';
import { Cart } from '../lib/Cart';

const app = express();
const port = 8080;

app.set('trusty proxy', 1);
app.use(
    session(
        {
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { 
                secure: true,
                cart: new Cart() 
            }
        }
    )
);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
    console.log('server is running on port 8080');
});