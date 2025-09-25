let slideIndex = 1;

function openModal() {
    document.getElementById("myModal").style.display = "block";
    showSlides(slideIndex);
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});