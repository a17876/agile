const fs = require('fs');
const { JSDOM } = require("jsdom");
var page = window.document.body.innerHTML
page = fs.readFileSync("./example/index.html")
const { resetCards } = require("../public/reset")

describe('Test ejs funciton', () => {
    it('test reset', () => {
        resetCards()
        expect(page).toEqual(expect.not.stringContaining('flip-card-horizontal'))
    })
})