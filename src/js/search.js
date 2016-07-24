var Question = require('./question')
var Answer = require('./answer')

var Search = function (data) {
    let content = ''
    Object.keys(data.questions).forEach((el) => {
        content += Question(data.questions[el])
    })
    if(data.answers){
        Object.keys(data.answers).forEach((el) => {
            content += Answer(data.answers[el])
        })
    }
    return content
}

module.exports = Search