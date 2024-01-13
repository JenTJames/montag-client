import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const RadioGroup = ({ values = [], control, name, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={values[0].value}
      rules={rules}
      render={({ field }) => (
        <MuiRadioGroup {...field} row name={name}>
          {values.map((value) => (
            <FormControlLabel
              key={value.value}
              value={value.value}
              control={<Radio />}
              label={value.label}
            />
          ))}
        </MuiRadioGroup>
      )}
    />
  );
};

RadioGroup.propTypes = {
  values: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
};

export default RadioGroup;
