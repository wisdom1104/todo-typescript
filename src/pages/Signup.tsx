import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

interface NewUser {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
const useAddUser = () => {
  const queryClient = useQueryClient();

  const { mutate: addUser } = useMutation({
    mutationFn: async (newUser: NewUser) => {
      await axios.post(
        `${process.env.REACT_APP_USER_KEY}/auth/signup`,
        newUser
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      alert("회원가입 성공");
      window.location.href = "/login";
    },
  });

  return { addUser };
};

function Signup() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { addUser } = useAddUser();
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNser = {
      email,
      nickname,
      password,
      confirmPassword,
    };
    addUser(newNser);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNickname("");
  };

  const [confirmPasswordPwMsg, setConfirmPasswordMsg] = useState("");
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const checkPw = e.target.value;
    setConfirmPasswordMsg(
      checkPw === ""
        ? ""
        : password.length >= 1 && password !== checkPw
        ? "비밀번호가 일치하지 않습니다."
        : password.length >= 1 && password === checkPw
        ? "비밀번호가 일치합니다."
        : ""
    );
  };

  const [emailMsg, setEmailMsg] = useState("");
  const validEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const isValidEmail =
      /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    setEmailMsg(
      isValidEmail || email === "" ? "" : "이메일 형식에 맞지 않습니다."
    );
  };

  const [nickMsg, setNickMsg] = useState("");
  const validNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nick = e.target.value;
    const isValidNick = /^[가-힣a-zA-Z0-9]{2,15}$/.test(nick);
    setNickMsg(
      isValidNick || nick === ""
        ? ""
        : "닉네임은 2~15글자, 한글, 알파벳, 숫자만 입력 가능합니다"
    );
  };

  const [passwordMsg, setPasswordMsg] = useState("");
  const validPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const isValidPassword =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,15}$/.test(
        password
      );
    setPasswordMsg(
      isValidPassword || password === ""
        ? ""
        : "비밀번호는 숫자와 영어 소문자와 특수문자를 사용해 8~15자리로 입력해주세요."
    );
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
          Signup
        </SignUpTitle>
        <Form onSubmit={onSubmitFormHandler}>
          <InputBox>
            <InputTitle>이메일</InputTitle>
            <Input
              type="email"
              value={email}
              placeholder="이메일을 입력해 주세요."
              onChange={(e) => {
                validEmail(e);
                setEmail(e.target.value);
              }}
            />
            <ValidMsg>{emailMsg}</ValidMsg>
          </InputBox>
          <InputBox>
            <InputTitle>닉네임</InputTitle>
            <Input
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해 주세요."
              onChange={(e) => {
                validNick(e);
                setNickname(e.target.value);
              }}
            />
            <ValidMsg>{nickMsg}</ValidMsg>
          </InputBox>
          <InputBox>
            <InputTitle>비밀번호</InputTitle>
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해 주세요."
              onChange={(e) => {
                validPassword(e);
                setPassword(e.target.value);
              }}
            />
            <ValidMsg>{passwordMsg}</ValidMsg>
          </InputBox>
          <InputBox>
            <InputTitle>비밀번호 확인</InputTitle>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="비밀번호를 다시 입력해 주세요."
              onChange={(e) => {
                onChangeConfirmPassword(e);
                setConfirmPassword(e.target.value);
              }}
            />
            <ValidMsg>{confirmPasswordPwMsg}</ValidMsg>
          </InputBox>
          <SignUpBtnBox>
            <Btn type="submit">회원가입</Btn>
            <SubBtn
              type="button"
              onClick={() => {
                navi("/login");
              }}
            >
              로그인
            </SubBtn>
          </SignUpBtnBox>
        </Form>
      </SignUpBox>
    </SignUpPage>
  );
}

export default Signup;
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

const ValidMsg = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 5px;
`;

const SignUpBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  margin-top: 50px;
  gap: 10px;
`;
