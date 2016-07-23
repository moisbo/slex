var Card = require('./card')

var Profile = function (data) {
    //To render profile
    //Receive details such as email, teams, number of questions, number of answers

    var user = `
    <div>
        <p>User Name</p>
        <p>3 Questions</p>
        <p>1 Answer</p>
    </div>`
    var teams = `
    <ul>
        <li>Team 1</li>
        <li>Team 2</li>
    </ul>`

    return `
        ${Card({content:user, actions:'', title:'Profile'})}
        ${Card({content:teams, actions:'', title:'Qs'})}
    `
}

module.exports = Profile