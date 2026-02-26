const image = document.getElementById('pupmap');
const map = document.querySelector('map');
const areas = map.querySelectorAll('area');

const originalWidth = 965 // Original image width in pixels
const originalHeight = 580; // Original image height in pixels

function scaleAreas() {
    const currentWidth = image.offsetWidth;
    const currentHeight = image.offsetHeight;

    const widthRatio = currentWidth / originalWidth;
    const heightRatio = currentHeight / originalHeight;

    areas.forEach(area => {
        const originalCoords = area.dataset.originalCoords.split(',').map(Number);
        const scaledCoords = originalCoords.map((coord, index) =>
            index % 2 === 0
                ? Math.round(coord * widthRatio) // Scale x-coordinates
                : Math.round(coord * heightRatio) // Scale y-coordinates
        );

        area.coords = scaledCoords.join(',');
    });
}

// Store the original coordinates as a dataset
areas.forEach(area => {
    area.dataset.originalCoords = area.coords;
});

// Adjust areas when the image size changes
window.addEventListener('resize', scaleAreas);
window.addEventListener('load', scaleAreas);