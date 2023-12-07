import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { IoNotifications } from "react-icons/io5";

const Topbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex gap-4 justify-end w-full p-6">
      <Tooltip title="Notifications">
        <IconButton>
          <IoNotifications />
        </IconButton>
      </Tooltip>
      <Button color="secondary" variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export default Topbar;
