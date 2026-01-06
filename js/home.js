document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('card-modal');
    const btnShow = document.getElementById('btn-show-card');
    const btnClose = document.getElementById('close-modal');

    // Ouvrir la modal
    btnShow.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Fermer la modal (Croix)
    btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fermer si on clique en dehors de l'image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});