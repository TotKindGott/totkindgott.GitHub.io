let years = new Array();
let conditions = new Array();
let collections = new Array();
let tags = new Array();
let sources = new Array();

let collections_set = new Set();
let years_set = new Set();
let conditions_set = new Set();
let tags_set = new Set();
let sources_set = new Set();

const options = ["Collection","Year","Part","Model","Number","Stamp","Condition","Origin","URL","Tags","Quantity","Image","Note"];

function option_fill() {
    var function_name = "option_fill";
    LOG(`>>> running ${function_name}() ...`);
    var csv = document.getElementById("csv").innerHTML;
    LOG(`${function_name}() read ${csv.length.toLocaleString("en-US")} characters`);
    let year_index = options.indexOf("Year");
    let condition_index = options.indexOf("Condition");
    let collection_index = options.indexOf("Collection");
    let tag_index = options.indexOf("Tags");
    let source_index = options.indexOf("Origin");
       
    let lines = csv.split("\n");
    LOG(`${function_name}() split ${lines.length.toLocaleString("en-US")} lines`);
    try {
        for (var i = 1; i < lines.length; i++) {
            var items = lines[i].split(",");
        //console.log(option, items[option_index]);
            var year = items[year_index].toString();
            years_set.add(year);
            var condition = items[condition_index].toString();
            conditions_set.add(condition);
            var collection = items[collection_index].toString();
        collections_set.add(collection);
            var tag = items[tag_index].toString();
            tags_set.add(tag);
            var source = items[source_index].toString();
            sources_set.add(source);
            //console.log(items[option_index]);
        }; // for loop ends
    } catch (error) {
        ERROR(`error in ${function_name}(): ${error}`);
    };
    LOG(`>>> parsing data with ${function_name}`);
    years = Array.from(years_set).sort();
    HIGHLIGHT("years:", years.length);
    DEBUG && LOG(years);
    conditions = Array.from(conditions_set).sort();
    HIGHLIGHT("conditions:", conditions.length);
    DEBUG && LOG(conditions);
    collections = Array.from(collections_set).sort();
    HIGHLIGHT("collections:", collections.length);
    DEBUG && LOG(collections);
    tags = Array.from(tags_set).sort();
    HIGHLIGHT("tags:", tags.length);
    DEBUG && LOG(tags);
    sources = Array.from(sources_set).sort();
    HIGHLIGHT("sources:", sources.length);
    DEBUG && LOG(sources);
    SUCCESS(`${function_name}() run status: OK`);
};