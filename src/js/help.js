var Card = require('./card')

var Help = function (data) {
    var content = `
    <p>This is the help section</p>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, actions: actions, title:'Help'})
}
module.exports = Help