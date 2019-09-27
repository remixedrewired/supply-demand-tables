import React, { Component, Fragment } from "react";
import {
  Grid,
  Typography,
  withStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import theme from "./theme";

import Loader from "./components/Loader";
import SelectInput from "./components/SelectInput";

import { selectNames } from "./helpers";

const styles = (theme) => ({
  layout: {
    minHeight: "calc(100vh - 60px)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
    background: "linear-gradient(90deg, #dec9ee, #ffffff)",
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "35px",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});

class App extends Component {
  state = {
    loading: false,
    plannings: [],
    plan: "",
    demand: "",
    supply: "",
    planningYears: [],
  };

  handleChange = (name) => {};
  componentDidMount = () => {};

  render() {
    const {
      loading,
      plan,
      plans,
      demand,
      demands,
      supply,
      supplies,
    } = this.state;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid className={`${classes.layout}`}>
          {loading ? (
            <Loader loading={loading}></Loader>
          ) : (
            <Grid>
              <Grid className={`${classes.row} ${classes.spaceBetween}`}>
                <SelectInput
                  inputName={selectNames.plan.showName}
                  field={selectNames.plan.objName}
                  handleChange={this.handleChange}
                  labelWidth={105}
                  value={plan || "2 years"}
                  data={plans || [{ name: "No data..." }]}
                ></SelectInput>
              </Grid>
              <Grid className={classes.row}>
                <SelectInput
                  inputName={selectNames.demand.showName}
                  field={selectNames.demand.objName}
                  handleChange={this.handleChange}
                  labelWidth={127}
                  value={demand}
                  data={demands || [{ tableName: "No data..." }]}
                />
                <SelectInput
                  inputName={selectNames.supply.showName}
                  field={selectNames.supply.objName}
                  handleChange={this.handleChange}
                  labelWidth={115}
                  value={supply}
                  data={supplies || [{ tableName: "No data..." }]}
                />
              </Grid>
              <Grid className={classes.row}></Grid>
            </Grid>
          )}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
