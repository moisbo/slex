var Card = require('./card')

var Question = function (data, id, profile) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
    `
    if(profile.user){
    actions += `
        <a href="#" id="answerCreate" data-id="${id}" class="mdl-button">Answer</a>
    `
    }
    actions += `
        <a href="#" id="showQuestion" data-id="${id}" class="mdl-button">Show Answers</a>
        <a href="#" id="showStackExchange" data-id="${id}" class="mdl-button">Related</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Question'})
}

module.exports = Question;