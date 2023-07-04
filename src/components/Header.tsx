import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { StBtn } from "./TodoBox";
import { cookies } from "../shared/Cookies";

function Header() {
  const navi = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.get("token"));
  const nickname = cookies.get("nickname");

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("nickname");
    setIsLoggedIn(false);
  };

  return (
    <>
      <StHeader>
        <StHeaderTitle>My Todo List</StHeaderTitle>

        <div>
          {isLoggedIn ? (
            <>
              <span>{nickname}</span>
              <StBtn
                borderColor={"lightsteelblue"}
                margin={"0 0 0 20px"}
                onClick={handleLogout}
              >
                로그아웃
              </StBtn>
            </>
          ) : (
            <>
              <StBtn
                borderColor={"steelblue"}
                onClick={() => {
                  navi("/login");
                }}
              >
                로그인
              </StBtn>
              <StBtn
                borderColor={"lightsteelblue"}
                onClick={() => {
                  navi("/signup");
                }}
              >
                회원가입
              </StBtn>
            </>
          )}
        </div>
      </StHeader>
    </>
  );
}

export default Header;
const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 30px;
`;

const StHeaderTitle = styled.h1`
  margin: 0;
`;
