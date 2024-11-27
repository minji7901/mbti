import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { authApi } from "../api/auth";
import { login, fetchUserInfo } from "../redux/slices/authSlice";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await authApi.post("/login", formData);

      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(login({ user: data.user, accessToken: data.accessToken }));
        dispatch(fetchUserInfo());
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: `${error.message || error}`,
      });
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-5 border border-black">
      <h2 className="title-style">로그인</h2>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p className="flex gap-3 mt-5">
        계정이 없으신가요?
        <Link to="/signup" className="text-style">
          회원가입
        </Link>
      </p>
    </div>
  );
}
