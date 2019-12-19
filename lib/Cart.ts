export class Cart {
    public cart = [];
    private total: Number;

    constructor() {
        this.cart = new Array();
        this.total = 0;
    }

    public size(): Number {
        return this.cart.length;
    }

    public add(item): void {
        this.cart.push(item);
    }
}