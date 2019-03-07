import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "./Navbar";
import uuid from "uuid";
import AddTodo from "./todos/AddTodo";
import Todos from "./todos/Todos";
import Card from "@material-ui/core/Card";
import TodoDetails from "./detailedTodo/TodoDetails";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "16",
    currentType: "personal",
    todoArray: [],
    currentTodo: {},
    currentTodoId: "",
    AllTodos: {
      personal: {
        today: [
          {
            id: uuid.v4(),
            title: "Go to gym",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Drink protein shake",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Go to Dinner",
            completed: false,
            reminder: ""
          }
        ],
        tomorrow: []
      },
      work: {
        today: [
          {
            id: uuid.v4(),
            title: "Go to office",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Have a cup of coffee",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Complete assignments",
            completed: false,
            reminder: ""
          }
        ],
        tomorrow: []
      },
      groceryList: {
        today: [
          {
            id: uuid.v4(),
            title: "Go to shop",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Buy protein shake",
            completed: false,
            reminder: ""
          },
          {
            id: uuid.v4(),
            title: "Buy fruits",
            completed: false,
            reminder: ""
          }
        ],
        tomorrow: []
      }
    }
  };

  handleType = text => {
    // let todos =[];
    // Object.keys(this.state.AllTodos).map((todoCat) => {
    //   Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
    //     this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
    //       todos.push(eachItem);
    //     })
    //   })
    // })

    this.setState({
      currentType: text
      // todoArray: todos
    });
  };

  markComplete = id => {
    this.setState({
      todos: this.state.AllTodos[this.state.currentType].today.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    let type = this.state.currentType;
    let all = { ...this.state.AllTodos };
    all[type].today = all[type].today.filter(todo => todo.id !== id);
    this.setState({ currentTodo: {} });
    this.setState({ AllTodos: all });
  };

  addTodo = title => {
    if (title === "") {
      return;
    }
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false,
      reminder: ""
    };
    let type = this.state.currentType;
    let all = { ...this.state.AllTodos };
    all[type].today.push(newTodo);
    this.setState({ AllTodos: all });
    console.log(all);
  };

  handleTodo = id => {
    let type = this.state.currentType;
    let all = { ...this.state.AllTodos };
    let clickedTodo = all[type].today.filter(todo => todo.id === id);
    this.setState({ currentTodo: clickedTodo[0], currentTodoId: id });
  };

  saveReminder = dateTime => {
    let id = this.state.currentTodoId;
    let type = this.state.currentType;
    this.setState(
      {
        todos: this.state.AllTodos[type].today.map(todo => {
          if (todo.id === id) {
            todo.reminder = JSON.stringify(dateTime);
          }
          return todo;
        })
      }
    );
  };

  render() {
    const { classes } = this.props;
    const currentTodos = this.state.currentType;
    let listAll = currentTodos === "all" ? true : false;
    let clickedTodo;
    if (this.state.currentTodo === undefined) {
      clickedTodo = true;
    } else {
      clickedTodo =
        Object.entries(this.state.currentTodo).length === 0 &&
        this.state.currentTodo.constructor === Object
          ? false
          : true;
    }

    return (
      <Navbar handleType={this.handleType} todos={this.state.AllTodos}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={6} style={{ padding: "20px" }}>
            <h1 style={{ float: "left" }}>{this.state.currentType}</h1>
            <Card
              style={{
                width: "570px",
                height: "400px",
                padding: "30px",
                paddingLeft: "20px",
                paddingRight: "20px",
                overflow: "auto",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                marginRight: "100px"
              }}
            >
              {listAll ? (
                <Todos
                  currentTodos={this.state.todoArray}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                  handleTodo={this.handleTodo}
                />
              ) : (
                <Todos
                  currentTodos={this.state.AllTodos[currentTodos].today}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                  handleTodo={this.handleTodo}
                />
              )}
            </Card>
            <AddTodo addTodo={this.addTodo} />
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              paddingLeft: "80px",
              position: "fixed",
              marginLeft: "600px"
            }}
          >
            {clickedTodo ? (
              <TodoDetails
                currentTodo={this.state.currentTodo}
                saveReminder={this.saveReminder}
              />
            ) : (
              <p />
            )}
          </Grid>
        </Grid>
      </Navbar>
    );
  }
}

export default withStyles(styles)(GuttersGrid);
