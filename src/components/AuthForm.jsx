import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { validateForm } from "../utils/validation";

export default function AuthForm({ mode, onSubmit }) {
  const { formState, onChangeHandler, resetForm, formErrors } = useForm(
    {
      id: "",
      password: "",
      nickname: "",
    },
    validateForm
  );

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
        className="input-style focus:border-purple-500 focus:shadow-purple-500"
        minLength={4}
        maxLength={10}
        required
      />
      {formErrors.id && (
        <small className="text-blue-900">{formErrors.id}</small>
      )}
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChangeHandler}
        placeholder="비밀번호를 입력해주세요ꢙ"
        className="input-style focus:border-purple-500 focus:shadow-purple-500"
        minLength={4}
        maxLength={15}
        required
      />
      {formErrors.password && (
        <small className="text-blue-900">{formErrors.password}</small>
      )}
      {mode === "signup" && (
        <>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChangeHandler}
            placeholder="닉네임을 입력해주세요 ✩⡱"
            className="input-style focus:border-purple-500 focus:shadow-purple-500"
            minLength={2}
            maxLength={10}
            required
          />
          {formErrors.nickname && (
            <small className="text-blue-900">{formErrors.nickname}</small>
          )}
        </>
      )}
      <button type="submit" className="button-style">
        {mode === "login" ? "로그인하기" : "회원가입하기"}
      </button>
    </form>
  );
}
