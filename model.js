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
    ${this.make_details_html()}
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
        <div class="item_card ${div_class}" id="item_${this.id}">
            <div class="item_name" onclick="toggleDetails('${this.id}')">
                <span>${this.name}</span>
            </div>
            <div class="item_photo">
                ${this.make_photo_view()}
            </div>            
            ${this.make_details_html()}
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
            } else if (this.tag == "Zamac" || this.tag == "STH") {
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
            WARN(this.image);
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
