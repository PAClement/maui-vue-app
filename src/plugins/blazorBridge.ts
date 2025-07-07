export class BlazorBridge {
    static async call<TResponse = any>(
        service: string,
        method: string,
        ...params: any[]
    ): Promise<TResponse | { success: false; error: string }> {
        const request = {
            service,
            method,
            data: params.length === 1
                ? JSON.stringify(params[0])
                : JSON.stringify(params)
        };

        try {
            const responseJson = await (window as any).DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'HandleJsRequest',
                JSON.stringify(request)
            );

            return JSON.parse(responseJson);
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}
