import {createApp, h} from "vue";
import App from "./App.vue";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes.js";

import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

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
import {createPinia} from "pinia";

library.add(faXmark, faWarning, faCartShopping, faTrashCan, faBan, faArrowLeft, faQrcode, faPlus, faCircleCheck, faCreditCard, faGift, faCrown);

const pinia = createPinia();

const app = createApp({
    setup: () => {
    },
    render: () => h(App)
});
app.use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");

