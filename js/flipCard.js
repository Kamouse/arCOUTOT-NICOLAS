// js/flipCard.js

AFRAME.registerComponent('flippable-card', {
  schema: {
    jsonData: {type: 'string', default: 'assets/data.json'}
  },

  init: function () {
    this.isFlipped = false; // État initial (Recto)
    const el = this.el; // Le marqueur

    // Récupération des données
    fetch(this.data.jsonData)
      .then(response => response.json())
      .then(data => this.createCard(el, data));
  },

  createCard: function (parent, data) {
    // 1. CRÉATION DU CONTENEUR PIVOT
    // C'est cet objet invisible qui va tourner quand on clique dessus
    const container = document.createElement('a-entity');
    
    // Position : Un peu en hauteur (0.5)
    // Rotation initiale : -90° sur X pour être à plat face au plafond (sur la table)
    container.setAttribute('position', '0 0.5 0');
    container.setAttribute('rotation', '-90 0 0');
    
    // IMPORTANT : La classe 'clickable' pour que le raycaster le détecte
    container.setAttribute('class', 'clickable');

    // 2. CRÉATION DU RECTO (IMAGE 1)
    const recto = document.createElement('a-image');
    recto.setAttribute('src', data.recto);
    recto.setAttribute('width', '4');   // TRES GRANDE CARTE
    recto.setAttribute('height', '2.2');
    recto.setAttribute('position', '0 0 0.02'); // Légèrement devant le centre
    container.appendChild(recto);

    // 3. CRÉATION DU VERSO (IMAGE 2)
    const verso = document.createElement('a-image');
    verso.setAttribute('src', data.verso);
    verso.setAttribute('width', '4');   // MÊME TAILLE
    verso.setAttribute('height', '2.2');
    // On tourne l'image de 180° pour qu'elle regarde "derrière"
    verso.setAttribute('rotation', '0 180 0'); 
    verso.setAttribute('position', '0 0 -0.02'); // Légèrement derrière le centre
    container.appendChild(verso);

    // 4. GESTION DU CLIC (INTERACTION DOIGT)
    container.addEventListener('click', () => {
        // Si on est recto (isFlipped = false), on tourne de 180°. Sinon on revient à 0.
        // On garde -90 sur X pour rester à plat sur la table
        const rotationVisee = this.isFlipped ? '-90 0 0' : '-90 180 0';
        
        container.setAttribute('animation', {
            property: 'rotation',
            to: rotationVisee,
            dur: 800, // Durée de l'animation en millisecondes
            easing: 'easeInOutCubic' // Mouvement fluide
        });

        this.isFlipped = !this.isFlipped; // On inverse l'état
    });

    parent.appendChild(container);
  }
});