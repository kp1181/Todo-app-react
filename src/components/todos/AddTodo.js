import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 50,
    width:'450px',
    marginTop: '10px',
    position: 'block',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '15px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 50,
      borderColor: '#80bdff',
    },
    '&:hover': {
      borderRadius: 50,
      borderColor: '#80bdff',
    },
  },
});

export class AddTodo extends React.Component {
    state = {
      title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''});
    }
  
    onChange = (e) => this.setState({[e.target.name]:e.target.value});
    
    
  
    render() {
      const { classes } = this.props;
      return (
        <form onSubmit={this.onSubmit} style={{display: 'fixed', width: '570px', background: '#FFFFFF'}}>
          {/* <TextField 
            type="text" 
            name="title" 
            style={{ flex: '10', padding: '5px' }}
            placeholder="Add Todo ..." 
            value={this.state.title}
            onChange={this.onChange}
          /> */}

          
        <InputBase
          id="bootstrap-input"  
          fullwidth
          placeholder="Add Todo ..." 
          value={this.state.title}
          onChange={this.onChange}
          name="title" 
          classes={{
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          }}
        />

          <Fab size="small" backgroundColor={'white'} aria-label="Add" className={classes.fab} type="submit" >
            <ArrowUpwardIcon/>
          </Fab>


        </form>
      )
    }
  }


export default withStyles(styles)(AddTodo);