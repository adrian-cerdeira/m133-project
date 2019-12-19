import * as express from 'express';
import * as products from './products.json';
import { Cart } from '../lib/Cart';

const router = express.Router();
const cart = new Cart();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.render('html/index', { products: products });
});

// GET: shopping-cart.html - Warenkorb
router.get('/cart', (req, res) => {
    res.render('html/cart', { products: cart.products, total: cart.getTotal() });
});

// GET: checkout.html - Einkauf abschliessen
router.get('/checkout', (req, res) => {
    res.render('html/checkout');
});

// GET: product.html - Produkt - Übersicht
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);
    res.render('html/product', { product: selectedProduct });
});

// POST: Produkt zu cart hinzufügen
/*router.post('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);

    cart.add(selectedProduct);
    cart.calculateTotal();

    const total = cart.getTotal();

    res.render('html/cart', { products: cart.products, total: total })
});*/

module.exports = router;