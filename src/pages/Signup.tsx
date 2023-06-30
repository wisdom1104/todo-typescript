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

    if (checkPw === "") {
      setpasswordCheckPwMsg("");
    } else if (password.length >= 1 && password !== checkPw) {
      setpasswordCheckPwMsg("비밀번호가 일치하지 않습니다.");
    } else if (password.length >= 1 && password === checkPw) {
      setpasswordCheckPwMsg("비밀번호가 일치합니다.");
    }
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
            setNickname(e.target.value);
          }}
        />
      </div>
      <div>
        <span>비밀번호</span>
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <span>비밀번호 확인</span>
        <input
          type="password"
          value={passwordCheck}
          placeholder="비밀번호를 다시 입력해 주세요."
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            onChangePasswordCheck(e);
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
