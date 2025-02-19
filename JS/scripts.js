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