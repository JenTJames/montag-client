import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Modal = ({
  show,
  negetiveButtonHandler,
  positiveButtonHandler,
  negetiveButtonText,
  positiveButtonText,
  title,
  description,
}) => {
  return (
    <Dialog open={show} onClose={negetiveButtonHandler}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
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
  negetiveButtonText: PropTypes.string.isRequired,
  positiveButtonText: PropTypes.string.isRequired,
  negetiveButtonHandler: PropTypes.func.isRequired,
  positiveButtonHandler: PropTypes.func.isRequired,
};

export default Modal;
