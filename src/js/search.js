var Question = require('./question')
var Answer = require('./answer')

var Search = function (data, option) {
    let content = ''
    
    Object.keys(data.questions).forEach((el) => {
        content += Question(data.questions[el], el)
    })

    //The state should have the answers of this quesiton
    if(data.answers && (option === 'edit' || option === 'answer')){
        Object.keys(data.answers).forEach((el) => {
            content += Answer(data.answers[el], el, option)
        })
    }

    return content
}

module.exports = Search