import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const Input = ({ name, label, control, rules, icon, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  icon: PropTypes.element,
};

export default Input;
