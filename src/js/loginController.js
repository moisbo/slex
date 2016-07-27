
var LoginController = {
    toggleSignIn: () => {

      var messageLogin = document.querySelector('#messageLogin')

      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
      } else {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        if (email.length < 4) {
          messageLogin.innerHTML = 'Please enter an email address.'
          return
        }

        if (password.length < 4) {
          messageLogin.innerHTML = 'Please enter a password.'
          return
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message

          if (errorCode === 'auth/wrong-password') {
            messageLogin.innerHTML = 'Wrong password.'
          } else {
            messageLogin.innerHTML = errorMessage
          }

          messageLogin.innerHTML = error
          document.getElementById('quickstart-sign-in').disabled = false
        })
      }

      document.getElementById('quickstart-sign-in').disabled = true;
    },
    handleSignUp: () => {

      var messageLogin = document.querySelector('#messageLogin')
      var email = document.getElementById('email').value
      var password = document.getElementById('password').value

      //TODO: Use real email validation
      if (email.length < 4) {
        messageLogin.innerHTML = 'Please enter an email address.'
        return
      }

      if (password.length < 4) {
        messageLogin.innerHTML = 'Please enter a password.'
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message

        if (errorCode == 'auth/weak-password') {
          messageLogin.innerHTML = 'The password is too weak.'
        } else {
          messageLogin.innerHTML = errorMessage
        }
        messageLogin.innerHTML = error
      });
    },
    sendEmailVerification: () => {

      var messageLogin = document.querySelector('#messageLogin')
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        messageLogin.innerHTML = 'Email Verification Sent!'
      })
    },
    sendPasswordReset: () => {

      var messageLogin = document.querySelector('#messageLogin')
      var email = document.getElementById('email').value

      //TODO: Use real email validation
      if(!email || email.length < 4){
        messageLogin.innerHTML = 'Please provide an email'
        return
      } else{
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          messageLogin.innerHTML = 'Password Reset Email Sent!'
        }).catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message

          if (errorCode == 'auth/invalid-email') {
            messageLogin.innerHTML(errorMessage)
          } else if (errorCode == 'auth/user-not-found') {
            messageLogin.innerHTML = errorMessage
          }else {
            messageLogin.innerHTML = error
          }
        })
      }
    }
}
module.exports = LoginController