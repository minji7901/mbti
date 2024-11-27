import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const data = await register(formData);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "회원가입 성공🥳",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "회원가입에 실패했습니다.",
        text: error.message || error,
      });
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-5 border border-black">
      <h2 className="title-style">회원가입</h2>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      <p className="flex gap-3 mt-5">
        계정이 있으신가요?
        <Link to="/login" className="text-style">
          로그인
        </Link>
      </p>
    </div>
  );
}
