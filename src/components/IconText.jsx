import PropTypes from "prop-types";

const IconText = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-slate-500 text-xs">{text}</p>
    </div>
  );
};

IconText.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconText;
