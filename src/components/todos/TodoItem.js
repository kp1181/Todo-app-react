import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';

export class TodoItem extends Component {
    
    getStyle = ()=>{
        return{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            
        } 
    }

    

  render() {
      const {id,title} = this.props.todo;
    return (
      
        <Paper elevation={1} style={listStyle} onClick={this.props.handleTodo.bind(this,id)}>
        <Grid container>
          <Grid item xs = {1}>
            <Checkbox color="default" onChange={this.props.markComplete.bind(this,id)} style={{display:'inline-block',borderRadius:50}}/>
          </Grid>

          <Grid item xs = {10}>
            <div 
            style={{display:'inline-block',
            textDecoration: this.props.todo.completed? 'line-through': 'none',
            marginTop: '15px',
            float:'left'
            }} >
            {title}
          </div>
          </Grid>
          
          <Grid item xs = {1}>
            {/* <button style={btnStyle} onClick={this.props.delTodo.bind(this,id)}>x</button> */}
            <IconButton  aria-label="Comments" onClick={this.props.delTodo.bind(this,id)}>
                <ClearIcon style={btnStyle} />
            </IconButton>
          </Grid>
          </Grid>
        </Paper>

      //   {/* <List style={listStyle} size="small">
      //     <ListItem dense button >
            
      //       <Checkbox color="default" 
      //         onChange={this.props.markComplete.bind(this,id)} 
      //         style={{display:'inline-block'}}
      //         tabIndex={-1}
      //         disableRipple
      //       />

      //       <ListItemText primary={title}
      //         style={{display:'inline-block',textDecoration: this.props.todo.completed? 'line-through':
      //         'none'}}
      //       />
            
      //       <ListItemSecondaryAction>
              // <IconButton aria-label="Comments">
              //   <ClearIcon />
              // </IconButton>
      //       </ListItemSecondaryAction>
      //     </ListItem>
      // </List> */}



      
    )
  }
}

// PropTypes
TodoItem.propTypes = {
    todo : PropTypes.object.isRequired
}
const listStyle = {
  border: '1px solid #cccccc',
  borderRadius: '8px',
  margin: '5px',
}


const btnStyle = {
    backgroundColor : 'gray',
    color : 'white',
    border:'none',
    borderRadius: '50%',
    cursor:'pointer',
    width:20,
    height: 20,
}

export default TodoItem
