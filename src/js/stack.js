var Stack = function (data) {
    return `
    <li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-avatar">person</i>
      <span>${data.owner.display_name}</span>
      <span class="mdl-list__item-text-body">
        ${data.title}
      </span>
    </span>
    <span class="mdl-list__item-secondary-content">
      <a class="mdl-list__item-secondary-action" href="${data.link}"><i class="material-icons">open_in_new</i></a>
    </span>
  </li>
    `
}

module.exports = Stack