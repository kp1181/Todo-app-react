import React from "react";
import Fab from "@material-ui/core/Fab";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 50,
    width: "450px",
    marginTop: "10px",
    position: "block",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "15px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 50,
      borderColor: "#80bdff"
    },
    "&:hover": {
      borderRadius: 50,
      borderColor: "#80bdff"
    }
  }
});

const formDiv = {
  borderBottomRightRadius: "10px",
  borderBottomLeftRadius: "10px",
  borderWidth: "1px",
  display: "fixed",
  width: "570px",
  background: "#FFFFFF",
  marginTop: "0",
  paddingBottom: "6px",
  boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2)"
};

export class AddTodo extends React.Component {
  state = {
    title: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={formDiv}>
          <form onSubmit={this.onSubmit}>
            <InputBase
              id="bootstrap-input"
              fullwidth = "true"
              placeholder="Add Todo ..."
              value={this.state.title}
              onChange={this.onChange}
              name="title"
              classes={{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              }}
            />

            <Fab
              size="small"
              background={"white"}
              aria-label="Add"
              className={classes.fab}
              type="submit"
            >
              <ArrowUpwardIcon />
            </Fab>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddTodo);
