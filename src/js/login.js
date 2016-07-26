var Login = function (data) {
    return `
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
        <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__supporting-text">
          <h4 class="mdl-cell mdl-cell--12-col">Sign In</h4>
          <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
            <p>Enter an email and password below and either sign in to an existing account or sign up</p>
            <input class="mdl-textfield__input" type="text" id="email" name="email" placeholder="Email"/>
            <input class="mdl-textfield__input" type="password" id="password" name="password" placeholder="Password"/>
            <div><p id="messageLogin"></p></div>
          </div>
        </div>
        <div class="mdl-card__actions">
          <a class="mdl-button" id="quickstart-sign-in" name="signin">Sign In</a>
          <a class="mdl-button" id="quickstart-sign-up" name="signup">Sign Up</a>
          <a class="mdl-button" id="quickstart-password-reset" name="verify-email">Forgot Password</a>
        </div>
    </section>
    `
}

module.exports = Login