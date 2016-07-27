(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./card":4}],2:[function(require,module,exports){
var AnswerController = {
    get: (id) => {
        return firebase.database().ref('/answers/' + id).once('value')
    },
    getByQuestion: (qid) => {
        return firebase.database().ref('/answers/').orderByChild('qid').equalTo(qid).once('value')
    },
    getByUser: (uid) => {
        return firebase.database().ref('/answers/').orderByChild('uid').equalTo(uid).once('value')
    },
    create: (uid, qid, title, body) => {
        return firebase.database().ref().child('/answers/').push().key
    },
    set: (id, uid, qid, title, body) => {
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }

        return firebase.database().ref('/answers/' + id).set(qData)
    },
    update: (id, key, value) => {
        var updates = {};
        updates[key] = value;

        return firebase.database().ref('/answers/' + id).update(updates)
    },
    remove: (id) => {
        return firebase.database().ref('/answers/' + id).remove()
    },
}

module.exports = AnswerController
},{}],3:[function(require,module,exports){
var Card = require('./card')

var Ask = function (data) {
    var content = `
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input id="askQuery" class="mdl-textfield__input" type="text"/>
    </div>
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
            <div class="mdl-card__supporting-text">
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
var Config = {
    stack:{
        api:'https://api.stackexchange.com/2.2/questions?',
        site:'stackoverflow',
        key:'D*tDhJk*ZmPw2q8r9T*RjQ(('
    },
    fb:{
        apiKey: "AIzaSyDx8YPwfxB5O9USxtqPSTapfIr7jKiGjKM",
        authDomain: "slex-c2463.firebaseapp.com",
        databaseURL: "https://slex-c2463.firebaseio.com",
        storageBucket: "slex-c2463.appspot.com"
    }
}
module.exports = Config
},{}],6:[function(require,module,exports){
var Drawer = function (data) {
    var menu = [
      {id:'browse',icon:'group_work',name:'Browse Questions'}
    ]

    if(data.profile.user){
      menu.push(
        {id:'ask',icon:'home',name:'Ask A Question'},
        {id:'profile',icon:'face',name:'My Profile'}
        )
    }else {
      menu.push({id:'login',icon:'face',name:'Sing In'})
    }

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
      ${menu.map((el) => {
        return `<a class="mdl-navigation__link" id="${el.id}" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">${el.icon}</i>${el.name}</a>`
      }).join('')}
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-navigation__link" id="help" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
    </nav>
    </div>
    `
}

module.exports = Drawer
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
var Card = require('./card')

var Help = function (data) {
    var content = `
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <p>This is the help section</p>
    </div>
    `
    var actions = `
    <div class="mdl-card__actions">
        <a href="#" class="mdl-button">Details</a>
    </div>
    `
  return Card({content: content, actions: actions, title:'Help'})
}
module.exports = Help
},{"./card":4}],9:[function(require,module,exports){
'use strict';

var Config = require('./config')

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
var SearchController = require('./searchController')
var StackExchange = require('./stackExchange')

//Default state
var state = {
    header:{
        title: 'Q & A',
        menu: [
            {id: 'sign-out-header', name: 'Sign Out'}
        ]
    },
    drawer:{
        teams:[],
        currentTeam: 'My Team'
    },
    main: Ask(),
    profile:{
        user:{},
        teams:[
            {url:'',name:'myteam.com'},
            {url:'',name:'myotherteam.com'}
        ],
        nuQuestions:0,
        nuAnswers:0
    },
    questions:[],
    search:[],
    stackExchange: []
}

var app = document.querySelector('#app')

var renderApp = function (data, into) {   
    into.innerHTML = [Header(data), Drawer(data), Main(data)].join('') 
    //Upgrade MDL Components
    window.componentHandler.upgradeDom();
}

var renderLoading = function () {
    let loading = `
    <section class="center">
    <div class="mdl-spinner mdl-js-spinner is-active"></div>
    </section>
    `
    state.main = loading
    renderApp(state, app)
}

firebase.initializeApp(Config.fb)

firebase.auth().onAuthStateChanged(function(user) {
    state.profile.user = user
    if(!state.profile.user) {
        state.main = Login(state)
        renderApp(state, app)
    }else{
        state.main = Ask(state)
        renderApp(state, app)
    }
})

delegate('#app', 'click', '#login', (event) => {
    event.preventDefault()
    state.main = Login(state)
    renderApp(state, app)
})

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
    renderLoading()
    var qS = QuestionController.getByUser(state.profile.user.uid)
    var aN = AnswerController.getByUser(state.profile.user.uid)
    Promise.all([aN, qS]).then((res) => {
        //Get Number of answers and question per user uid
        state.profile.nuAnswers = res[0].numChildren()
        state.profile.nuQuestions = res[1].numChildren()
        state.main = Profile(state)
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })

})

delegate('#app', 'click', '#browse', (event) => {
    event.preventDefault()
    renderLoading()
    SearchController.all()
    .then((snapshot) => {
        state.questions = snapshot.val() || []
        state.main = Search(state, 'hide')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

delegate('#app', 'change', '#search', (event) => {
    event.preventDefault()
    if(event.target.value) {
        renderLoading()
        SearchController.all()
        .then((snapshot) => {
            state.questions = snapshot.val() 
            //TODO: Make a real search server, because firebase can't search
            
            var results = []
            Object.keys(state.questions).filter((el) => {
                if(state.questions[el].title.toLowerCase().match(event.target.value.toLowerCase())) {
                    results.push(state.questions[el])
                }
            })
            state.questions = results
            state.main = Search(state, 'hide')
            renderApp(state, app)
        })
        .catch((error) => {
            console.log(error);
        })
    }
})

delegate('#app', 'click', '#showQuestion', (event) => {
    event.preventDefault()
    var question = {}
    QuestionController.get(event.target.dataset.id)
    .then((snapshot) => {
        question[event.target.dataset.id] = snapshot.val()
        state.questions = question
        return AnswerController.getByQuestion(event.target.dataset.id)
    })
    .then((snapshot) => {
        state.answers = snapshot.val()
        state.main = Search(state, 'show')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

delegate('#app', 'click', '#showStackExchange', (event) => {
    var question = {}
    QuestionController.get(event.target.dataset.id)
    .then((snapshot) => {
        question[event.target.dataset.id] = snapshot.val()
        state.questions = question
        return StackExchange.query(question[event.target.dataset.id].title)
    })
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        state.stackExchange = response.items
        state.main = Search(state, 'so')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

//Login
delegate('#app', 'click', '#quickstart-sign-in', LoginController.toggleSignIn)
delegate('#app', 'click', '#quickstart-sign-up', LoginController.handleSignUp)
delegate('#app', 'click', '#quickstart-verify-email', LoginController.sendEmailVerification)
delegate('#app', 'click', '#quickstart-password-reset', LoginController.sendPasswordReset)

delegate('#app', 'click', '#sign-out', () => {
    firebase.auth().signOut()
})

delegate('#app', 'click', '#sign-out-header', () => {
    firebase.auth().signOut()
})

//Ask
delegate('#app', 'click', '#askButton', (event) => {
    event.preventDefault()
    var input = document.querySelector('#askQuery')
    if(input && input.value) {
        renderLoading()
        QuestionController.create(state.profile.user.uid, state.profile.user.email, input.value, input.value)
        .then(() => {
            state.main = Ask(state)
            renderApp(state, app)
        })
        .catch((error) => {
            console.log(error);
        })
    }
})

//Answers
delegate('#app', 'click', '#answerCreate', (event) => {
    event.preventDefault()
    var qid = event.target.dataset.id
    var key = AnswerController.create(state.profile.user.uid, qid, '', '')
    AnswerController.set(key, state.profile.user.uid, qid, '', '')
    .then(() => {
        return AnswerController.get(key)
    }).then((snapshot) => {
        var qs = {}
        qs[qid] = state.questions[qid]
        state.questions = qs
        var aS = {}
        aS[key] = snapshot.val()
        state.answers = aS
        state.main = Search(state, 'edit')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

delegate('#app', 'click', '.answerEditBtn', (event) => {
    event.preventDefault()
    var question = {}
    var answer = {}
    var input = event.target
    AnswerController.get(input.dataset.id)
    .then((snapshot) => {
        answer[input.dataset.id] = snapshot.val()
        return QuestionController.get(event.target.dataset.qid)
    }).then((snapshot) => {
        question[event.target.dataset.qid] = snapshot.val()
        state.questions = question
        state.answers = answer
        state.main = Search(state, 'edit')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

delegate('#app', 'click', '.answerSaveBtn', (event) => {
    event.preventDefault()
    var input = document.querySelector('#answerEdit')
    AnswerController.update(input.dataset.id, 'title', input.value)
    .then(() => {
        return AnswerController.getByQuestion(input.dataset.qid)
    }).then((snapshot) => {
        state.answers = snapshot.val()
        state.main = Search(state, 'show')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

delegate('#app', 'click', '.answerDeleteBtn', (event) => {
    event.preventDefault()
    AnswerController.remove(event.target.dataset.id)
    .then(() => {
        return AnswerController.getByQuestion(event.target.dataset.qid)
    })
    .then((snapshot) => {
        state.answers = snapshot.val()
        state.main = Search(state, 'show')
        renderApp(state, app)
    })
    .catch((error) => {
        console.log(error);
    })
})

/*
These next two delegates fix a bug in Material Design Lite that when re-render the listener was removed
Even with component.upgradeDom()
*/
delegate('#app', 'click', '.mdl-layout__drawer-button', (event) => {
    var drawer = document.querySelector('.mdl-layout__drawer')
    if(drawer) {
        drawer.classList.add('is-visible')
    }
    var obs = document.querySelector('.mdl-layout__obfuscator')
    if(obs) {
        obs.classList.add('is-visible')
    }
})
delegate('#app', 'click', '.mdl-layout__content', (event) => {
    var drawer = document.querySelector('.mdl-layout__drawer')
    if(drawer) {
        drawer.classList.remove('is-visible')
    }
    var obs = document.querySelector('.mdl-layout__obfuscator')
    if(obs){
        obs.classList.remove('is-visible')
    }
})
//End fix bug MDL

renderApp(state, app)
},{"./answerController":2,"./ask":3,"./config":5,"./drawer":6,"./header":7,"./help":8,"./login":10,"./loginController":11,"./main":12,"./profile":13,"./questionController":15,"./search":16,"./searchController":17,"./stackExchange":19,"./teams":20}],10:[function(require,module,exports){
var Login = function (data) {
    return `
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
        <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__supporting-text">
          <h4 class="mdl-cell mdl-cell--12-col">Sign In</h4>
          <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
            <p>Enter an email and password below and either sign in to an existing account or sign up</p>
            <input class="mdl-textfield__input" type="text" id="email" name="email" placeholder="Email"/>
            <input class="mdl-textfield__input" type="password" id="password" name="password" placeholder="Password"/>
            <div><p id="messageLogin"></p></div>
          </div>
        </div>
        <div class="mdl-card__actions">
          <a class="mdl-button" id="quickstart-sign-in" name="signin">Sign In</a>
          <a class="mdl-button" id="quickstart-sign-up" name="signup">Sign Up</a>
          <a class="mdl-button" id="quickstart-password-reset" name="verify-email">Forgot Password</a>
        </div>
    </section>
    `
}

module.exports = Login
},{}],11:[function(require,module,exports){

var LoginController = {
    toggleSignIn: () => {

      var messageLogin = document.querySelector('#messageLogin')

      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
      } else {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        if (email.length < 4) {
          messageLogin.innerHTML = 'Please enter an email address.'
          return
        }

        if (password.length < 4) {
          messageLogin.innerHTML = 'Please enter a password.'
          return
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message

          if (errorCode === 'auth/wrong-password') {
            messageLogin.innerHTML = 'Wrong password.'
          } else {
            messageLogin.innerHTML = errorMessage
          }

          messageLogin.innerHTML = error
          document.getElementById('quickstart-sign-in').disabled = false
        })
      }

      document.getElementById('quickstart-sign-in').disabled = true;
    },
    handleSignUp: () => {

      var messageLogin = document.querySelector('#messageLogin')
      var email = document.getElementById('email').value
      var password = document.getElementById('password').value

      //TODO: Use real email validation
      if (email.length < 4) {
        messageLogin.innerHTML = 'Please enter an email address.'
        return
      }

      if (password.length < 4) {
        messageLogin.innerHTML = 'Please enter a password.'
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message

        if (errorCode == 'auth/weak-password') {
          messageLogin.innerHTML = 'The password is too weak.'
        } else {
          messageLogin.innerHTML = errorMessage
        }
        messageLogin.innerHTML = error
      });
    },
    sendEmailVerification: () => {

      var messageLogin = document.querySelector('#messageLogin')
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        messageLogin.innerHTML = 'Email Verification Sent!'
      })
    },
    sendPasswordReset: () => {

      var messageLogin = document.querySelector('#messageLogin')
      var email = document.getElementById('email').value

      //TODO: Use real email validation
      if(!email || email.length < 4){
        messageLogin.innerHTML = 'Please provide an email'
        return
      } else{
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          messageLogin.innerHTML = 'Password Reset Email Sent!'
        }).catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message

          if (errorCode == 'auth/invalid-email') {
            messageLogin.innerHTML(errorMessage)
          } else if (errorCode == 'auth/user-not-found') {
            messageLogin.innerHTML = errorMessage
          }else {
            messageLogin.innerHTML = error
          }
        })
      }
    }
}
module.exports = LoginController
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
var Card = require('./card')

var Profile = function (data) {
    var user = {
        content:`
        <div>
            <p>${data.profile.user.email}</p>
            <p>Email Verified: ${data.profile.user.emailVerified ? 'yes' : 'no'}</p>
            ${!data.profile.user.displayName ? '' : '<p>Name:' + data.profile.user.displayName + '</p>'}
        </div>
        `,
        actions:`
        <div class="mdl-card__actions">
            <a href="#" id="sign-out" class="mdl-button">Sign Out</a>
            <a class="mdl-button" id="quickstart-verify-email" name="verify-email">Send Email Verification</a>
        </div>
        `
    }

    var teams = {
        content:`
        <div>
            <p>Questions: ${data.profile.nuQuestions}</p>
            <p>Answers: ${data.profile.nuAnswers}</p>        
        </div>
        `,
        actions:`
        <div class="mdl-card__actions">
            <a href="#" id="sign-out" class="mdl-button"></a>
        </div>`
    }

    return `
        ${Card({content: user.content, actions: user.actions, title:'Profile'})}
        ${Card({content: teams.content, actions: teams.actions, title:'Activity'})}
    `
}

module.exports = Profile
},{"./card":4}],14:[function(require,module,exports){
var Card = require('./card')

var Question = function (data, id, profile) {
    var content = `
    <h4>${data.title}</h4>
    `
    var actions = `
    <div class="mdl-card__actions">
    `
    if(profile.user){
    actions += `
        <a href="#" id="answerCreate" data-id="${id}" class="mdl-button">Answer</a>
    `
    }
    actions += `
        <a href="#" id="showQuestion" data-id="${id}" class="mdl-button">Show Answers</a>
        <a href="#" id="showStackExchange" data-id="${id}" class="mdl-button">Related</a>
    </div>
    `
  return Card({content: content, actions: actions, title: 'Question'})
}

module.exports = Question;
},{"./card":4}],15:[function(require,module,exports){
var QuestionController = {
    all: () => {
        return firebase.database().ref('questions/').once('value')
    },
    get: (id) => {
        return firebase.database().ref('/questions/' + id).once('value')
    },
    getByUser: (uid) => {
        return firebase.database().ref('/questions/').orderByChild('uid').equalTo(uid).once('value')
    },
    create: (uid, email, title, body) => {
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
        return firebase.database().ref('/questions/' + id).set(qData)
    },
    remove: (id) => {
        return firebase.database().ref('/questions/' + id).remove()
    },
}

module.exports = QuestionController
},{}],16:[function(require,module,exports){
var Question = require('./question')
var Answer = require('./answer')
var Stack = require('./stack')

var Search = function (data, option) {
    let content = ''

    Object.keys(data.questions).forEach((el) => {
        content += Question(data.questions[el], el, data.profile)
    })

    //The state should have the answers of this quesiton
    if(data.answers && (option === 'edit' || option === 'show')){
        Object.keys(data.answers).forEach((el) => {
            content += Answer(data.answers[el], el, option, data.profile)
        })
    }

    //If option has 'so' show their answers
    if(data.stackExchange.length > 0 && option === 'so') {
        content += '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">'
        content += '<ul class="demo-list-three mdl-list">'
        data.stackExchange.forEach((q) => {
            content += Stack(q)
        })
        content += '</ul>'
        content += '</section>'
    }

    return content
}

module.exports = Search
},{"./answer":1,"./question":14,"./stack":18}],17:[function(require,module,exports){
var SearchController = {
    all: () => {
        return firebase.database().ref('questions/').once('value')
    }
}

module.exports = SearchController
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
var Config = require('./config')

var StackExchange = {
    query: (q) => {
        return fetch(Config.stack.api +
                    'order=desc&sort=activity' +
                    '&site=' + Config.stack.site +
                    '&key=' + Config.stack.key +
                    '&q='+ q + 
                    '&accepted=True'
                    )
    }
}
module.exports = StackExchange
},{"./config":5}],20:[function(require,module,exports){
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
},{"./card":4}]},{},[9]);
