
        function showMoreMovies() {
            const hiddenMovies = document.querySelectorAll('.hidden-movie');
            hiddenMovies.forEach(movie => {
                movie.style.display = 'block';
            });
            document.querySelector('button').style.display = 'none';
        }
   
        document.addEventListener("DOMContentLoaded", function () {
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
                    const boxHeight = infoBox.offsetHeight;
                    const boxWidth = infoBox.offsetWidth;
        
                    infoBox.style.top = `${Math.max(0, rect.top + window.scrollY - boxHeight - 10)}px`; 
                    infoBox.style.left = `${Math.min(window.innerWidth - boxWidth, rect.right - boxWidth - 100)}px`; 
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
        