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
    var aN = QuestionController.getByUser(state.profile.user.uid)
    var qS = AnswerController.getByUser(state.profile.user.uid)
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
        state.questions = snapshot.val()
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
            let results = []            
            Object.keys(state.questions).filter((el) => {     
                if(state.questions[el].title.toLowerCase().match(event.target.value.toLowerCase())) {     
                    results.push(state.questions[el])
                }
            })
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
        return StackExchange.query(question.title)
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