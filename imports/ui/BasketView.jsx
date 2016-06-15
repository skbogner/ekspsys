import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';


BasketView = React.createClass({
  componentDidMount() {

  },

  render() {
    var bucket = this.props.bucket;
    var orders = bucket.orders();
    var that = this;
    return (
      <div>
        <table className="ui unstackable fixed table">
          <tbody>
            {_.map(orders, function(val, key) {
              if (key !== "_id") {
                var count = val.count;
                return (
                  <tr key={key}>
                    <td>
                      {val.names[moment.locale()]}
                    </td>
                    <td>
                      {count}
                    </td>
                    <td>
                      <div className="ui right floated small red button" onClick={bucket.removeOrder.bind(that, {_id: key})}>-</div>
                      <div className="ui right floated small green button" onClick={bucket.addOrder.bind(that, {_id: key, names: val.names, count: 1})}>+</div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <br/>
        {(() => {
          if (bucket.size() > 0) {
            return (
              <div>
                <div className="ui fluid green button" onClick={bucket.submitOrder}>{i18n('Submit order')}</div>
                <div className="ui fluid red button" onClick={bucket.empty}>{i18n('Empty basket')}</div>
              </div>
            );
          } else {
            return (
              <div>{i18n('Basket is empty!')}</div>
            );
          }
        })()}
      </div>
    );
  }
});

BasketView.propTypes = {
};

export default createContainer(({ params }) => {
  return {

  };
}, BasketView);
