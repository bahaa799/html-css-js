document.addEventListener("DOMContentLoaded", function () {
    function toggleSearchBox() {
        const searchBox = document.getElementById("searchBox");
        searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
    }

    function handleSearch(event) {
        event.preventDefault(); 
        const searchBox = document.getElementById('searchBox');
        searchBox.style.display = 'none'; 

        console.log('Search term:', event.target[0].value);
    }

    document.querySelector('.search-icon').addEventListener('click', toggleSearchBox);
    document.querySelector('.search-box form').addEventListener('submit', handleSearch);

    let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(autoSlide, 3000);





    
    const infoBox = document.createElement('div'); 
    infoBox.className = 'info-box';
    document.body.appendChild(infoBox);

    infoBox.innerHTML = `
        <div class="info-content">
            <p class="info-description"></p>
            <video class="info-trailer" controls muted autoplay></video>
        </div>
    `;

    const descriptionElem = infoBox.querySelector('.info-description');
    const trailerElem = infoBox.querySelector('.info-trailer');

    document.querySelectorAll('.movie-item').forEach(item => {
        let hoverTimer, trailerTimer;

        item.addEventListener('mouseenter', () => {
            const description = item.getAttribute('data-description') || "Description unavailable";
            const trailerSrc = item.getAttribute('data-trailer') || "";

            const rect = item.getBoundingClientRect();
            infoBox.style.top = `${rect.top + window.scrollY - infoBox.offsetHeight - 10}px`;
            infoBox.style.left = `${rect.x - infoBox.offsetWidth -150}px`;
            infoBox.style.display = 'none'; 

            hoverTimer = setTimeout(() => {
                descriptionElem.textContent = description;
                infoBox.style.display = 'block'; 
            }, 2000);

            trailerTimer = setTimeout(() => {
                trailerElem.src = trailerSrc;
                trailerElem.style.display = trailerSrc ? 'block' : 'none';
            }, 4000);
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            clearTimeout(trailerTimer);

            infoBox.style.display = 'none';
            descriptionElem.textContent = "";
            trailerElem.src = "";
            trailerElem.style.display = 'none';
        });
    });
});


