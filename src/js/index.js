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
var SearchController = require('./searchController')

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
    questions:[],
    search:[],
    showAnswers: false
}

var app = document.querySelector('#app')

var renderApp = function (data, into) {   
    into.innerHTML = [Header(data), Drawer(data), Main(data)].join('')  
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
        let loading = '<div class="mdl-spinner mdl-js-spinner is-active"></div>'
        state.main = loading
        renderApp(state, app)
        SearchController.all()
        .then((snapshot) => {
            state.questions = snapshot.val() 
            //TODO: Make a real search server, because firebase can't search
            let results = []            
            Object.keys(state.questions).filter((el) => {     
                if(state.questions[el].title.toLowerCase().match(event.target.value.toLowerCase())) {     
                    results.push(state.questions[el])
                }
            })
            state.main = Search(state, 'hide')
            renderApp(state, app)    
        })
    }
})

delegate('#app', 'click', '#showQuestion', (event) => {
    event.preventDefault()
    QuestionController.get(event.target.dataset.id)
    .then((snapshot) => {
        let obj = {}
        obj[event.target.dataset.id] = snapshot.val()
        state.questions = obj
        return AnswerController.getByQuestion(event.target.dataset.id)
    })
    .then((snapshot) => {
        state.answers = snapshot.val()
        state.main = Search(state, 'answer')
        renderApp(state, app)
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
//Ask
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
})

delegate('#app', 'click', '#answerEditBtn', (event) => {
    event.preventDefault()
    var input = document.querySelector('#answerEdit')
    if(input && input.value) {        
        AnswerController.update(input.dataset.id, 'title', input.value).then(() => {
            console.log('answerQuestion');
        })
    }
})

delegate('#app', 'click', '#answerDeleteBtn', (event) => {
    event.preventDefault()     
    AnswerController.remove(event.target.dataset.id)
    .then(() => {        
        return AnswerController.getByQuestion(event.target.dataset.qid)
    })
    .then((snapshot) => {            
        state.answers = snapshot.val()
        renderApp(state, app)
    })
})

/*
These next two delegates fix a bug in Material Design Lite that when re-render the listener was removed
Even with component.upgradeDom()
*/
delegate('#app', 'click', '.mdl-layout__drawer-button', (event) => {
    var drawer = document.querySelector('.mdl-layout__drawer')
    if(drawer){
        drawer.classList.add('is-visible')
    }
    var obs = document.querySelector('.mdl-layout__obfuscator')
    if(obs){
        obs.classList.add('is-visible')
    }
})
delegate('#app', 'click', '.mdl-layout__content', (event) => {
    var drawer = document.querySelector('.mdl-layout__drawer')
    if(drawer){
        drawer.classList.remove('is-visible')
    }
    var obs = document.querySelector('.mdl-layout__obfuscator')
    if(obs){
        obs.classList.remove('is-visible')
    }
})

renderApp(state, app)
