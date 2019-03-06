import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';


const styles = theme => (
    {
        card: {
          minWidth: 20,
          margin:'10px',
        },
        paper: {
            position: 'absolute',
            width: theme.spacing.unit * 50,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing.unit * 4,
            outline: 'none',
          },
      }
);


class TodoDetails extends Component {

    state = {
        open: false,
      };
    
      handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    

  render() {
    const { classes } = this.props;
    let clickedTodo = this.props.currentTodo===undefined ? false : true;

    return(
        <React.Fragment>
            {
            clickedTodo ? 
            (
            <Card style={{maxHeight:'400px',minHeight:'400px',maxWidth:'570px',minWidth:'570px' }}>
                <Grid container >
                    <h1 style={{marginLeft:'20px'}}>{this.props.currentTodo.title}</h1>
                    <Grid container>
                        <Grid item xs="4" onClick={this.handleOpen}>
                            <Card className={classes.card}>
                                <CardContent>
                                    Add Reminder
                                </CardContent>
                            </Card>
                        </Grid>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            >
                            <div className={classes.paper} style={{top:'38%',left:'36%',transform: 'translate(-${38}%, -${36}%)'}}>
                                <Typography variant="h6" id="modal-title">
                                Text in a modal
                                </Typography>
                                <Typography variant="subtitle1" id="simple-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </div>
                        </Modal>
                        
                        <Grid item xs="4">
                            <Card className={classes.card}>
                                <CardContent>
                                    Share Task
                                </CardContent>
                            </Card>
                        </Grid>
        
                        <Grid item xs="4">
                            <Card className={classes.card}>
                                <CardContent>
                                    Personal
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>):
                (<p></p>)
            }
        
    </React.Fragment>
    )
  }
}


export default withStyles(styles)(TodoDetails);
