import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "./Navbar";
import uuid from "uuid";
import AddTodo from "./todos/AddTodo";
import Todos from "./todos/Todos";
import Card from "@material-ui/core/Card";
import TodoDetails from "./detailedTodo/TodoDetails";
import EmptyImage from "./EmptyImage";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "16",
    currentType: "Personal",
    todoArray: [],
    currentTodo: {},
    currentTodoId: "",
    AllTodos: {
      "Personal": {
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
      "Work": {
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
      "Grocery list": {
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

    let todos =[];
    if(text==="All Tasks"){
      Object.keys(this.state.AllTodos).map((todoCat) => {
        Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
          this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
            todos.push(eachItem);
          })
        })
      })
    } 

    this.setState({
      currentType: text,
      todoArray: todos
    });
  };



  markComplete = id => {
    let type=this.state.currentType
    
    let todos = []
    if(type==="All Tasks"){
      type = this.getTypeFromId(id);
    }

    this.setState({
      todos: this.state.AllTodos[type].today.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });

    Object.keys(this.state.AllTodos).map((todoCat) => {
      Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
        this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
          todos.push(eachItem);
        })
      })
    })

    this.setState({todoArray: todos});

  };

  delTodo = id => {
    let type = this.state.currentType;
    let todos = []
    

    if(type==="All Tasks"){
      type = this.getTypeFromId(id);
    }
    let all = { ...this.state.AllTodos };
    all[type].today = all[type].today.filter(todo => todo.id !== id);

    this.setState({ currentTodo: {}, AllTodos: all },()=>console.log(this.state.AllTodos));

    Object.keys(this.state.AllTodos).map((todoCat) => {
      Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
        this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
          todos.push(eachItem);
        })
      })
    })

    this.setState({todoArray: todos});
  };

  addTodo = title => {
    let todos = []
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
    if(type==="All Tasks"){
      type = "Personal"
    }
    let all = { ...this.state.AllTodos };
    all[type].today.push(newTodo);

    this.setState({ AllTodos: all },() => console.log(this.state.AllTodos));

    Object.keys(this.state.AllTodos).map((todoCat) => {
      Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
        this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
          todos.push(eachItem);
        })
      })
    })

    this.setState({todoArray: todos});
    
  };

  handleTodo = id => {
    let type = this.state.currentType;

    if(type==="All Tasks"){
      type = this.getTypeFromId(id);
    }

    let all = { ...this.state.AllTodos };
    let clickedTodo = all[type].today.filter(todo => todo.id === id);
    this.setState({ currentTodo: clickedTodo[0], currentTodoId: id });
  };

  saveReminder = dateTime => {
    let todos = []
    let id = this.state.currentTodoId;
    let type = this.state.currentType;
    if(type==="All Tasks"){
      type = this.getTypeFromId(id);
    }
    
    this.setState(
      {
        todos: this.state.AllTodos[type].today.map(todo => {
          if (todo.id === id) {
            todo.reminder = dateTime.toString();
          }
          return todo;
        })
      }
    );

    Object.keys(this.state.AllTodos).map((todoCat) => {
      Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
        this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
          todos.push(eachItem);
        })
      })
    })

    this.setState({todoArray: todos});

    
  };

  getTypeFromId(id){
    let type="Personal"
    console.log("In getTypeFromId")
    Object.keys(this.state.AllTodos).map((todoCat) => {
      Object.keys(this.state.AllTodos[todoCat]).map( (todoTime) => {
        this.state.AllTodos[todoCat][todoTime].map((eachItem) => {
          if(eachItem["id"]==id){
            type=todoCat
          }
        })
      })
    })
    return type
  }

  addNewTask = (task) => {
    if(task==""){
      return
    }
    const newTask = {
      today:[],
      tomorrow:[]
    };

    let all = { ...this.state.AllTodos };
    all[task] = newTask
    this.setState({ AllTodos: all })
  }

  render() {
    const { classes } = this.props;
    const currentTodos = this.state.currentType;
    let listAll = currentTodos === "All Tasks" ? true : false;
    let clickedTodo;
    if (typeof this.state.currentTodo === "undefined") {
      clickedTodo = true;
    } else {
      clickedTodo =
        Object.entries(this.state.currentTodo).length === 0 &&
        this.state.currentTodo.constructor === Object
          ? false
          : true;
    }
    console.log(clickedTodo)
    console.log(this.state.currentTodo)

    return (
      <Navbar handleType={this.handleType} todos={this.state.AllTodos} addNewTask = {this.addNewTask}>
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
                marginRight: "200px"
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
              <React.Fragment>
                {console.log("mannnn")}
              <EmptyImage/>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Navbar>
    );
  }
}

export default withStyles(styles)(GuttersGrid);
