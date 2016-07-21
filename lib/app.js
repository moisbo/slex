(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Card = require('./card')

var Ask = function (data) {
    var content = `
    <input id="askQuery" class="mdl-textfield__input" type="text">
    <button id="ask" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
        <i class="material-icons">add</i>
    </button>
    `
    var action = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
    return Card({content: content, action: action, title:'Ask A Question'})
}

module.exports = Ask;
},{"./card":2}],2:[function(require,module,exports){
var Card = function (data, type) {
    return `
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
        <div class="mdl-card mdl-cell mdl-cell--12-col">
            <div class="mdl-card__supporting-text mdl-grid mdl-grid--no-spacing">
                <h4 class="mdl-cell mdl-cell--12-col">${data.title}</h4>
                <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                    ${data.content}
                </div>            
            </div>
            ${data.actions}
        </div>
    </section>
    `
}
module.exports = Card;
},{}],3:[function(require,module,exports){
var Render = require('./render')
var Question = require('./question')

var db = {
    init: (config) => {
        firebase.initializeApp(config)
    },
    actions: (state) => {
        delegate('#app', 'click', '#ask', (event) => {
            var input = document.querySelector('#askQuery')
            if(input && input.value){
                firebase.database().ref('questions/').push({text: input.value, answered: false});
            }
        })
        /*
        firebase.database().ref('questions/').on('value', (snapshot) => {
            state.questions = snapshot.val() 
            let content = ''
            Object.keys(state.questions).forEach((el) => {
                content += Question(state.questions[el].text)
            })
            Render.main(content, document.querySelector('#main'))
        })
        */
    }
}

module.exports = db;
},{"./question":9,"./render":10}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
var Header = function (data) {
    return `
    <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">${data.title}</span>
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
            ${data.menu.map( (el) => {
	            return `<li class="mdl-menu__item">${el.name}</li>`
            }).join('')}            
        </ul>
    </div>
    `
}

module.exports = Header
},{}],6:[function(require,module,exports){
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
},{"./card":2}],7:[function(require,module,exports){
'use strict';

var DB = require('./db')
var Help = require('./help')
var Ask = require('./ask')
var Search = require('./search')

var Render = require('./render')

var state = {
    header:{
        title: 'Q & A',
        menu: [
            {name:'header 1'},
            {name:'header 2'}
        ]
    },
    drawer:{
        menu:[
            {id:'ask',icon:'home',name:'Ask A Question'},
            {id:'',icon:'account_circle',name:'My Questions'},
            {id:'',icon:'face',name:'My Profile'},
            {id:'',icon:'group_work',name:'Teams'}
        ],
        teams:[
            {url:'',name:'something.com'},
            {url:'',name:'otherthing.com'}
        ],
        currentTeam: 'My Team'
    },
    main:{
        questions:[],
        profile:{
            user:{},
            answers:[],
            questions:[],
            teams:[]
        }
    }
}

var renderApp = function (data){
    Render.header(data.header, document.querySelector('#header'))
    Render.drawer(data.drawer, document.querySelector('#drawer'))
    Render.main(Ask(), document.querySelector('#main'))
}

var config = {
    apiKey: "AIzaSyDx8YPwfxB5O9USxtqPSTapfIr7jKiGjKM",
    authDomain: "slex-c2463.firebaseapp.com",
    databaseURL: "https://slex-c2463.firebaseio.com",
    storageBucket: "slex-c2463.appspot.com",
}

renderApp(state)

DB.init(config)
DB.actions(state)

delegate('#app', 'click', '#help', (event) => {    
    Render.main(Help(), document.querySelector('#main')) 
    event.preventDefault()   
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
})

delegate('#app', 'click', '#ask', (event) => {    
    Render.main(Ask(), document.querySelector('#main')) 
    event.preventDefault() 
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
})

delegate('#app', 'change', '#search', (event) => {    
    if(event.target.value) {        
        let loading = '<div class="center mdl-spinner mdl-js-spinner is-active"></div>'
        Render.main(loading, document.querySelector('#main'))
        componentHandler.upgradeDom();

        firebase.database().ref('questions/').once('value').then((snapshot) => {
            state.questions = snapshot.val() 
            //TODO: Make a real search server, because firebase can't search
            let results = [] 
            Object.keys(state.questions).filter((el) => {     
                if(state.questions[el].text.toLowerCase().match(event.target.value.toLowerCase())) {     
                    results.push(state.questions[el])
                }
            })
            Render.main(Search(results), document.querySelector('#main')) 
            event.preventDefault() 
        })        
    }
})
},{"./ask":1,"./db":3,"./help":6,"./render":10,"./search":11}],8:[function(require,module,exports){
var Main = function (data) {
  return `        
      <div class="demo-cards">
        ${data}
      </div>
  `
}

module.exports = Main
},{}],9:[function(require,module,exports){
var Card = require('./card')

var Question = function (data) {
    var content = `
    <h4>${data.text}</h4>
    `
    var action = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, action: action, title:'Question'})
}

module.exports = Question;
},{"./card":2}],10:[function(require,module,exports){
var Header = require('./header')
var Drawer = require('./drawer')
var Main = require('./main')

var Render = {
    header: function (data, into) {
        into.innerHTML = Header(data)
    },
    drawer: function (data, into) {
        into.innerHTML = Drawer(data)
    },
    main: function (data, into) {
        into.innerHTML = Main(data)
    }
}

module.exports = Render
},{"./drawer":4,"./header":5,"./main":8}],11:[function(require,module,exports){
var Question = require('./question')

var Search = function (data) {
    let content = ''
    Object.keys(data).forEach((el) => {
        content += Question(data[el])
    })
    return content
}

module.exports = Search
},{"./question":9}]},{},[7]);
