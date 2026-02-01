// Filter functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');

    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter products with animation
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    // Add fade-in animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease-in-out';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal close functionality
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            closeModal();
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
        }
    }

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
});

// Open modal function (called from HTML onclick)
function openModal(button) {
    const card = button.closest('.product-card');
    const img = card.querySelector('.product-image img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('active');
    }
}
