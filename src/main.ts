import {createApp, h} from "vue";
import App from "./App.vue";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes.js";
import {eventBus} from "@/plugins/eventBus.js";

import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

declare global {
    interface Window {
        handleProductFromDotNet: (product: any) => void;
    }
}

window.handleProductFromDotNet = (product: any) => {
    eventBus.emit('product:received', product);
};

/*
    Wait for the webview to load Blazor Framework and start it if needed
*/
function waitForDotNet() {
    return new Promise((resolve) => {
        const checkDotNet = () => {
            if (window.hasOwnProperty("DotNet") && window.DotNet) {
                console.log('DotNet found, Blazor loaded');
                resolve(true);
            } else {
                console.log('Waiting for DotNet...');
                setTimeout(checkDotNet, 100);
            }
        };
        checkDotNet();
    });
}

// Utilisation
waitForDotNet().then(() => {
    try {
        console.log('DotNet ready');
        // Vos appels DotNet ici
        window.DotNet.invokeMethod("System", "GetSystemInfoAsync");
    } catch (error) {
        console.log('Error calling DotNet:', error);
    }
});

import {
    faXmark,
    faWarning,
    faCartShopping,
    faTrashCan,
    faBan,
    faArrowLeft,
    faQrcode,
    faPlus,
    faCircleCheck
} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-regular-svg-icons'

library.add(faXmark, faWarning, faCartShopping, faTrashCan, faBan, faArrowLeft, faQrcode, faPlus, faCircleCheck);

const app = createApp({
    setup: () => {
    },
    render: () => h(App)
});
app.use(router).component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");

