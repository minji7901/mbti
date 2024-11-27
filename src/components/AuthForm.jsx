import React from "react";
import useForm from "../hooks/useForm";

export default function AuthForm({ mode, onSubmit }) {
  const { formState, onChangeHandler, resetForm } = useForm({
    id: "",
    password: "",
    nickname: mode === "signup" ? "" : undefined,
  });

  const { id, password, nickname } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
      <input
        type="text"
        name="id"
        value={id}
        onChange={onChangeHandler}
        placeholder="아이디를 입력해주세요ꢙ"
        className="input-style"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChangeHandler}
        placeholder="비밀번호를 입력해주세요ꢙ"
        className="input-style"
        required
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChangeHandler}
          placeholder="닉네임을 입력해주세요 ✩⡱"
          className="input-style"
          required
        />
      )}
      <button type="submit" className="button-style">
        {mode === "login" ? "로그인하기" : "회원가입하기"}
      </button>
    </form>
  );
}
