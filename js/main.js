// js/main.js

window.addEventListener('load', () => {
    console.log("L'application AR est en cours d'initialisation...");

    const scene = document.querySelector('a-scene');
    
    // 1. Gestion de la fin du chargement
    // L'événement 'loaded' est déclenché quand A-Frame et la caméra sont prêts
    scene.addEventListener('loaded', () => {
        console.log("Scène chargée et prête !");
        
        // On masque le loader (si tu en as mis un dans le HTML/CSS)
        const loader = document.querySelector('.arjs-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // 2. Gestion des erreurs de caméra (Optionnel mais très pro)
    scene.addEventListener('camera-error', (error) => {
        console.error("Erreur d'accès à la caméra :", error);
        alert("Erreur : Impossible d'accéder à la caméra. Vérifiez vos permissions.");
    });

    // 3. (Bonus) Détecter globalement si un marqueur est trouvé
    // Cela permet de faire des actions sur toute la page (ex: jouer un son d'ambiance)
    const markers = document.querySelectorAll('a-marker');
    markers.forEach(marker => {
        marker.addEventListener('markerFound', () => {
            console.log(`Marqueur trouvé : ${marker.getAttribute('url')}`);
        });
        
        marker.addEventListener('markerLost', () => {
            console.log(`Marqueur perdu : ${marker.getAttribute('url')}`);
        });
    });
});