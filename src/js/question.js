var Card = require('./card')

var Question = function (data) {
    var content = `
    <h4>${data.text}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, actions: actions, title:'Question'})
}

module.exports = Question;