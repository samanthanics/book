const book = document.querySelector("#book");
const musicToggle = document.querySelector("#music-toggle");
const bgMusic = document.querySelector("#bg-music");

// Dynamic page selection
const papers = document.querySelectorAll(".page");
let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

// Music Toggle
musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "⏸ Pause Music";
    } else {
        bgMusic.pause();
        musicToggle.textContent = "🎵 Play Music";
    }
});

// Business Logic
function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        const currentPaper = document.querySelector(`#p${currentLocation}`);
        
        if (currentLocation === 1) {
            openBook();
            // Auto-play music on first interaction
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.textContent = "⏸ Pause Music";
                }).catch(e => console.log("Autoplay prevented"));
            }
        }
        
        if (currentLocation === numOfPapers) {
            closeBook(false);
        }

        currentPaper.classList.add("flipped");
        currentPaper.style.zIndex = currentLocation;
        
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        currentLocation--;
        const currentPaper = document.querySelector(`#p${currentLocation}`);

        if (currentLocation === 1) {
            closeBook(true);
        }
        
        if (currentLocation === numOfPapers) {
            openBook();
        }

        currentPaper.classList.remove("flipped");
        currentPaper.style.zIndex = numOfPapers - currentLocation + 1;
    }
}

// Heart Generation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 300);

// Initialize interaction
function init() {
    papers.forEach((paper, index) => {
        // Initial z-index setup
        paper.style.zIndex = numOfPapers - index;
        
        // Front side click handler
        const front = paper.querySelector('.front');
        if (front) {
            front.addEventListener('click', (e) => {
                // Only allow clicking the "active" top page to go forward
                if (index + 1 === currentLocation) {
                    goNextPage();
                }
            });
        }

        // Back side click handler
        const back = paper.querySelector('.back');
        if (back) {
            back.addEventListener('click', (e) => {
                // Only allow clicking the back of the most recently flipped page to go backward
                if (index + 1 === currentLocation - 1) {
                    goPrevPage();
                }
            });
        }
    });
}

init();
