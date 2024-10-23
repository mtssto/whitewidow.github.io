// Select necessary elements
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

// Open Modal and Display Image
function openModal(index) {
    modal.style.display = 'block';
    currentIndex = index;
    displayImage();
}

function displayImage() {
    const item = galleryItems[currentIndex];
    const imgSrc = item.querySelector('img').src;
    modalImg.src = imgSrc;
    captionText.innerHTML = item.querySelector('img').alt;
}

// Close Modal
closeModal.onclick = function () {
    modal.style.display = 'none';
}

// Next/Prev Image Navigation
function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    displayImage();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    displayImage();
}

nextButton.onclick = showNext;
prevButton.onclick = showPrev;

// Add Event Listeners to Gallery Items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(index);
    });
});

// Close modal on clicking outside of the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
