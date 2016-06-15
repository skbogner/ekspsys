import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Orders } from '../api/orders.js';

OrdersView = React.createClass({
  componentDidMount() {

  },

  render() {
    var myLang = moment.locale();

    console.log(myLang);

    if (!this.props.orders) {
      return (
        <div className="ui loading segment">
        </div>
      );
    } else {
      var orders = this.props.orders;
      return (
        <table className="ui unstackable fixed table">
          <thead>
            <tr><th>{i18n('When')}</th>
            <th>{i18n('What')}</th></tr>
          </thead>
          <tbody>
            {orders.map(function(order) {
              return (
                <tr key={order._id}>
                  <td>
                    {moment(order.timestamp).fromNow()}
                  </td>
                  <td>
                    {_.map(order.orders, function(val, key) {
                      if (key !== "_id") {
                        return (
                          <div key={key}>
                            {val.names[moment.locale()]}: {val.count}
                          </div>);
                      }
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
});

OrdersView.propTypes = {
  orders: React.PropTypes.array,
};

export default createContainer(({ params }) => {
  return {
    orders: Orders.find({userId: Meteor.userId()}, {sort: {timestamp: -1}}).fetch()
  };
}, OrdersView);
