import {createApp, h} from "vue";
import App from "./App.vue";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes.js";
import {providerCheckout} from "@/providerCheckout";

import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

providerCheckout();

import {
    faXmark,
    faWarning,
    faCartShopping,
    faTrashCan,
    faBan,
    faArrowLeft,
    faQrcode,
    faPlus,
    faCircleCheck,
    faCreditCard,
    faGift,
    faCrown
} from '@fortawesome/free-solid-svg-icons'

library.add(faXmark, faWarning, faCartShopping, faTrashCan, faBan, faArrowLeft, faQrcode, faPlus, faCircleCheck, faCreditCard, faGift, faCrown);

const app = createApp({
    setup: () => {
    },
    render: () => h(App)
});
app.use(router).component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");

