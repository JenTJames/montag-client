import PropTypes from "prop-types";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  box-shadow: ${({ $shadow }) =>
    $shadow
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
      : "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"};
`;

const Card = ({ children, shadow = false }) => {
  return <StyledDiv className="flex w-full flex-col p-5 rounded-md gap-7" $shadow={shadow}>{children}</StyledDiv>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  shadow: PropTypes.bool,
};

export default Card;
