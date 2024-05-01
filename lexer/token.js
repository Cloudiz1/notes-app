// token class
class Token {
    constructor (type, value) {
        this.type = type;
        this.value = value;
    }
}

const type = {
    header: /!h/,
    subheader: /!sh/,
    content: /!c/,
    ulist: /!ul/,
    olist: /!ol/,
    end_list: /!el/,
    list_element: /!li/,
    single_bullet: /!sb/,
    no_bullet_list_element: /!nbli/,
    image: /!img/,
    comment: /!!/,
    link: /!a/,
    end: /!end/,
}

module.exports = {
    Token,
    type
}