import { PropTypes } from "prop-types";

const Form = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default Form;
