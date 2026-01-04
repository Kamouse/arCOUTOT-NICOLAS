// js/flipCard.js

AFRAME.registerComponent('flippable-card', {
  schema: {
    jsonData: {type: 'string', default: 'assets/data.json'}
  },

  init: function () {
    const el = this.el; // Le marqueur
    this.isFlipped = false; // Variable pour savoir si on est recto ou verso

    // Chargement des données
    fetch(this.data.jsonData)
      .then(response => response.json())
      .then(data => {
        this.createCardObject(el, data);
      });
  },

  createCardObject: function (parent, data) {
    // 1. CRÉATION DU CONTENEUR (Le pivot qui va tourner)
    const cardContainer = document.createElement('a-entity');
    // On le place un peu en hauteur pour qu'il flotte
    cardContainer.setAttribute('position', '0 0.5 0'); 
    // On le met vertical (debout) pour bien le voir tourner, ou à plat selon ton goût
    // Ici : rotation initiale à -90 sur X pour être à plat face caméra, ou 0 pour être debout.
    // Pour une carte sur table, le mieux est qu'elle flotte à plat :
    cardContainer.setAttribute('rotation', '-90 0 0'); 

    // Classe pour le raycaster (pour que le clic marche)
    cardContainer.setAttribute('class', 'clickable');
    
    // --- FACE A : RECTO ---
    const recto = document.createElement('a-image');
    recto.setAttribute('src', data.images.recto);
    // TAILLE PLUS GRANDE (Demandé)
    recto.setAttribute('width', '3.5'); 
    recto.setAttribute('height', '2');
    recto.setAttribute('position', '0 0 0.01'); // Légèrement décalé pour pas toucher l'autre
    cardContainer.appendChild(recto);

    // --- FACE B : VERSO (Dos à dos) ---
    const verso = document.createElement('a-image');
    verso.setAttribute('src', data.images.verso);
    // MÊME TAILLE
    verso.setAttribute('width', '3.5');
    verso.setAttribute('height', '2');
    // On le tourne de 180° sur l'axe Y (comme une pièce de monnaie)
    // Et on le tourne de 180° sur Z pour qu'il soit à l'endroit quand on retourne
    verso.setAttribute('rotation', '0 180 0'); 
    verso.setAttribute('position', '0 0 -0.01'); // Légèrement décalé derrière
    cardContainer.appendChild(verso);

    // --- GESTION DU CLIC (INTERACTION) ---
    // Quand on clique sur le conteneur, il tourne
    cardContainer.addEventListener('click', () => {
      // Si on est déjà tourné, on revient à 0, sinon on va à 180
      const targetRotation = this.isFlipped ? '-90 0 0' : '-90 180 0'; 
      // Si tu la veux debout (verticale), ce serait '0 0 0' et '0 180 0'
      
      // On lance l'animation
      cardContainer.setAttribute('animation', {
        property: 'rotation',
        to: targetRotation,
        dur: 800, // Durée en ms (0.8 seconde)
        easing: 'easeInOutQuad' // Mouvement fluide
      });

      // On inverse l'état
      this.isFlipped = !this.isFlipped;
    });

    parent.appendChild(cardContainer);
  }
});