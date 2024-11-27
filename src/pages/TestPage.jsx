import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { getUserProfile } from "../api/auth";

export default function TestPage() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const profileData = await getUserProfile();
        setUser(profileData);
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

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ mbtiResult, desc, user }) => {
      await createTestResult(mbtiResult, desc, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    setDesc(mbtiResult);
    addMutation.mutate({
      mbtiResult,
      desc: mbtiDescriptions[mbtiResult],
      user,
    });
  };

  const handleNavigateToResults = () => {
    navigate("/results");
  };

  return (
    <div className="">
      {!desc ? (
        <>
          <div className="text-center mb-6">
            <h2 className="title-style inline text-style">MBTI TEST</h2>
          </div>
          <TestForm onSubmit={handleTestSubmit} />
        </>
      ) : (
        <>
          <h2 className="title-style inline text-style">테스트 결과: {desc}</h2>
          <p className="text-lg text-gray-700 mb-6 break-keep">
            {mbtiDescriptions[desc] || "해당 성격 유형에 대한 설명이 없습니다."}
          </p>
          <button
            onClick={handleNavigateToResults}
            className="w-full button-style"
          >
            결과 페이지로 이동하기
          </button>
        </>
      )}
    </div>
  );
}
