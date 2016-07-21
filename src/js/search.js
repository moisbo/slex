var Question = require('./question')

var Search = function (data) {
    let content = ''
    Object.keys(data).forEach((el) => {
        content += Question(data[el])
    })
    return content
}

module.exports = Search