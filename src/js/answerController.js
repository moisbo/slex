var AnswerController = {
    get: (id) => {
        return firebase.database().ref('/answers/' + id).once('value')
    },
    getByQuestion: (qid) => {
        return firebase.database().ref('/answers/').orderByChild('qid').equalTo(qid).once('value')
    },
    getByUser: (uid) => {
        return firebase.database().ref('/answers/').orderByChild('uid').equalTo(uid).once('value')
    },
    create: (uid, qid, title, body) => {
        return firebase.database().ref().child('/answers/').push().key
    },
    set: (id, uid, qid, title, body) => {
        var qData = {
            uid: uid,
            qid: qid,
            body: body,
            title: title,
            starCount: 0
        }

        return firebase.database().ref('/answers/' + id).set(qData)
    },
    update: (id, key, value) => {
        var updates = {};
        updates[key] = value;

        return firebase.database().ref('/answers/' + id).update(updates)
    },
    remove: (id) => {
        return firebase.database().ref('/answers/' + id).remove()
    },
}

module.exports = AnswerController