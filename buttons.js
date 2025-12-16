const leftButton = document.getElementById("left_button");
const rightButton = document.getElementById("right_button");
const modeButton = document.getElementById("mode_button");
const viewButton = document.getElementById("view_button");
const detailsButton = document.getElementById("details_button");
const clearButton = document.getElementById("clear_button");
const menuCloseButton = document.getElementById("menu_close_button");
const helpButton = document.getElementById("help_button");

leftButton.addEventListener("click", toggleMenu);
rightButton.addEventListener("click", toggleExtraControls);
modeButton.addEventListener("click", toggleDarkMode);
viewButton.addEventListener("click", toggleView);
detailsButton.addEventListener("click", toggleDetails);
menuCloseButton.addEventListener("click", closeMenu);
clearButton.addEventListener("click", clearSearch);
