import PropTypes from "prop-types";

const FlexAuto = ({ children }) => {
  return <div className="flex-auto min-w-0 m-0">{children}</div>;
};

FlexAuto.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexAuto;
