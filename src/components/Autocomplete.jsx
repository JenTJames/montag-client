import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";

const Autocomplete = ({ options = [], label, name, rules, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <MuiAutocomplete
          options={options}
          getOptionLabel={(option) => option.name || ""}
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label={label}
                margin="normal"
                variant="outlined"
                onChange={onChange}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            );
          }}
          onChange={(_, values) => onChange(values)}
          value={value}
        />
      )}
    />
  );
};

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default Autocomplete;
