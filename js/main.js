// Fichier : js/main.js

document.addEventListener("DOMContentLoaded", () => {
  console.log(" Application AR démarrée");

  const scene = document.querySelector('a-scene');

  // Événement : Le système AR est chargé et prêt (Caméra active)
  scene.addEventListener("arReady", (event) => {
    console.log(" Système MindAR prêt ! La caméra tourne.");
    // Tu pourrais cacher un écran de chargement personnalisé ici
  });

  // Événement : Erreur de chargement (ex: caméra refusée)
  scene.addEventListener("arError", (event) => {
    console.error(" Erreur MindAR :", event);
    alert("Erreur : La caméra est nécessaire pour l'expérience AR.");
  });

  // Petit helper pour vérifier que les sons sont bien chargés
  const sound = document.querySelector('#sound-intro');
  if(sound) {
    sound.addEventListener('canplaythrough', () => {
      console.log(" Le fichier audio est chargé et prêt.");
    });
  }
});