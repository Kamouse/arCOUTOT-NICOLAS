// Enregistrement du composant 'simple-card'
AFRAME.registerComponent('simple-card', {
    schema: {
        // On pourrait passer le chemin du JSON en paramètre si besoin
        configPath: { type: 'string', default: 'assets/data.json' }
    },

    init: function () {
        // Référence à l'élément (le marqueur) sur lequel le composant est attaché
        const el = this.el;

        // Chargement du fichier JSON
        fetch(this.data.configPath)
            .then(response => response.json())
            .then(data => {
                this.createCard(data, el);
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier JSON :', error);
            });
    },

    createCard: function (data, parentElement) {
        // Création de l'entité image
        const imageEl = document.createElement('a-image');

        // Configuration de l'image
        imageEl.setAttribute('src', data.cardImage);
        imageEl.setAttribute('width', data.width);
        imageEl.setAttribute('height', data.height);
        
        // Rotation à -90° sur X pour être à plat sur le marqueur
        imageEl.setAttribute('rotation', '-90 0 0');
        
        // Positionnement (légèrement surélevé pour éviter le z-fighting)
        imageEl.setAttribute('position', '0 0.1 0');

        // Animation d'entrée (Zoom / Pop)
        // startEvents: 'markerFound' permet de relancer l'anim si on perd/retrouve le marqueur
        imageEl.setAttribute('animation', {
            property: 'scale',
            from: '0 0 0',
            to: '1 1 1',
            dur: 1000,
            easing: 'easeOutElastic'
        });

        // Ajout de l'image au marqueur
        parentElement.appendChild(imageEl);
        
        console.log('Carte générée avec succès depuis le JSON.');
    }
});