function checkMode() {
    // checks if dark mode was previously selected
    if (localStorage.getItem("mode") == "dark") {
            var element = document.body;
            element.classList.toggle("dark-mode");
        }
};

function toggleDarkMode() {
    // switches between dark & light modes
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (localStorage.getItem("mode") !== "dark") {
        localStorage.setItem("mode", "dark");
    }
    else {
        localStorage.setItem("mode", "light");
    }
};

function openMenu() {
    // opens main navigation menu
    document.getElementById("menu").style.width = "100%";
    document.getElementById("menu_list").classList.remove("fade-out");
    document.getElementById("menu_list").classList.add("fade-in");
};

function closeMenu() {
    // closes main navigation menu
    document.getElementById("menu_list").classList.remove("fade-in");
    document.getElementById("menu_list").classList.add("fade-out");
    document.getElementById("menu").style.width = "0%";
};

function toggleMenu() {
    // opens menu if closed and closes if open
    if (document.getElementById("menu").style.width == "100%") {
        closeMenu();
    } else {
        openMenu();
    }
};

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('autocorrect', 'off')
    input.setAttribute('autocapitalize', 'off')
    input.setAttribute('spellcheck', false)
});

function countResults() {
    // gets a count of visible carDivs
    return document.querySelectorAll(".visible").length;
};

function updateCount() {
    // outputs count in #counter
        document.getElementById("counter").setAttribute("value", countResults());
};

function searchModels() {
    // searches through data-index attribute of every carDiv
    let search_query = document.getElementById('search_bar').value;
    search_query = search_query.toLowerCase();
    let carDivs = document.getElementsByClassName('searchable');
    for (i = 0; i < carDivs.length; i++) {
        if (
        carDivs[i].getAttribute("data-index").toLowerCase().includes(search_query)) {
                carDivs[i].style.display = "list-item";
            carDivs[i].classList.add("visible");
        }
        else {
            carDivs[i].style.display = "none";
            carDivs[i].classList.remove("visible");
        }
    }
    updateCount();
};

function clearSearch() {
    document.getElementById('search_bar').value = "";
    searchModels();
}

