import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ children }) => {
  return createPortal(children, document.getElementById("portal"));
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
