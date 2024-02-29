import PropTypes from "prop-types";

import Typography from "./Typography";

const Bullet = ({ children }) => {
  if (children)
    return (
      <div className="flex gap-3 items-center">
        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
        <Typography>{children}</Typography>
      </div>
    );
};

Bullet.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Bullet;
