import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js';
import { Items } from '../api/items.js';

CategoryView = React.createClass({
  selectedItem: null,

  componentDidMount() {

  },

  selectItem(item) {
    this.props.bucket.addOrder({_id: item._id, names: item.names, count: 1});
    this.selectedItem = item;
    //
    this.forceUpdate();
  },

  render() {
    if (!this.props.category) {
      return (
        <div className="ui loading segment">
        </div>
      );
    } else {
      var cat = this.props.category;
      var items = this.props.items;
      var that = this;

      var selector = null;
      if (!!that.selectedItem) {
        var orderOfItem = that.props.bucket.orders()[that.selectedItem._id];
        var count = orderOfItem ? orderOfItem.count : 0;
        selector = (
          <div>
            <h3 className="ui grey inverted attached header" id="selector-footer">
              {that.selectedItem.names[moment.locale()]}
              <div className="ui black label">
                {count}
              </div>
              <div className="ui small black right floated button" onClick={that.props.bucket.removeOrder.bind(that, {_id: that.selectedItem._id})}>-</div>
              <div className="ui small green right floated button" onClick={that.props.bucket.addOrder.bind(that, {_id: that.selectedItem._id, names: that.selectedItem.names, count: 1})}>+</div>
            </h3>
          </div>
        );
      }

      return (
        <div>
          <div className="ui grid" id="category-view">
            {items.map(function(item) {
              var active = !!that.selectedItem ? (that.selectedItem._id == item._id) : false;
              var classes = "ui segment" + (active ? " red":"");
              var classes_label = "ui bottom attached label" + (active ? " red" : "");
              var img_src = "/images/items/MA" + item.ma + ".png";

              var label = (<div></div>);
              var orderOfItem = that.props.bucket.orders()[item._id];
              if (orderOfItem) {
                var count = orderOfItem ? orderOfItem.count : 0;
                label = (
                  <div className="ui black label">
                    {count}
                  </div>
                );
              };

              return (
                <div className="ui eight wide column" key={item._id}>
                  <div className={classes} onClick={that.selectItem.bind(that, item)}>
                    <div className="ui fluid image">
                      <img src={img_src}></img>
                    </div>
                    <div className={classes_label}>
                      <h3 className="ui header">
                        {item.names[moment.locale()]}
                        {label}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {selector}
        </div>
      );
    }
  }
});

CategoryView.propTypes = {
  category: React.PropTypes.object,
  items: React.PropTypes.array
};

export default createContainer(({ params }) => {
  //var handle = Meteor.subscribe('category', params._id);
  return {
    category: Categories.findOne(params._id),
    items: Items.find({category: params._id}).fetch()
  };
}, CategoryView);
