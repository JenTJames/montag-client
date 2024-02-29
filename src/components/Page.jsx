import PropTypes from "prop-types";

const Page = ({ children }) => {
  return <div className="flex flex-col gap-10 min-w-full p-5">{children}</div>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
