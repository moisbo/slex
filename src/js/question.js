var Card = require('./card')

var Question = function (data) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" id="answerCreate" data-id="${data.id}" class="mdl-button">Answer</a>
        <a href="#" id="editQuestion" data-id="${data.id}" class="mdl-button">Edit</a>
        <a href="#" id="showQuestion" data-id="${data.id}" class="mdl-button">Show</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Question'})
}

module.exports = Question;