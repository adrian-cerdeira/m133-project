import * as express from 'express';
import * as path from 'path';

const router = express.Router();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
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