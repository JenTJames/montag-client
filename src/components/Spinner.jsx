import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ isLoading }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="primary" size={100} />
    </Backdrop>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Spinner;
