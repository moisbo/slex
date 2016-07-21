var Card = require('./card')

var Help = function (data) {
    var content = `
    <p>This is the help section</p>
    `
    var action = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, action: action, title:'Help'})
}
module.exports = Help