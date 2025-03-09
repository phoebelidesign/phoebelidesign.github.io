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

    // Broadcast state to other pages
    audioChannel.postMessage({
        action: audio.paused ? "pause" : "play",
        time: audio.currentTime
    });
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
