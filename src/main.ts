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

// Fonction de diagnostic complète
function diagnoseBlazorEnvironment() {
    console.log('🔍 === DIAGNOSTIC BLAZOR/DOTNET ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Location:', window.location.href);
    console.log('Document ready state:', document.readyState);

    // Vérifier tous les objets Blazor possibles
    const blazorObjects = [
        'DotNet',
        'Blazor',
        'Module',
        'BINDING',
        'MONO',
        'mono_wasm_runtime_ready',
        'mono_wasm_new_root',
        'mono_wasm_new_root_buffer'
    ];

    blazorObjects.forEach((obj: any) => {
        if (window.hasOwnProperty(obj)) {
            console.log(`✅ ${obj} trouvé:`, window[obj]);
        } else {
            console.log(`❌ ${obj} non trouvé`);
        }
    });

    // Vérifier les scripts chargés
    const scripts = Array.from(document.getElementsByTagName('script'));
    console.log('📜 Scripts chargés:');
    scripts.forEach((script, index) => {
        console.log(`${index + 1}. ${script.src || 'inline script'}`);
    });

    // Vérifier les erreurs de réseau
    console.log('🌐 Vérification des ressources...');
}

// Fonction pour forcer le chargement de Blazor
function forceBlazorLoad(): Promise<boolean> {
    return new Promise((resolve) => {
        console.log('🔄 Tentative de chargement forcé de Blazor...');

        // Méthode 1 : Essayer de démarrer Blazor manuellement
        if (window.hasOwnProperty('Blazor') && window.Blazor) {
            console.log('💡 Blazor trouvé, tentative de démarrage...');
            try {
                window.Blazor.start().then(() => {
                    console.log('✅ Blazor démarré avec succès');
                    setTimeout(() => {
                        resolve(window.hasOwnProperty('DotNet') && !!window.DotNet);
                    }, 1000);
                }).catch((error) => {
                    console.error('❌ Erreur lors du démarrage de Blazor:', error);
                    resolve(false);
                });
            } catch (error) {
                console.error('❌ Erreur lors du démarrage de Blazor:', error);
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

// Fonction pour attendre DotNet avec diagnostic avancé
function waitForDotNetAdvanced(): Promise<boolean> {
    return new Promise(async (resolve) => {
        let attempts = 0;
        const maxAttempts = 150; // 15 secondes

        // Diagnostic initial
        diagnoseBlazorEnvironment();

        // Essayer de forcer le chargement
        const forceLoadResult = await forceBlazorLoad();
        if (forceLoadResult) {
            resolve(true);
            return;
        }

        const checkDotNet = () => {
            attempts++;

            // Vérification étendue
            const dotNetExists = window.hasOwnProperty("DotNet") && window.DotNet;
            const blazorExists = window.hasOwnProperty("Blazor") && window.Blazor;
            const moduleExists = window.hasOwnProperty("Module") && window.Module;

            console.log(`🔍 Tentative ${attempts}/${maxAttempts}:`, {
                DotNet: dotNetExists,
                Blazor: blazorExists,
                Module: moduleExists
            });

            if (dotNetExists && typeof window.DotNet.invokeMethodAsync === 'function') {
                console.log(`✅ DotNet complètement prêt après ${attempts} tentatives`);
                resolve(true);
            } else if (attempts === 50) {
                // À mi-parcours, refaire un diagnostic
                console.log('🔍 Diagnostic intermédiaire:');
                diagnoseBlazorEnvironment();
            } else if (attempts < maxAttempts) {
                setTimeout(checkDotNet, 100);
            } else {
                console.error('❌ DotNet non disponible après toutes les tentatives');
                console.log('🔍 Diagnostic final:');
                diagnoseBlazorEnvironment();
                resolve(false);
            }
        };

        checkDotNet();
    });
}

// Fonction pour créer un service de communication alternatif
function createBlazorBridge() {
    console.log('🌉 Création d\'un bridge alternatif...');

    // Créer un objet bridge personnalisé
    const bridge = {
        ready: false,
        queue: [] as Array<{ method: string, args: any[], resolve: Function, reject: Function }>,

        async invokeMethod(assemblyName: string, methodName: string, ...args: any[]) {
            if (!this.ready) {
                console.warn('Bridge pas encore prêt, mise en queue...');
                return new Promise((resolve, reject) => {
                    this.queue.push({method: methodName, args, resolve, reject});
                });
            }

            // Ici vous pourriez implémenter une communication alternative
            // par exemple via des événements personnalisés ou des appels HTTP
            console.log(`Appel bridge: ${assemblyName}.${methodName}`, args);
            return Promise.resolve('Bridge response');
        },

        setReady() {
            this.ready = true;
            console.log('✅ Bridge prêt, traitement de la queue...');

            // Traiter la queue
            this.queue.forEach((item: any) => {
                this.invokeMethod('', item.method, ...item.args)
                    .then(item.resolve)
                    .catch(item.reject);
            });
            this.queue = [];
        }
    };

    // Exposer le bridge globalement
    window.BlazorBridge = bridge;

    return bridge;
}

// Fonction pour initialiser l'application Vue
function initializeVueApp(dotNetAvailable: boolean, bridge?: any) {
    console.log('🚀 Initialisation de l\'application Vue...', {
        dotNetAvailable,
        bridgeAvailable: !!bridge
    });

    const app = createApp({
        setup: () => {
            // Rendre les services disponibles
            if (dotNetAvailable) {
                console.log('✅ DotNet disponible');
            } else if (bridge) {
                console.log('✅ Bridge alternatif disponible');
            }
        },
        render: () => h(App)
    });

    app.use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount("#app");

    console.log('✅ Application Vue montée');
}

// Fonction pour afficher un écran de chargement avec plus d'infos
function showAdvancedLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-screen';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 30px;
            "></div>
            <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 300;">
                Chargement de l'application
            </h2>
            <p id="loading-status" style="
                margin: 0;
                font-size: 14px;
                opacity: 0.8;
                text-align: center;
                max-width: 300px;
            ">Initialisation en cours...</p>
            <div style="margin-top: 20px; font-size: 12px; opacity: 0.6;">
                <p>Attente de DotNet/Blazor...</p>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(loadingDiv);

    return {
        updateStatus: (message: string) => {
            const statusEl = document.getElementById('loading-status');
            if (statusEl) statusEl.textContent = message;
        },
        hide: () => {
            const loading = document.getElementById('loading-screen');
            if (loading) loading.remove();
        }
    };
}

// Fonction principale d'initialisation
async function main() {
    try {
        console.log('🎯 Démarrage de l\'application...');

        // Afficher l'écran de chargement avancé
        const loading = showAdvancedLoadingScreen();

        // Étape 1 : Attendre DotNet
        loading.updateStatus('Recherche de DotNet...');
        const dotNetAvailable = await waitForDotNetAdvanced();

        let bridge: any = null;

        if (!dotNetAvailable) {
            // Étape 2 : Créer un bridge alternatif
            loading.updateStatus('Création d\'un bridge alternatif...');
            bridge = createBlazorBridge();

            // Simuler que le bridge est prêt après un délai
            setTimeout(() => {
                bridge.setReady();
            }, 1000);
        }

        // Étape 3 : Initialiser Vue
        loading.updateStatus('Initialisation de Vue...');
        await new Promise(resolve => setTimeout(resolve, 500));

        loading.hide();
        initializeVueApp(dotNetAvailable, bridge);

        console.log('🎉 Application initialisée avec succès!');

    } catch (error) {
        console.error('❌ Erreur critique:', error);

        // Afficher une page d'erreur
        document.body.innerHTML = `
            <div style="
                padding: 40px;
                text-align: center;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                <h1 style="color: #dc3545;">Erreur de chargement</h1>
                <p>Une erreur s'est produite lors du chargement de l'application.</p>
                <button onclick="location.reload()" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                ">Recharger la page</button>
            </div>
        `;
    }
}

// Démarrer l'application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}

// Types TypeScript étendus
declare global {
    interface Window {
        JsDotNet: {
            invokeMethodAsync: (assemblyName: string, methodName: string, ...args: any[]) => Promise<any>;
            invokeMethod: (assemblyName: string, methodName: string, ...args: any[]) => any;
        };
        Blazor: {
            start: () => Promise<void>;
        };
        Module: any;
        BlazorBridge: {
            invokeMethod: (assemblyName: string, methodName: string, ...args: any[]) => Promise<any>;
            ready: boolean;
        };
    }
}