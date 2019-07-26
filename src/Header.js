import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';
import OrderButtonList from './OrderButtonList';

const Header = ({ addTodo, order, onOrder }) => {
  const handleSave = text => {
    if (text.length !== 0) {
      addTodo(text);
    }
  };

  return (
    <div>
      <footer className="footer">
        <ul className="filters">
          <OrderButtonList order={order} onOrder={onOrder} />
        </ul>
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
