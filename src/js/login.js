var Login = function (data) {
    //TODO: Pass user information for email verification
    //Also if user not found
    //Also if sing up method
    return `
    <h4 class="">Sing In</h4>
    <div class="">
    <p>Enter an email and password below and either sign in to an existing account or sign up</p>

      <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
      &nbsp;&nbsp;&nbsp;
      <input class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
      <br/><br/>
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signin">Sign In</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup">Sign Up</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-verify-email" name="verify-email">Send Email Verification</button>
      &nbsp;&nbsp;&nbsp;
      <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email">Send Password Reset Email</button>

      <!-- Container where we'll display the user details -->
      <div class="quickstart-user-details-container">
        Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
        <div>Firebase auth <code>currentUser</code> object value:</div>
        <pre><code id="quickstart-account-details">null</code></pre>
      </div>
    </div>
    `
}

module.exports = Login