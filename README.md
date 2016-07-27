## The final poject for GA-JS1

A sort of Hey Slack meet StackExchange

https://moisbo.github.io/slex

### Details 

0. A site that lets users in a team ask questions and write answers 
0. It uses Firebase as a database and StackExchange as a `related` questions
0. Anyone can browse questions and answers
0. Registred users can ask questions and do CRUD operations on Answers of these questions

### Description Checkpoint

- An SPA structured application :white_check_mark:
- Makes HTTP requests to Firebase Database :white_check_mark:
- Makes requests to stackexchange API :white_check_mark:
- Does CRUD operations on Answers table :white_check_mark:
- It performs DOM manipulation via JS :white_check_mark:
- Listens for events and add interactivity based on user input :white_check_mark:

### Data Base

3 initial tables
- Users
 - However firebase structure users
- Questions
 - user id
 - question title
- Answers
 - user id
 - question id
 - answer title

### Authentication

Uses email Firebase authentication email

### Use

- Modify config.js to add your own API keys
- Compile code in src/js directory using browserify
    `gulp`
- And run with `npm start`

### Code

- Material Design Lite for the layout
- Uses state and render functions
- [card.js](./src/js/card.js) is the most important resource as is used in almost every component; for example: 
 ```javascript
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
 ```
- App is organised in Index, View and ViewControllers (or ViewModels)

![alt text](./docs/diagram.png "Diagram")


### Caveats

- Since the app is rendering every time `app` it needs to update the Material Design elements; 
to do that use `window.componentHandler.upgradeDom()` 
- There is a bug that because of that re-rendering the Drawer button loses its listener so had to fix manually
- Any registed user can delete another user answer. This has to be fixed in the permissions on firebase
- stackexchange API query parameter `q` tries to search with an 'undocumented algorithm'
 that doesn't seem to do a very good work [api.stackexchange/docs/advanced-search](https://api.stackexchange.com/docs/advanced-search)
maybe it would be better to search by tags

### TODO

- Improve readability
- Create search servers, email validation
- Add permissions so users can only edit their own answers
- Add crud to questions, add points
- Add teams!