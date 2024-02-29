import PropTypes from "prop-types";
import clsx from "clsx";

const Row = ({ children, justify = "start", align = "center" }) => {
  return (
    <div
      className={clsx(
        "flex gap-3",
        {
          "justify-center": justify === "center",
        },
        {
          "justify-between": justify === "between",
        },
        {
          "justify-end": justify === "end",
        },
        {
          "justify-start": justify === "start",
        },
        {
          "justify-evenly": justify === "evenly",
        },
        {
          "justify-around": justify === "around",
        },
        {
          "items-center ": align === "center",
        },
        {
          "items-start ": align === "start",
        },
        {
          "items-end ": align === "end",
        }
      )}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  justify: PropTypes.string,
  align: PropTypes.string,
};

export default Row;
