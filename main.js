function showSceneryBox(imgSource, heading, description) {
    let d = document.getElementById("display");
    let e = document.getElementById("body");
    e.style.overflow = "hidden";
    document.addEventListener('mousemove', displayFollowCamera);
    d.style.left = event.clientX + 5 + "px";
    d.style.top = event.clientY + 5 + "px";
    d.innerHTML = "<div id='wrapper' class='box'><img class='imgscene' src='" + imgSource + "'>" +
        "<h2>" + heading + "</h2>" +
        "<p>" + description + "</p></div>";
    d.style.position = "absolute";
    d.style.visibility = "visible";
}

function displayFollowCamera(event) {
    let d = document.getElementById("display");
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    let boxX = event.clientX + 5;
    let boxY = event.clientY + 5;

    let boxRect = d.getBoundingClientRect();

    if (boxX + boxRect.width > viewportWidth) {
        boxX = viewportWidth - boxRect.width - 5;
    }

    if (boxY + boxRect.height > viewportHeight) {
        boxY = viewportHeight - boxRect.height - 5;
    }

    d.style.left = boxX + "px";
    d.style.top = boxY + "px";
}

function removeSceneryBox() {
    let d = document.getElementById("display");
    let b = document.getElementById("body");
    d.removeAttribute('style');
    b.removeAttribute('style');
    document.removeEventListener('mousemove', displayFollowCamera);
    d.innerHTML = "";
}


function highlightArea(areaName) {
    const collectionOfAreas = document.getElementsByTagName('area');
    const image = document.getElementById('pupmap');
    const areas = Array.from(collectionOfAreas);
    const area = areas.find(a => a.alt === areaName);
    //area.classList.add('highlighted');

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');


    canvas.width = image.offsetWidth;
    canvas.height = image.offsetHeight;
    const rect = image.getBoundingClientRect();
    canvas.style.top = `${rect.top - 183}px`;
    canvas.style.left = `${rect.left}px`;

    context.clearRect(0, 0, canvas.width, canvas.height);
    const coords = area.coords.split(',').map(Number);
    const shape = area.getAttribute('shape');

    console.log(area)
    console.log(area.coords)

    context.fillStyle = 'rgba(255, 255, 0, 0.5)';

    image.classList.toggle('grayscale');

    if (shape === 'rect') {
        // Rectangle: coords = [x1, y1, x2, y2]
        const [x1, y1, x2, y2] = coords;
        context.fillRect(x1, y1, x2 - x1, y2 - y1);
    } else if (shape === 'circle') {
        // Circle: coords = [x, y, radius]
        const [x, y, r] = coords;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    } else if (shape === 'poly') {
        // Polygon: coords = [x1, y1, x2, y2, ..., xn, yn]
        context.beginPath();
        context.moveTo(coords[0], coords[1]);
        for (let i = 2; i < coords.length; i += 2) {
            context.lineTo(coords[i], coords[i + 1]);
        }
        context.closePath();
        context.fill();
    }

    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        image.classList.toggle('grayscale');
    }, 1500);

}