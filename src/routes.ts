import * as express from 'express';
import * as products from './products.json';
import { Cart } from '../lib/Cart';
import { check, validationResult } from 'express-validator';

const router = express.Router();
const cart = new Cart();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.render('html/index',
        {
            products: products,
            total: cart.getTotal()
        }
    );
});

// GET: shopping-cart.html - Warenkorb
router.get('/cart', (req, res) => {
    res.render('html/cart',
        {
            products: cart.products,
            total: cart.getTotal()
        }
    );
});

// GET: checkout.html - Bestellung erstellen
router.get('/checkout', (req, res) => {
    res.render('html/checkout',
        {
            total: cart.getTotal()
        }
    );
});

// GET: product.html - Produkt - Übersicht
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);
    res.render('html/product',
        {
            product: selectedProduct,
            total: cart.getTotal()
        }
    );
});

// GET: cart.html - Produkt zu cart hinzufügen
router.get('/cart/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);

    cart.add(selectedProduct);
    cart.calculateTotal();

    res.render('html/cart',
        {
            products: cart.products,
            total: cart.getTotal()
        }
    );
});

// POST: checkout.html - Einkauf abschliessen
router.post('/checkout',
    [
        check('firstname').notEmpty(),
        check('lastname').notEmpty(),
        check('email').notEmpty().isEmail()
    ],
    (req, res) => {
        const errors = validationResult(req);
        const formInvalid = !errors.isEmpty() || cart.getTotal() === 0;

        if (formInvalid) {
            res.status(422);
            res.render('html/error',
                {
                    total: cart.getTotal()
                }
            );
        } else {
            res.render('html/submit',
                {
                    products: cart.products,
                    total: cart.getTotal()
                }
            );

            // Werte zurücksetzen 
            cart.products = [];
            cart.calculateTotal();
        }
    });

module.exports = router;