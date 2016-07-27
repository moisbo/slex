var QuestionController = {
    all: () => {
        return firebase.database().ref('questions/').once('value')
    },
    get: (id) => {
        return firebase.database().ref('/questions/' + id).once('value')
    },
    getByUser: (uid) => {
        return firebase.database().ref('/questions/').orderByChild('uid').equalTo(uid).once('value')
    },
    create: (uid, email, title, body) => {
        var qData = {
            uid: uid,
            author: email,
            body: body,
            title: title,
            starCount: 0
        }
        var newQKey = firebase.database().ref().child('questions').push().key
        var updates = {};
        updates['/questions/' + newQKey] = qData
        return firebase.database().ref().update(updates)
    },
    update: (id, uid, email, title, body) => {
        var qData = {
            uid: uid,
            author: email,
            body: body,
            title: title,
            starCount: 0
        }
        return firebase.database().ref('/questions/' + id).set(qData)
    },
    remove: (id) => {
        return firebase.database().ref('/questions/' + id).remove()
    },
}

module.exports = QuestionController