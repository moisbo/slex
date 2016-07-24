var AnswerController = {
    create: (uid, qid, title, body) => {
        // A post entry.
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }
        var newQKey = firebase.database().ref().child('answers').push().key
        var updates = {};
        updates['/answers/' + newQKey] = qData
        return firebase.database().ref().update(updates)
    },
    update: (id, uid, qid, title, body) => {
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }
        return firebase.database().ref('answers/' + id).set(qData)
    },
    delete: (id) => {
        return firebase.database().ref('answers/' + id).remove()
    },
}

module.exports = AnswerController