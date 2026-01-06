// Fichier : js/components.js

/**
 * COMPOSANT 1 : SOCIAL-LINK
 * Gère les interactions sur les icônes (Zoom au survol + Redirection au clic)
 */
AFRAME.registerComponent('social-link', {
  schema: {
    url: { type: 'string', default: '' } // L'URL vers laquelle rediriger
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // --- Interaction : Survol (Desktop) / Toucher maintenu (Mobile) ---
    // Agrandit l'icône pour un effet "pop"
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.2 1.2 1.2');
    });

    // Revient à la taille normale quand le curseur quitte l'élément
    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
    });

    // --- Interaction : Clic ---
    el.addEventListener('click', () => {
      if (data.url) {
        // Ouvre le lien dans un nouvel onglet
        window.open(data.url, '_blank');
      }
    });
  }
});

/**
 * COMPOSANT 2 : SCAN-SOUND
 * Gère la lecture audio lorsque la cible d'image est détectée
 */
AFRAME.registerComponent('scan-sound', {
  schema: {
    src: { type: 'selector' } // Référence à l'élément <audio> dans le HTML
  },

  init: function () {
    const el = this.el;
    const audioEl = this.data.src;

    if (!audioEl) {
      console.warn("Audio element not found in scan-sound component.");
      return;
    }

    // --- Événement : Cible Trouvée (Target Found) ---
    el.addEventListener('targetFound', () => {
      console.log("Cible détectée : Lecture du son");
      
      // Remet le son au début pour qu'il soit joué en entier à chaque scan
      audioEl.currentTime = 0;
      
      // Tentative de lecture
      // Note : Peut échouer si l'utilisateur n'a pas encore interagi avec la page (Autoplay Policy)
      audioEl.play().catch((error) => {
        console.log("Lecture audio bloquée (attente d'interaction utilisateur) :", error);
      });
    });

    // --- Événement : Cible Perdue (Target Lost) ---
    el.addEventListener('targetLost', () => {
      console.log("Cible perdue : Pause du son");
      
      // Met le son en pause quand la carte sort du champ de vision
      // (Tu peux commenter cette ligne si tu veux que le son continue jusqu'au bout)
      audioEl.pause();
    });
  }
});