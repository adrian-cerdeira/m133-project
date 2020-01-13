import { expect } from 'chai';
import { Cart } from '../lib/Cart';
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

        it("can calculate total", () => {
            const cart = new Cart();
            cart.add(prodcuts[0]);
            cart.add(prodcuts[1]);
            cart.calculateTotal();
            const result = cart.getTotal();
            expect(result).to.be.equal(6.25);
        });

        it("can get total", () => {
            const cart = new Cart();
            const result = cart.getTotal();
            expect(result).to.be.equal(0);
        });

        it("can get unique products", () => {
            const cart = new Cart();
            cart.add((prodcuts[1]));
            cart.add((prodcuts[1]));
            cart.add((prodcuts[1]));
            const result = cart.getUniqueProducts().length;
            expect(result).to.be.equal(1);
        });
    })
});