export class Cart {
    public cart = [];
    private total = 0;

    constructor() {
        this.cart = new Array();
    }

    public size(): Number {
        return this.cart.length;
    }

    public add(item): void {
        this.cart.push(item);
    }

    public getTotal(): number {
        return this.total;
    }
}