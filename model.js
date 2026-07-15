class Tracker {
// TODO: rename to Watcher    
    constructor() {
        this.state = false;
        this.search_query = false;
        this.year_selector = false;
        this.series_selector = false;
        this.tag_selector = false;
        this.condition_selector = false;
        this.source_selector = false;
    }
    
    set() {
        this.get();
        this.state = true;
        this.search_query = this.search_field;
        //NOTE("search_query: " + this.search_query)
        this.year_selector = this.year_field;
        //NOTE("year_selector: " + this.year_selector)
        this.series_selector = this.series_field;
        //NOTE("series_selector: " + this.series_selector)
        this.tag_selector = this.tag_field;
        //NOTE("tag_selector: " + this.tag_selector)
        this.condition_selector = this.condition_field;
        //NOTE("condition_selector: " + this.condition_selector)
        this.source_selector = this.source_field;
        //NOTE("source_selector: " + this.source_selector)
        //LOG("current search state set");
    }
    
    get() {
        this.search_field = document.getElementById("search_bar").value;
        this.year_field = yearSelectorInput.value;
        this.series_field = seriesSelectorInput.value;
        this.tag_field = tagSelectorInput.value;
        this.condition_field = conditionSelectorInput.value;
        this.source_field = sourceSelectorInput.value;
    };
    
    compare() { // determine whether a new search() required or would a match() suffice
        // true if search can be narrowed down
        let current_state = new Tracker();
        current_state.set();
        //WARN(this.search_query);
        
        if (this.search_query) {
            if (this.search_query !== current_state.search_query) {                
                NOTE("!!! search query changed");
                return false;
            };
        } else {
            if (current_state.search_query) {
                NOTE("!!! search query changed");
                return false;
            };
        }; // if search_query ends
        
        if (this.year_selector) {
            if (this.year_selector !== current_state.year_selector) {
                NOTE("!!! year selector changed");
                return false;
            };
        };
        
        if (this.series_selector) {
            if (this.series_selector !== current_state.series_selector) {
                NOTE("!!! series selector changed");
                return false;
            };
        };
        
        if (this.tag_selector) {
            if (this.tag_selector !== current_state.tag_selector) {
                NOTE("!!! tag selector changed");
                return false;
            };
        };
        
        if (this.condition_selector) {
            if (this.condition_selector !== current_state.condition_selector) {
                NOTE("!!! condition selector changed");
                return false;
            };
        };
        
        if (this.source_selector) {
            if (this.source_selector !== current_state.source_selector) {
                NOTE("!!! source selector changed");
                return false;
            };
        };
        
        return true;
    };
};

// const headers = [Collection,Year,Part,Model,Number,Stamp,Condition,Origin,URL,Tags,Quantity,Image,Note]


class Collection {
    
    constructor() {
        this.models = new Array();
        this.years = new Array();
        this.series = new Array();
        this.tags = new Array();
        this.conditions = new Array();
        this.sources = new Array();
        this._years = new Set();
        this._series = new Set();
        this._tags = new Set();
        this._conditions = new Set();
        this._sources = new Set()
        this.count = 0;
    };
    
    add(text) { // from csv line
        this.count += 1;
        let csvalues = text.split(",");
        let series = csvalues[0];
        let year = csvalues[1];
        let tag = csvalues[9];
        let condition = csvalues[6];
        let origin = csvalues[7];

        this.models.push(text);
        this._years.add(year);
        this.years[year] ??= new Array();
        this.years[year].push(text);
        this._series.add(series);
        this.series[series] ??= new Array();
        this.series[series].push(text);
        this._tags.add(tag);
        this.tags[tag] ??= new Array();
        this.tags[tag].push(text);
        this._conditions.add(condition);
        this.conditions[condition] ??= new Array();
        this.conditions[condition].push(text);
        this._sources.add(origin);
        this.sources[origin] ??= new Array();
        this.sources[origin].push(text);
    };
    
    search(query="", year="", series="", tag="", condition="", source="") {
        let priorities = [series, year, tag, source, condition];
    };
    
    convertToModel() {
        
    }
    
    updateViews() {
        
    }
    
    updateSelectors() {
        clearOptions();
    Array.from(this._years).sort().forEach(year => document.getElementById("years").innerHTML += `<option value="${year}">`);
    Array.from(this._conditions).sort().forEach(condition => document.getElementById("conditions").innerHTML += `<option value="${condition}">`);
    Array.from(this._series).sort().forEach(collection => document.getElementById("series").innerHTML += `<option value="${collection}">`);
    Array.from(this._tags).sort().forEach(tag => document.getElementById("tags").innerHTML += `<option value="${tag}">`);    
    Array.from(this._sources).sort().forEach(source => document.getElementById("sources").innerHTML += `<option value="${source}">`); 
    };
    
    test() {
        HIGHLIGHT(`tags: ${Array.from(this._tags).length} | years: ${Array.from(this._years).length} | collections: ${Array.from(this._series).length} | sources: ${Array.from(this._sources).length} | conditions: ${Array.from(this._conditions).length} | models: ${this.models.length}`);
    }
};

class Model {

    constructor(id, csv_line) {
        this.images_directory = "Images";
        const csvalues = csv_line.split(",");
        // headers in order:
        // Collection,Year,Part,Model,Number,Stamp,Condition,Origin,URL,Tags,Quantity,Image,Note
        this.id = id;
        
        this.csv = csv_line;
        this.name = csvalues[3];
        this.series = csvalues[0];
        this.year = csvalues[1];
        this.tag = csvalues[9];
        this.image = csvalues[11];
        this.condition = csvalues[6];
        this.part = csvalues[2];
        this.number = csvalues[4];
        this.origin = csvalues[7];
        this.stamp = csvalues[5];
        this.url = csvalues[8];
        this.note = csvalues[12];
        this.quantity = csvalues[10];
        this.image_path = "";
        this.thumbnail = "";
        this.missing_photo = "";
        
        if (!this.quantity) {
            this.quantity = 1;
        };
        
        this.update_images();
    }; // constructor ends
    
    make_spreadsheet_line() {
        // template literal
        return `
    <tr class="{row_class} searchable" data-index="{data_index}">
        <td class="line">{count}</td>
        <td class="model">${this.name}</td>
        <td class="series">${this.series}</td>
        <td class="year">${this.year}</td>
        <td class="part">${this.part}</td>
        <td class="origin">${this.origin}</td>
        <td class="url">${this.url}</td>
        <td class="quantity">${this.quantity}</td>
        <td class="tags">${this.tag}</td>
        <td class="condition">${this.condition}</td>
    </tr>`
    }; // make_spreadsheet_line() ends
    
    make_details_html() {
        return `
    <details id="details_${this.id}">
        <summary>
            <h1>${this.name}</h1>
        </summary>
        <table>
            <tr>
                <td class="grayed">series:</td>
                <td>${this.series}</td>
                <td class="grayed">part:</td>
                <td class="right">${this.part}</td>
            </tr>
            <tr>
                <td class="grayed">number:</td>
                <td>${this.number}</td>
                <td class="grayed">year:</td>
                <td class="right">${this.year}</td>
            </tr>
            <tr>
                <td class="grayed">origin:</td>
                <td>${this.origin}</td>
            </tr>
            <tr>
                <td class="grayed">status:</td>
                <td>${this.condition}</td>
                <td colspan=2 class="tag">${this.tag}</td>
            </tr>
        </table>
    </details>`
    }; // make_details_html() ends
    
    make_details_div() {
        return `
    <div id="details_${this.id}" class="details">
        <table>
            <tr>
                <td class="grayed">series:</td>
                <td>${this.series}</td>
                <td class="grayed">part:</td>
                <td class="right">${this.part}</td>
            </tr>
            <tr>
                <td class="grayed">number:</td>
                <td>${this.number}</td>
                <td class="grayed">year:</td>
                <td class="right">${this.year}</td>
            </tr>
            <tr>
                <td class="grayed">origin:</td>
                <td>${this.origin}</td>
            </tr>
            <tr>
                <td class="grayed">status:</td>
                <td>${this.condition}</td>
                <td colspan=2 class="tag">${this.tag}</td>
            </tr>
        </table>
    </div>`
    }; // make_details_html() ends
    
    
    make_photo_view() {

        var th_logo_path = this.images_directory + "/Logos/TH Logo Mini.PNG";
        var sth_logo_path = this.images_directory + "/Logos/STH Logo.PNG";
        
        if (this.tag == "$TH") {
        // template literal
            return `
    <div class="wrapper" id="photo_${this.id}">
        <a><img class="photo_full" loading="lazy" src="${this.images_directory}/${this.image}" alt="${this.image}" /></a><img class="logo" src="${sth_logo_path}" alt="$TH" />
    </div>\n`;
            } else if (this.tag == "TH") {
        // template literal
                return `
    <div class="wrapper" id="photo_${this.id}">
        <a><img class="photo_full" loading="lazy" src="${this.images_directory}/${this.image}" alt="${this.image}" /></a><img class="logo" src="${th_logo_path}" alt="TH" />
    </div>\n`;
        } else {
        // template literal
            return `\n
    <div class="wrapper" id="photo_${this.id}">
        <a><img class="photo_full" loading="lazy" src="${this.images_directory}/${this.image}" alt="${this.image}" /></a>
    </div>\n`;
        };
    }; // make_photo_view() ends
    
    make_frame_view() {
        if (parseInt(this.quantity) > 0) {
            var div_class = "searchable";
        } else {
            var div_class = "searchable gone";
        };
        // template literal
        return `\n
<div class="${div_class}">
    ${this.make_details_div()}
    ${this.make_photo_view()}
</div>
        \n`;
    }; // make_frame_view() ends
    
    make_card_view() {
    try {
        if (parseInt(this.quantity) > 0) {
            var div_class = "searchable";
        } else {
            var div_class = "searchable gone";
        };
        return `
        <div class="item_card ${div_class}" id="item_${this.id}" onclick="toggleDetails('${this.id}')" data-index="year:${this.year} series:${this.series} condition:${this.condition} tag:${this.tag} source:${this.origin}">
            <div class="item_name">
                <span>${this.name}</span>
            </div>
            <div class="item_photo">
                ${this.make_photo_view()}
            </div>            
            ${this.make_details_div()}
        </div>`;
    } catch (error) {
        ERROR("Error in make_card_view() method of class Model:", error);
    }
    }; // make_card_view() ends
    
    make_thumbnail_view() {
        return `
        <img class="${this.quantity == 0 ? 'grayed' : ''}" src="${this.image_path}" id="thumb_${this.id}" onclick="openPhoto('${this.id}')" />`
    }; // make_thumbnail_view() ends
    
    generate_image_name() {
        if (this.image.endsWith(".jpeg")) {
            // hardcoded image name
            return this.image;
        };
        var image_name;
        if (this.year) {
            if (this.series.includes(this.year)) {
                // omit year if it is in series name
                image_name = this.name + " (" + this.series + ")";
            } else {
                image_name = this.name + " (" + this.series + " " + this.year.toString() + ")";
            };
            if (this.image) {
                // color variation
                image_name += " [" + this.image + "]";
            } else if (this.tag) {
                // type variation
                image_name += " [" + this.tag + "]";
            };
        } else {
            if (this.tag) {
                image_name = this.name + " (" + this.series + ") [" + this.tag + "]";
            } else {
                image_name = this.name + " (" + this.series + ")";
            };
        };
        // replace colons with dashes
        image_name = image_name.replace(":", " -");
        // replace forward slashes with underscores
        image_name = image_name.replace("/", "_");
        return image_name + ".jpeg";
    }; // generate_image_name() ends
    
    generate_image_path() {
        return `${this.images_directory}/${this.image}`;

    }; // generate_image_path() ends
    
    check_image_path() {
        var req = new XMLHttpRequest();
        req.open('HEAD', encodeURIComponent(this.image_path), false);
        req.send();
     
        if (req.status == "404") {
            this.missing_photo =             this.image;
            return false;
        } else {
            return true;
        };
    }; // check_image_path() ends
    
    update_image_name() {
        this.image = this.generate_image_name();
    }; // update_image_name() ends
    
    update_image_path() {
        this.image_path = this.generate_image_path();
        if (!this.check_image_path()) {
            this.image = "NoPhoto.jpeg";
            this.image_path = `${this.images_directory}/NoPhoto.jpeg`;
        };
    }; // update_image_path() ends
    
    update_thumbnail() {
        this.thumbnail = "thumb_" + this.image;
    }; // update_thumbnail() ends
    
    update_images() {
        this.update_image_name();
        this.update_image_path();
        this.update_thumbnail();
    } // update_images() ends

}; // class declaration ends


class Filter {
    constructor() {
        this.models = new Array();
        this.collections = new Set();
        this.years = new Set();
        this.tags = new Set();
        this.conditions = new Set();
        this.sources = new Set();
    }; // constructor ends
    
    add_collection(name) {
        this.collections.add(name);
    };
    
    add_year(year) {
        this.years.add(year);
    };
    
    add_tag(tag) {
        this.tags.add(tag);
    };
    
    add_condition(condition) {
        this.conditions.add(condition);
    };
    
    add_source(source) {
        this.sources.add(source);
    };
    
    add_data(model) {
        this.collections.add(model.series);
        this.years.add(model.year);
        this.tags.add(model.tag);
        this.conditions.add(model.condition);
        this.sources.add(model.origin);
        this.models.push(model);
    };
    
    add(text) { // from csv line
        this.count += 1;
        let csvalues = text.split(",");
        let series = csvalues[0];
        let year = csvalues[1];
        let tag = csvalues[9];
        let condition = csvalues[6];
        let origin = csvalues[7];

        this.models.push(text);
        this.years.add(year);
        this.collections.add(series);
        this.tags.add(tag);
        this.conditions.add(condition);
        this.sources.add(origin);
    };
    
    clear_filters() {
        // manipulating innerHTML
        document.getElementById("series").innerHTML = "";
        document.getElementById("years").innerHTML = "";
        document.getElementById("tags").innerHTML = "";
        document.getElementById("conditions").innerHTML = "";
        document.getElementById("sources").innerHTML = "";
        NOTE("search filters cleared");
    }; // clear_filters() ends

    
    apply_filters() {
        
        let _collections = Array.from(this.collections).sort();
        let _years = Array.from(this.years).sort();
        let _tags = Array.from(this.tags).sort();
        let _conditions = Array.from(this.conditions).sort();
        let _sources = Array.from(this.sources).sort();
        
        this.clear_filters();

        _collections.forEach(name => document.getElementById("series").innerHTML += `<option value="${name}">`);
        _years.forEach(year => document.getElementById("years").innerHTML += `<option value="${year}">`);
        _tags.forEach(tag => document.getElementById("tags").innerHTML += `<option value="${tag}">`);
        _conditions.forEach(condition => document.getElementById("conditions").innerHTML += `<option value="${condition}">`);
        _sources.forEach(source => document.getElementById("sources").innerHTML += `<option value="${source}">`);
        
        NOTE("search filters overwritten");
        
        HIGHLIGHT(`tags: ${_tags.length} | years: ${_years.length} | collections: ${_collections.length} | sources: ${_sources.length} | conditions: ${_conditions.length}`);
        
        // HIGHLIGHT("tags:", _tags.length);
        // HIGHLIGHT("years:", _years.length);
        // HIGHLIGHT("collections:", _collections.length);
        // HIGHLIGHT("sources:", _sources.length);
        // HIGHLIGHT("conditions:", _conditions.length);

    }; // apply() ends
    
}; // class declaration ends