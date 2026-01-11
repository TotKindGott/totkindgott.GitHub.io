const searchBar = document.getElementById("search_bar");
const leftMenuButton = document.getElementById("left_button");
const rightMenuButton = document.getElementById("right_button");
const extraControls = document.getElementById("dropdown");

const searchTools = document.getElementById("advanced_search");
    
const seriesOptions = document.getElementById("series").innerHTML;
const yearOptions = document.getElementById("years").innerHTML;
const conditionOptions = document.getElementById("conditions").innerHTML;
const tagOptions = document.getElementById("tags").innerHTML;
const sourceOptions = document.getElementById("sources").innerHTML;
const seriesOptionsList = document.getElementById("series").options;
const yearOptionsList = document.getElementById("years").options;
const tagOptionsList = document.getElementById("tags").options;
const conditionOptionsList = document.getElementById("conditions").options;
const sourceOptionsList = document.getElementById("sources").options;

const seriesSelectorInput = document.getElementById("series_input");
const yearSelectorInput = document.getElementById("years_input");
const tagSelectorInput = document.getElementById("tags_input");
const conditionSelectorInput = document.getElementById("conditions_input"); 
const sourceSelectorInput = document.getElementById("sources_input");

document.body.setAttribute("load", parseAndSearch);

yearSelectorInput.classList.add("half");
yearSelectorInput.classList.add("right");
tagSelectorInput.classList.add("half");
tagSelectorInput.classList.add("left");
seriesSelectorInput.classList.add("full");
sourceSelectorInput.classList.add("half");
sourceSelectorInput.classList.add("left");
conditionSelectorInput.classList.add("half");
conditionSelectorInput.classList.add("right");

seriesSelectorInput.addEventListener("change", findMatches);
seriesSelectorInput.addEventListener("keyup", findMatches);
sourceSelectorInput.addEventListener("change", findMatches);
sourceSelectorInput.addEventListener("keyup", findMatches);
tagSelectorInput.addEventListener("change", findMatches);
tagSelectorInput.addEventListener("keyup", findMatches);
conditionSelectorInput.addEventListener("change", findMatches);
conditionSelectorInput.addEventListener("keyup", findMatches);
yearSelectorInput.addEventListener("change", findMatches);
yearSelectorInput.addEventListener("keyup", findMatches);

searchBar.addEventListener("focus", showSearchTools);
searchBar.addEventListener("keyup", findMatches);

//const multiButton = document.getElementById("multibutton");

document.addEventListener('click', function(event) {
    if (!rightMenuButton.contains(event.target) & !searchTools.contains(event.target) & !searchBar.contains(event.target) & !extraControls.contains(event.target)) {
        hideDynamics();
    }; // if else block ends
}); // addEventListener ends

//document.addEventListener("dblclick", promptNewSearch);

//clearButton.addEventListener("click", clearOptions);
clearButton.addEventListener("click", restoreOptions);

//searchBar.addEventListener("blur", hideDynamics);

function hideDynamics() {
    searchTools.style.opacity = 0;
    searchTools.style.display = "none";
    extraControls.style.opacity = 0;
    extraControls.style.display = "none";
}; // hideDynamics function ends


function findMatches() {
    
    let tag = tagSelectorInput.value;
    let year = yearSelectorInput.value;
    let series = seriesSelectorInput.value;
    let condition = conditionSelectorInput.value;
    let source = sourceSelectorInput.value;
    let query = searchBar.value;
    let divs = document.getElementsByClassName("searchable");
    
    for (var i = 0; i < divs.length; i++) {
        let div = divs[i];
        let data = div.getAttribute("data-index").toLowerCase();
        if (data.includes(query.toLowerCase()) && data.includes('tag:' + tag.toLowerCase()) && data.includes('year:' + year) && data.includes('condition:' + condition.toLowerCase()) && data.includes('source:' + source.toLowerCase()) && data.includes('series:' + series.toLowerCase())) {
            div.classList.add("visible");
            if (div.nodeName == 'TR') {
                div.style.display = "table-row";
            } else {
                div.style.display = "block";
            };
        } else {
            div.classList.remove("visible");
            div.style.display = 'none';
        }; // if else block ends
    }; // for loop ends
    updateCount(document.getElementsByClassName("visible").length);
    //restoreOptions();
    parseDatalists();
    //positionFooter();

}; // finaMatches function ends

    
function showSearchTools() {
    searchTools.style.display = "block";
    searchTools.style.opacity = 1;
    showExtraControls();
};


function parseDatalists() {
    
    //restoreOptions();
    
    let visibleDivs = document.getElementsByClassName("visible");
    let dataIndexes = "";
    let yearMatches = [];
    let tagMatches = [];
    let conditionMatches = [];
    let seriesMatches = [];
    let sourceMatches = [];
    
    if (visibleDivs.length > 0) {
        // make a list of data-index values and check every option against it
        for (var d = 0; d < visibleDivs.length; d++) {
            dataIndexes += visibleDivs[d].getAttribute("data-index").toLowerCase() + '\n';
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
        
        // iterating over sources
        for (var c = 0; c < sourceOptionsList.length; c++) {
            if (sourceOptionsList[c].value == null | sourceOptionsList[c].value == "") {continue;};
            if (dataIndexes.includes("source:" + sourceOptionsList[c].value.toLowerCase())) {
                sourceMatches.push(sourceOptionsList[c].value);
                }; // if else ends
        }; // for loop ends
        
        // iterating over conditions
        for (var c = 0; c < conditionOptionsList.length; c++) {
            if (conditionOptionsList[c].value == null | conditionOptionsList[c].value == "") {continue;};
            if (dataIndexes.includes("condition:" + conditionOptionsList[c].value.toLowerCase())) {
                conditionMatches.push(conditionOptionsList[c].value);
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
        
        let newSourceOptions = "";
        for (o = 0; o < sourceMatches.length; o++) {
            newSourceOptions += "<option value='" + sourceMatches[o] + "' />\n";
        }; // for loop ends
        document.getElementById("sources").innerHTML = newSourceOptions;
        
        let newSeriesOptions = "";
        for (o = 0; o < seriesMatches.length; o++) {
            newSeriesOptions += "<option value='" + seriesMatches[o] + "' />\n";
        }; // for loop ends
        document.getElementById("series").innerHTML = newSeriesOptions;
        
        let newConditionOptions = "";
        for (o = 0; o < conditionMatches.length; o++) {
            newConditionOptions += "<option value='" + conditionMatches[o] + "' />\n";
        }; // for loop ends
        document.getElementById("conditions").innerHTML = newConditionOptions;
        
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
    document.getElementById("sources").innerHTML = sourceOptions;
}; // restoreOptions function ends


function clearOptions() {
    // manipulating innerHTML
    seriesOptions.innerHTML = "";
    yearOptions.innerHTML = "";
    tagOptions.innerHTML = "";
    conditionOptions.innerHTML = "";
    sourceOptions.innerHTML = "";
}; // clearOptions function ends


function updateCount(count = 0) {
    // outputs count in #counter
    if (count === 0) {
        document.getElementById("counter").setAttribute("value", countResults());
    } else {
        document.getElementById("counter").setAttribute("value", count);
    }; // if else block ends
}; // function updateCount ends
    
function promptNewSearch() {
    clearSearch();
    searchBar.focus();
    clearOptions();
    restoreOptions();
};