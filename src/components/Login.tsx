import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { cookies } from "../shared/Cookies";

interface User {
  email: string;
  password: string;
}

const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (user: User) => {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_KEY}/auth/login`,
        user
      );

      // 쿠키 설정
      // cookies.set("token", response.headers.authorization, {
      cookies.set("token", response.headers, {
        path: "/",
        maxAge: 3540,
      });
      cookies.set("nickname", response.data.nickname, {
        path: "/",
        maxAge: 3540,
      });
      console.log(response.data.nickname);
      console.log(response.headers.authorization);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      alert("로그인 성공");
      window.location.href = "/";
    },
  });

  return { login, isLoading, isError };
};

function Login() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <SignUpPage>
      <SignUpBox>
        <SignUpTitle>
          <BackBtn
            onClick={() => {
              navi("/");
            }}
          >
            <FaArrowLeft />
          </BackBtn>
          Login
        </SignUpTitle>
        <Form onSubmit={onSubmitFormHandler}>
          <InputBox>
            <InputTitle>이메일</InputTitle>
            <Input
              type="email"
              value={email}
              placeholder="이메일을 입력해 주세요."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputBox>
          <InputBox>
            <InputTitle>비밀번호</InputTitle>
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해 주세요."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputBox>
          <SignUpBtnBox>
            <Btn type="submit">로그인</Btn>
            <SubBtn
              type="button"
              onClick={() => {
                navi("/signup");
              }}
            >
              회원가입
            </SubBtn>
          </SignUpBtnBox>
        </Form>
      </SignUpBox>
    </SignUpPage>
  );
}

export default Login;
const SignUpPage = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`;

const SignUpBox = styled.div`
  width: 570px;
  background: rgb(255, 255, 255);
  padding: 60px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px 0px;
`;

const SignUpTitle = styled.h1`
  margin-bottom: 45px;
  font-size: 40px;
  font-weight: bold;
  color: rgb(63, 63, 63);
`;

const Form = styled.form`
  margin: 0px;
  padding: 0px;
  border: 0px;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 0px;
  border: 0px;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  height: 80px;
`;

const InputTitle = styled.span`
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid rgb(163, 163, 163);
  outline: none;
  appearance: none;
`;

const BackBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 25px;
  margin-right: 15px;
  &:hover {
    color: lightsteelblue;
  }
`;

const Btn = styled.button`
  display: flex;
  width: 25%;
  padding: 0px 20px;
  border-radius: 6px;
  background-color: steelblue;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-align: center;
  border: none;
  cursor: pointer;
`;

const SubBtn = styled.button`
  background-color: transparent;
  font-size: 18px;
  font-weight: 700;
  text-decoration-line: underline;
  color: gray;
  border: none;
  cursor: pointer;
`;

const SignUpBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  margin-top: 50px;
  gap: 10px;
`;
