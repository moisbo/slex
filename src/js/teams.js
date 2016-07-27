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