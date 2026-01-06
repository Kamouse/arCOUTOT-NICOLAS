document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const scene = document.querySelector('a-scene');

    if (scene) {
        // 1. Écoute du chargement de la scène
        scene.addEventListener('loaded', () => {
            console.log('Scène A-Frame chargée.');

            // 2. POUR LE NFT (Image Tracking) :
            // Le calcul initial est lourd. On augmente le délai à 2500ms (2.5 sec)
            // pour éviter que l'utilisateur ne voie un écran noir ou figé au début.
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 2500); 
        });

        // 3. Gestion des erreurs de caméra
        // (Je l'ai déplacé DANS le if(scene) pour éviter des bugs si la scène n'existe pas)
        scene.addEventListener('camera-error', (error) => {
            alert("Erreur : Impossible d'accéder à la caméra. Vérifiez qu'un autre onglet ne l'utilise pas et que vous êtes bien en HTTPS.");
            console.error("Erreur caméra", error);
        });
    }
});