import React from "react";
import { Grid } from "@material-ui/core";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;
const Loader = (props) => {
  const { loading } = props;
  return (
    <Grid>
      <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={"##cb8215"}
        loading={loading}
      ></ClipLoader>
    </Grid>
  );
};

export default Loader;
