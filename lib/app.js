(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Card = require('./card')

var Answer = function (data) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Edit</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Answer'})
}

module.exports = Answer;
},{"./card":4}],2:[function(require,module,exports){
var AnswerController = {
    create: (uid, qid, title, body) => {
        // A post entry.
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }
        var newQKey = firebase.database().ref().child('answers').push().key
        var updates = {};
        updates['/answers/' + newQKey] = qData
        return firebase.database().ref().update(updates)
    },
    update: (id, uid, qid, title, body) => {
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }
        return firebase.database().ref('answers/' + id).set(qData)
    },
    delete: (id) => {
        return firebase.database().ref('answers/' + id).remove()
    },
}

module.exports = AnswerController
},{}],3:[function(require,module,exports){
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
},{"./card":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
var Drawer = function (data) {
    return `
    <div id="drawer" class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <header class="demo-drawer-header">
      <img src="images/user.jpg" class="demo-avatar">
      <div class="demo-avatar-dropdown">
        <span>${data.drawer.currentTeam}</span>
        <div class="mdl-layout-spacer"></div>
        <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
          <i class="material-icons" role="presentation">arrow_drop_down</i>
          <span class="visuallyhidden">Accounts</span>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
          ${data.drawer.teams.map((el) => {
            return `
              <li class="mdl-menu__item">${el.name}</li>
            `
          }).join('')}
          <li class="mdl-menu__item"><i class="material-icons" id="addTeam">add</i>Add another team...</li>
        </ul>
      </div>
    </header>
    <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      ${data.drawer.menu.map((el) => {
        return `<a class="mdl-navigation__link" id="${el.id}" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">${el.icon}</i>${el.name}</a>`
      }).join('')}
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-navigation__link" id="help" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
    </nav>
    </div>
    `
}

module.exports = Drawer
},{}],6:[function(require,module,exports){
var Header = function (data) {
    return `
    <header id="header" class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
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
},{}],7:[function(require,module,exports){
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
},{"./card":4}],8:[function(require,module,exports){
'use strict';

//App view components
var Header = require('./header')
var Drawer = require('./drawer')
var Main = require('./main')

//View Templates
var Help = require('./help')
var Ask = require('./ask')
var Search = require('./search')
var Profile = require('./profile')
var Teams = require('./teams')
var Login = require('./login')

//View Controllers
var LoginController = require('./loginController')
var AnswerController = require('./answerController')
var QuestionController = require('./questionController')

//Default state
var state = {
    header:{
        title: 'Q & A',
        menu: [
            {id: 'myQuestions', name: 'My Questions'},
            {id: 'myAnswers', name: 'My Answers'}
        ]
    },
    drawer:{
        menu:[
            {id:'ask',icon:'home',name:'Ask A Question'},
            {id:'profile',icon:'face',name:'My Profile'},
            {id:'teams',icon:'group_work',name:'Teams'}
        ],
        teams:[
            {url:'',name:'something.com'},
            {url:'',name:'otherthing.com'}
        ],
        currentTeam: 'My Team'
    },
    main: Ask(),
    profile:{
        user:{},
        teams:[
            {url:'',name:'something.com'},
            {url:'',name:'otherthing.com'}
        ]
    },
    questions:[]
}

var app = document.querySelector('#app')

var renderApp = function (data, into) {   
    into.innerHTML = [Header(data),Drawer(data),Main(data)].join('')  
    window.componentHandler.upgradeDom();
}

var config = {
    apiKey: "AIzaSyDx8YPwfxB5O9USxtqPSTapfIr7jKiGjKM",
    authDomain: "slex-c2463.firebaseapp.com",
    databaseURL: "https://slex-c2463.firebaseio.com",
    storageBucket: "slex-c2463.appspot.com",
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
    state.profile.user = user
    if(!state.profile.user) {
        state.main = Login(state)
        renderApp(state, app)
    }
})

//Click Page Views

delegate('#app', 'click', '#help', (event) => {
    event.preventDefault()   
    state.main = Help() 
    renderApp(state, app) 
})

delegate('#app', 'click', '#ask', (event) => {    
    event.preventDefault()  
    state.main = Ask() 
    renderApp(state, app) 
})

delegate('#app', 'click', '#profile', (event) => {
    event.preventDefault()
    state.main = Profile(state) 
    renderApp(state, app)
})

delegate('#app', 'click', '#teams', (event) => {
    event.preventDefault()
    state.main = Teams(state) 
    renderApp(state, app)
})

delegate('#app', 'change', '#search', (event) => {   
    event.preventDefault() 
    if(event.target.value) {        
        let loading = '<div class="center mdl-spinner mdl-js-spinner is-active"></div>'
        state.main = loading
        renderApp(state, app)

        firebase.database().ref('questions/').once('value').then((snapshot) => {
            state.questions = snapshot.val() 
            //TODO: Make a real search server, because firebase can't search
            let results = []            
            Object.keys(state.questions).filter((el) => {     
                if(state.questions[el].title.toLowerCase().match(event.target.value.toLowerCase())) {     
                    results.push(state.questions[el])
                }
            })
            state.main = Search(state)
            renderApp(state, app)     
        })
    }
})

//Login
delegate('#app', 'click', '#quickstart-sign-in', LoginController.toggleSignIn)
delegate('#app', 'click', '#quickstart-sign-up', LoginController.handleSignUp)
delegate('#app', 'click', '#quickstart-verify-email', LoginController.sendEmailVerification)
delegate('#app', 'click', '#quickstart-password-reset', LoginController.sendPasswordReset)

delegate('#app', 'click', '#sign-out', () => {
    firebase.auth().signOut()
})

//TODO: Dont know if it is necesary
function toggleDrawer () {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
    document.querySelector('.mdl-layout__obfuscator').classList.toggle('is-visible')
}

//Actions

delegate('#app', 'click', '#askButton', (event) => {
    event.preventDefault()
    var input = document.querySelector('#askQuery')
    if(input && input.value) {        
        console.log('writeNewQuestion: ' + input.value);
        QuestionController.create(state.profile.user.uid, state.profile.user.email, input.value, input.value).then(()=>{
            console.log('wroteNewQuestion');
        })
    }
})
delegate('#app', 'click', '#answerCreate', (event) => {
    event.preventDefault()
    AnswerController.create(state.profile.user.uid, event.target.dataset.id, '', '')
    .then(() => {
        return firebase.database().ref('questions/').once('value')        
    }).then((snapshot)=>{
        state.answers = snapshot.val() 
        renderApp(state, app)
    })
})
delegate('#app', 'click', '#answerButton', (event) => {
    event.preventDefault()
    var input = document.querySelector('#answerSave')
    if(input && input.value) {        
        QuestionController.create(state.profile.user.uid, input.dataset.id, input.value, input.value).then(()=>{
            console.log('answerQuestion');
        })
    }
})
////

renderApp(state, app)

},{"./answerController":2,"./ask":3,"./drawer":5,"./header":6,"./help":7,"./login":9,"./loginController":10,"./main":11,"./profile":12,"./questionController":14,"./search":15,"./teams":16}],9:[function(require,module,exports){
var Login = function (data) {
    //TODO: Pass user information for email verification
    //Also if user not found
    //Also if sing up method
    return `
    <h4 class="">Sing In</h4>
    <div class="">
    <p>Enter an email and password below and either sign in to an existing account or sign up</p>

      <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
      &nbsp;&nbsp;&nbsp;
      <input class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
      <br/><br/>
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signin">Sign In</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup">Sign Up</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-verify-email" name="verify-email">Send Email Verification</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email">Send Password Reset Email</button>

      <!-- Container where we'll display the user details -->
      <div class="quickstart-user-details-container">
        Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
        <div>Firebase auth <code>currentUser</code> object value:</div>
        <pre><code id="quickstart-account-details">null</code></pre>
      </div>
    </div>
    `
}

module.exports = Login
},{}],10:[function(require,module,exports){
var LoginController = {     
 toggleSignIn: () => {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    },

    /**
     * Handles the sign up button press.
     */
     handleSignUp: () => {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    },

    /**
     * Sends an email verification to the user.
     */
     sendEmailVerification: () => {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    },

     sendPasswordReset: () => {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }    
    
}
module.exports = LoginController
},{}],11:[function(require,module,exports){
var Main = function (data) {
  return `     
  <main id="main" class="mdl-layout__content mdl-color--grey-100">     
      <div class="demo-cards">
        ${data.main}
      </div>
  </main>
  `
}

module.exports = Main
},{}],12:[function(require,module,exports){
var Card = require('./card')

var Profile = function (data) {
    //To render profile
    //Receive details such as email, teams, number of questions, number of answers

    var user = {
        content:`
        <div>
            <p>${data.profile.user.email}</p>
            <p>3 Questions</p>
            <p>1 Answer</p>
        </div>`,
        actions:`
        <div class="mdl-card__actions">
            <a href="#" id="sign-out" class="mdl-button">Sign Out</a>
        </div>
        `
    }
    var teams = `
    <ul>
        <li>Team 1</li>
        <li>Team 2</li>
    </ul>`

    return `
        ${Card({content:user.content, actions:user.actions, title:'Profile'})}
        ${Card({content:teams, actions:'', title:'Qs'})}
    `
}

module.exports = Profile
},{"./card":4}],13:[function(require,module,exports){
var Card = require('./card')

var Question = function (data) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" id="answerCreate" data-id="${data.id}" class="mdl-button">Answer</a>
        <a href="#" id="editQuestion" data-id="${data.id}" class="mdl-button">Edit</a>
        <a href="#" id="showQuestion" data-id="${data.id}" class="mdl-button">Show</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Question'})
}

module.exports = Question;
},{"./card":4}],14:[function(require,module,exports){
var QuestionController = {
    create: (uid, email, title, body) => {
        // A post entry.
        var qData = {
            uid: uid,
            author: email,
            body: body,
            title: title,
            starCount: 0
        }
        var newQKey = firebase.database().ref().child('questions').push().key
        var updates = {};
        updates['/questions/' + newQKey] = qData
        return firebase.database().ref().update(updates)
    },
    update: (id, uid, email, title, body) => {
        var qData = {
            uid: uid,
            author: email,
            body: body,
            title: title,
            starCount: 0
        }
        return firebase.database().ref('questions/' + id).set(qData)
    },
    delete: (id) => {
        return firebase.database().ref('questions/' + id).remove()
    },
}

module.exports = QuestionController
},{}],15:[function(require,module,exports){
var Question = require('./question')
var Answer = require('./answer')

var Search = function (data) {
    let content = ''
    Object.keys(data.questions).forEach((el) => {
        content += Question(data.questions[el])
    })
    if(data.answers){
        Object.keys(data.answers).forEach((el) => {
            content += Answer(data.answers[el])
        })
    }
    return content
}

module.exports = Search
},{"./answer":1,"./question":13}],16:[function(require,module,exports){
var Card = require('./card')

var Teams = function (data) {
    var team = {
        content: `<h4>Add Team</h4>`,
        actions: `
        <div class="mdl-card__actions">
            <a href="#" class="mdl-button">Link add teams</a>
        </div>`
    }
    var content = `
        ${Card({content:team.content, actions:team.actions, title:'Add Teams'})}
        ${data.profile.teams.map( (team) => {
            let content = `<p>team content</p>`
            let actions = `
            <div class="mdl-card__actions">
                <a href="#" class="mdl-button">team actions</a>
            </div>`
            return Card({content: content, actions: actions, title: team.name})
        }).join('')}
    `
    
    return content
}

module.exports = Teams;
},{"./card":4}]},{},[8]);
