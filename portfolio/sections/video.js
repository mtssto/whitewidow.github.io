document.addEventListener("DOMContentLoaded", function() {
    // Get the modal
    var modal = document.getElementById("custom-vid-modal");
    var modalVideo = document.getElementById("modal-video");
    var closeBtn = document.getElementsByClassName("close")[0];

    // Function to open the modal and load a video
    function openModal(videoSrc) {
        console.log("openModal called with src:", videoSrc);
        if (videoSrc) {
            modal.style.display = "block"; // Show the modal
            modalVideo.src = videoSrc; // Set the video source
            modalVideo.play(); // Play the video
        } else {
            console.log("No video source found!");
        }
    }

    // Function to close the modal
    closeBtn.onclick = function() {
        console.log("Close button clicked");
        modal.style.display = "none";
        modalVideo.pause(); // Pause the video when the modal is closed
        modalVideo.src = ""; // Clear the video source to stop playback
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            console.log("Clicked outside modal to close");
            modal.style.display = "none";
            modalVideo.pause();
            modalVideo.src = ""; // Clear the video source
        }
    };

    // Attach click event listeners to each video in the gallery
    var videos = document.querySelectorAll(".gallery-item video");
    console.log("Found", videos.length, "videos");

    // Use click to detect actual user click
    videos.forEach(function(video) {
        video.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent any event bubbling
            console.log("Video clicked by user, src:", video.getAttribute("src"));
            openModal(video.getAttribute("src")); // Open modal on actual user click
        });

        // Ensure the video can be interacted with
        video.style.pointerEvents = 'auto';  // Allow user interaction
    });
});
