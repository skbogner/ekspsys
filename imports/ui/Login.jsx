import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';



LoginView = React.createClass({
  login() {
    var val = $("#username").val();
    console.log(val);

    Meteor.loginWithUsername(val, function(err) {
      if (err) {
        throw new Meteor.Error("Login failed");
      }
    });
  },

  componentWillMount() {
    if (this.props.user || this.props.loggingIn) {
      this.context.router.push('/lang');
    }
  },

  componentDidUpdate() {
    if (this.props.user || this.props.loggingIn) {
      this.context.router.push('/lang');
    }
  },

  render() {
    return (
      <div className="ui inverted segment">
        <div className="ui inverted form">
          <div className="field">
            <label>{i18n('Username')}</label>
            <input id="username" placeholder={i18n('Username')} type="text" />
          </div>
          <div className="ui fluid submit button" onClick={this.login}>
            {i18n('Login')}
          </div>
        </div>
      </div>
    );
  }
});

LoginView.contextTypes = {
  router: React.PropTypes.object
}

LoginView.propTypes = {
  users: React.PropTypes.array
}

export default createContainer(({ params }) => {
  return {
    users: Meteor.users.find({}).fetch(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn()
  }
}, LoginView);
