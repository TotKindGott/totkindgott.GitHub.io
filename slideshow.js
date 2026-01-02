let intervalID;
let timeoutID;
let playState;
let slideIndex = 0;
let slideInterval = 3000;
let slideImages;

const slideshow = document.getElementById("slideshow");
const frame = document.getElementById("frame");
const sidebar = document.getElementById("sidebar");
const photoframe = document.getElementById("photoframe");
const pauseButton = document.getElementById("stop_button");
const slideShowControls = document.getElementById("slideshow_controls");
const speedSelector = document.getElementById("speed_selector");
const speedSlider = document.getElementById("speed_slider");
const radios = speedSelector.querySelectorAll("input");
const slider = speedSlider.querySelector("input");

function processSlides() {
    slideImages = new Array();
    slideshow.querySelectorAll("img").forEach(each => {
        each.addEventListener("click", () => {
            setSlide(each);
        });
        each.addEventListener("dblclick", () => {
            setIndex(each);
        });
        slideImages.push(each.getAttribute("src"));
    }); // forEach loop ends
};

photoframe.addEventListener("dblclick", toggleSlideShow);
pauseButton.addEventListener("click", toggleSlideShow);
pauseButton.addEventListener("dblclick", toggleSpeedControls);


function startSlideShow(interval = slideInterval, index = slideIndex) {
    timeoutID = setTimeout(fadeOut, interval - 250);
    processSlides();
    let i = index;
    let slides = sidebar.querySelectorAll("img");
    setSlide(slides[i]);
    function nextSlide() {
        timeoutID = setTimeout(fadeOut, interval - 250);
        if (i < slides.length - 1) {
            i++;
        } else {
            i = 0;
        }; // if else block ends
        slideIndex = i;
        let img = slides[i];
        setSlide(img);
    }; // function nextSlide ends
    
    intervalID = setInterval(nextSlide, interval);
    playState = "on";
    toggleStopButton();
}; // function scrollShow ends


function fadeOut() {
    photoframe.style.opacity = 0.20;
    photoframe.style.filter = "saturate(20%)";
    photoframe.style.filter = "sepia(20%)";
    photoframe.style.filter = "grayscale(50%)";
    slideshow.querySelectorAll("img").forEach(each => {
        each.classList.remove("color");
    }); // forEach block ends
}; // function fadeOut ends


function fadeIn() {
    photoframe.style.opacity = 1;
    photoframe.style.filter = "grayscale(0)";
}; // function fadeIn ends


function setSlide(img) {
    fadeIn();
    try {
        img.className = "color";
    } catch {
        void(0);
    };
    // add try catch clause TypeError
    photoframe.style.backgroundImage = "url('" +  img.getAttribute("src") + "')";
}; // function setSlide ends


function setIndex(img) {
    stopSlideShow();
    startSlideShow(interval = slideInterval, index = slideImages.indexOf(img.getAttribute("src")));
    toggleStopButton();
}; // function setIndex ends


function stopSlideShow() {
    playState = "off";
    window.clearInterval(intervalID);
    window.clearTimeout(timeoutID);
}; // function stopSlideShow ends


function toggleSlideShow() {
    if (playState == "on") {
        stopSlideShow();
    } else {
        startSlideShow(interval = slideInterval, index = slideIndex);
    }; // if else block ends
    toggleStopButton();
}; // functiob toggleSlideShow ends


function toggleStopButton() {
    let playPauseButton = document.getElementById("stop_button");
    if (playState == "on") {
        playPauseButton.classList.remove("stopped");
    } else {
        playPauseButton.className = "stopped";
    }; // if else block ends
}; // function toggleStopButton ends


let selectors = document.getElementById("horizontal_selector").querySelectorAll("span");

selectors.forEach(selector => {
    selector.addEventListener("click", function(event) {
        markSelected(event.currentTarget);
    });
});

function markSelected(button) {
    clearSelected();
    button.classList.add("active");
};


function clearSelected() {
    selectors.forEach(each => {
        each.classList.remove("active");
    });
};


function showSpeedControls() {
    slideShowControls.style.display = "block";
};

function hideSpeedControls() {
    slideShowControls.style.display = "none";
};

function toggleSpeedControls() {
    if (slideShowControls.style.display == 'block') {
        hideSpeedControls();
    } else {
        showSpeedControls();
    }; // if else block ends
};


function setSpeed(ms) {
    stopSlideShow();
    slideInterval = parseInt(ms);
    slider.value = slideInterval;
    document.getElementById("speed" + slideInterval.toString()).setAttribute("checked", true);
    startSlideShow();
};


radios.forEach(radio => {
    radio.addEventListener("click", function(event) {
            setSpeed(event.currentTarget.value);
    }); // function ends
}); // forEach loop ends

slider.addEventListener("change", function(event) {
        setSpeed(event.currentTarget.value);
}); // function ends
