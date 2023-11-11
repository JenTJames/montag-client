import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const Link = ({ to, children }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(to);
  };

  return (
    <Typography
      className="hover:underline cursor-pointer"
      color="primary"
      onClick={navigateHandler}
      variant="body2"
    >
      {children}
    </Typography>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
