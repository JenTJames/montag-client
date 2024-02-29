import PropTypes from "prop-types";
import MuiTypography from "@mui/material/Typography";
import Row from "./Row";

const Typography = ({
  children = "",
  variant = "body-1",
  bold = false,
  icon,
}) => {
  return (
    <Row>
      {icon && icon}
      <MuiTypography
        style={{
          fontWeight: bold ? 600 : 500,
        }}
        className="text-secondary-800"
        variant={variant}
      >
        {children}
      </MuiTypography>
    </Row>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  bold: PropTypes.bool,
  icon: PropTypes.element,
};

export default Typography;
