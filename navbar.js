document.addEventListener('DOMContentLoaded', () => {
    const navBurger = document.getElementById('navBurger');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');

    function navSetOpen(v) {
        if (!navDrawer) return;
        navDrawer.classList.toggle('is-open', v);
        if (navBurger) navBurger.setAttribute('aria-expanded', String(v));
        if (navOverlay) navOverlay.hidden = !v;
        document.body.style.overflow = v ? 'hidden' : '';
    }

    if (navBurger) navBurger.addEventListener('click', () => navSetOpen(true));
    if (navClose) navClose.addEventListener('click', () => navSetOpen(false));
    if (navOverlay) navOverlay.addEventListener('click', () => navSetOpen(false));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') navSetOpen(false);
    });
});
