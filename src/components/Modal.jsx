import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PiSealWarningFill } from "react-icons/pi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Modal = ({
  show,
  negetiveButtonHandler,
  positiveButtonHandler,
  negetiveButtonText,
  positiveButtonText,
  title,
  description,
  severity = "success",
}) => {
  return (
    <Dialog open={show} onClose={negetiveButtonHandler}>
      <DialogTitle>
        <div className="flex items-center gap-2">
          {severity === "success" ? (
            <IoCheckmarkDoneCircle size={40} color="limegreen" />
          ) : (
            <PiSealWarningFill size={40} color="orange" />
          )}
          {title}
        </div>
      </DialogTitle>
      <DialogContent className="ml-11">
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={negetiveButtonHandler}>{negetiveButtonText}</Button>
        <Button onClick={positiveButtonHandler} autoFocus>
          {positiveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  negetiveButtonText: PropTypes.string,
  positiveButtonText: PropTypes.string.isRequired,
  negetiveButtonHandler: PropTypes.func,
  positiveButtonHandler: PropTypes.func.isRequired,
  severity: PropTypes.string,
};

export default Modal;
