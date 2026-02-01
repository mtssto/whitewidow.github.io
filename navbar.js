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
        const mainLink = item.querySelector('a:first-child');
        const dropdown = item.querySelector('.dropdown-content');

        if (mainLink && dropdown) {
            mainLink.addEventListener('click', (e) => {
                // Only prevent default and toggle if we're in mobile view
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
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
