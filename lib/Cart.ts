export class Cart {
    private products = [];
    private total = 0;

    constructor() { }

    public size(): Number {
        return this.products.length;
    }

    public add(product): void {
        const existProduct = this.products.find(p => p.id === product.id);

        product.amount++;

        if (!existProduct) {
            this.products.push(product);
        }

        this.calculateTotal();
    }

    public getTotal(): number {
        return this.total;
    }

    public getProductsAmount(): number {
        let sum = 0;
        this.products.forEach(p => {
            sum += p.amount;
        });
        return Number(sum.toFixed(2));
    }

    public getProducts() {
        return this.products;
    }

    public reset(): void {
        this.products.forEach(p => {
            p.amount = 0;
        });
        this.products = [];
        this.total = 0;
    }

    public remove(id): void {
        const product = this.products.find(p => p.id === id);

        product.amount--;

        const isLastProduct = product.amount === 0;
        if (isLastProduct) {
            const productIndex = this.products.findIndex(p => p.id === id);
            this.products.splice(productIndex, 1);
        }

        this.calculateTotal();
    }

    private calculateTotal(): void {
        let sum = 0;
        this.products.forEach(p => {
            sum += p.amount * p.specialOffer;
        });
        this.total = Number(sum.toFixed(2));
    }
}