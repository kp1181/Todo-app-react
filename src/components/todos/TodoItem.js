import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    height: "20px",
    marginLeft: "5px"
  }
});

const listStyle = {
  border: "1px solid #FFFFFF",
  borderRadius: "4px",
  margin: "5px",
  boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2)",
  cursor: "pointer"
};

const btnStyle = {
  backgroundColor: "gray",
  color: "white",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  width: 20,
  height: 20
};


export class TodoItem extends Component {
  getStyle = () => {
    return {
      backgroundColor: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    const { id, title, reminder, completed } = this.props.todo;
    const { classes } = this.props;

    let date = reminder.substring(1, 11);
    let time = reminder.substring(12, 17) + " UTC";

    // console.log("-----------------------")
    // console.log(reminder)
    // let reminderDate = new Date(reminder);
    // console.log("checking date");
    // console.log(reminderDate)
    // let hrs = reminderDate.getHours();

    //console.log(hrs.toString())

    // let mins = reminderDate.getMinutes();
    // let year = reminderDate.getFullYear().toString();
    // let month = reminderDate.getMonth();
    // let date = reminderDate.getDate();
    //let date = reminderDate.getTime();

    return (
      <Paper style={listStyle} onClick={this.props.handleTodo.bind(this, id)}>
        <Grid container>
          <Grid item xs={1}>
            <Checkbox
              color="default"
              onChange={this.props.markComplete.bind(this, id)}
              style={{ display: "inline-block", borderRadius: 50 }}
              checked = {this.props.todo.completed ? true : false}
            />
          </Grid>

          <Grid item xs={10}>
            <div
              style={{
                display: "inline-block",
                textDecoration: this.props.todo.completed
                  ? "line-through"
                  : "none",
                marginTop: "15px",
                float: "left"
              }}
            >
              {title}
              {"    "}
              {reminder !== "" ? (
                <div style={{ display: "inline" }}>
                  <Chip label={date} className={classes.chip} />
                  <Chip label={time} className={classes.chip} />
                </div>
              ) : (
                <p />
              )}
            </div>
          </Grid>

          <Grid item xs={1}>
            {completed === true ? (
              <IconButton onClick={this.props.delTodo.bind(this, id)}>
                <ClearIcon style={btnStyle} />
              </IconButton>
            ) : (
              <p />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoItem);
