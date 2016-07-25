var Card = require('./card')

var Answer = function (data, id, option) {
    let content = ''
    if(option === 'edit'){
        content += `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">`
        content += `<input class="mdl-textfield__input" type="text" id="answerEdit" data-id="${id}" value="${data.title}"/>`
        content += `</div>`
    } else {
        content = `<h4>${data.title}</h4>`
    }
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" id="answerEditBtn" class="mdl-button">Edit</a>
        <a href="#" id="answerDeleteBtn" data-qid="${data.qid}" data-id="${id}" class="mdl-button">Delete</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Answer'})
}

module.exports = Answer;