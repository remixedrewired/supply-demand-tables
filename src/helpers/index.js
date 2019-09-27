import data from "../data";

export const selectNames = {
  plan: { showName: "Plan your data", objName: "plan" },
  demand: { showName: "Demand scenario", objName: "demand" },
  supply: { showName: "Supply scenario", objName: "supply" },
};

export const fetchAllPlannings = () => Promise.resolve(data);
