import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import MuiSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const Switch = ({ control, name, rules, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControlLabel {...field} control={<MuiSwitch />} label={label} />
      )}
    />
  );
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default Switch;
