// Proyectos page interactivity
document.addEventListener('DOMContentLoaded', function () {
    // Enable iframe interaction on click for mobile
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const iframe = card.querySelector('.website-iframe');
        const overlay = card.querySelector('.preview-overlay');

        if (iframe && overlay) {
            // On mobile/tablet, first tap shows overlay, second tap follows link
            let overlayShown = false;

            card.addEventListener('click', function (e) {
                if (window.innerWidth <= 1024) {
                    if (!overlayShown) {
                        e.preventDefault();
                        overlay.style.opacity = '1';
                        overlayShown = true;

                        // Hide overlay after 3 seconds
                        setTimeout(() => {
                            overlay.style.opacity = '0';
                            overlayShown = false;
                        }, 3000);
                    }
                }
            });
        }
    });

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add analytics or tracking for project visits if needed
    const projectLinks = document.querySelectorAll('.btn-visit, .btn-project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function () {
            const projectName = this.closest('.project-card').querySelector('.project-name')?.textContent;
            console.log(`Project visited: ${projectName}`);
            // Add your analytics tracking here
        });
    });
});
