// js/simpleCard.js

AFRAME.registerComponent('simple-card', {
  schema: {
    jsonData: {type: 'string', default: 'assets/data.json'}
  },

  init: function () {
    const el = this.el; // Le marqueur

    // On récupère le chemin de l'image
    fetch(this.data.jsonData)
      .then(response => response.json())
      .then(data => {
        
        // Création de l'image
        const card = document.createElement('a-image');
        card.setAttribute('src', data.cardImage);
        
        // CONFIGURATION :
        card.setAttribute('width', '4');    // Largeur (Grande taille)
        card.setAttribute('height', '2.2'); // Hauteur
        card.setAttribute('rotation', '-90 0 0'); // À plat sur la table
        card.setAttribute('position', '0 0 0');   // Centré sur le chat
        
        // Petite animation d'apparition (Zoom) pour faire propre
        card.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic');

        // On ajoute la carte au marqueur
        el.appendChild(card);
      })
      .catch(err => console.error("Erreur :", err));
  }
});