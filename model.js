class Model {

    constructor(csv_line) {
        const headers = csv_line.split(",");
        // headers in order:
        // Collection,Year,Part,Model,Number,Stamp,Condition,Origin,URL,Tags,Quantity,Image,Note
        this.csv = csv_line;
        this.name = headers[3];
        this.series = headers[0];
        this.year = headers[1];
        this.tag = headers[9];
        this.image = headers[11];
        this.condition = headers[6];
        this.part = headers[2];
        this.number = headers[4];
        this.origin = headers[7];
        this.stamp = headers[5];
        this.url = headers[8];
        this.note = headers[12];
        this.quantity = headers[10];
        
        this.update_image_name()
    }; // constructor ends
    
    make_spreadsheet_line() {
        return this.csv;
    }; // make_spreadsheet_line() ends
    
    make_photo_view() {
        var image_path = "Images/";
        var th_logo_path = "Images/Logos/TH Logo Mini.PNG";
        var sth_logo_path = "Images/Logos/STH Logo.PNG";
        if (this.tag == "$TH") {
        // template literal
            return `
    <div class="wrapper">
        <a><img class="photo" loading="lazy" src="Images/${this.image}" alt="${this.image}" width="640px" /></a><img class="logo" src="${sth_logo_path}" width="30px" alt="$TH" />
    </div>\n`;
            } else if (this.tag == "TH") {
        // template literal
                return `
    <div class="wrapper">
        <a><img class="photo" loading="lazy" src="Images/${this.image}" alt="${this.image}" width="640px" /></a><img class="logo" src="${th_logo_path}" width="30px" alt="TH" />
    </div>\n`;
        } else {
        // template literal
            return `\n
    <div class="wrapper">
        <a><img class="photo" loading="lazy" src="Images/${this.image}" alt="${this.image}" width="640px" /></a>
    </div>\n`;
        };
    }; // make_photo_view() ends
    
    make_frame_view() {
        if (this.quantity !== "0") {
            var div_class = "searchable float";
        } else {
            var div_class = "searchable float gone";
        };
        // template literal
        return `\n
<div class="${div_class}">
    <details>
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
    </details>
    ${this.make_photo_view()}
</div>
        \n`;
    }; // make_frame_view() ends
    
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
    
    update_image_name() {
        this.image = this.generate_image_name();
    };

}; // class declaration ends
