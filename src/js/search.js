var Question = require('./question')
var Answer = require('./answer')
var Stack = require('./stack')

var Search = function (data, option) {
    let content = ''

    Object.keys(data.questions).forEach((el) => {
        content += Question(data.questions[el], el, data.profile)
    })

    //The state should have the answers of this quesiton
    if(data.answers && (option === 'edit' || option === 'show')){
        Object.keys(data.answers).forEach((el) => {
            content += Answer(data.answers[el], el, option, data.profile)
        })
    }

    //If option has 'so' show their answers
    if(data.stackExchange.length > 0 && option === 'so') {
        content += '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">'
        content += '<ul class="demo-list-three mdl-list">'
        data.stackExchange.forEach((q) => {
            content += Stack(q)
        })
        content += '</ul>'
        content += '</section>'
    }

    return content
}

module.exports = Search