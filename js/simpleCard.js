AFRAME.registerComponent('dual-card-display', {
  schema: {
    jsonData: {type: 'string', default: 'assets/data.json'}
  },

  init: function () {
    const el = this.el; // Le marqueur (le Chat)
    
    fetch(this.data.jsonData)
      .then(response => response.json())
      .then(data => {
        this.createCards(el, data);
      });
  },

  createCards: function (parent, data) {
    // --- CARTE 1 : RECTO (À GAUCHE) ---
    const recto = document.createElement('a-image');
    recto.setAttribute('src', data.images.recto);
    recto.setAttribute('width', '1.6');  // Largeur ajustée
    recto.setAttribute('height', '0.9'); // Hauteur ajustée
    recto.setAttribute('rotation', '-90 0 0'); // À plat
    recto.setAttribute('position', '-0.9 0 0'); // Décalé à gauche du chat
    
    // Animation "Pop" (Échelle 0 à 1)
    recto.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic');
    parent.appendChild(recto);

    // --- CARTE 2 : VERSO (À DROITE) ---
    const verso = document.createElement('a-image');
    verso.setAttribute('src', data.images.verso);
    verso.setAttribute('width', '1.6');
    verso.setAttribute('height', '0.9');
    verso.setAttribute('rotation', '-90 0 0');
    verso.setAttribute('position', '0.9 0 0'); // Décalé à droite du chat

    // Animation "Pop" avec un petit délai
    verso.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; delay: 200; easing: easeOutElastic');
    parent.appendChild(verso);

    // --- TEXTE OPTIONNEL (Au dessus du chat) ---
    const text = document.createElement('a-text');
    text.setAttribute('value', 'NICOLAS COUTOT');
    text.setAttribute('align', 'center');
    text.setAttribute('color', 'white');
    text.setAttribute('position', '0 0 -0.8'); // En haut du chat
    text.setAttribute('rotation', '-90 0 0');
    text.setAttribute('scale', '1.5 1.5 1.5');
    parent.appendChild(text);
  }
});