// stores/productStore.ts
import {defineStore} from 'pinia'

export interface Product {
    id: number
    name: string
    price: number
}

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[]
    }),
    actions: {
        addProduct(product: Product) {
            this.products.push(product);
        },
        setProducts(newProducts: Product[]) {
            this.products = newProducts;
        },
        clearProducts() {
            this.products = [];
        }
    }
})
