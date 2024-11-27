import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { getUserProfile, updateProfile } from "../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null); //전체 프로필
  const [nickname, setNickname] = useState(""); // 수정할 닉네임
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  //닉네임 가져오기위해 user정보 가져오기
  useEffect(() => {
    const getUserData = async () => {
      try {
        const profileData = await getUserProfile();
        setProfile(profileData);
        setNickname(profileData.nickname);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "프로필 조회 오류",
          text: error.message || error,
        });
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [profile]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ nickname });

      const updatedProfileData = await getUserProfile();

      dispatch(setUser(updatedProfileData));
      setProfile(updatedProfileData);

      Swal.fire({
        icon: "success",
        title: "성공!",
        text: "성공적으로 닉네임이 변경되었습니다.",
      }).then(() => {
        setTimeout(() => {
          inputRef.current.focus();
        }, 500);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "프로필 업데이트 오류",
        text: error.message || error,
      });
    }
  };

  if (!profile) {
    return <div>프로필을 로딩 중입니다...</div>;
  }

  return (
    <div className="max-w-2xl w-full mx-auto  p-5 border border-black">
      <h2 className="mb-5 title-style">프로필 수정</h2>
      <p>원래 닉네임 : {profile.nickname}</p>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label>바꿀 닉네임 : </label>
          <input
            onChange={handleNicknameChange}
            ref={inputRef}
            value={nickname}
            type="text"
            className="input-style"
          />
        </div>
        <div className="mt-8 text-center">
          <button type="submit" className="button-style w-full">
            프로필 업데이트
          </button>
        </div>
      </form>
    </div>
  );
}
