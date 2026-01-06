AFRAME.registerComponent('simple-card', {
    schema: {
        configPath: { type: 'string', default: 'assets/data.json' }
    },

    init: function () {
        const el = this.el;
        fetch(this.data.configPath)
            .then(response => response.json())
            .then(data => {
                this.buildAugmentedReality(data, el);
            })
            .catch(err => console.error('Erreur JSON:', err));
    },

    buildAugmentedReality: function (data, parentElement) {
        // 1. Conteneur principal qui sera posé à plat sur la carte
        const container = document.createElement('a-entity');
        // Rotation pour être à plat, légère élévation (0.1) pour éviter le z-fighting
        container.setAttribute('rotation', '-90 0 0');
        container.setAttribute('position', '0 0.1 0');

        // Animation d'entrée globale
        container.setAttribute('animation', {
            property: 'scale', from: '0 0 0', to: '1 1 1', dur: 800, easing: 'easeOutBack', startEvents: 'ar-hit'
        });

        // 2. Création de la section TEXTE (Au-dessus de la carte)
        // On positionne ce groupe "en haut" (Z négatif dans ce repère local)
        const textGroup = document.createElement('a-entity');
        textGroup.setAttribute('position', '0 0 -0.8'); 

        // Création du texte téléphone
        const phoneText = this.createTxt(data.info.phone, '#333', 1.2);
        phoneText.setAttribute('position', '0 0.2 0'); // Un peu au dessus de l'adresse
        textGroup.appendChild(phoneText);

        // Création du texte adresse
        const addressText = this.createTxt(data.info.address, '#666', 0.8);
        addressText.setAttribute('position', '0 0 0');
        textGroup.appendChild(addressText);
        
        container.appendChild(textGroup);


        // 3. Création de la section ICÔNES (En dessous de la carte)
        // On positionne ce groupe "en bas" (Z positif)
        const iconGroup = document.createElement('a-entity');
        iconGroup.setAttribute('position', '0 0 0.8');

        let xOffset = -0.5; // Position de départ horizontale pour centrer les 3 icônes
        const spacing = 0.5; // Espace entre les icônes

        data.socials.forEach(social => {
            const iconBtn = document.createElement('a-image');
            iconBtn.setAttribute('src', social.icon);
            iconBtn.setAttribute('width', '0.4');
            iconBtn.setAttribute('height', '0.4');
            iconBtn.setAttribute('position', `${xOffset} 0 0`);
            
            // IMPORTANT : Pour l'interactivité
            // On ajoute la classe 'clickable' (voir index.html)
            iconBtn.setAttribute('class', 'clickable');
            
            // Animation au survol (si sur desktop) ou au clic
            iconBtn.setAttribute('animation__scale', {
                 property: 'scale', to: '1.2 1.2 1.2', dur: 200, startEvents: 'mouseenter'
            });
            iconBtn.setAttribute('animation__scale_back', {
                 property: 'scale', to: '1 1 1', dur: 200, startEvents: 'mouseleave'
            });

            // Gestion du clic : redirection
            iconBtn.addEventListener('click', function() {
                // Ouvre le lien dans un nouvel onglet
                window.open(social.url, '_blank');
            });

            iconGroup.appendChild(iconBtn);
            xOffset += spacing;
        });

        container.appendChild(iconGroup);

        // 4. Ajout final au marqueur NFT
        parentElement.appendChild(container);
        
        // On force le déclenchement de l'animation d'entrée car le marqueur NFT est parfois déjà "trouvé" au chargement
        parentElement.addEventListener('markerFound', () => {
            container.emit('ar-hit');
        });
    },

    // Fonction utilitaire pour créer du texte centré proprement
    createTxt: function(textVal, color, scaleVal) {
        const txt = document.createElement('a-text');
        txt.setAttribute('value', textVal);
        txt.setAttribute('color', color);
        txt.setAttribute('align', 'center');
        txt.setAttribute('width', '4'); // Largeur du bloc de texte
        // L'échelle permet d'ajuster la taille de la police
        txt.setAttribute('scale', `${scaleVal} ${scaleVal} ${scaleVal}`);
        return txt;
    }
});