// Fichier : js/main.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Application AR initialisée");

  // Récupération des éléments du DOM
  const startOverlay = document.getElementById('start-overlay');
  const startButton = document.getElementById('start-button');
  const sound = document.getElementById('sound-intro');
  const scene = document.querySelector('a-scene');

  // --- FONCTION : DÉBLOCAGE AUDIO (Le Hack iOS/Chrome) ---
  const unlockAudio = () => {
    if(sound) {
      // 1. On joue le son un tout petit peu
      sound.play().then(() => {
        // 2. On le met en pause immédiatement
        sound.pause();
        // 3. On le remet à zéro
        sound.currentTime = 0;
        console.log("🔓 Audio système débloqué avec succès !");
      }).catch((error) => {
        console.error("❌ Impossible de débloquer l'audio :", error);
      });
    }
    
    // On cache l'écran d'accueil pour révéler la caméra
    if (startOverlay) {
        startOverlay.classList.add('hidden');
    }
  };

  // --- ÉCOUTEUR : CLIC SUR "DÉMARRER" ---
  if(startButton) {
    startButton.addEventListener('click', unlockAudio);
  }

  // --- DEBUGGING AR (Optionnel) ---
  
  // Quand MindAR est prêt
  scene.addEventListener("arReady", (event) => {
    console.log("✅ Système MindAR prêt ! La caméra tourne.");
  });

  // En cas d'erreur (ex: Caméra refusée)
  scene.addEventListener("arError", (event) => {
    console.error("❌ Erreur MindAR :", event);
    alert("Erreur : Veuillez autoriser l'accès à la caméra pour voir la carte.");
  });
});