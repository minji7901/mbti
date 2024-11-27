import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import ProfilePage from "../pages/ProfilePage";
import Layout from "../components/Layout";
import ErrorPage from "../pages/ErrorPage";

const PublicRoute = ({ element }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin ? <Navigate to="/" replace /> : element;
};

const PrivateRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin ? children : <Navigate to="/login" replace />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="login"
            element={<PublicRoute element={<LoginPage />} />}
          />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="test"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="results"
            element={
              <PrivateRoute>
                <TestResultPage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
