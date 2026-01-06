// Fichier : js/components.js

/**
 * COMPOSANT : SOCIAL-LINK
 * Gère l'animation au survol et la redirection au clic.
 */
AFRAME.registerComponent('social-link', {
  schema: {
    url: { type: 'string', default: '' }
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // Animation "Pop" au survol
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.2 1.2 1.2');
    });

    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
    });

    // Redirection
    el.addEventListener('click', () => {
      if (data.url) {
        console.log(`Redirection vers : ${data.url}`);
        window.open(data.url, '_blank');
      }
    });
  }
});

/**
 * COMPOSANT : SCAN-SOUND
 * Gère la lecture/pause du son lors de la détection de la cible.
 */
AFRAME.registerComponent('scan-sound', {
  schema: {
    src: { type: 'selector' } // ID de la balise <audio>
  },

  init: function () {
    const audioEl = this.data.src;
    
    // Si l'audio n'existe pas, on arrête là
    if (!audioEl) {
      console.warn("Scan-Sound: Aucun élément audio trouvé.");
      return;
    }

    // Quand l'image est trouvée
    this.el.addEventListener('targetFound', () => {
      console.log("⚡ Cible détectée -> Lecture Audio");
      audioEl.currentTime = 0; // Rembobiner
      audioEl.play().catch((e) => {
        console.log("Lecture auto bloquée par le navigateur (attente d'interaction)", e);
      });
    });

    // Quand l'image est perdue
    this.el.addEventListener('targetLost', () => {
      console.log("💨 Cible perdue -> Pause Audio");
      audioEl.pause();
    });
  }
});