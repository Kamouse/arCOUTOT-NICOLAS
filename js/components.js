// Fichier : js/components.js

/**
 * COMPOSANT : SOCIAL-LINK
 * Gère l'animation au survol et la redirection au clic sur les icônes.
 */
AFRAME.registerComponent('social-link', {
  schema: {
    url: { type: 'string', default: '' }
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // --- Animation "Pop" (Zoom) ---
    // Desktop (Souris) + Mobile (Toucher long ou tap)
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.2 1.2 1.2');
    });

    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
    });

    // --- Redirection ---
    el.addEventListener('click', () => {
      if (data.url) {
        console.log(`🔗 Redirection vers : ${data.url}`);
        window.open(data.url, '_blank');
      }
    });
  }
});

/**
 * COMPOSANT : SCAN-SOUND
 * Gère la lecture du son quand la carte est détectée.
 */
AFRAME.registerComponent('scan-sound', {
  schema: {
    src: { type: 'selector' } // ID de la balise <audio>
  },

  init: function () {
    const audioEl = this.data.src;
    
    // Sécurité : si pas d'audio, on ne fait rien
    if (!audioEl) {
      console.warn("⚠️ Scan-Sound: Aucun fichier audio lié.");
      return;
    }

    // --- QUAND LA CARTE EST DÉTECTÉE ---
    this.el.addEventListener('targetFound', () => {
      console.log("⚡ Cible détectée -> Lecture du son");
      
      // On rembobine pour que le son reparte du début
      audioEl.currentTime = 0;
      
      // On lance la lecture
      audioEl.play().catch((e) => {
        // Si ça échoue ici, c'est que l'utilisateur n'a pas cliqué sur "Démarrer" au début
        console.warn("❌ Lecture bloquée. L'utilisateur a-t-il cliqué sur le bouton Start ?", e);
      });
    });

    // --- QUAND LA CARTE EST PERDUE ---
    this.el.addEventListener('targetLost', () => {
      console.log("💨 Cible perdue -> Pause du son");
      audioEl.pause();
    });
  }
});