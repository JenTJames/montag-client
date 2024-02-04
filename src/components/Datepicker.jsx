import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

const Datepicker = ({ control, label, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <MuiDatePicker
          {...field}
          views={["year", "month", "day"]}
          format="DD-MM-YYYY"
          label={label}
        />
      )}
    />
  );
};

Datepicker.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Datepicker;
