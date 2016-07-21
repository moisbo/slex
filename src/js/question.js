var Card = require('./card')

var Question = function (data) {
    var content = `
    ${data.text}
    `
    var action = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, action: action, title:'Question'})
}

module.exports = Question;