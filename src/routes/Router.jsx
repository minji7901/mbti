import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
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

const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
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
          <Route element={<PrivateRoute />}>
            <Route path="test" element={<TestPage />} />
            <Route path="results" element={<TestResultPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
