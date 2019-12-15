import * as express from 'express';
import * as products from './products.json';

const router = express.Router();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.render('html/index', { products: products });
});

// GET: shopping-cart.html - Warenkorb
router.get('/cart', (req, res) => {
    res.send('Warenkorb');
});

// GET: checkout.html - Einkauf abschliessen
router.get('/checkout', (req, res) => {
    res.send('Einkauf abschliessen');
});

// GET: product.html - Produkt - Übersicht
router.get('/products/:id', (req, res) => {
    res.send('Einzel Produkt Übersicht');
});

module.exports = router;