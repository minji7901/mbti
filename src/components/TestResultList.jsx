import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import TestResultItem from "./TestResultItem";
import { useSelector } from "react-redux";

export default function TestResultList() {
  const {
    data: testResults,
    isPending,
    error,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });

  // 리덕스 상태에서 로그인된 사용자 정보 가져오기
  const currentUser = useSelector((state) => state.auth.user);

  if (isPending) return <p>로딩중입니다🤖</p>;
  if (error) return <p>오류가 발생했습니다💩</p>;

  return (
    <ul className="mt-6">
      {testResults.length === 0 ? (
        <p>아직 테스트 결과가 없습니다🤖</p>
      ) : (
        testResults.map((data) => (
          <TestResultItem key={data.id} data={data} currentUser={currentUser} />
        ))
      )}
    </ul>
  );
}
