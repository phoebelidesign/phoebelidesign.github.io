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

// Glow effect
const glow = document.querySelector('.glow');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.pageX; // Using pageX for position relative to the whole page
    const mouseY = e.pageY; // Using pageY for position relative to the whole page

    glow.style.left = `${mouseX - glow.offsetWidth / 2}px`; // Centers the glow on the mouse
    glow.style.top = `${mouseY - glow.offsetHeight / 2}px`; // Centers the glow on the mouse
});