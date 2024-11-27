import React from "react";
import TestResultList from "../components/TestResultList";

export default function TestResultPage() {
  return (
    <>
      <div className="text-center">
        <h2 className="title-style inline text-style">모든 테스트 결과</h2>
      </div>
      <TestResultList />
    </>
  );
}
