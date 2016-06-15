import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js';

HomeView = React.createClass({
  render() {
    var links = ["/category/0", "/category/1", "/category/2", "/category/3"]
    return (
      <div className="ui grid">
        <div className="ui eight wide column">
          <Link to={links[0]}>
            <img className="ui large centered image" src="/images/icons/hammer.svg"></img>
          </Link>
        </div>
        <div className="ui eight wide column">
          <Link to={links[1]}>
            <img className="ui large centered image" src="/images/icons/toej.svg"></img>
          </Link>
        </div>
        <div className="ui eight wide column">
          <Link to={links[2]}>
            <img className="ui large centered image" src="/images/icons/fugepistol.svg"></img>
          </Link>
        </div>
        <div className="ui eight wide column">
          <Link to={links[3]}>
            <img className="ui large centered image" src="/images/icons/bil.svg"></img>
          </Link>
        </div>
      </div>
    );
  }
});

HomeView.propTypes = {
  categories: React.PropTypes.array
}

export default createContainer(({ params }) => {
  return {
    categories: Categories.find({}).fetch()
  }
}, HomeView);
