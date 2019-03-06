import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
  render() {

    return this.props.currentTodos.map((todo) => 
        <TodoItem  key={todo.id} 
        todo={todo}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
        handleTodo={this.props.handleTodo}
        />
    );
  }
}

// PropTypes
Todos.propTypes = {
    todos : PropTypes.array.isRequired
}

export default Todos;
