import * as React from "react";
import { Link, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Callback from "./pages/Callback";
import useAuth from "./useAuth";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function RequireAuth({ children }) {
  const { authed, logout } = useAuth();
  if(authed){
    return children;
  }else{
    return <Navigate to="/login" replace />
  }
}

export default function App() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
 );
}
