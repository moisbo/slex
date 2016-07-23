var Card = require('./card')

var Ask = function (data) {
    var content = `
    <input id="askQuery" class="mdl-textfield__input" type="text">
    <button id="ask" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
        <i class="material-icons">add</i>
    </button>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
    return Card({content: content, actions: actions, title:'Ask A Question'})
}

module.exports = Ask;