// Get the modal, modal image, and caption
var modal = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");
var modalCaption = document.getElementById("modal-title");

// Get all the images and attach the click event to open the modal
document.querySelectorAll(".materialboxed").forEach(function(image) {
  image.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    modalCaption.innerHTML = this.alt;

    // Make sure the image scales correctly
    modalImg.style.maxWidth = '100vw'; // Full viewport width
    modalImg.style.maxHeight = '100vh'; // Full viewport height
  });
});

// Get the close button and attach the click event to close the modal
var closeModal = document.querySelector(".close");
closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
