import React from "react";
import { Link } from "react-router-dom";
import { PiMouseLeftClickFill } from "react-icons/pi";
import { FaThinkPeaks, FaRegPaperPlane } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";

export default function HomePage() {
  return (
    <div className="pb-10 text-white text-center">
      <div className="mb-5">
        <h2 className="title-style">MBTI TEST</h2>
        <span className="text-lg">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </span>
        <ul className="flex gap-5 my-10 px-5 list-icon-style">
          <li>
            <PiMouseLeftClickFill />
            <strong>성격 유형 검사</strong>
            <p>
              자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을
              미치는지 알아보세요.
            </p>
          </li>
          <li>
            <FaThinkPeaks />
            <strong>성격 유형 이해</strong>
            <p>
              자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을
              미치는지 알아보세요.
            </p>
          </li>
          <li>
            <BsMicrosoftTeams />
            <strong>팀 평가</strong>
            <p>
              팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
              배워보세요.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-7">
        <Link
          to="/test"
          className="inline-flex items-center gap-2 px-5 py-2 text-black bg-gradient-to-r from-green-300 to-yellow-300 rounded-md border border-black shadow-custom"
        >
          테스트 하러가기
          <FaRegPaperPlane />
        </Link>
      </div>
    </div>
  );
}
