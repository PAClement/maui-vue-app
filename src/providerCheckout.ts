import {useProductStore} from '@/stores/products'

declare global {
    interface Window {
        addProduct: (product: string) => void
    }
}

export function providerCheckout() {
    // Crée une fonction globale
    window['addProduct'] = (rawProduct: string) => {
        console.log(rawProduct)
        try {
            const product = JSON.parse(rawProduct)
            const store = useProductStore()
            store.addProduct(product)
        } catch (err) {
            console.error("Error adding product", err)
        }
    }
}