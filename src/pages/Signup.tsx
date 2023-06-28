import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <form>
      <div>Signup</div>
      <div>
        <span>이메일</span>
        <input />
        <button
          type="button"
          onClick={() => {
            alert("이메일 중복확인");
          }}
        >
          중복확인
        </button>
      </div>
      <div>
        <span>닉네임</span>
        <input />
        <button
          type="button"
          onClick={() => {
            alert("닉네임 중복확인");
          }}
        >
          중복확인
        </button>
      </div>
      <div>
        <span>비밀번호</span>
        <input />
      </div>
      <div>
        <span>비밀번호 확인</span>
        <input />
      </div>
      <button
        type="submit"
        onClick={() => {
          alert("회원가입 성공");
        }}
      >
        회원가입
      </button>
      <Link to="/login">로그인</Link>
    </form>
  );
}

export default Signup;
