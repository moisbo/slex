var Config = require('./config')

var StackExchange = {
    query: (q) => {
        return fetch(Config.stack.api +
                    'order=desc&sort=activity' +
                    '&site=' + Config.stack.site +
                    '&key=' + Config.stack.key +
                    '&q='+ q + 
                    '&accepted=True'
                    )
    }
}
module.exports = StackExchange