var Card = require('./card')

var Teams = function (data) {
    var team = {
        content: `<p>Add Team</p>`,
        actions: `<p>Link add teams</p>`
    }
    var content = `
        ${Card({content:team.content, actions:team.actions, title:'Add Teams'})}
        ${data.profile.teams.map( (team) => {
            let content = `<p>team content</p>`
            let actions = `<p>team actions</p>`
            return Card({content:content, actions:actions, title:team.name})
        }).join('')}
    `
    
    return content
}

module.exports = Teams;