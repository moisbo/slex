var Card = require('./card')

var Answer = function (data) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Edit</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Answer'})
}

module.exports = Answer;