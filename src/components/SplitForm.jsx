import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Card from "./Card";

const SplitForm = ({ children, title, description }) => {
  return (
    <div className="flex justify-around gap-36">
      <div className="flex w-1/4 flex-col gap-1">
        <Typography className="text-slate-950 font-bold text-xl" variant="p">
          {title}
        </Typography>
        <Typography className="text-slate-500 text-sm" variant="p">
          {description}
        </Typography>
      </div>
      <div className="w-3/4">
        <Card>{children}</Card>
      </div>
    </div>
  );
};

SplitForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SplitForm;
