export class Helper {
    loadProduct(id: any, products) {
        return products.find(p => p.id.toString() === id);
    }

    loadPreviousProduct(id: string, products) {
        const nextProductId = (Number(id) - 1).toString();
        return products.find(p => p.id.toString() === nextProductId);
    }

    loadNextProduct(id: string, products) {
        const nextProductId = (Number(id) + 1).toString();
        return products.find(p => p.id.toString() === nextProductId);
    }
}