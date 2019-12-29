import * as express from 'express';
import * as products from './products.json';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.render('html/index',
        {
            products: products,
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: cart.html - Warenkorb
router.get('/cart', (req, res) => {
    req.session.cookie.cart.calculateProductAmount();

    res.render('html/cart',
        {
            products: req.session.cookie.cart.getUniqueProducts(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: checkout.html - Bestellung erstellen
router.get('/checkout', (req, res) => {
    res.render('html/checkout',
        {
            total: req.session.cookie.cart.getTotal()
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
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: cart.html - Produkt zu cart hinzufügen
router.get('/cart/products/add/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);

    req.session.cookie.cart.add(selectedProduct);
    req.session.cookie.cart.calculateProductAmount();
    req.session.cookie.cart.calculateTotal();

    res.render('html/cart',
        {
            products: req.session.cookie.cart.getUniqueProducts(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: cart.html - Produkt von cart löschen
router.get('/cart/products/delete/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = products.find(p => p.id === id);

    req.session.cookie.cart.remove(selectedProduct.id);
    req.session.cookie.cart.calculateProductAmount();
    req.session.cookie.cart.calculateTotal();

    res.render('html/cart',
        {
            products: req.session.cookie.cart.getUniqueProducts(),
            total: req.session.cookie.cart.getTotal()
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
        const formInvalid = !errors.isEmpty() || req.session.cookie.cart.getTotal() === 0;

        if (formInvalid) {
            res.status(422);
            res.render('html/error',
                {
                    total: req.session.cookie.cart.getTotal()
                }
            );
        } else {
            res.render('html/submit',
                {
                    products: req.session.cookie.cart.getUniqueProducts(),
                    total: req.session.cookie.cart.getTotal()
                }
            );

            // Werte zurücksetzen 
            req.session.cookie.cart.products = [];
            req.session.cookie.cart.calculateTotal();
        }
    }
);

module.exports = router;
