import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoNotifications, IoSettings } from "react-icons/io5";

import AuthContext from "../store/auth-context";

import Menu from "./Menu";
import MenuItem from "./MenuItem";

const TopBar = () => {
  const { setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    setUser({
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
    });
    localStorage.clear();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="w-full flex justify-end sticky top-0 p-6 gap-3">
      <IconButton>
        <IoNotifications />
      </IconButton>
      <Menu
        component={
          <IconButton>
            <IoSettings />
          </IconButton>
        }
      >
        <div className="flex flex-col px-4 my-2 cursor-default">
          <h1 className="font-semibold text-secondary-700">
            {user.firstname + " " + user.lastname || "hello"}
          </h1>
          <Typography className="text-secondary-500" variant="subtitle2">
            {user.email}
          </Typography>
        </div>
        <Divider />
        <div className="flex flex-col my-3">
          <MenuItem onClick={() => {}}>Profile</MenuItem>
          <MenuItem onClick={() => {}}>Settings</MenuItem>
        </div>
        <Divider />
        <div className="my-3">
          <MenuItem onClick={logoutHandler} color="danger">
            Logout
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default TopBar;
