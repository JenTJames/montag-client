import { useState } from "react";
import PropTypes from "prop-types";
import { Menu as MuiMenu } from "@mui/material";
import MenuList from "@mui/material/MenuList";

const Menu = ({ component, children, width = 250 }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div onClick={handleClick}>{component}</div>
      <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList sx={{ width, maxWidth: "100%" }}>{children}</MenuList>
      </MuiMenu>
    </>
  );
};

Menu.propTypes = {
  component: PropTypes.element,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
};

export default Menu;
