import { MenuItem as MuiMenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "styled-components";
const StyledLabel = styled.p`
  color: ${({ color }) => (color === "danger" ? "red" : "gray")};
`;

const MenuItem = ({ color, startIcon, children, onClick }) => {
  return (
    <MuiMenuItem onClick={onClick} disableRipple>
      <div className="flex gap-3 items-center">
        {startIcon}
        <StyledLabel color={color}>{children}</StyledLabel>
      </div>
    </MuiMenuItem>
  );
};

MenuItem.propTypes = {
  color: PropTypes.string,
  startIcon: PropTypes.element,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
