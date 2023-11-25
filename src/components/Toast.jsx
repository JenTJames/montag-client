import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Portal from "./Portal";

const Toast = ({ show, close, severity, children }) => {
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={show}
        autoHideDuration={6000}
        onClose={close}
      >
        <Alert onClose={close} severity={severity} sx={{ width: "100%" }}>
          {children}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toast;
