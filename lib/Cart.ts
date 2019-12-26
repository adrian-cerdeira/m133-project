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
        let sum = 0;
        this.products.forEach(p => {
            sum += p.specialOffer;
        });
        this.total = Number(sum.toFixed(2));
    }

    public getTotal(): number {
        return this.total;
    }

    public calculateProductAmount(): void {
        this.products.forEach(p => {
            p.amount = this.getProductAmount(p.id);
        });
    }

    public getProductAmount(id): number {
        const sameProduct = this.products.filter(p => p.id === id);
        return sameProduct.length;
    }

    public getUniqueProducts() {
        return [...new Set(this.products)];
    }

    public remove(id): void {
        // Softdelete
        this.products = this.products.filter(p => p.id !== id);
    }
}