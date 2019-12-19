import { expect } from 'chai';
import { Cart } from '../lib/Cart';
import * as productTests from '../src/products.json';

describe("Webshop", () => {
    describe("Cart", () => {
        it("can get size", () => {
            const cart = new Cart();
            const result = cart.size();
            expect(result).to.be.equal(0);
        });

        it("can add item", () => {
            const cart = new Cart();
            cart.add(productTests[0]);
            const result = cart.size();
            expect(result).to.be.equal(1);
        });
    })
});