document.addEventListener('DOMContentLoaded', () => {
    const navBurger = document.getElementById('navBurger');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');

    function navSetOpen(v) {
        if (!navDrawer) return;
        navDrawer.classList.toggle('is-open', v);
        if (navBurger) {
            navBurger.setAttribute('aria-expanded', String(v));
            navBurger.classList.toggle('is-open', v);
        }
        if (navOverlay) navOverlay.hidden = !v;
        document.body.style.overflow = v ? 'hidden' : '';
    }

    if (navBurger) navBurger.addEventListener('click', () => navSetOpen(true));
    if (navClose) navClose.addEventListener('click', () => navSetOpen(false));
    if (navOverlay) navOverlay.addEventListener('click', () => navSetOpen(false));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') navSetOpen(false);
    });

    // Mobile dropdown toggle functionality
    const mobileDropdownItems = document.querySelectorAll('.navbar-drawer__links .navbar__item');

    mobileDropdownItems.forEach(item => {
        // Target the FIRST anchor tag which functions as the toggle
        const toggleLink = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-content');

        if (toggleLink && dropdown) {
            toggleLink.addEventListener('click', (e) => {
                // Check if we are in mobile view (drawer mode)
                // We use 1024px to match the CSS breakpoint for the drawer/burger
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    e.stopPropagation(); // Stop bubbling

                    // Optional: Close other dropdowns (Accordion style)
                    mobileDropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('is-active')) {
                            otherItem.classList.remove('is-active');
                        }
                    });

                    item.classList.toggle('is-active');
                }
            });
        }
    });

    // Close all dropdowns when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            mobileDropdownItems.forEach(item => {
                item.classList.remove('is-active');
            });
        }
    });
});
