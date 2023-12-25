import { styled } from "styled-components";
import PropTypes from "prop-types";
import { NavLink as MuiNavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
  justify-content: ${({ orientation }) =>
    orientation === "vertical" ? "center" : "space-between"};
  align-items: center;
  gap: ${({ orientation }) => (orientation === "vertical" ? "5px" : "25px")};
`;

const StyledTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ orientation }) =>
    orientation === "vertical" ? "center" : "flex-start"};
`;

const NavLink = ({ to, label, icon, orientation = "vertical" }) => {
  return (
    <MuiNavLink
      className={(navData) =>
        navData.isActive
          ? "p-3 bg-primary-100 rounded-md text-primary-700"
          : "p-3 hover:bg-primary-50 rounded-md text-subtle"
      }
      to={to}
    >
      <StyledDiv orientation={orientation}>
        {icon}
        <StyledTextWrapper orientation={orientation}>
          <Typography
            className={(navData) =>
              navData.isActive
                ? "text-center text-primary-500"
                : "text-center text-subtle"
            }
            variant={orientation === "vertical" ? "caption" : "subtitle1"}
          >
            {label}
          </Typography>
        </StyledTextWrapper>
      </StyledDiv>
    </MuiNavLink>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  orientation: PropTypes.string,
};

export default NavLink;
