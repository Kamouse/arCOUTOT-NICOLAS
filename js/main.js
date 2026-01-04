// js/main.js

window.addEventListener('load', () => {
    console.log("Système AR Coutot-Masson : Initialisation...");

    const scene = document.querySelector('a-scene');
    const loader = document.querySelector('.arjs-loader');

    // Quand la scène AR est prête (caméra active + marqueurs chargés)
    scene.addEventListener('loaded', () => {
        console.log(">>> Scène chargée. Prêt à scanner le chat !");
        
        // On cache l'écran de chargement proprement
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // Gestion des erreurs caméra (Bonus Architecture)
    scene.addEventListener('camera-error', (e) => {
        console.error("Erreur caméra détectée :", e);
        alert("Impossible d'accéder à la caméra. Vérifiez les permissions.");
    });
});