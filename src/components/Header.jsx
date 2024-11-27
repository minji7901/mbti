import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

export default function Header() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "로그아웃하시겠습니까?🤖",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F86F7",
      cancelButtonColor: "#FF6B6B",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("로그아웃되었습니다🤖");
        dispatch(logout());
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    });
  };

  return (
    <header className="flex items-center justify-between p-2 mb-10 text-lg border-t border-b border-t-black border-b-black font-semibold">
      <h1 className="flex-shrink-0">MBTI TEST SITE</h1>
      {isLogin ? (
        <nav className="flex flex-grow justify-center gap-5">
          <div className="flex gap-5 mx-auto">
            <Link to="/">HOME</Link>
            <Link to="/test">TEST</Link>
            <Link to="/results">TEST_RESULT</Link>
          </div>
          <div className="flex gap-3">
            <Link to="/profile">MY PAGE</Link>
            <button type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </nav>
      ) : (
        <nav className="flex justify-between gap-5">
          <Link to="/">HOME</Link>
          <Link to="/login">LOGIN</Link>
        </nav>
      )}
    </header>
  );
}
