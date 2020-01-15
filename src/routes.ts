import * as express from 'express';
import * as products from './products.json';
import { check, validationResult } from 'express-validator';
import { Helper } from '../lib/Helper';

const helper = new Helper();
const router = express.Router();

// GET: index.html - Übersicht
router.get('/', (req, res) => {
    res.render('pages/index',
        {
            products: products,
            cartAmount: req.session.cookie.cart.getProductsAmount(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: cart.html - Warenkorb
router.get('/cart', (req, res) => {
    res.render('pages/cart',
        {
            products: req.session.cookie.cart.getProducts(),
            cartAmount: req.session.cookie.cart.getProductsAmount(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: checkout.html - Einkauf abschliessen
router.get('/checkout', (req, res) => {
    res.render('pages/checkout',
        {
            cartAmount: req.session.cookie.cart.getProductsAmount(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: product.html - Produkt - Übersicht
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = helper.loadProduct(id, products);
    const nextProduct = helper.loadNextProduct(id, products);
    const previousProduct = helper.loadPreviousProduct(id, products);

    res.render('pages/product',
        {
            product: selectedProduct,
            nextProduct: nextProduct,
            previousProduct: previousProduct,
            cartAmount: req.session.cookie.cart.getProductsAmount(),
            total: req.session.cookie.cart.getTotal()
        }
    );
});

// GET: cart.html - Produkt von Warenkorb löschen
router.get('/cart/products/delete/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = helper.loadProduct(id, products);

    req.session.cookie.cart.remove(selectedProduct.id);

    res.redirect('/cart');
});

// POST: product.html - Produkt zu Warenkorb hinzufügen
router.post('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = helper.loadProduct(id, products);

    addProduct(req, selectedProduct);

    res.redirect(`/products/${id}`);
});

// POST: cart.html - Produkt zu Warenkorb hinzufügen
router.post('/cart/products/add/:id', (req, res) => {
    const id = req.params.id;
    const selectedProduct = helper.loadProduct(id, products);

    addProduct(req, selectedProduct);

    res.redirect('/cart');
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
            res.render('pages/error',
                {
                    cartAmount: req.session.cookie.cart.getProductsAmount(),
                    total: req.session.cookie.cart.getTotal()
                }
            );
        } else {
            res.render('pages/submit',
                {
                    products: req.session.cookie.cart.getProducts(),
                    cartAmount: req.session.cookie.cart.getProductsAmount(),
                    total: req.session.cookie.cart.getTotal()
                }
            );

            req.session.cookie.cart.reset();
        }
    }
);

function addProduct(req: any, product: any) {
    req.session.cookie.cart.add(product);
}

module.exports = router;