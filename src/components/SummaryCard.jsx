import PropTypes from "prop-types";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  background: ${({ $bg }) => $bg};
`;

const StyledValue = styled.h4`
  color: ${({ color }) => color};
`;

const StyledTitle = styled.h5`
  color: ${({ color }) => color};
`;

const SummaryCard = ({ value = 0, title, icon, color, backgroundColor }) => {
  return (
    <StyledDiv
      $bg={backgroundColor}
      className="flex flex-col gap-3 justify-center items-center w-80 h-48 rounded-md hover:-translate-y-1 duration-500 shadow-md cursor-pointer"
    >
      {icon}
      <StyledValue color={color} className="text-4xl">
        {value}
      </StyledValue>
      <StyledTitle color={color} className="text-2xl">
        {title}
      </StyledTitle>
    </StyledDiv>
  );
};

SummaryCard.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default SummaryCard;
