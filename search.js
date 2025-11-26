
function hideDynamics() {
document.getElementById("advanced_search").style.display = "none";
};


function findMatches() {
    
    let tag = document.getElementById("tags_input").value;
    let year = document.getElementById("years_input").value;
    let series = document.getElementById("series_input").value;
    let condition = document.getElementById("conditions_input").value;
    let query = document.getElementById("search_bar").value;
    let divs = document.getElementsByClassName("searchable");
    
    for (var i = 0; i < divs.length; i++) {
        let div = divs[i];
        let data = div.getAttribute("data-index").toLowerCase();
        if (data.includes(query.toLowerCase()) && data.includes('tag:' + tag.toLowerCase()) && data.includes('year:' + year) && data.includes('condition:' + condition.toLowerCase()) && data.includes('series:' + series.toLowerCase())) {
             div.classList.add("visible");
            div.style.display = "block";
        } else {
            div.classList.remove("visible");
            div.style.display = 'none';
        }; // if else block ends
    }; // for loop ends
    updateCount(document.getElementsByClassName("visible").length);
    //restoreOptions();
    parseDatalists();
}; // finaMatches function ends

    
function showSearchTools() {
    let tools_element = document.getElementById("advanced_search");
    setTimeout(() => {
    tools_element.style.zIndex = 8;
    tools_element.style.position = "fixed";
    tools_element.style.display = "block";
    }, 50);
};


function parseDatalists() {
    
    //restoreOptions();
    
    let visibleDivs = document.getElementsByClassName("visible");
    let dataIndexes = "";
    let yearMatches = [];
    let tagMatches = [];
    let conditionMatches = [];
    let seriesMatches = [];
    
    if (visibleDivs.length > 0) {
        // make a list of data-index values and check every option against it
        for (var d = 0; d < visibleDivs.length; d++) {
            dataIndexes += visibleDivs[d].getAttribute("data-index") + '\n';
        }; // for loop ends
        
        // make a new list of options and wrap it in HTML
        // replace innerHTML with new HTML
        //console.log("parseDatalists sees", visibleDivs.length, "visible divs");
        
        //console.log(yearOptionsList);
        //for (var i = 0; i < dataIndexes.length; i++) {
            //console.log(visibleDivs[i].value);
        //console.log(yearOptionsList);
        
        // iterating over years
        for (var c = 0; c < yearOptionsList.length; c++) {
            if (yearOptionsList[c].value == null | yearOptionsList[c].value == "") {continue;};
            if (dataIndexes.includes("year:" + yearOptionsList[c].value)) {
                yearMatches.push(yearOptionsList[c].value);
                }; // if else ends
        }; // for loop ends
        
        // iterating over tags
        for (var c = 0; c < tagOptionsList.length; c++) {
            if (tagOptionsList[c].value == null | tagOptionsList[c].value == "") {continue;};
            if (dataIndexes.includes("tag:" + tagOptionsList[c].value.toLowerCase())) {
                tagMatches.push(tagOptionsList[c].value);
                }; // if else ends
        }; // for loop ends
        
        // iterating over series
        for (var c = 0; c < seriesOptionsList.length; c++) {
            
            if (seriesOptionsList[c].value == null | seriesOptionsList[c].value == "") {
                continue;
            };
            
            if (dataIndexes.includes("series:" + seriesOptionsList[c].value.toLowerCase())) {
                seriesMatches.push(seriesOptionsList[c].value);
                }; // if else ends
        }; // for loop ends
        
        let newYearOptions = "";
        for (o = 0; o < yearMatches.length; o++) {
            newYearOptions += "<option value='" + yearMatches[o] + "' />\n";
        };
        document.getElementById("years").innerHTML = newYearOptions;
        
        let newTagOptions = "";
        for (o = 0; o < tagMatches.length; o++) {
            newTagOptions += "<option value='" + tagMatches[o] + "' />\n";
        };
        document.getElementById("tags").innerHTML = newTagOptions;
        
        let newSeriesOptions = "";
        for (o = 0; o < seriesMatches.length; o++) {
            newSeriesOptions += "<option value='" + seriesMatches[o] + "' />\n";
        };
        document.getElementById("series").innerHTML = newSeriesOptions;
        
    } else {
        //restoreOptions();
        //console.log("no visible divs");
        void(0);
    }; // if else block ends

}; // parseDatalists function ends


function restoreOptions() {
    document.getElementById("series").innerHTML = seriesOptions;
    document.getElementById("years").innerHTML = yearOptions;
    document.getElementById("tags").innerHTML = tagOptions;
    document.getElementById("conditions").innerHTML = conditionOptions;
    
    //console.log("restored options");
}; // restoreOptions function ends


function clearOptions() {
    // manipulating innerHTML
    document.getElementById("series").innerHTML = "";
    document.getElementById("years").innerHTML = "";
    document.getElementById("tags").innerHTML = "";
    document.getElementById("conditions").innerHTML = "";
}; // clearOptions function ends

function updateCount(count = 0) {
    // outputs count in #counter
       if (count === 0) {
        document.getElementById("counter").setAttribute("value", countResults());
        } else {
            document.getElementById("counter").setAttribute("value", count);
        };
    };
