import React, { Component } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  relative: {
    position: "relative",
  },
  highlight: {
    backgroundColor: "lightgoldenrodyellow",
  },
  alignRight: {
    textAlign: "right",
    color: "rgba(0, 0, 0, 0.54)",
  },
});

class CustomTable extends Component {
  render() {
    const { classes, planningYears } = this.props;
    return (
      <Grid className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Planning Level</TableCell>
              {planningYears &&
                planningYears.map((year, index) => (
                  <TableCell key={index}>{year}</TableCell>
                ))}
            </TableRow>
          </TableHead>
        </Table>
      </Grid>
    );
  }
}

export default withStyles(styles)(CustomTable);
