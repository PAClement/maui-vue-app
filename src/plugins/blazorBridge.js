export class BlazorBridge {
    static async call(service, method, ...params) {
        const request = {
            service,
            method,
            data: params.length === 1 ? JSON.stringify(params[0]) : JSON.stringify(params)
        };

        try {
            const responseJson = await window.DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'HandleJsRequest',
                JSON.stringify(request)
            );

            return JSON.parse(responseJson);
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}