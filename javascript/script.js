document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.carte-projet');
    
    // Fonction de filtrage avec switch case
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            switch(category) {
                case 'tous':
                    card.style.display = 'block';
                    break;
                    
                case 'collaboration':
                    if (cardCategory === 'collaboration') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                case 'personnel':
                    if (cardCategory === 'personnel') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                default:
                    card.style.display = 'block';
            }
            
            // Animation de réapparition
            if (card.style.display === 'block') {
                card.style.animation = 'fadeIn 0.5s ease';
            }
        });
    }
    
    // Ajout des événements aux boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });
    
    // CSS pour l'animation fadeIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
//bares de progressions
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const competencesSection = document.querySelector('.section-competences');
    
    // Fonction pour animer les barres
    function animateBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    }
    
    // 
    function resetBars() {
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    // Observer pour détecter quand la section devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetBars();
                setTimeout(animateBars, 200);
                
                observer.unobserve(competencesSection);
            }
        });
    }, {
        threshold: 0.5 
    });
    
    // Observer la section des compétences
    if (competencesSection) {
        observer.observe(competencesSection);
    }
    
    // Animation au chargement si la section est déjà visible (pour les petits écrans)
    const rect = competencesSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setTimeout(animateBars, 300);
    }
});
// Validation du formulaire
document.getElementById('formulaire').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;
    const captcha = document.getElementById('captcha').value;
    
    // Validation des champs
    if (name === '' || email === '' || message === '' || !consent || captcha !== '9') {
        alert('Veuillez remplir tous les champs obligatoires correctement');
        return;
    }
    
    // Vérification email 
    if (!email.includes('@') || !email.includes('.')) {
        alert('Veuillez saisir une adresse email valide');
        return;
    }
    
    alert('Formulaire envoyé avec succès !');
    this.reset();
});
       