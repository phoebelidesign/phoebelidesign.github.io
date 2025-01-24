window.onload = function() {
    const projects = document.querySelectorAll('.project img');

    projects.forEach(image => {
        // Create an image object to get natural width/height
        const img = new Image();
        img.src = image.src;

        img.onload = function() {
            // Randomize position for each project
            const project = image.closest('.project');
            const randomTop = Math.floor(Math.random() * 80) + 10;  // Random top position (10% to 90% of viewport height)
            const randomLeft = Math.floor(Math.random() * 80) + 10; // Random left position (10% to 90% of viewport width)

            project.style.top = `${randomTop}vh`;   // Position project randomly within the viewport height
            project.style.left = `${randomLeft}vw`; // Position project randomly within the viewport width

            // Check the aspect ratio of the image
            if (img.width > img.height) {
                // Landscape image: Set the height to fixed value (e.g., 150px)
                image.style.height = '150px';
                image.style.width = 'auto';  // Width adjusts automatically
            } else {
                // Portrait image: Set the width to fixed value (e.g., 150px)
                image.style.width = '150px';
                image.style.height = 'auto';  // Height adjusts automatically
            }
        };
    });
};