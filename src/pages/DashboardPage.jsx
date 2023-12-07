import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const DashboardPage = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
