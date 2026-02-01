// Immersive Gallery Logic

// Image Database (Restricted to Ilustrates folder)
const artImages = [
    './Ilustrates/aaaa.jpg',
    './Ilustrates/aaaaa.jpg',
    './Ilustrates/aaaaaa.jpg',
    './Ilustrates/aaaaaaa.jpg',
    './Ilustrates/aaaaaaaa.jpg',
    './Ilustrates/aaaaaaaaa.jpg',
    './Ilustrates/b.jpg',
    './Ilustrates/bb.jpg',
    './Ilustrates/bbb.jpg',
    './Ilustrates/bbbb.jpg',
    './Ilustrates/bbbbb.jpg',
    './Ilustrates/bbbbbbb.jpg',
    './Ilustrates/bbbbbbbb.jpg',
    './Ilustrates/bbbbbbbbbb.jpg',
    './Ilustrates/c.jpg',
    './Ilustrates/cc.jpg',
    './Ilustrates/ccc.jpg',
    './Ilustrates/cccc.jpg',
    './Ilustrates/ccccc.jpg',
    './Ilustrates/dibu1.jpg',
    './Ilustrates/dibu10.jpg',
    './Ilustrates/dibu11.jpg',
    './Ilustrates/dibu12.jpg',
    './Ilustrates/dibu13.jpg',
    './Ilustrates/dibu14.jpg',
    './Ilustrates/dibu15.jpg',
    './Ilustrates/dibu16.jpg',
    './Ilustrates/dibu17.jpg',
    './Ilustrates/dibu18.jpg',
    './Ilustrates/dibu19.jpg',
    './Ilustrates/dibu2.jpg',
    './Ilustrates/dibu3.jpg',
    './Ilustrates/dibu4.jpg',
    './Ilustrates/dibu5.jpg',
    './Ilustrates/dibu6.jpg',
    './Ilustrates/dibu7.jpg',
    './Ilustrates/dibu8.jpg',
    './Ilustrates/dibu9.jpg'
];

const canvas = document.getElementById('art-canvas');
const maxActiveImages = 6;
let activeImages = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnImage() {
    if (activeImages >= maxActiveImages) return;
    if (!canvas) return; // Guard clause in case script runs on page without canvas
    if (artImages.length === 0) return;

    const src = artImages[getRandomInt(0, artImages.length - 1)];
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('gallery-image');

    // Random Position 
    img.style.left = getRandomInt(10, 70) + 'vw';
    img.style.top = getRandomInt(10, 60) + 'vh';

    // Random Size
    const scale = getRandomInt(7, 13) / 10;
    img.style.transform = `scale(${scale})`;

    // Random Z-Index
    img.style.zIndex = getRandomInt(1, 20);

    canvas.appendChild(img);

    // Fade In
    setTimeout(() => {
        img.style.opacity = 1;
        activeImages++;
    }, 100);

    // Fade Out & Cleanup
    const lifeTime = getRandomInt(3000, 7000);
    setTimeout(() => {
        img.style.opacity = 0;
        setTimeout(() => {
            if (img.parentNode) img.parentNode.removeChild(img);
            activeImages--;
        }, 2000);
    }, lifeTime);
}

// Start Cycle
setInterval(spawnImage, 1200);

// Initial Burst
spawnImage();
spawnImage();
spawnImage();
