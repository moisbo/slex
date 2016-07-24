var QuestionController = {
    create: (uid, email, title, body) => {
        // A post entry.
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
        return firebase.database().ref('questions/' + id).set(qData)
    },
    delete: (id) => {
        return firebase.database().ref('questions/' + id).remove()
    },
}

module.exports = QuestionController