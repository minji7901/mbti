import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";
import Swal from "sweetalert2";

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
      let errorMessage = "회원가입에 실패했습니다.";

      if (error.response?.status === 409) {
        errorMessage = "이미 사용 중인 이메일 또는 아이디입니다.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: errorMessage,
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
