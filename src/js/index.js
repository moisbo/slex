'use strict';

var DB = require('./db')
var Help = require('./help')
var Ask = require('./ask')

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
        firebase.database().ref('questions/').once((snapshot) => {
        state.questions = snapshot.val() 
        let results = []
        Object.keys(state.questions).filter((el) => {            
            if(state.questions[el].text.match(event.target.value)) {
                results.push(state.questions)
            }
        })
        Render.main(Search(results), document.querySelector('#main')) 
        event.preventDefault() 
        })
    }
})