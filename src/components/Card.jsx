import PropTypes from "prop-types";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  box-shadow: ${({ $shadow }) =>
    $shadow
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
      : "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"};
`;

const Card = ({ children, shadow = false, gap = "large" }) => {
  if (gap === "large")
    return (
      <StyledDiv
        className="flex w-full flex-col p-5 rounded-md gap-7"
        $shadow={shadow}
      >
        {children}
      </StyledDiv>
    );
  if (gap === "small") {
    return (
      <StyledDiv
        className="flex w-full flex-col p-5 rounded-md gap-3"
        $shadow={shadow}
      >
        {children}
      </StyledDiv>
    );
  }
  if (gap === "x-small") {
    return (
      <StyledDiv
        className="flex w-full flex-col p-5 rounded-md gap-1"
        $shadow={shadow}
      >
        {children}
      </StyledDiv>
    );
  }
  if (gap === "none") {
    return (
      <StyledDiv
        className="flex w-full flex-col p-5 rounded-md"
        $shadow={shadow}
      >
        {children}
      </StyledDiv>
    );
  }
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  shadow: PropTypes.bool,
  gap: PropTypes.string,
};

export default Card;
