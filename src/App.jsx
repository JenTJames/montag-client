import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { lightTheme } from "./mui.config";

import Protected from "./components/Protected";
import AuthContextProvider from "./components/providers/AuthContextProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SaveJobPage from "./pages/SaveJobPage";
import MyListingsPage from "./pages/MyListingsPage";
import JobDetailPage from "./pages/JobDetailPage";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthContextProvider>
          <div className="max-w-full min-h-screen">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/dashboard"
                element={<Protected component={<DashboardPage />} />}
              />
              <Route
                path="/profile"
                element={<Protected component={<ProfilePage />} />}
              />
              <Route
                path="/jobs/new"
                element={<Protected component={<SaveJobPage />} />}
              />
              <Route
                path="/jobs/my-listings"
                element={<Protected component={<MyListingsPage />} />}
              />
              <Route
                path="/jobs/:jobId"
                element={<Protected component={<JobDetailPage />} />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
