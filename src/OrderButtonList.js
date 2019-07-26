import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ORDER_TITLES = {
  DESCENT_ORDER: 'Desc',
  ASCENT_ORDER: 'Asc',
};

export default class OrderButtons extends Component {
  static propTypes = {
    order: PropTypes.string.isRequired,
    onOrder: PropTypes.func.isRequired,
  };

  renderOrderLink(order) {
    const title = ORDER_TITLES[order];
    const { order: selectedOrder, onOrder } = this.props;

    return (
      <a
        className={classnames({ selected: order === selectedOrder })}
        style={{ cursor: 'pointer' }}
        onClick={() => onOrder(order)}
      >
        {title}
      </a>
    );
  }

  render() {
    return ['DESCENT_ORDER', 'ASCENT_ORDER'].map(order => (
      <li key={order}>{this.renderOrderLink(order)}</li>
    ));
  }
}
