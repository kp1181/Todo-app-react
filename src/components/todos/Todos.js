import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    console.log(this.props.currentTodos)
    return this.props.currentTodos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
        handleTodo={this.props.handleTodo}
      />
    ));
  }
}


export default Todos;
