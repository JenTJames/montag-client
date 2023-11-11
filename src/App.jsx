import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { lightTheme } from "./mui.config";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="max-w-full min-h-screen">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
