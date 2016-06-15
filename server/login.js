Accounts.registerLoginHandler(function(loginRequest) {

  if (!loginRequest.username) {
    return undefined;
  }

  var user = Meteor.users.findOne({username: loginRequest.username});

  if (!user) {
    return null;
  }

  return {
    userId: user._id
  }
});
