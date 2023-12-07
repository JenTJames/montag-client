import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";

import Toast from "./Toast";
import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

const Protected = ({ component }) => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isLoading: isFetchingUser, requestData: fetchUser } = useHttp();

  const { toast, createToast, closeToast } = useToast();

  useEffect(() => {
    const getUserDetails = async (email) => {
      const response = await fetchUser(`users?email=${email}`);
      if (response.isError) return createToast(response.message, "error");
      setUser({
        id: response.data.id,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
      });
    };
    if (!user?.id) {
      const email = localStorage.getItem("email");
      if (!email) return navigate("/login");
      getUserDetails(email);
    }
  }, [user, fetchUser, createToast, setUser, navigate]);

  return (
    <>
      <Spinner isLoading={isFetchingUser} />
      <Toast close={closeToast} show={toast.show} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{component}</div>
      </div>
    </>
  );
};

Protected.propTypes = {
  component: PropTypes.element.isRequired,
};

export default Protected;
