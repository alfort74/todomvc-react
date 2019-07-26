import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';
import classnames from 'classnames';

const ORDER_TITLES = {
  DESCENT_ORDER: 'Desc',
  ASCENT_ORDER: 'Asc',
};

const Header = ({ addTodo, order, onOrder }) => {
  const handleSave = text => {
    if (text.length !== 0) {
      addTodo(text);
    }
  };

  const renderOrderLink = orderItem => {
    const title = ORDER_TITLES[orderItem];

    return (
      <a
        className={classnames({ selected: order === orderItem })}
        style={{ cursor: 'pointer' }}
        onClick={() => onOrder(orderItem)}
      >
        {title}
      </a>
    );
  };

  const renderOrderList = () => {
    return ['DESCENT_ORDER', 'ASCENT_ORDER'].map(orderItem => (
      <li key={orderItem}>{renderOrderLink(orderItem)}</li>
    ));
  };

  return (
    <div>
      <footer className="footer">
        <ul className="filters"> {renderOrderList()} </ul>
      </footer>
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    </div>
  );
};

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default Header;
