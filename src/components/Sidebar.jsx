import styled from "styled-components";
import { MdDashboard } from "react-icons/md";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import Logo from "../assets/brand.svg";
import useToggle from "../hooks/use-toggle";

import NavLink from "./NavLink";

const StyledSideBar = styled.div`
  width: ${({ $isExpanded }) => ($isExpanded ? "15rem" : "8rem")};
`;

const Sidebar = () => {
  const { value: isExpanded, toggle: toggleExpansion } = useToggle();
  return (
    <div className="relative">
      <StyledSideBar
        $isExpanded={isExpanded}
        className="min-h-screen flex-0 bg-transparent border-r border-dashed border-r-slate-200 py-5 px-2 flex flex-col gap-7 items-center transition-all duration-200"
      >
        <img className="w-12" src={Logo} alt="brand" />
        <div className="flex flex-col gap-3">
          <NavLink
            label="Dashboard"
            icon={<MdDashboard size={isExpanded ? 45 : 25} />}
            to="/dashboard"
            orientation={isExpanded ? "horizontal" : "vertical"}
          />
        </div>
      </StyledSideBar>
      <div
        onClick={() => {
          toggleExpansion();
        }}
        className="absolute cursor-pointer p-1 top-7 z-10 -right-3 bg-white border border-slate-200 border-dashed rounded-full"
      >
        {isExpanded ? <CgChevronLeft /> : <CgChevronRight />}
      </div>
    </div>
  );
};

export default Sidebar;
