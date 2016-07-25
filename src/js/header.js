var Header = function (data) {
    return `
    <header id="header" class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
    <div class="mdl-js-button mdl-layout__drawer-button">
        <i class="material-icons">menu</i>
    </div>
    <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">${data.header.title}</span>
        <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" id="search">
                <label class="mdl-textfield__label" for="search">Enter your query...</label>
            </div>
        </div>
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
        <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
            ${data.header.menu.map( (el) => {
	            return `<li class="mdl-menu__item" id="${el.id}" href="">${el.name}</li>`
            }).join('')}            
        </ul>
    </div>
    </header>
    `
}

module.exports = Header