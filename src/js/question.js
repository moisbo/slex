var Card = require('./card')

var Question = function (data, id) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" id="answerCreate" data-id="${id}" class="mdl-button">Answer</a>
        <a href="#" id="editQuestion" data-id="${id}" class="mdl-button">Edit</a>
        <a href="#" id="showQuestion" data-id="${id}" class="mdl-button">Show Answers</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Question'})
}

module.exports = Question;