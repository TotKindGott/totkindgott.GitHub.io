    function makeCollage() {
        let collage = document.getElementById("collage");
        let matches = document.getElementsByClassName("searchable");
        let photos = "";
        
        for (var i = 0; i < matches.length; i++) {
            
            try {
                let match = matches[i].getElementsByClassName("photo")[0];
                let path = encodeURI(match.getAttribute("src"));
                //let path = encodeURI(match.getAttribute("src"));
                let photoid = matches[i].getAttribute("id");
//                if (path === "") {
//                    photos += "<img class=\"photo\" src=\"Images/NoPhoto.JPG\" class=\"grayed\" onclick=\"openPhoto(" + photoID + ") />";
//                } else {
                photos += "<img src=\"" + path + "\" onclick=\"openPhoto('" + photoid + "')\" />";
//                };
            } catch {
                photos += "<img class=\"photo\" src=\"Images/NoPhoto.JPG\" class=\"grayed\" onclick=\"openPhoto('" + matches[i].getAttribute("id") + "')\" />";
            }; // try catch block ends
        } // for loop ends
        collage.innerHTML = photos;
        verticalSwipeActions("item_list", showCollage, hideCollage, 100); 
        console.log(matches.length)
    };

    function addIDs() {
        let divs = document.getElementsByClassName("searchable");
        for (var i = 0; i < divs.length; i++) {
            divs[i].setAttribute("id", "item" + i);
        };
    };
    
    
function verticalSwipeActions(elementID, swipeUpAction, swipeDownAction, swipeThreshold=50) {
    const swipeElement = document.getElementById(elementID);
    let startY;
    let endY;
    const threshold = swipeThreshold; // Minimum distance in pixels for a swipe to be registered
    swipeElement.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }); // addEventListener ends
    swipeElement.addEventListener('touchmove', (e) => {
        // Optional: Prevent default scrolling behavior if the user is interacting with this element
        // e.preventDefault(); 
        endY = e.touches[0].clientY;
    }); // addEventListener ends
    
    const isPageScrolling = window.scrollY !== 0 || document.documentElement.scrollTop !== 0;
    //const isPageScrolling = swipeElement.scrollY !== 0 || swipeElement.scrollTop !== 0;
    swipeElement.addEventListener('touchend', () => {
        if (startY && endY && !isPageScrolling) {
            const deltaY = startY - endY; // Positive value indicates an upward swipe
            if (deltaY > threshold) {
                // Swipe up detected
                swipeUpAction();
                // Optional: Remove the element from the DOM or hide it completely after the animation
                // setTimeout(() => {
                //     fixedElement.style.display = 'none';
                // }, 300); 
            } else if (deltaY < 0 - threshold * 2 && swipeElement.scrollTop !== 0) {
                swipeDownAction();
            } else if (swipeElement.scrollTop == 0) {
                swipeDownAction();
            } else {
                // Swipe was not significant enough, ignore
                void(0);
            }; // if else block ends
        }; // if block ends
        // Reset touch coordinates
        startY = null;
        endY = null;
    });
};

    function showCollage() {
        document.getElementById("item_list").classList.add("shown");
    };

    function hideCollage() {
        document.getElementById("item_list").classList.remove("shown");
    };
    
    function parseVisible() {

        let visible = collectables.getElementsByClassName("searchable");
        let icons = "";
        let cards = "";
        
        for (var i = 0; i < visible.length; i++) {
            
            var image_path = "";
            var name = "";
            var id = "";
            var wrapper = "";
            var details = "";
            
            name =  visible[i].getElementsByTagName("h1")[0].innerText;
            
            try {
                image_path = "https://totkindgott.github.io/" +  visible[i].getElementsByClassName("photo")[0].getAttribute("src");
            } catch {
                image_path = "Images/NoPhoto.JPG\" class=\"grayed";
            };
            try {
                wrapper = visible[i].getElementsByClassName("wrapper")[0].innerHTML;
                //console.log(name, path);
            } catch {
                wrapper = "<img class=\"photo\" src=\"Images/NoPhoto.JPG\" class=\"grayed\" />";
                //console.log(name, path);
            }; // try catch block ends
            
            try {
                details = visible[i].getElementsByTagName("table")[0].innerHTML;
            } catch {
                details = "";
            }

            id = "item" + i;
            
            //icons += '<img src="' + image_path + '" onclick="location.href=\'#' + id + '\'" />\n';
                icons += '<img src="' + image_path + '" onclick="openPhoto(\'' + id + '\');" />\n';
            //cards += '<div class="item_card" id="' + id + '">\n<div class="item_name">' + name + '</div>\n<div class="item_photo">\n<img src="' + image_path + '" />\n</div>\n</div>';
            cards += '<div class="item_card" id="' + id + '">\n<div class="item_name" onclick="toggleDetails(' + id + ')">' + name + '</div>\n<div class="item_photo">' + wrapper + '</div>\n<div class=\"details\"><table>' + details + '</table></div>\n</div>';
            
        }; // for loop ends

        //sidebar.innerHTML = photos;
        //carousel.innerHTML = "";
        carousel.innerHTML = '<div id="card_view">' + cards + '</div>\n<div id="item_list">\n' + icons + '</div>';
        setActivationEvent();
    };
    
    function setActivationEvent() {
        
    try {
        document.getElementById("item_list").querySelectorAll("img").forEach(each => {
            each.addEventListener("click", activate);
        });
    } catch {
        void(0);
    };
    
    function activate() {
        deactivate();
        this.classList.add('color');
    };
    
    function deactivate() {
        try {
            document.getElementById("item_list").querySelectorAll("img").forEach(each => {
            each.classList.remove("color");
            }); // forEach loop ends
        } catch {
            void(0);
        }; // try catch block ends
    } // deactivate() function ends
    };
    
    function toggleCollage() {
        //document.getElementById("collage_wrapper").classList.toggle("shown");
        try {
        document.getElementById("item_list").classList.toggle("shown");
        hyperlinks();
    } catch (TypeError) {
        void(0);
    };
    };    
    
    function openPhoto(id) {
        if (document.getElementById("item_list").className == "shown") {
            toggleCollage();
        };
        window.location.href = "#item_" + id;
        window.location.href = "#thumb_" + id;
    };
    
    function addDetailsToggle() {
        let itemCards = document.getElementsByClassName("item_card");
            
        //itemCards.forEach(card => {
        for (var i = 0; i < itemCards.length; i++) {
            itemCards[i].addEventListener("click", () => toggleDetails(itemCards[i].id));
            
                console.log(`${i}: ID ${itemCards[i].id}`);
            
        };
        console.log(`IDs added to ${itemCards.length} elements`);
    };
    
    function toggleDetails(id) {
//        var card = document.getElementById(cardID);
//        var el = card.getElementsByClassName("details")[0];
    var el = document.getElementById("details_" + id);

        if (el.style.display == "block") {
            el.style.display = "none";
        } else {
            el.style.display = "block";
        };
    };
    
    function hyperlinks() {
        try {
            setTimeout( () => {
            el = document.getElementsByClassName("color")[0];
        }, 250);
        console.log(el.id);
        } catch (error) {
           console.log(error);
        };
    };
    