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