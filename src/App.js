import React, { Component } from 'react';
import Header from './Header';
import MainSection from './MainSection';

const initialState = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: initialState,
      gameID: null,
      player: 0,
      order: 'DESCENT_ORDER',
    };
  }

  addTodo = text => {
    const todos = [
      {
        id:
          this.state.todos.reduce(
            (maxId, todo) => Math.max(todo.id, maxId),
            -1
          ) + 1,
        completed: false,
        text: text,
        date: Date().toString(),
      },
      ...this.state.todos,
    ];
    this.setState({ todos });
  };

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  };

  editTodo = (id, text) => {
    const date = Date.toString();
    const todos = this.state.todos.map(
      todo => (todo.id === id ? { ...todo, text, date } : todo)
    );
    this.setState({ todos });
  };

  completeTodo = id => {
    const todos = this.state.todos.map(
      todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
    this.setState({ todos });
  };

  completeAll = () => {
    const areAllMarked = this.state.todos.every(todo => todo.completed);
    const todos = this.state.todos.map(todo => {
      return { ...todo, completed: !areAllMarked };
    });
    this.setState({ todos });
  };

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.completed === false);
    this.setState({ todos });
  };

  handleOrder = order => {
    this.setState({ order });
  };

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    completeAll: this.completeAll,
    clearCompleted: this.clearCompleted,
  };

  render() {
    return (
      <div>
        <Header
          addTodo={this.actions.addTodo}
          order={this.state.order}
          onOrder={this.handleOrder.bind(this)}
        />
        <MainSection
          todos={this.state.todos}
          actions={this.actions}
          order={this.state.order}
          onOrder={this.handleOrder.bind(this)}
        />
      </div>
    );
  }
}

export default App;
