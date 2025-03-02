// Get the audio element and the button
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');

// Add event listener to the button
playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
    }
});

// Intro video overlay
document.addEventListener("DOMContentLoaded", function () {
    const introOverlay = document.getElementById("intro-overlay");
    const introVideo = document.getElementById("intro-video");
    const skipButton = document.getElementById("skip-button");
    const mainContent = document.getElementById("main-content");

    // Check if the intro has already played in this session
    if (sessionStorage.getItem("hasSeenIntro")) {
        // Hide the intro and show the main content immediately
        introOverlay.style.display = "none";
        mainContent.classList.remove("hidden");
    } else {
        // If it's the first time in this session, show the intro
        function endIntro() {
            introOverlay.style.display = "none"; // Hide the intro overlay
            mainContent.classList.remove("hidden"); // Show the main content
            sessionStorage.setItem("hasSeenIntro", "true"); // Mark intro as seen
        }

        // Bind skip button and video end event
        skipButton.addEventListener("click", endIntro);
        introVideo.addEventListener("ended", endIntro);
    }
});