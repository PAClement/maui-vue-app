import {useProductStore} from '@/stores/products'
import {useBlazorStore} from "@/plugins/blazorEvent";

declare global {
    interface Window {
        addProduct: (product: string) => void
    }
}

export async function providerCheckout() {
//     window['addProduct'] = (rawProduct: string) => {
//         console.log(rawProduct)
//         try {
//             const product = JSON.parse(rawProduct)
//             const store = useProductStore()
//             store.addProduct(product)
//         } catch (err) {
//             console.error("Error adding product", err)
//         }
//     }

    console.log('test')

    const blazorStore = useBlazorStore();

    blazorStore.initializeEventBridge();

    const test = await blazorStore.subscribeToCounter();

    console.log(test);
}