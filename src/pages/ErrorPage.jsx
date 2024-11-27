import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="pt-5 pb-8 border border-black text-center">
      <h2 className="text-3xl font-bold">404 Not Found</h2>
      <p className="mt-3 mb-10">요.청.한.페.이.지.를.찾.을.수.없.습.니.다🤖</p>
      <Link to="/" className="button-style">
        홈으로
      </Link>
    </div>
  );
}
