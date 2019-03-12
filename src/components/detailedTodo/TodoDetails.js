import "date-fns";
import React, { Component } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import ShareIcon from "@material-ui/icons/Share";
import NotesIcon from "@material-ui/icons/Notes"

const styles = theme => ({
  card: {
    minWidth: 30,
    margin:"5px",
    cursor: "pointer",
    height : "70px"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  grid: {
    width: "70%"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class TodoDetails extends Component {
  state = {
    open: false,
    selectedDate: new Date()
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  save = () => {
    this.props.saveReminder(this.state.selectedDate);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    let clickedTodo = this.props.currentTodo === undefined ? false : true;

    return (
      <React.Fragment>
        {clickedTodo ? (
          <Card style={{ height: "400px", width: "400px", marginTop: "90px",padding:'20px' }}>
            <Grid container>
              <h1 style={{ marginLeft: "20px" }}>
                {this.props.currentTodo.title}
              </h1>
              <Grid container>
                <Grid  item xs onClick={this.handleOpen}>
                  <Card className={classes.card} style={{paddingBottom:'20px'}}>
                    
                    <CardContent>
                      <AlarmIcon size="small" color="disabled"/>
                      <Typography component="p" style={{fontSize:'12px',color:'#808080'}}>Add Reminder</Typography>  
                    </CardContent>
                  </Card>
                </Grid>

                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}>
                  <div
                    className={classes.paper}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-${50}%, -${50}%)`,
                      maxWidth: "400px"
                    }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        className={classes.grid}
                        justify="space-around"
                      >
                        <DatePicker
                          margin="normal"
                          label="Date picker"
                          value={selectedDate}
                          onChange={this.handleDateChange}
                        />
                        <TimePicker
                          margin="normal"
                          label="Time picker"
                          value={selectedDate}
                          onChange={this.handleDateChange}
                        />
                        <Button
                          onClick={this.save}
                          color="primary"
                          className={classes.button}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={this.handleClose}
                          className={classes.button}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                </Modal>

                <Grid item xs>
                  <Card className={classes.card}>
                  <CardContent>
                      <ShareIcon size="small" color="disabled"/>
                      <Typography component="p" style={{fontSize:'12px',color:'#808080'}}>Share</Typography>  
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs>
                  <Card className={classes.card}>
                  <CardContent>
                      <NotesIcon size="small" color="disabled"/>
                      <Typography component="p" style={{fontSize:'12px',color:'#808080'}}>Personal</Typography>  
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Grid>
          </Card>
        ) : (
          <p />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TodoDetails);
