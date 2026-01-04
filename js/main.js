// js/main.js

// On attend que toute la page HTML soit chargée
window.addEventListener('load', () => {
    console.log("Application AR : Démarrage...");

    const scene = document.querySelector('a-scene');
    const loader = document.querySelector('.arjs-loader');

    // 1. GESTION DU CHARGEMENT (LOADER)
    // L'événement 'loaded' est déclenché quand la caméra est prête
    scene.addEventListener('loaded', () => {
        console.log(">>> Caméra active et scène 3D prête !");
        
        // On cache l'écran noir de chargement
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // 2. GESTION DES ERREURS CAMÉRA
    // Si l'utilisateur refuse la caméra, on le prévient
    scene.addEventListener('camera-error', (error) => {
        console.error("Erreur d'accès à la caméra :", error);
        alert("Attention : L'accès à la caméra est nécessaire pour voir la carte.");
    });
});