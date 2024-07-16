import { RecoilState } from "recoil";

export interface TodoInputSectionProps {
  addTodo: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TodoListSectionProps {
  user_id: string;
}

export interface TodoItem {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  createAt: string;
  updateAt: string;
};

export interface User {
  email: string;
  name: string;
  picture: string;
  isLogin: boolean;
};

export interface CustomInputProps {
  text: string;
  recoilState: RecoilState<string>;
};

export interface GoogleLoginButtonProps {
  closeModal: Function;
};

export interface Alert {
  alertIsActive: boolean;
  alertText: string;
}