/***********************
 LISTEN TO A TUNE (TOOLTIP)
***********************/
document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("tooltip");
    const playPauseBtn = document.getElementById("playPauseBtn");

    if (playPauseBtn && tooltip) {

        playPauseBtn.addEventListener("mouseenter", function () {
            tooltip.style.opacity = "1";
        });

        playPauseBtn.addEventListener("mouseleave", function () {
            tooltip.style.opacity = "0";
        });

        playPauseBtn.addEventListener("mousemove", function (event) {

            let tooltipWidth = tooltip.offsetWidth;
            let tooltipHeight = tooltip.offsetHeight;

            let offsetX = -20;
            let offsetY = -15; // negative = always above cursor

            let posX = event.pageX + offsetX;
            let posY = event.pageY - tooltipHeight + offsetY;

            // keep inside right edge
            if (posX + tooltipWidth > window.innerWidth) {
                posX = window.innerWidth - tooltipWidth - 10;
            }

            // keep inside left edge
            if (posX < 10) {
                posX = 10;
            }

            // keep inside top edge
            if (posY < 10) {
                posY = 10;
            }

            tooltip.style.left = `${posX}px`;
            tooltip.style.top = `${posY}px`;
        });
    }
});


/***********************
 AUDIO SYSTEM
***********************/
const Audio = document.querySelector("#Audio");
const playPauseBtn = document.querySelector("#playPauseBtn");

const AudioChannel = new BroadcastChannel("Audio_sync");

window.addEventListener("DOMContentLoaded", () => {
    if (!Audio || !playPauseBtn) return;

    const isPlaying = localStorage.getItem("AudioPlaying") === "true";
    const savedTime = parseFloat(localStorage.getItem("AudioTime")) || 0;

    Audio.currentTime = savedTime;

    if (isPlaying) {
        Audio.play();
        playPauseBtn.textContent = "Pause";
    } else {
        playPauseBtn.textContent = "Play";
    }

    AudioChannel.postMessage({
        action: isPlaying ? "play" : "pause",
        time: savedTime
    });
});


if (playPauseBtn && Audio) {
    playPauseBtn.addEventListener("click", () => {

        if (Audio.paused) {
            Audio.play();
            localStorage.setItem("AudioPlaying", "true");
            playPauseBtn.textContent = "Pause";

            AudioChannel.postMessage({
                action: "play",
                time: Audio.currentTime
            });

        } else {
            Audio.pause();
            localStorage.setItem("AudioPlaying", "false");
            playPauseBtn.textContent = "Play";

            AudioChannel.postMessage({
                action: "pause",
                time: Audio.currentTime
            });
        }
    });
}


AudioChannel.addEventListener("message", (event) => {
    if (!Audio || !playPauseBtn) return;

    if (event.data.action === "play") {
        setTimeout(() => {
            Audio.currentTime = event.data.time;
            Audio.play();
        }, 100);

        playPauseBtn.textContent = "Pause";
        localStorage.setItem("AudioPlaying", "true");

    } else if (event.data.action === "pause") {
        Audio.pause();
        playPauseBtn.textContent = "Play";
        localStorage.setItem("AudioPlaying", "false");
    }
});


window.addEventListener("beforeunload", () => {
    if (Audio) {
        localStorage.setItem("AudioTime", Audio.currentTime);
    }
});


/***********************
 THUMBNAIL HOVER BACKGROUND
***********************/
document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".link");
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        projects.forEach(project => {

            project.addEventListener("mouseenter", function () {
                let img = this.querySelector("img");
                if (!img) return;

                let bgImage = img.src.replace("_thumb", "_bg");
                document.body.style.backgroundImage = `url(${bgImage})`;

                projects.forEach(p => {
                    if (p !== this) {
                        p.style.pointerEvents = "none";
                    }
                });
            });

            project.addEventListener("mouseleave", function () {
                document.body.style.backgroundImage = "none";

                projects.forEach(p => {
                    p.style.pointerEvents = "auto";
                });
            });
        });
    }

    // Hide hover image on link click
    projects.forEach(p => {
        p.addEventListener("click", function () {
            const img = this.querySelector(".hover-img");
            if (img) {
                img.style.display = "none";
                setTimeout(() => img.style.display = "", 2000);
            }
            document.body.style.backgroundImage = "none";
        });
    });
});


/***********************
 FILTER SYSTEM (MULTI-TOGGLE)
***********************/
document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".link");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const pageTitle = document.getElementById("page-title");

    let activeCategories = [];

    function updateProjects() {
        if (activeCategories.length === 0) {
            projects.forEach(p => p.style.display = "none");
            pageTitle.textContent = ":";
            return;
        }

        projects.forEach(project => {
            const categories = project.dataset.category.split(" ");
            const match = activeCategories.some(cat => categories.includes(cat));
            project.style.display = match ? "block" : "none";
        });

        pageTitle.textContent = ": " + activeCategories.join(", ");
    }

    projects.forEach(p => p.style.display = "none");

    // Reset visual state only when user scrolls away from hero
    window.addEventListener("scroll", function () {
        if (window.scrollY > window.innerHeight * 0.5) {
            filterButtons.forEach(btn => btn.classList.remove("active"));
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const category = this.dataset.category;
            const isScrolledDown = window.scrollY > window.innerHeight * 0.5;

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // If coming from scrolled position, reset categories first
            if (isScrolledDown) {
                activeCategories = [];
            }

            // Normal toggle for both cases
            if (activeCategories.includes(category)) {
                activeCategories = activeCategories.filter(c => c !== category);
                this.classList.remove("active");
            } else {
                activeCategories.push(category);
                this.classList.add("active");
            }

            setTimeout(() => updateProjects(), 50);
        });
    });

    updateProjects();
});

/***********************
 POSTCARD FORM
***********************/
document.addEventListener("DOMContentLoaded", function () {
    const sendBtn = document.getElementById("postcard-send");
    const successMsg = document.getElementById("postcard-success");

    // Load EmailJS
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => emailjs.init("WbmEhwpELyRYcyeJi"); // replace with your public key
    document.head.appendChild(script);

    if (!sendBtn) return;

    sendBtn.addEventListener("click", async function () {
        const name = document.querySelector(".postcard-form-overlay [name='name']").value.trim();
        const email = document.querySelector(".postcard-form-overlay [name='email']").value.trim();
        const message = document.querySelector(".postcard-form-overlay [name='message']").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Get the currently visible postcard slide image URL
        const activeSlide = document.querySelector("[data-carousel='carousel-p'] .slide[style*='block']");
        const postcardURL = activeSlide ? activeSlide.querySelector("img").src : "unknown";

        const response = await emailjs.send("service_713xcj1", "template_n85bj1k", {
            name,
            email,
            message,
            postcard: postcardURL
        });

        if (response.status === 200) {
            sendBtn.style.display = "none";
            successMsg.style.display = "block";
        } else {
            alert("Something went wrong. Please try again.");
        }
    });
});