import React from "react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateTestResultVisibility,
  deleteTestResult,
} from "../api/testResults";
import { useSelector } from "react-redux";

export default function TestResultItem({ data }) {
  const { id, visibility, mbti, mbtiDesc, timestamp, userData } = data;

  // 리덕스 상태에서 로그인된 사용자 정보 가져오기
  const currentUser = useSelector((state) => state.auth.user);

  const queryClient = useQueryClient();

  // 공개/비공개 토글
  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      await updateTestResultVisibility(id, !visibility);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  // 데이터 삭제
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await deleteTestResult(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  // 날짜 변환
  const formattedDate = () => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12;
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${ampm} ${hours}시 ${minutes}분`;
  };

  // 현재 로그인한 유저의 id와 작성자의 id 비교
  const isOwner = currentUser.id === userData.id;

  // visibility가 false일 때 작성한 유저만 보이게
  if (!visibility && !isOwner) {
    return null;
  }

  //테스트 결과 삭제
  const handleDeleteTestResult = () => {
    Swal.fire({
      title: "삭제하시겠습니까?👻",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F86F7",
      cancelButtonColor: "#FF6B6B",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제되었습니다👻");
        removeMutation.mutate(id);
      }
    });
  };

  return (
    <li className="border border-black p-5 rounded-md">
      {/* data가 빈 객체일 경우 처리 */}
      {Object.keys(data).length > 0 && (
        <div>
          <div className="flex items-center justify-between pb-1 border-b border-black">
            <div className="flex items-center gap-3 text-lg">
              <p>
                id : <strong>{userData?.id}</strong> |
              </p>
              <p>
                nickname : <strong>{userData?.nickname}</strong>
              </p>
            </div>
            <p className="text-gray-500">{formattedDate()}</p>
          </div>
          <div className="my-3">
            <strong className="block text-center text-2xl">{mbti}</strong>
            <p className="mt-2 break-keep text-gray-700">{mbtiDesc}</p>
          </div>
          {isOwner && (
            // 작성한 유저만 보임
            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={() => toggleMutation.mutate(id)}
                className="px-2 py-1 bg-blue-300 rounded-md border border-black shadow-custom"
              >
                {visibility ? "비공개" : "공개"}로 전환
              </button>
              <button
                type="button"
                onClick={handleDeleteTestResult}
                className="px-2 py-1 bg-purple-300 rounded-md border border-black shadow-custom"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
