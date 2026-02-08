/* =========================
   SMOOTH SCROLLING
   Makes the page slide nicely when clicking links
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* =========================
   HOME PAGE HERO SLIDER
   Cycles through the background images
========================= */
const slides = document.querySelectorAll(".hero img");
let index = 0;

function rotateSlides() {
    if (slides.length > 0) {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }
}

// Rotate every 4.5 seconds
if (slides.length > 0) {
    setInterval(rotateSlides, 4500);
}