import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../components/Login";
import RegisterForm from "../components/RegisterForm";
import ForgotPassword from "../components/forgotPassword";

export default function LoginPage() {
  const check = useSelector(state => state.authReducer.isLoginModal)
  const forgot = useSelector(state => state.authReducer.isForgotModal)
  console.log("check", check)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-4xl" style={{height: '75%'}}>
          <div className="border-1 mx-2 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
            {check && !forgot &&<LoginForm />}
            {!check && !forgot && <RegisterForm />}
            {forgot && <ForgotPassword />}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
