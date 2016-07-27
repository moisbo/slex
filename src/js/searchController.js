var SearchController = {
    all: () => {
        return firebase.database().ref('questions/').once('value')
    }
}

module.exports = SearchController