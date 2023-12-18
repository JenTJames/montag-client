import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";

const Autocomplete = ({ options = [], label, name, rules, control }) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
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
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value || ""}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        );
      }}
      onChange={(_, values) => field.onChange(values)}
      value={field.value || null}
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
