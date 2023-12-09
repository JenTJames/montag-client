import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { lightTheme } from "./mui.config";

import Protected from "./components/Protected";
import AuthContextProvider from "./components/providers/AuthContextProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthContextProvider>
        <div className="max-w-full min-h-screen">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/dashboard"
              element={<Protected component={<DashboardPage />} />}
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
