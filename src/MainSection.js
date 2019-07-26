import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed,
};

const TODO_ORDERS = {
  DESCENT_ORDER: (one, another) =>
    -1 * (new Date(one.date) - new Date(another.date)),
  ASCENT_ORDER: (one, another) => new Date(one.date) - new Date(another.date),
};

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    onOrder: PropTypes.func.isRequired,
  };

  state = { filter: 'SHOW_ALL', order: 'DESCENT_ORDER' };

  handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  };

  handleShow = filter => {
    this.setState({ ...this.state, filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { todos, order } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          order={order}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)}
          onOrder={this.props.onOrder}
        />
      );
    }
  }

  render() {
    const { todos, actions, order } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const orderedTodos = filteredTodos.sort(TODO_ORDERS[order]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {orderedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} {...actions} />
          ))}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
