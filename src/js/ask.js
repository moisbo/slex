var Card = require('./card')

var Ask = function (data) {
    var content = `
    <input id="askQuery" class="mdl-textfield__input" type="text"/>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" id="askButton" class="mdl-button">Ask</a>
    </div>
    `
    return Card({content: content, actions: actions, title:'Post a Question'})
}

module.exports = Ask;