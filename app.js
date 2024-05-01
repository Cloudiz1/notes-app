// Imports libraries and boiler plate code
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
const io = require('socket.io')(server);
const fs = require("fs");

const lexer = require("./lexer/lexer");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// sets up static pages 
app.set('view engine', 'ejs');
app.use('/static/css', express.static('static/css'));
app.use('/static/js', express.static('static/js'));
app.use(express.static('static/assets'));

// Connects to HTML
app.get("/", (req, res) => {
    res.render('pages/index');
});

io.on("connection", (socket) => {
    // sends availible note sheets
    const notes_file_names = fs.readdirSync("notes");
    socket.emit("get_notes_filepath", notes_file_names);

    // send tokens
    socket.on("get_notes", (path) => {
        if (!path.includes(".txt")) // if invalid path
        {
            socket.emit("invalid_path");
        }
        else // valid path
        {
            let notes = lexer.read_file("notes/" + path);
            let tokens = lexer.generate_tokens(notes);
            socket.emit("send_note_tokens", tokens);
        }
    })
})

server.listen(port, () => {
    console.log(`server is running on http://127.0.0.1:${port}/`);
});