import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Checkbox = ({ control, name, label, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabel {...field} control={<MuiCheckbox />} label={label} />
      )}
    />
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default Checkbox;
