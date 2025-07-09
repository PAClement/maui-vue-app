import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Alert, CustomerBasketInformation, EventData, Product, SubscribeResult} from '@/interfaces'

export const useBlazorStore = defineStore('store', () => {

    const alert = ref<Alert | null>(null);
    const productNotFound = ref<boolean>(false);
    const products = ref<Product[] | null>(null);
    const goToPageCheckout = ref<boolean>(false);
    const customerBasketInformation = ref<CustomerBasketInformation>({
        totalBasketAmount: 0,
        totalBasketQuantity: 0
    });

    const initializeEventBridge = (): void => {
        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                console.log('[Blazor Event Bridge] Received event data:', eventDataJson)
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)

                    if (eventData.Service === 'System') {
                        switch (eventData.Property) {
                            case 'Alert':
                                alert.value = eventData.Value as Alert
                                break;
                            case 'ProductNotFound':
                                productNotFound.value = eventData.Value as boolean
                                break;
                            case 'GoToPageCheckout':
                                goToPageCheckout.value = eventData.Value as boolean
                                break;
                        }

                    } else if (eventData.Service === 'CustomerOrder') {
                        switch (eventData.Property) {
                            case 'SelectedProducts':
                                products.value = eventData.Value as Product[]
                                break;
                            case 'TotalBasketAmount':
                                customerBasketInformation.value.totalBasketAmount = eventData.Value as number
                                break;
                            case 'TotalBasketQuantity':
                                customerBasketInformation.value.totalBasketQuantity = eventData.Value as number
                                break;
                        }

                    } else if (eventData.Service === 'Barcode') {
                        switch (eventData.Property) {
                            case 'ProductNotFound':
                                productNotFound.value = eventData.Value as boolean
                                break;
                            case 'GoToPageCheckout':
                                goToPageCheckout.value = eventData.Value as boolean
                                break;
                        }
                    }
                } catch (error) {
                    console.error('Invalid Blazor event data:', error)
                }
            }
        }
    }

    /**
     * Subscribe to a given C# service
     * @param serviceName - Name of the service to subscribe
     */
    const subscribeToService = async (serviceName: string): Promise<boolean> => {
        try {
            const response = await (window as any).DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'SubscribeToService',
                serviceName
            )

            const result: SubscribeResult = JSON.parse(response)
            console.log(result)
            if (result.Success) {
                console.log(`✅ Subscribed to ${serviceName}`)
                return true
            } else {
                console.error(`❌ Failed to subscribe to ${serviceName}:`, result.Error)
                return false
            }
        } catch (error) {
            console.error(`Error subscribing to ${serviceName}:`, error)
            return false
        }
    }

    return {
        products,
        goToPageCheckout,
        customerBasketInformation,
        productNotFound,
        alert,
        initializeEventBridge,
        subscribeToService,
    }
})