import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Alert, EventData, SubscribeResult} from '@/interfaces'

export const useBlazorStore = defineStore('store', () => {

    const counterValue = ref<number>(0);
    const alert = ref<Alert | null>(null);

    console.log('Blazor store initialized')

    const initializeEventBridge = (): void => {
        console.log('Initializing Blazor event bridge...')
        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                console.log('[Blazor Event Bridge] Received event data:', eventDataJson)
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)
                    console.log('[Blazor Event]', eventData)

                    if (eventData.service === 'System' && eventData.property && eventData.value) {
                        switch (eventData.property) {
                            case 'Value':
                                console.log(`Counter value changed: ${eventData.value}`)
                                counterValue.value = Number(eventData.value)
                                break;
                            case 'Alert':
                                console.log(`Alert from Blazor: ${eventData.value}`)
                                const alertData = eventData.value as Alert
                                alert.value = alertData
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
            console.log('testing test TEST ')
            console.log(result)
            if (result.success) {
                console.log(`✅ Subscribed to ${serviceName}`)
                return true
            } else {
                console.error(`❌ Failed to subscribe to ${serviceName}:`, result.error)
                return false
            }
        } catch (error) {
            console.error(`Error subscribing to ${serviceName}:`, error)
            return false
        }
    }

    return {
        counterValue,
        alert,
        initializeEventBridge,
        subscribeToService,
    }
})