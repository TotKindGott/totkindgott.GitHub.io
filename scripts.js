const collection_url = 'https://totkindgott.github.io/collection.html';
const search_url = 'https://totkindgott.github.io/search.html?search=';
    
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('autocorrect', 'off')
    input.setAttribute('autocapitalize', 'off')
    input.setAttribute('spellcheck', false)
});

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
   
    document.getElementById("menu_close_button").classList.remove("closed");
};

function closeMenu() {
    // closes main navigation menu
    document.getElementById("menu_close_button").classList.add("closed");
    document.getElementById("menu_list").classList.add("fade-out");
    document.getElementById("menu_list").classList.remove("fade-in");
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

function positionFooter() {
    if (countResults() == 0) {
        document.getElementById("page_footer").classList.add("fixed-position");
    } else {
        document.getElementById("page_footer").classList.remove("fixed-position");
    }
};

function countResults() {
    // gets a count of visible carDivs
    let result_count =  document.querySelectorAll(".visible").length;
    return result_count
};

function updateCount(count = 0) {
    // outputs count in #counter
       if (count === 0) {
        document.getElementById("counter").setAttribute("value", countResults());
        } else {
            document.getElementById("counter").setAttribute("value", count);
        };
    };

function hideDivsOnEmpty() {
    // if search is cleared hides every searchable visible div
    if (document.getElementById("search_bar").value == "") {
        cardivs = document.getElementsByClassName('searchable');
        for (let i = 0; i < cardivs.length; i++) {
            cardiv = cardivs[i];
            cardiv.style.display =  "none";
            cardiv.classList.remove('visible');
        };
        updateCount();
    };
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
    };
    updateCount();
};

function clearSearch() {
    document.getElementById("search_bar").setAttribute('value', '')
    searchModels();
};

function searchFor(search_query) {
    // searches through data-index attribute of every carDiv for specified query passed as argument
    //clearSearch()
    search_query = search_query.toLowerCase();
    document.getElementById('search_bar').setAttribute("value", search_query);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", search_query);
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
        };
    };
    updateCount();
};

function parseURL() {
    // search by parsing url parameter
    // add ?search= + query at url end
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('search') == true) {
        var searchQuery = urlParams.get('search');
        document.getElementById('search_bar').setAttribute("value", searchQuery);
        searchModels();
        //searchFor(searchQuery);
    };
    if (urlParams.has('mode') == true) {
        var mode = urlParams.get('mode');
        if (mode == 'dark') {
            document.body.classList.add('dark-mode');
        };
    };
};

function getCollection() {
    // parses collection.html and loads it into a div id=frame
    fetch(collection_url)
        .then(response =>  response.text())
        .then(htmlContent => {
                var parser = new DOMParser();
                var full_html = parser.parseFromString(htmlContent, "text/html");
                var models_html = full_html.getElementById("results");
                var result_html = models_html.innerHTML;
                document.getElementById("frame").innerHTML = result_html;
            })
        .catch(error => console.error('Error fetching file:', error));
};

function loadingSequence() {
    parseURL();
    positionFooter();
};

function setSearchRedirect() {
    // passes search text as URL arguments to search.html
    document.getElementById("search_bar").addEventListener("change", function event() {
        let search_query = document.getElementById("search_bar").value;
        let parsing_url = search_url + encodeURI(search_query.toLowerCase());
        window.open(parsing_url, '_self');
        });
};

async function parseAndSearch() {
    await getCollection();
    await parseURL();
    setTimeout(() => {
        searchModels();
        hideDivsOnEmpty();
        positionFooter();
    }, 500);
};

function scrollShow() {
    slides = document.getElementsByClassName('gallery__img');
    let i = 1;
    function nextSlide() {
        if (i < slides.length) {
            i++;
        } else {
            i = 1;
        };
        let slideID = '#image-' + i.toString();
        document.location.href = slideID;
        //document.getElementById('img-link-' + i).classList.add("hovered");
        //document.getElementById(slideID).classList.add("fade-in");
        
    };
    setInterval(nextSlide, 2000);
}