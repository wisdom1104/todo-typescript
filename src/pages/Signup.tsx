import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NewUser {
  email: string;
  password: string;
  nickname: string;
}
const useAddUser = () => {
  const queryClient = useQueryClient();

  const { mutate: addUser } = useMutation({
    mutationFn: async (newUser: NewUser) => {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/user`, newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      alert("회원가입 성공");
    },
  });

  return { addUser };
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { addUser } = useAddUser();
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNser = {
      email,
      password,
      nickname,
    };
    addUser(newNser);
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setNickname("");
  };

  const [passwordCheckPwMsg, setpasswordCheckPwMsg] = useState("");
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const checkPw = e.target.value;
    setpasswordCheckPwMsg(
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
    <form onSubmit={onSubmitFormHandler}>
      <div>Signup</div>
      <div>
        <span>이메일</span>
        <input
          type="email"
          value={email}
          placeholder="이메일을 입력해 주세요."
          onChange={(e) => {
            validEmail(e);
            setEmail(e.target.value);
          }}
        />
        <div>{emailMsg}</div>
      </div>
      <div>
        <span>닉네임</span>
        <input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력해 주세요."
          onChange={(e) => {
            validNick(e);
            setNickname(e.target.value);
          }}
        />
        <div>{nickMsg}</div>
      </div>
      <div>
        <span>비밀번호</span>
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요."
          onChange={(e) => {
            validPassword(e);
            setPassword(e.target.value);
          }}
        />
        <div>{passwordMsg}</div>
      </div>
      <div>
        <span>비밀번호 확인</span>
        <input
          type="password"
          value={passwordCheck}
          placeholder="비밀번호를 다시 입력해 주세요."
          onChange={(e) => {
            onChangePasswordCheck(e);
            setPasswordCheck(e.target.value);
          }}
        />
        <div>{passwordCheckPwMsg}</div>
      </div>
      <button type="submit">회원가입</button>
      <Link to="/login">로그인</Link>
    </form>
  );
}

export default Signup;
