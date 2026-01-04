// js/simpleCard.js

AFRAME.registerComponent('simple-card', {
  schema: {
    jsonData: {type: 'string', default: 'assets/data.json'}
  },

  init: function () {
    const el = this.el; // Le marqueur

    // Récupération du chemin de l'image depuis le JSON
    fetch(this.data.jsonData)
      .then(response => response.json())
      .then(data => {
        this.createCard(el, data.cardImage);
      })
      .catch(err => console.error("Erreur lecture JSON :", err));
  },

  createCard: function (parent, imagePath) {
    // Création de l'élément image
    const card = document.createElement('a-image');
    
    // Configuration
    card.setAttribute('src', imagePath);
    card.setAttribute('width', '4');     // Grande largeur
    card.setAttribute('height', '2.2');  // Hauteur proportionnelle
    
    // Position : À plat sur le marqueur
    card.setAttribute('rotation', '-90 0 0');
    card.setAttribute('position', '0 0 0');
    
    // Animation d'apparition
    card.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic');

    // Ajout à la scène
    parent.appendChild(card);
  }
});