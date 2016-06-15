Meteor.loginWithUsername = function(username, callback) {
  var loginRequest = { 'username': username };

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
}
