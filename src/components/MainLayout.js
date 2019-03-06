import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './todos/SimpleCard';
import Navbar from './Navbar';
import uuid from 'uuid';
import AddTodo from './todos/AddTodo';
import Todos from './todos/Todos';
import DetailedTodo from './detailedTodo/TodoDetails';
import Card from '@material-ui/core/Card'
import TodoDetails from './detailedTodo/TodoDetails';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
    currentType:"personal",
    currentTodo:{},
    AllTodos:{
        "personal":{
            "today":[
              {
                id:uuid.v4(),
                title:"Go to gym",
                completed:false
              },
              {
                id:uuid.v4(),
                title:"Drink protein shake",
                completed:false
              },
              {
                id:uuid.v4(),
                title:"Go to Dinner",
                completed:false
              },
            ],
            "tomorrow":[]
        },
        "work":{
          "today":[
            {
              id:uuid.v4(),
              title:"Go to office",
              completed:false
            },
            {
              id:uuid.v4(),
              title:"Have a cup of coffee",
              completed:false
            },
            {
              id:uuid.v4(),
              title:"Complete assignments",
              completed:false
            },
          ],
          "tomorrow":[]
        },
        "groceryList":{
            "today":[
              {
                id:uuid.v4(),
                title:"Go to shop",
                completed:false
              },
              {
                id:uuid.v4(),
                title:"Buy protein shake",
                completed:false
              },
              {
                id:uuid.v4(),
                title:"Buy fruits",
                completed:false
              },
            ],
            "tomorrow":[]
        },

    },
  };



  handleType = (text)=>{
      this.setState({
        currentType:text
      });
    console.log(this.state.AllTodos[text])
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.AllTodos[this.state.currentType].today.map(todo => {
      if(todo.id === id ){
        todo.completed = ! todo.completed;
      }
      return todo;
    }) })
  }

  delTodo = (id) => { 
    let type = this.state.currentType;
    let all = {...this.state.AllTodos};
    //all[type] = [...this.state.AllTodos[type].today].filter(todo => todo.id!==id);
    all[type].today = all[type].today.filter(todo => todo.id!==id);
    this.setState({currentTodo:{}});
    this.setState({AllTodos :all });
  }

  addTodo = (title) => {  
    if(title===""){
      return
    }
    const newTodo = {
      id:uuid.v4(),
      title,
      completed:false
    }
    let type = this.state.currentType;
    let all = {...this.state.AllTodos};
    all[type].today.push(newTodo);
    //all[type] = {...this.state.AllTodos[type],newTodo};
    this.setState({AllTodos :all }); 
    console.log(all);
  }

  handleTodo = (id) => {
    let type = this.state.currentType;
    let all = {...this.state.AllTodos};
    let clickedTodo = all[type].today.filter(todo => todo.id==id);
    this.setState({currentTodo : clickedTodo[0] })
  }

  render() {
    const { classes } = this.props;
    const currentTodos = this.state.currentType;
    let clickedTodo
    if( this.state.currentTodo===undefined ){
      clickedTodo = true;
    }
    else{
      clickedTodo = (Object.entries(this.state.currentTodo).length === 0 && this.state.currentTodo.constructor === Object) ? false : true;
    }

    return (
        <Navbar handleType= {this.handleType} todos={this.state.AllTodos}>
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6} style={{padding:'20px'}}>
                <h1 style={{float:'left'}}>{this.state.currentType}</h1>
                <Card style={{padding:'30px',paddingLeft:'20px',paddingRight:'20px',maxHeight:'400px',minHeight:'400px',maxWidth:'570px',minWidth:'570px',overflow: 'auto'}}>
                  
                  <Todos currentTodos={this.state.AllTodos[currentTodos].today} 
                  markComplete={this.markComplete} 
                  delTodo={this.delTodo}
                  handleTodo={this.handleTodo}
                  />
                  
                </Card>
                <AddTodo addTodo = {this.addTodo}/>


                </Grid>

                <Grid item xs={6} style={{padding:'20px'}}>
                {clickedTodo ? 
                    (
                    <TodoDetails currentTodo = {this.state.currentTodo} />
                  )
                    :
                    (<p></p>)
                  }
                </Grid>    
            </Grid>
        </Navbar>
    );
  } 
}


export default withStyles(styles)(GuttersGrid);
