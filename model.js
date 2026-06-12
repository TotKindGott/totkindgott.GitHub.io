
class Collection {
    
    constructor() {
        this.models = new Array;
        this.years = new Array;
        this.series = new Array;
        this.tags = new Array;
        this.conditions = new Array;
        this.sources = new Array;
        this.count = 0;
    };
    
    addModel(text) { // from csv line
        this.count += 1;
        let model = new Model(this.count, text);
        this.models.push(model);
        this.years[model.year] ??= new Array();
        this.years[model.year].push(model);
        this.series[model.series] ??= new Array();
        this.series[model.series].push(model);
        this.tags[model.tag] ??= new Array();
        this.tags[model.tag].push(this.model);
        this.conditions[model.condition] ??= new Array();
        this.conditions[model.condition].push(model);
        this.sources[model.source] ??= new Array();
        this.sources[model.source].push(model);
    };
    
    search(query="", year="", series="", tag="", condition="", source="") {
        let priorities = [series, year, tag, source, condition];
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
    }; // make_card_view() ends
    
    make_thumbnail_view() {
        return `
        <img class="${this.quantity == 0 ? 'grayed' : ''}" src="${this.image_path}" id="thumb_${this.id}" onclick="openPhoto('${this.id}')" />`
    }; // make_thumbnail_view() ends
    
    generate_image_name() {
        if (this.image.endsWith(".JPG")) {
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
            } else if (this.tag == "Zamac" || this.tag == "$TH") {
                // type variation
                image_name += " [" + this.tag + "]";
            };
        } else {
            image_name = this.name + " (" + this.series + ")";
        }
        // replace colons with dashes
        image_name = image_name.replace(":", " -");
        // replace forward slashes with underscores
        image_name = image_name.replace("/", "_");
        return image_name + ".JPG";
    }; // generate_image_name() ends
    
    generate_image_path() {
        return `${this.images_directory}/${this.image}`;

    }; // generate_image_path() ends
    
    check_image_path() {
        var req = new XMLHttpRequest();
        req.open('HEAD', this.image_path, false);
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
            this.image = "NoPhoto.JPG";
            this.image_path = `${this.images_directory}/NoPhoto.JPG`;
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