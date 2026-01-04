document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const scene = document.querySelector('a-scene');

    // Écouteur pour savoir quand la scène A-Frame est prête
    if (scene) {
        scene.addEventListener('loaded', () => {
            console.log('Scène AR chargée.');
            // Petit délai pour s'assurer que tout est stable visuellement
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 1000);
        });
    }

    // Gestion basique des erreurs de caméra (si l'utilisateur refuse l'accès)
    scene.addEventListener('camera-error', (error) => {
        alert("Erreur : Impossible d'accéder à la caméra. Vérifiez vos permissions.");
        console.error("Erreur caméra", error);
    });
});