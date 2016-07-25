var Card = require('./card')

var Profile = function (data) {
    //To render profile
    //Receive details such as email, teams, number of questions, number of answers

    var user = {
        content:`
        <div>
            <p>${data.profile.user.email}</p>
            <p>Email Verified: ${data.profile.user.emailVerified ? 'yes' : 'no'}</p>
            <p>${data.profile.user.displayName}</p>
        </div>
        `,
        actions:`
        <div class="mdl-card__actions">
            <a href="#" id="sign-out" class="mdl-button">Sign Out</a>
        </div>
        `
    }
    var teams = {
        content:`
        <div>
            <p>Questions: ${data.numberQuestions}</p>
            <p>Answers: ${data.numberAnswers}</p>        
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