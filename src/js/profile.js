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