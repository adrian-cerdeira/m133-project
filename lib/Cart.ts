export class Cart {
    public products = [];
    private total = 0;

    constructor() { }

    public size(): Number {
        return this.products.length;
    }

    public add(product): void {
        product.amount++;
        this.products.push(product);
    }

    public calculateTotal(): void {
        let sum = 0;
        this.products.forEach(p => {
            sum += p.specialOffer;
        });
        this.total = Number(sum.toFixed(2));
    }

    public getTotal(): number {
        return this.total;
    }

    public getUniqueProducts() {
        return [...new Set(this.products)];
    }

    public remove(id): void {
        const product = this.products.find(p => p.id === id);
        const productIndex = this.products.findIndex(p => p.id === id);
        product.amount--;
        this.products.splice(productIndex, 1);
    }
}