var Card = require('./card')

var Answer = function (data, id, option, profile) {
    let content = ''
    if(option === 'edit' && profile.user){
        content += `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">`
        content += `<input id="answerEdit" class="mdl-textfield__input" type="text" data-qid="${data.qid}" data-id="${id}" value="${data.title}"/>`
        content += `</div>`
    } else {
        content = `<h4>${data.title}</h4>`
    }
    var actions = `
    <div class="mdl-card__actions">
    `
    if(option === 'edit' && profile.user) {
        actions += `
        <a href="#" data-qid="${data.qid}" data-id="${id}" class="answerSaveBtn mdl-button">Save</a>
        `
    }
    if((option === 'show' || option === 'edit') && profile.user) {
        actions += `
        <a href="#" data-qid="${data.qid}" data-id="${id}" class="answerDeleteBtn mdl-button">Delete</a>
        `
    }
    if((option === 'show') && profile.user) {
        actions += `
        <a href="#" data-qid="${data.qid}" data-id="${id}" class="answerEditBtn mdl-button">Edit</a>
        `
    }
    actions +=`
    </div>
    `
  return Card({content: content, actions: actions, title: 'Answer'})
}

module.exports = Answer;