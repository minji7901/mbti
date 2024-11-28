import React, { useState } from "react";
import Swal from "sweetalert2";
import { questions } from "../data/questions";
import TestFormOption from "./TestFormQuestions";
import TestFormQuestions from "./TestFormQuestions";

export default function TestForm({ onSubmit }) {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  // 하나라도 답변이 없었을때를 위한
  const [errors, setErrors] = useState(Array(questions.length).fill(false));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer: value };
    setAnswers(newAnswers);

    const newErrors = [...errors];
    newErrors[index] = false;
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = answers.map((answer) => answer.answer === "");
    setErrors(newErrors);

    // 하나라도 답변이 없었을때
    if (newErrors.includes(true)) {
      Swal.fire({
        text: "모든 질문에 답변을 선택해주세요.",
        icon: "error",
      });
      return;
    }

    //제출확인
    Swal.fire({
      title: "제출 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F86F7",
      cancelButtonColor: "#FF6B6B",
      confirmButtonText: "제출",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("제출되었습니다.");
        onSubmit(answers);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <TestFormQuestions
          key={q.id}
          question={q}
          index={index}
          answer={answers[index]?.answer}
          onChange={(value) => handleChange(index, value)}
        />
      ))}
      <div className="text-center">
        <button type="submit" className="w-full button-style font-bold">
          제출하기
        </button>
      </div>
    </form>
  );
}
