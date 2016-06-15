import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App.jsx';
import HomeView from '../imports/ui/HomeView.jsx';
import CategoryView from '../imports/ui/CategoryView.jsx';
import Login from '../imports/ui/Login.jsx';
import Lang from '../imports/ui/Lang.jsx';
import OrdersView from '../imports/ui/OrdersView.jsx';
import BasketView from '../imports/ui/BasketView.jsx';

import '../imports/lang/da.js';
import '../imports/lang/en.js';
import '../imports/lang/pl.js';

Meteor.startup(function(){
  i18n.setDefaultLanguage('da');
  i18n.showMissing(true);
  render(
    <Router history={browserHistory}>
      <Route path="/lang" component={Lang} />
      <Route path="/login" component={Login} />
      <Route path="/" component={App}>
        <IndexRoute component={HomeView} />
        <Route path="basket" component={BasketView} />
        <Route path="orders" component={OrdersView} />
        <Route path="category/:_id" component={CategoryView} />
      </Route>
    </Router>,
    document.getElementById('render-target'));
});
