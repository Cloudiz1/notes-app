const token = require("./token.js");
const fs = require("fs");

function create_token(type, string) {
    let new_token = new token.Token(type, string);
    return (new_token);
}

function is_token(inputValue) {
    for (let key in token.type) {
        let regex = token.type[key];
    
        if (regex.test(inputValue)) {
            return true;
        }
    }

    return false;
}

function read_file(path) {
    let file_content = fs.readFileSync(path, "utf-8").toString().split(/\s+/);
    return file_content;
}

function generate_tokens(input)
{
    pos = 0;
    content = [];
    most_recent_token = "";
    all_tokens = [];

    while (pos < input.length)
    {
        let current_word = input[pos];

        if (is_token(current_word))
        {
            // generates previous token
            if (pos != 0)
            {
                let content_str = content.join(" ");
                let new_token = create_token(most_recent_token, content_str);
                all_tokens.push(new_token);
            }
    
            // resets for next token
            content = [];
            most_recent_token = current_word;
        }
        else
        {
            // adds the content to array
            content.push(current_word);
        }

        pos++;
    }

    return all_tokens
}

module.exports = {
    read_file,
    generate_tokens
}
/*
let notes = read_file("notes/test.txt");
let tokens = generate_tokens(notes);
console.log(tokens)
*/