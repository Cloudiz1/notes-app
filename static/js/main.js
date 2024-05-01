const socket = io();

socket.on("get_notes_filepath", (paths) => {
    let paths_dropdown = document.getElementById("notes_filepath_dropdown");

    // populates dropdown box with list of note sheets
    for (let i = 0; i < paths.length; i++)
    {
        let path = paths[i]
        let option = document.createElement("option");
        option.setAttribute("id", "paths_dropdown_option");
        option.setAttribute("value", path);
        option.textContent = path;
        paths_dropdown.appendChild(option);
    }
})

socket.on("invalid_path", () => {
    alert("Please choose a file");
})

function add_element(container, type, value, html_class = null, html_id = null, other_attributes = null) {
    let element = document.createElement(type);
    element.textContent = value;

    if (html_class != null) {
        element.setAttribute("class", html_class);
    }

    if (html_id != null) {
        element.setAttribute("id", html_id);
    }

    if (other_attributes != null)
    {
        element.setAttribute(other_attributes.attribute, other_attributes.value);
    }

    container.appendChild(element);

    // adds line breaks
    if (value != null && value.includes("!br")) {
        console.log(value);
        let split_element = element.innerHTML.split(" ");

        for (let i = 0; i < split_element.length; i++)
        {
            if (split_element[i] == "!br")
            {
                split_element[i] = "<br>";
            }
        }

        element.innerHTML = split_element.join(" ");
    }  

    return element;
}

function add_table_of_conents(tokens)
{
    // creates div
    let toc = add_element(document.body, "div", null, "table_of_contents", "table_of_contents");
    document.body.appendChild(toc);

    // creates title
    let toc_title = add_element(toc, "h2", "Table of Contents", "toc_title", "toc_title");

    for (let i = 0; i < tokens.length; i++)
    {
        let value = tokens[i].value;
        switch (tokens[i].type)
        {
            case "!h":
            {
                // adds header 
                let href = {attribute: "href", value: "#" + value.replace(" ", "_")}
                add_element(toc, "a", value, "toc_header", null, href);

                // creates list for subheaders
                var subheaders_list = document.createElement("ul");
                subheaders_list.setAttribute("class", "toc_subheaders");
                toc.appendChild(subheaders_list);

                break;
            }

            case "!sh":
            {
                let href = {attribute: "href", value: "#" + value.replace(" ", "_")}
                let anchor = add_element(subheaders_list, "a", null, "toc_subheader_anchor", null, href);
                let new_subheader = add_element(anchor, "li", value, "toc_subheader");
                // new_subheader.innerHTML = "<li>" + new_subheader.innerHTML + "</li>";

                break;
            }
        }
    }
}

function get_list_container(all_lists)
{
    let container = document.body;
    if (all_lists.length > 0) // if its a nested list 
    {
        container = all_lists[all_lists.length - 1] // grabs the list above the current list
    }

    return container;
}

// requests notes
document.getElementById("submit").addEventListener("click", () => {
    let form_data = document.getElementById("notes_filepath_dropdown");
    let note_sheet_path = form_data.value;
    socket.emit("get_notes", note_sheet_path);
})

// receives notes
socket.on("send_note_tokens", (tokens) => {
    add_table_of_conents(tokens);

    let all_lists = [];
    for (let i = 0; i < tokens.length; i++)
    {
        let value = tokens[i].value;
        switch (tokens[i].type)
        {
            case "!h":
                add_element(document.body, "h2", value, "header", value.replace(" ", "_")); // id is used by table of contents
                break;

            case "!sh":
                add_element(document.body, "h4", value, "subheader", value.replace(" ", "_"));
                break;

            case "!c":
                add_element(document.body, "p", value, "content");
                break;

            case "!ul":
            {
                let new_list = add_element(get_list_container(all_lists), "ul", value, "ulist");
                all_lists.push(new_list);
                break;
            }

            case "!ol":
            {
                let new_list = add_element(get_list_container(all_lists), "ol", value, "ulist");
                all_lists.push(new_list);
                break;
            } 

            case "!el":
                all_lists.pop();
                break;

            case "!li":
                add_element(get_list_container(all_lists), "li", value, "list_element");
                break;

            case "!nbli":
                add_element(get_list_container(all_lists), "li", value, "no_bullet_list_element");
                break;

            case "!sb":
                let single_bullet_ulist = add_element(get_list_container(all_lists), "ul", "", "single_bullet_ulist");
                add_element(single_bullet_ulist, "li", value, "single_bullet_li");
                break;

            case "!img":
            {
                let src = {attribute: "src", value: value.replace(" ", "_")};
                add_element(document.body, "img", null, "images", null, src);
                break;
            }

            case "!a":
            {
                let link_tag = value.split(" || ");
                let link_text = link_tag[0];
                let hyperlink = link_tag[1];
                let href = {attribute: "href", value: hyperlink};
                let anchor = add_element(document.body, "a", null, null, "link", href);
                anchor.innerText = link_text;
            }
        }
    }

    // invents math    
    let math_script = document.createElement("script");
    math_script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    math_script.setAttribute("async", "");
    math_script.setAttribute("id", "MathJax-script");
    document.body.appendChild(math_script);
    console.log(math_script);

    let polyfill_script = document.createElement("script");
    polyfill_script.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
    document.body.appendChild(polyfill_script);
})
