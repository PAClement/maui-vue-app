import {BlazorInitResult} from '@/interfaces'

export class BlazorInitializer {
    private static instance: BlazorInitializer;
    private initPromise: Promise<BlazorInitResult> | null = null;

    private constructor() {}

    public static getInstance(): BlazorInitializer {
        if (!BlazorInitializer.instance) {
            BlazorInitializer.instance = new BlazorInitializer();
        }
        return BlazorInitializer.instance;
    }

    public async checkBlazorAvailability(): Promise<BlazorInitResult> {
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = this.performBlazorCheck();
        return this.initPromise;
    }

    private async performBlazorCheck(): Promise<BlazorInitResult> {
        try {
            if (typeof window === 'undefined') {
                return {
                    is_available: false,
                    error: 'Window object not available (SSR context)'
                };
            }

            const blazor = (window as any).Blazor;
            if (!blazor) {
                return {
                    is_available: false,
                    error: 'Blazor object not found in window'
                };
            }

            if (blazor.defaultReconnectionHandler) {
                // Blazor Server
                return await this.checkBlazorServer(blazor);
            } else if (blazor.start) {
                // Blazor WebAssembly
                return await this.checkBlazorWebAssembly(blazor);
            }

            return {
                is_available: false,
                error: 'Unknown Blazor type'
            };

        } catch (error) {
            return {
                is_available: false,
                error: `Blazor initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }

    private async checkBlazorServer(blazor: any): Promise<BlazorInitResult> {
        try {
            const connection = blazor._internal?.hubConnection;

            if (connection && connection.state === 'Connected') {
                return {
                    is_available: true,
                    version: 'Server'
                };
            }

            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve({
                        is_available: false,
                        error: 'Blazor Server connection timeout'
                    });
                }, 5000);

                const checkConnection = () => {
                    if (connection && connection.state === 'Connected') {
                        clearTimeout(timeout);
                        resolve({
                            is_available: true,
                            version: 'Server'
                        });
                    } else {
                        setTimeout(checkConnection, 100);
                    }
                };

                checkConnection();
            });

        } catch (error) {
            return {
                is_available: false,
                error: `Blazor Server check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }

    private async checkBlazorWebAssembly(blazor: any): Promise<BlazorInitResult> {
        try {
            if (blazor._internal?.dotNetObjectReference) {
                return {
                    is_available: true,
                    version: 'WebAssembly'
                };
            }

            await blazor.start();

            return {
                is_available: true,
                version: 'WebAssembly'
            };

        } catch (error) {
            return {
                is_available: false,
                error: `Blazor WebAssembly start failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }
}

export default BlazorInitializer.getInstance();