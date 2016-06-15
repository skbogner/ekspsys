import React, { Component } from 'react';
import LocalStorageMixin from 'react-localstorage';

import { createContainer } from 'meteor/react-meteor-data';

import { Orders } from '../api/orders.js';


_App = React.createClass({
  displayName: 'AppComponent',
  localStorageKey: 'AppComponent',
  mixins: [LocalStorageMixin],

  componentWillMount() {
    if (!this.props.authed) {
      this.context.router.push('/login');
    }
  },

  componentDidMount() {
    // initialize i18n text for sidebar
    $('#sidebar-logout-button').html(i18n('Logout'));
    $('#sidebar-lang-button').html(i18n('Change language'));
    $('#sidebar-orders-button').html(i18n('View orders'));
    $('#sidebar-home-button').html(i18n('Home'));

    // initialize event handlers for sidebar
    var that = this;
    $('#sidebar-logout-button').on('click', function() {
      Meteor.logout();
      that.toggleSidebar();
    });

    $('#sidebar-lang-button').on('click', function() {
      Meteor.users.update(Meteor.userId(), {$unset: {'profile.lang': 1}});
      that.toggleSidebar();
      that.context.router.push('/lang');
    });

    $('#sidebar-orders-button').on('click', function() {
      that.toggleSidebar();
      that.context.router.push('/orders');
    });
    $('#sidebar-home-button').on('click', function() {
      that.toggleSidebar();
      that.context.router.push('/');
    });
  },

  componentDidUpdate() {
    if (!this.props.authed) {
      this.context.router.push('/login');
    }
  },

  componentWillUnmount() {
    $('#sidebar-logout-button').unbind('click');
    $('#sidebar-lang-button').unbind('click');
    $('#sidebar-orders-button').unbind('click');
    $('#sidebar-home-button').unbind('click');
  },

  getInitialState() {
    return {
      orders: {}
     };
  },

  bucket(that) {
    return {
      // Returns the number of orders
      size() {
        //return that.state.orders.reduce((p, c) => { return p + c.count}, 0);
        return Object.keys(that.state.orders).reduce(function (previous, key) {
          return previous + that.state.orders[key].count;
        }, 0);
      },

      orders() {
        return that.state.orders;
      },


      // Adds new order
      addOrder(order) {
        // get the id
        var _id = order._id;

        // 'update' state.orders
        var newOrders = _.extend({}, that.state.orders);
        if (newOrders[_id]) { // increment if already there
          newOrders[_id].count = newOrders[_id].count + 1;
        } else {              // insert if not
          newOrders[_id] = { names: order.names, count: 1 };
        }

        that.setState({orders: newOrders});
      },

      // Remove order
      removeOrder(order) {
        // get the id
        var _id = order._id;

        // 'update' state.orders
        var newOrders = _.extend({}, that.state.orders);
        if (newOrders[_id]) { // decrement if there
          newOrders[_id].count = newOrders[_id].count - 1;
          if (newOrders[_id].count == 0) { // if no more
            delete newOrders[_id];        // remove it alltogether
          }
        }

        that.setState({orders: newOrders});
      },

      submitOrder() {
        var order = {orders: that.state.orders}

        if (Object.keys(order.orders).length !== 0 && JSON.stringify(order.orders) !== JSON.stringify({})) {
          order.timestamp = new Date();
          order.userId = Meteor.userId();
          order.username = Meteor.user() && Meteor.user().username;
          order.status = 'new';
          Orders.insert(order);
          that.setState({orders: {}});
          alert(i18n('Order submitted!'));
        }

      },

      empty() {
        that.setState({orders: {}});
      }
    }
  },

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle');
  },

  logout() {
    this.toggleSidebar();
    Meteor.logout();
  },

  toBasket() {
    this.context.router.push('/basket');
  },

  render() {
    const bucket = this.bucket(this);
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, { bucket: bucket}));
    return (
      <div>
        <div className="ui centered item" id="the-header">
          <button className="ui circular icon left floated inverted standard button" onClick={this.toggleSidebar}>
            <i className="sidebar icon"></i>
          </button>
          <div className="item">
            <button className="ui circular icon right floated inverted standard button" onClick={this.toBasket}>
              <i className="shop icon"></i> {bucket.size()}
            </button>
          </div>
          <div className="middle aligned content">
            <h1 className="ui black inverted header">
              Fugegruppen
            </h1>
          </div>
        </div>
        <div id="children">
          {childrenWithProps}
        </div>
      </div>
    );
  }
});

_App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App = createContainer(() => {
  return {
    username: Meteor.user() && Meteor.user().username,
    authed: !!Meteor.user()
  }
}, _App);
