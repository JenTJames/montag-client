import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../store/auth-context";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    image: "",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
