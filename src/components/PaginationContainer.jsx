import PropTypes from "prop-types";

const PaginationContainer = ({ total, children }) => {
  return (
    <>
      <div>{children}</div>
      <p>{total}</p>
    </>
  );
};

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  total: PropTypes.number.isRequired,
};

export default PaginationContainer;
