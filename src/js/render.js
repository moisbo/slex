var Header = require('./header')
var Drawer = require('./drawer')
var Main = require('./main')

var Render = {
    header: function (data, into) {
        into.innerHTML = Header(data)
    },
    drawer: function (data, into) {
        into.innerHTML = Drawer(data)
    },
    main: function (data, into) {
        into.innerHTML = Main(data)
    }
}

module.exports = Render