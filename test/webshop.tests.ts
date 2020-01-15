import { expect } from 'chai';
import { Cart } from '../lib/Cart';
import { Helper } from '../lib/Helper';
import * as prodcuts from '../src/products.json';

describe("Webshop", () => {
    describe("Cart", () => {
        it("can get size", () => {
            const cart = new Cart();
            const result = cart.size();
            expect(result).to.be.equal(0);
        });

        it("can add item", () => {
            const cart = new Cart();
            cart.add(prodcuts[0]);
            const result = cart.size();
            expect(result).to.be.equal(1);
        });

        it("can remove item", () => {
            const cart = new Cart();
            cart.add(prodcuts[0]);
            cart.add(prodcuts[1]);
            cart.remove(prodcuts[1].id);
            const result = cart.size();
            expect(result).to.be.equal(1);
        });

        it("can get total", () => {
            const cart = new Cart();
            cart.add(prodcuts[3]);
            cart.add(prodcuts[4]);
            const result = cart.getTotal();
            expect(result).to.be.equal(7.2);
        });

        it("can get products amount", () => {
            const cart = new Cart();
            cart.add(prodcuts[1]);
            cart.add(prodcuts[2]);
            const result = cart.getProductsAmount();
            expect(result).to.be.equal(2);
        });

        it("can reset", () => {
            const cart = new Cart();
            cart.add(prodcuts[0]);
            cart.add(prodcuts[1]);
            cart.add(prodcuts[2]);
            cart.reset();
            const result = cart.size();
            expect(result).to.be.equal(0);
        });
    });

    describe("Helper", () => {
        it("can get product", () => {
            const helper = new Helper();
            const productId = prodcuts[0].id;
            const result = helper.loadProduct(productId.toString(), prodcuts).id;
            expect(result).to.be.equal(productId);
        });

        it("can get next product", () => {
            const helper = new Helper();
            const productId = prodcuts[0].id;
            const nextProductId = prodcuts[1].id;
            const result = helper.loadNextProduct(productId.toString(), prodcuts).id;
            expect(result).to.be.equal(nextProductId);
        });

        it("can get previous product", () => {
            const helper = new Helper();
            const productId = prodcuts[1].id;
            const previousProductId = prodcuts[0].id;
            const result = helper.loadPreviousProduct(productId.toString(), prodcuts).id;
            expect(result).to.be.equal(previousProductId);
        });
    });
});