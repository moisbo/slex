var Drawer = function (data) {
    return `
    <header class="demo-drawer-header">
      <img src="images/user.jpg" class="demo-avatar">
      <div class="demo-avatar-dropdown">
        <span>${data.currentTeam}</span>
        <div class="mdl-layout-spacer"></div>
        <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
          <i class="material-icons" role="presentation">arrow_drop_down</i>
          <span class="visuallyhidden">Accounts</span>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
          ${data.teams.map((el) => {
            return `
              <li class="mdl-menu__item">${el.name}</li>
            `
          }).join('')}
          <li class="mdl-menu__item"><i class="material-icons" id="addTeam">add</i>Add another team...</li>
        </ul>
      </div>
    </header>
    <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      ${data.menu.map((el) => {
        return `<a class="mdl-navigation__link" id="${el.id}"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">${el.icon}</i>${el.name}</a>`
      }).join('')}
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-navigation__link" id="help" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
    </nav>
    `
}

module.exports = Drawer