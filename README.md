## The final poject for GA-JS1

A sort of Hey Slack meet StackExchange

[https://moisbo.github.io/slex]

### Details 

0. A site that lets users in a team ask questions and write answers 
0. It uses Firebase as a database and StackExchange as a `related` API questions
0. Anyone can browse questions and answers
0. Registred users can do Ask questions and do CRUD operations on Answers of these questions

### Description Checkpoint

- An SPA structured application :white_check_mark:
- Makes HTTP requests to Firebase Database :white_check_mark:
- Makes requests to stackexchange server :white_check_mark:
- Does CRUD operations on Answers :white_check_mark:
- It perform DOM manipulation via JS :white_check_mark:
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
- Compile code using browserify
    `gulp`
- And run with `npm start`

### Code

- Material Design Lite for the layout
- Uses state and render functions
- Card.js is the most important resource as in almost every component of the view uses a `Card()`
- Code is divided with View and ViewControllers (or ViewModels)

### TODO

- Improve readability
- Create search servers, email validation
- Add teams!