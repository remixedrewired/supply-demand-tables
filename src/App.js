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
import CustomTable from "./components/Table";

import { selectNames, fetchAllPlannings } from "./helpers";

const styles = (theme) => ({
  layout: {
    minHeight: "calc(100vh - 60px)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
    background: "linear-gradient(10deg, #2e2e2e, #ffffff)",
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
  notifier: {
    textAlign: "center",
    marginTop: "15%",
    color: "#424242",
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
    errorMessage: "",
  };

  handleChange = (name) => (event) => {
    const { value } = event.target;
    if (this.state[name] === value) return;

    if (name === "plan")
      return this.setState({ [name]: value, demand: "", supply: "" });

    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    fetchAllPlannings()
      .then((res) => {
        if (res.length === 0) return this.setState({ loading: false });

        this.setState({
          plannings: res,
          loading: false,
          planningsYears: res.map(({ planningName }) =>
            planningName.match(/\d+/g).map(Number),
          ),
        });
        this.handleChange(selectNames.plan.objName)({
          target: { value: res[0]._id },
        });
      })
      .catch((err) =>
        this.setState({
          errorMessage: err.message || "Error on fetching tables data",
          loading: false,
        }),
      );
  };

  render() {
    const {
      loading,
      plan,
      plannings,
      demand,
      supply,
      errorMessage,
    } = this.state;
    const { classes } = this.props;

    const plans = plannings.map(({ _id, planningName }) => ({
      id: _id,
      name: planningName,
    }));

    const { planningName, planningDemand: demands, planningSupply: supplies } =
      plan && plannings.find(({ _id }) => _id === plan);

    const { planningLevels: PD } =
      demand &&
      demands &&
      demands.find(({ tableName }) => tableName === demand);
    const { planningLevels: PS } =
      supply &&
      supplies &&
      supplies.find(({ tableName }) => tableName === supply);

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
                  value={plan}
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
              {!plan && !errorMessage ? (
                <Typography variant="h5" className={classes.notifier}>
                  Please, choose a table
                </Typography>
              ) : (
                <Fragment>
                  {plan && (PD || PS) ? (
                    <CustomTable
                      planningName={planningName}
                      PD={PD}
                      PS={PS}
                    ></CustomTable>
                  ) : (
                    <Typography variant="h5" className={classes.notifier}>
                      For start planning, please select demand and supply
                      scenarios
                    </Typography>
                  )}
                </Fragment>
              )}
              <Grid className={classes.row}></Grid>
            </Grid>
          )}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
