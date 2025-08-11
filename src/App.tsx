import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import UserPage from "@/pages/user/Dashboard";
import ProtectedRoute from "@/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
