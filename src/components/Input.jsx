import { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Input = ({ name, label, type, control, rules, icon, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibilityHandler = () => {
    setShowPassword((currentState) => !currentState);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={showPassword ? "text" : type}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment:
              type === "password" ? (
                <IconButton onClick={passwordVisibilityHandler}>
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              ) : null,
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
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  icon: PropTypes.element,
};

export default Input;
