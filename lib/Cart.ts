export class Cart {
    public products = [];
    private total = 0;

    constructor() {
        this.products = new Array();
    }

    public size(): Number {
        return this.products.length;
    }

    public add(product): void {
        this.products.push(product);
    }

    public calculateTotal(): void {
        this.products.forEach(p => {
            this.total += p.specialOffer;
        });
    }

    public getTotal(): number {
        return this.total;
    }
}