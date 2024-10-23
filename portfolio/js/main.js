document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems);

    // Get the close button element
    const closeButton = document.querySelector('.materialboxed-close');

    // Close button functionality
    closeButton.addEventListener('click', function() {
        const activeImage = document.querySelector('.materialboxed.active');
        if (activeImage) {
            // Hide the close button immediately
            closeButton.style.display = 'none';

            // Close the materialboxed modal
            const instance = M.Materialbox.getInstance(activeImage);
            instance.close();
        }
    });

    // Ensure the close button reappears when the modal is opened
    elems.forEach(el => {
        el.addEventListener('click', function() {
            closeButton.style.display = 'block';  // Show the button when an image is zoomed
        });
    });
});