// Select elements
const audio = document.querySelector("#audio");
const playPauseBtn = document.querySelector("#playPauseBtn");
const icon = playPauseBtn.querySelector("i");

// Use BroadcastChannel for cross-page communication
const audioChannel = new BroadcastChannel("audio_sync");

// Load saved state when page loads
window.addEventListener("DOMContentLoaded", () => {
    const isPlaying = localStorage.getItem("audioPlaying") === "true";
    const savedTime = parseFloat(localStorage.getItem("audioTime")) || 0;

    audio.currentTime = savedTime; // Restore saved time

    if (isPlaying) {
        audio.play();
        icon.classList.replace("fa-play", "fa-pause");
    }

    // Broadcast current state to other tabs to keep them in sync
    audioChannel.postMessage({
        action: isPlaying ? "play" : "pause",
        time: savedTime
    });
});

// Toggle play/pause functionality
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        localStorage.setItem("audioPlaying", "true");
        icon.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        localStorage.setItem("audioPlaying", "false");
        icon.classList.replace("fa-pause", "fa-play");
    }
});

// Listen for changes from other pages
audioChannel.addEventListener("message", (event) => {
    if (event.data.action === "play") {
        setTimeout(() => {
            audio.currentTime = event.data.time;
            audio.play();
        }, 100); // Small delay to prevent conflicts
        icon.classList.replace("fa-play", "fa-pause");
        localStorage.setItem("audioPlaying", "true");
    } else if (event.data.action === "pause") {
        audio.pause();
        icon.classList.replace("fa-pause", "fa-play");
        localStorage.setItem("audioPlaying", "false");
    }
});

// Save current time before navigating away
window.addEventListener("beforeunload", () => {
    localStorage.setItem("audioTime", audio.currentTime);
});

// Bg image on hover
document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        project.addEventListener("mouseenter", function () {
            let imgSrc = this.querySelector("img").src;
            let bgImage = imgSrc.replace("_thumbnail", "_bg"); // Adjust naming if needed

            document.body.style.backgroundImage = `url(${bgImage})`;

            projects.forEach(p => {
                if (p !== this) {
                    p.style.opacity = "0"; // Fade out other thumbnails
                    p.style.pointerEvents = "none"; // Disable interaction
                }
            });
        });

        project.addEventListener("mouseleave", function () {
            document.body.style.backgroundImage = "none";

            projects.forEach(p => {
                p.style.opacity = "1"; // Restore thumbnails
                p.style.pointerEvents = "auto";
            });
        });
    });
});

// LISTEN TO A TUNE
document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("tooltip");
    const playPauseBtn = document.getElementById("playPauseBtn");

    playPauseBtn.addEventListener("mouseenter", function () {
        tooltip.style.opacity = "1"; // Show tooltip
    });

    playPauseBtn.addEventListener("mouseleave", function () {
        tooltip.style.opacity = "0"; // Hide tooltip
    });

    playPauseBtn.addEventListener("mousemove", function (event) {
        let tooltipWidth = tooltip.offsetWidth;
        let tooltipHeight = tooltip.offsetHeight;
        let pageWidth = window.innerWidth;
        let pageHeight = window.innerHeight;
        let offsetX = -45; // Space between mouse and tooltip
        let offsetY = 10;

        let posX = event.pageX + offsetX;
        let posY = event.pageY + offsetY;

        // Prevent tooltip from going off-screen (right)
        if (posX + tooltipWidth > pageWidth) {
            posX = event.pageX - tooltipWidth - offsetX;
        }

        // Prevent tooltip from going off-screen (bottom)
        if (posY + tooltipHeight > pageHeight) {
            posY = event.pageY - tooltipHeight - offsetY;
        }

        tooltip.style.left = `${posX}px`;
        tooltip.style.top = `${posY}px`;
    });
});