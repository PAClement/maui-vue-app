import {createApp, h} from "vue";
import App from "./App.vue";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes.js";
import {eventBus} from "@/plugins/eventBus.js";

import './index.css'

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

// Configuration des icônes FontAwesome
library.add(faXmark, faWarning, faCartShopping, faTrashCan, faBan, faArrowLeft, faQrcode, faPlus, faCircleCheck, faBell);

// Configuration du router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// Fonction pour attendre que DotNet soit disponible
function waitForDotNet(): Promise<boolean> {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 100; // 10 secondes maximum (100 * 100ms)

        const checkDotNet = () => {
            attempts++;

            // Vérifier si DotNet est disponible et fonctionnel
            if (window.hasOwnProperty("DotNet") &&
                window.DotNet &&
                typeof window.DotNet.invokeMethodAsync === 'function') {

                console.log(`✅ DotNet trouvé après ${attempts} tentatives`);
                resolve(true);
            } else if (attempts < maxAttempts) {
                console.log(`⏳ Tentative ${attempts}: DotNet pas encore prêt, nouvelle tentative...`);
                setTimeout(checkDotNet, 100);
            } else {
                console.warn('⚠️ DotNet non disponible après le nombre maximum de tentatives');
                resolve(false);
            }
        };

        checkDotNet();
    });
}

// Fonction pour initialiser l'application Vue
function initializeVueApp(dotNetAvailable: boolean) {
    console.log('🚀 Initialisation de l\'application Vue...', dotNetAvailable ? 'avec DotNet' : 'sans DotNet');

    const app = createApp({
        setup: () => {
            // Vous pouvez ajouter ici des composables ou de la logique globale
            // Par exemple, rendre DotNet disponible dans toute l'app
            if (dotNetAvailable) {
                console.log('✅ DotNet est disponible dans l\'application');
                // Vous pouvez ajouter DotNet au provide/inject si nécessaire
            }
        },
        render: () => h(App)
    });

    app.use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount("#app");

    console.log('✅ Application Vue montée avec succès');
}

// Fonction pour afficher un écran de chargement
function showLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-screen';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid #e3e3e3;
                border-top: 4px solid #007bff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <p style="
                margin: 0;
                color: #6c757d;
                font-size: 16px;
            ">Chargement de l'application...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(loadingDiv);

    return () => {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.remove();
        }
    };
}

// Fonction principale d'initialisation
async function main() {
    try {
        console.log('🎯 Démarrage de l\'application...');

        // Afficher l'écran de chargement
        const hideLoading = showLoadingScreen();

        // Attendre que DotNet soit disponible
        console.log('⏳ Attente de DotNet...');
        const dotNetAvailable = await waitForDotNet();

        if (dotNetAvailable) {
            console.log('✅ DotNet est prêt, initialisation de Vue...');
        } else {
            console.warn('⚠️ DotNet non disponible, initialisation de Vue sans DotNet...');
        }

        // Masquer l'écran de chargement
        hideLoading();

        // Initialiser l'application Vue
        initializeVueApp(dotNetAvailable);

    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);

        // En cas d'erreur, essayer d'initialiser Vue sans DotNet
        const hideLoading = document.getElementById('loading-screen');
        if (hideLoading) hideLoading.remove();

        initializeVueApp(false);
    }
}

// Démarrer l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}

// Déclarer le type pour TypeScript (optionnel)
declare global {
    interface Window {
        JSDotNet: {
            invokeMethodAsync: (assemblyName: string, methodName: string, ...args: any[]) => Promise<any>;
            invokeMethod: (assemblyName: string, methodName: string, ...args: any[]) => any;
        };
    }
}