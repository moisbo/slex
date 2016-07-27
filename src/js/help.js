var Card = require('./card')

var Help = function (data) {
    var content = `
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <p>Browse or search questions</p>
        <p>Sign in to post questions and answers</p>
        <p>Sing up with an email</p>
        <p>Related button will show related questions on StackExchange</p>        
    </div>
    `
    var actions = `
    <div class="mdl-card__actions">
    </div>
    `
  return Card({content: content, actions: actions, title:'Help'})
}
module.exports = Help