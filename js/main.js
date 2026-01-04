// js/main.js

window.addEventListener('load', () => {
    console.log("Application AR : Initialisation...");

    const scene = document.querySelector('a-scene');
    const loader = document.querySelector('.arjs-loader');

    // 1. FIN DU CHARGEMENT
    // Quand la caméra est active et la 3D prête
    scene.addEventListener('loaded', () => {
        console.log(">>> Système prêt. En attente du marqueur.");
        
        // On fait disparaître l'écran de chargement
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // 2. GESTION DES ERREURS
    scene.addEventListener('camera-error', (error) => {
        console.error("Erreur d'accès caméra :", error);
        alert("Erreur : L'accès à la caméra est requis pour l'expérience AR.");
    });
});