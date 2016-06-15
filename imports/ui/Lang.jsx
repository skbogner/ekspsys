import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

LangView = React.createClass({
  setLanguage(lang) {
    i18n.setLanguage(lang);
    moment.locale(lang);
    Meteor.users.update(Meteor.userId(), {$set: {'profile.lang': lang}});
  },

  componentWillMount() {
    if (this.props.user && this.props.user.profile && this.props.user.profile.lang) {
      i18n.setLanguage(this.props.user.profile.lang);
      this.context.router.push('/');
    } else if (!this.props.user && !this.props.loggingIn) {
      this.context.router.push('/login');
    }
  },

  componentDidUpdate() {
    if (this.props.user && this.props.user.profile && this.props.user.profile.lang) {
      i18n.setLanguage(this.props.user.profile.lang);
      this.context.router.push('/');
    } else if (!this.props.user && !this.props.loggingIn) {
      this.context.router.push('/login');
    }
  },

  render() {
    var that = this;
    return (
      <div className="ui centered grid container" id="button-group">
        <div className="row">
          <button className="ui fluid massive button" onClick={this.setLanguage.bind(that, 'en')}>
            English
          </button>
        </div>
        <div className="row">
          <button className="ui fluid massive button" onClick={this.setLanguage.bind(that, 'da')}>
          Dansk
          </button>
        </div>
        <div className="row">
          <button className="ui fluid massive button" onClick={this.setLanguage.bind(that, 'pl')}>
          Polski
          </button>
        </div>
      </div>
    );
  }
});

LangView.contextTypes = {
  router: React.PropTypes.object
}

export default createContainer(({ params }) => {
  return {
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn()
  }
}, LangView);
