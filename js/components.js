// js/components.js

// Enregistrement du composant pour les liens sociaux
AFRAME.registerComponent('social-link', {
  schema: {
    url: {type: 'string', default: ''}
  },

  init: function () {
    // Référence à l'élément HTML (l'entité 3D)
    const el = this.el;

    // --- Gestion du Survol (Hover) ---
    // Agrandit l'icône quand on passe la souris/le doigt dessus
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.2 1.2 1.2'); 
    });

    // Revient à la taille normale quand on quitte
    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1'); 
    });

    // --- Gestion du Clic ---
    el.addEventListener('click', () => {
      if(this.data.url) {
        // Ouvre le lien dans un nouvel onglet
        window.open(this.data.url, '_blank');
      }
    });
  }
});