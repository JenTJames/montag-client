import PropTypes from "prop-types";
const Row = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
