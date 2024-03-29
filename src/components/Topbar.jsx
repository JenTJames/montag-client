import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";

import Menu from "./Menu";
import Toast from "./Toast";
import Spinner from "./Spinner";
import MenuItem from "./MenuItem";

const TopBar = () => {
  const [imageUrl, setImageUrl] = useState("");

  const { setUser, user } = useContext(AuthContext);

  const { isLoading: isFetchingAvatarName, requestData: fetchAvatarName } =
    useHttp();
  const { isLoading: isFetchingAvatar, requestData: fetchAvatar } = useHttp();

  const { closeToast, createToast, toast } = useToast();

  useEffect(() => {
    const getAvatarName = async () => {
      const response = await fetchAvatarName("users/" + user.id + "/avatar");
      if (response.isError) return createToast(response.message, "error");
      getAvatar(response.data.image);
    };
    const getAvatar = async (avatarName) => {
      const response = await fetchAvatar(
        "images?type=users&name=" + avatarName,
        "GET"
      );
      if (response.isError) return createToast(response.message, "error");
      setImageUrl(response.data);
    };

    user.id && getAvatarName();
  }, [fetchAvatar, createToast, user, fetchAvatarName]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    setUser({
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      image: "",
    });
    localStorage.clear();
    changePage("/login", { replace: true });
  };

  const changePage = (to, config) => {
    navigate(to, config);
  };

  return (
    <>
      <Spinner isLoading={isFetchingAvatarName} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="w-full flex justify-end sticky top-0 p-6 gap-3">
        <Menu
          component={
            <IconButton>
              {isFetchingAvatar ? (
                <CircularProgress size={20} />
              ) : (
                <Avatar
                  src={imageUrl}
                  alt={user?.firstname + " " + user?.lastname}
                />
              )}
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
            <MenuItem
              onClick={() => {
                changePage("/profile");
              }}
            >
              Profile
            </MenuItem>
          </div>
          <Divider />
          <div className="my-3">
            <MenuItem onClick={logoutHandler} color="danger">
              Logout
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default TopBar;
