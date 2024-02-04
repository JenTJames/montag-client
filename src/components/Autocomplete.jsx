import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";

const Autocomplete = ({
  multiple = false,
  options = [],
  label,
  name,
  rules,
  control,
  value = null,
  onChange = () => {},
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const valueChangeHandler = (_, value) => {
    field.onChange(value);
    onChange(value);
  };

  return (
    <MuiAutocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) =>
        option.name ? option.name : option ? option : ""
      }
      filterSelectedOptions
      isOptionEqualToValue={(option, value) =>
        option.name ? option.name === value?.name : option === value
      }
      disableCloseOnSelect={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
      onChange={valueChangeHandler}
      value={value ? value : field.value ? field.value : multiple ? [] : null}
    />
  );
};

Autocomplete.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default Autocomplete;
