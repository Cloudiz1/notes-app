# notes web app

This web app aims to turn simple text documents into neatly formatted web pages complete with a table of contents

# usage

Create a text file in the notes folder. This is where you will put your notes (shocker). You can name it whatever you like, just make sure it ends in .txt. <br>
Each tag begins with an exclam. Write content after the tag, the program will ignore new lines. To write a new line, simply use !br. <br>
The program will also generate a table of contents with clickable links using the headers and subheaders found in the text file. <br>
To run simply run "node app.js" in the root directory. 

# tags
!h: header tag, will be treated as a new section in the table of contents. Syntax: !h *Header*<br>
!sh: subheader tag, will be treated as a new subsection in the table of contents. Syntax: !sh *SubHeader*<br>
!c: content tag, simply used for text (its an html \<p\> tag). Syntax: !c *Item*<br>
!br: line break, works identical to \<br\> from html. Syntax: !br <br>
!ul: unordered list, used to start a bulleted list, all lists must end with !el. Syntax: !ul ... !el<br>
!ol: ordered list, same thing as !ul but with numbers. Syntax: !ol ... !el <br>
!li: a list element, same thing as \<li\> in html. Syntax: !ul !li *Item* !el <br>
!el: used to end a list, such as ul or ol. Syntax: !el <br>
!sb: makes a ul and adds a single bullet. Syntax: !sb *Item* <br>
!nbli: special list element that removes the bullet. Syntax: !nbli *Item* <br>
!img: displays an image. Syntax: !img *src*<br>
!!: comment; does not get displayed in doc. Syntax: !! *Comment* <br>
!a: link tag. Syntax: !a *DisplayedText* || *href* (The spaces around the pipe symbols are VERY important)<br>
!end: used to signify the end of the text doc.

# mathjax
The program uses MathJax in order to format math. Math can be used in any text tag, just follow the LaTeX style found through MathJax's [documentation](https://docs.mathjax.org/en/latest/basic/mathematics.html#basic-mathematics). Just make sure default delimiters are used (those being \\( ... \\) and \\[ ... \\]. \$\$ ... \$\$ might work but I haven't tried it lmao).

# changelog

version 1.1 <br>
added navbar with arrow to return to top <br>
added comments (Syntax: !! *Comment*) <br>
added links <br>
fixed bug where app would crash if an invalid file path is inputted

version 0.7 <br>
added MathJax support <br>
idk probably smth else i forgot

version 0.6 <br>
fixed a few minor issues <br>
added (enough) css

version 0.5 <br>
added images

version 0.4 <br>
fixed nested lists not working <br>
added !sb (single bullet) 

version 0.3 <br>
table of contents is now auto generated <br>
line breaks have been added

version 0.2 <br>
tokens are now parsed front end into text <br>
a drop down box to select text files has been added

version 0.1 <br>
lexer has been made to help parse text document. Does not work with styles.
