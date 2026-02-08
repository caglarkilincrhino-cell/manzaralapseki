// Slideshow State
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const progressFill = document.getElementById('progressFill');
const currentSlideElement = document.getElementById('currentSlide');
const infoPanel = document.getElementById('infoPanel');

// Touch handling variables
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Loading screen
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
let loadedImages = 0;
let totalImages = 0;

// Initialize
function init() {
    fixViewportHeight();
    preloadImagesWithProgress();
    addEventListeners();
}

// Pause all videos when changing slides
// Pause all videos when changing slides
function pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });
}

// Fix viewport height for mobile browsers
function fixViewportHeight() {
    // Function to update viewport height
    const updateVH = () => {
        // Use window.innerHeight which accounts for visible viewport
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial set
    updateVH();

    // Update on resize
    window.addEventListener('resize', updateVH);

    // Safari-specific: Update on scroll (minimal UI changes)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateVH, 100);
    });

    // Update on orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(updateVH, 100);
    });
}

// Update Slideshow
function updateSlideshow() {
    // Pause all videos when changing slides
    pauseAllVideos();

    // Auto play current video
    const activeSlide = slides[currentSlide];
    const video = activeSlide.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Auto-play prevented:", e));
    }

    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev-slide', 'next-slide');

        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('prev-slide');
        } else {
            slide.classList.add('next-slide');
        }
    });

    // Update counter
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide + 1;
    }

    // Update progress bar
    if (progressFill) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Navigate to specific slide
function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        updateSlideshow();
    }
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlideshow();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlideshow();
}

// Toggle Info Panel
function toggleInfo() {
    infoPanel.classList.toggle('active');
}

// Toggle Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Handle Touch Gestures
function handleTouchStart(e) {
    // Only handle single-finger touches (not pinch/zoom)
    if (e.touches.length === 1) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    } else {
        // Reset values for multi-touch (zoom) gestures
        touchStartX = 0;
        touchStartY = 0;
    }
}

function handleTouchEnd(e) {
    // Only handle single-finger touches (not pinch/zoom)
    if (e.changedTouches.length === 1 && touchStartX !== 0) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }
}

function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Minimum swipe distance threshold (50px)
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe right - previous slide
                prevSlide();
            } else {
                // Swipe left - next slide
                nextSlide();
            }
        }
    }

    // Reset values after handling
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
}

// Keyboard Navigation
function handleKeyboard(e) {
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            prevSlide();
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            nextSlide();
            e.preventDefault();
            break;
        case 'Home':
            goToSlide(0);
            e.preventDefault();
            break;
        case 'End':
            goToSlide(totalSlides - 1);
            e.preventDefault();
            break;
        case 'Escape':
            if (infoPanel.classList.contains('active')) {
                toggleInfo();
            }
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'i':
        case 'I':
            toggleInfo();
            break;
    }
}

// Add Event Listeners
function addEventListeners() {
    // Only add listener for infoBtn if it exists
    const infoBtn = document.getElementById('infoBtn');
    if (infoBtn) {
        infoBtn.addEventListener('click', toggleInfo);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Touch gestures
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Close info panel when clicking outside
    infoPanel.addEventListener('click', (e) => {
        if (e.target === infoPanel) {
            toggleInfo();
        }
    });

    // Prevent context menu on long press (mobile)
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.slideshow-container')) {
            e.preventDefault();
        }
    });

    // Handle screen orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            updateSlideshow();
        }, 100);
    });

    // Prevent accidental zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// Preload images with progress tracking
function preloadImagesWithProgress() {
    const images = [];

    // Collect all image sources
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img && img.src) {
            images.push(img.src);
        }
    });

    totalImages = images.length;

    if (totalImages === 0) {
        hideLoadingScreen();
        return;
    }

    // Preload each image
    images.forEach(src => {
        const img = new Image();

        img.onload = () => {
            loadedImages++;
            updateLoadingProgress();
        };

        img.onerror = () => {
            loadedImages++;
            updateLoadingProgress();
        };

        img.src = src;
    });
}

// Update loading progress bar
function updateLoadingProgress() {
    const progress = (loadedImages / totalImages) * 100;
    loadingProgress.style.width = progress + '%';

    // When all images loaded, hide loading screen
    if (loadedImages >= totalImages) {
        setTimeout(() => {
            hideLoadingScreen();
        }, 500); // Small delay for smooth transition
    }
}

// Hide loading screen
function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');

    // Show welcome popup after loading
    setTimeout(() => {
        const welcomePopup = document.getElementById('welcomePopup');
        if (welcomePopup) {
            welcomePopup.classList.add('show');
        }
    }, 500);

    updateSlideshow(); // Update slideshow after loading
}

// Close welcome popup
function closeWelcomePopup() {
    const welcomePopup = document.getElementById('welcomePopup');
    if (welcomePopup) {
        welcomePopup.classList.remove('show');
    }
}


// Auto-hide cursor on inactivity (desktop)
let cursorTimeout;
function hideCursor() {
    document.body.style.cursor = 'none';
    document.querySelectorAll('.nav-btn, .fullscreen-btn, .info-btn').forEach(btn => {
        btn.style.opacity = '0.3';
    });
}

function showCursor() {
    document.body.style.cursor = 'default';
    document.querySelectorAll('.nav-btn, .fullscreen-btn, .info-btn').forEach(btn => {
        btn.style.opacity = '1';
    });

    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(hideCursor, 3000);
}

// Mouse move handler
document.addEventListener('mousemove', showCursor);
document.addEventListener('mousedown', showCursor);

// Initialize on load
window.addEventListener('load', () => {
    init();
    preloadImages();
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app will still work
        });
    });
}
