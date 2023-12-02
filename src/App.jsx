import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { lightTheme } from "./mui.config";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="max-w-full min-h-screen">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
