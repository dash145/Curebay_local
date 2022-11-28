/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import {
  sendOtp,
  verifyLogOtp,
  setLoginModal,
  loginWithPassword,
  getToken,
} from "../Redux/Actions/userActions";
import { connect } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { Base64 } from "js-base64";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import useGAEventsTrackers from "../config/useGAEventsTrackers";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { EnglishText } from "../application/Router/constants/EnglishText";

const Seperateor = () => {

  const location = useLocation();

  return (
    <div className="flex items-center my-5 mx-auto w-3/4">
      <div className="border border-gray-6 flex flex-1"></div>
      <div className="text-xs font-medium text-gray-secondary mx-2">OR</div>
      <div className="border border-gray-6 flex flex-1"></div>
    </div>
  );
};

const FormFooter = (props) => {
  return (
    <div>
      <div className="flex justify-center lg:mx-10 mx-2 my-5 text-center  text-gray-primary">
        <span className="text-gray-primary text-sm font-normal inline flex  ">
          {" "}
          {EnglishText.SIGNUP_OPTION}&nbsp;{" "}
          <p
            className="font-medium text-brand-primary cursor-pointer"
            onClick={(e) => {
              props.setLoginModal(false);
            }}
          >
            {"Sign Up"}
          </p>
        </span>
      </div>
      <div className="text-center  text-xs text-gray-tertiary">
        By continuing, you agree to our{" "}
        <Link
          to={APP_ROUTES.TERMS_AND_CONDITION}
          className="text-brand-secondary"
        >
          Terms of service
          <br />
        </Link>
        and{" "}

        <Link to={APP_ROUTES.PRIVACY_POLICY} className="text-brand-secondary">
          Privacy & Legal Policy
        </Link>
        
        .
      </div>
      <div className="text-center text-brand-secondary mt-5 font-medium">
        <Link
          to={APP_ROUTES.CONTACTWITHUS}
          className="text-center text-brand-secondary mt-5 font-medium"
        >
          Need Help? Get In Touch
        </Link>
      </div>
    </div>
  );
};

const LoginForm = (props) => {
  const [isSent, setSent] = useState(false);
  const [isOTPType, setType] = useState("");
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const history = useHistory();
  const [seconds, setTimer] = useState(60);
  const [showLoader, setLoader] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const GAEventsTrackers = useGAEventsTrackers("LoginUser");

  const myRef = useRef(null);
  const [user, setuser] = useState({
    userName: "",
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {

    
    // alert('lll')

    if(e.target.value.length==0){
      setErr("")
    }
    console.log(e.target.value, "dsvosdvoisdhivpds");
    setuser({ ...user, [e.target.name]: e.target.value });
  };


  const handleChangeOtp = (e) => {

    
    // alert('lll')
    console.log(e.target.value, "dsvosdvoisdhivpds");

    const re = /^[0-9]*$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value.length <= 6 &&  setuser({ ...user, [e.target.name]: e.target.value });
    }

   
   // setuser({ ...user, [e.target.name]: e.target.value });
  };

  const setSeconds = async () => {
    setTimer(60);
    let dataObj = {
      mobileNo: user.email,
      mobileCheck: 2,
    };
    await props
      .sendOTP(dataObj)
      .then((result) => {
        console.log("result", result);
        setErr(EnglishText.OTP_SENT);
      })
      .catch((error) => {
        setLoader(false);
        if (error?.message) {
          setErr(error.response.data.details[0]);
        }
      });
  };

  useEffect(() => {
    if (isSent) {
      if (!seconds) return;
      const interval = setInterval(() => {
        const newTime = seconds - 1;
        setTimer(newTime);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, isSent]);

  useEffect(() => {
    window.addEventListener("keydown", LoginWithPassword);

    return () => {
      window.removeEventListener("keydown", LoginWithPassword);
    };
  }, [user]);

  const sendOTPMobile = async (e) => {

    if(user.email.length==0){
      setErr(EnglishText.ENTER_PHONE);
      return;

    }
    if (isNaN(user.email)) {
      setErr(EnglishText.LOGIN_ERROR);
      return;
    }
    setLoader(true);
    setErr("");
    let dataObj = {
      mobileNo: user.email,
      mobileCheck: 2,
    };
    e.preventDefault();
    if (!isSent) {
      await props
        .sendOTP(dataObj)
        .then((result) => {
          console.log("result", result);
          setSent(true);
          setErr("");
          setLoader(false);
          myRef.current.focus();
        })
        .catch((error) => {
          setLoader(false);
          console.log("ERRORrr", error);
          if (error?.message) {
            setErr(error.response.data.details[0]);
          }
        });
    } else {
      let data = {
        patientMobileNumber: user.email,
        patientOTP: parseInt(user.otp),
        channel: "W",
        isLogin: 1,
      };
      await props.getToken().then(async (result) => {
        await props
          .verifyOTP(data)
          .then((result) => {
            setLoader(false);
            if (result) {
              history.goBack();
              let status = "true";
              localStorage.setItem("loginstatus", status);
              localStorage.setItem("loginObj", JSON.stringify(result))
            }
          })
          .catch((error) => {
            setLoader(false);
            // console.log("EROOR", error)
            if (error?.message) {
              // console.log("qwerty", error.response.data.details[0]);
              setErr(error.response.data.details[0]);
            }
          });
      });
    }
  };

  const LoginWithPassword = async (e) => {
    console.log(e, "idsjviodovisdipsdv", user);
    if ((e.key != "Enter" && e.type == "keydown") || !user.password.length) {
      return;
    }
    setLoader(true);
    // e.preventDefault();
    const data = {
      channel: "W",
      passWord: Base64.encode(user?.password),
      patientEmail: user?.email,
    };

    console.log("user Data", user);
    await props.getToken().then((result) => {
      props
        .loginWithPassword(data)
        .then((result) => {
          setLoader(false);
          if (result) {
            
            history.push(APP_ROUTES.DASHBOARD);
            // history.goBack();
            let status = "true";
            localStorage.setItem("loginstatus", status);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.log("EROOR", error);
          if (error?.message) {
            setErr(error.response.data.details[0]);
          }
        });
    });
    GAEventsTrackers("Login", "logged into CureBay Application", "Login-In");
  };

  console.log(user, "sdfisdfohidh");

  const reEnterMobile = () => {
    console.log("hello");
    setSent(false);
    setLoader(false);
    setType("");
    setErr("");
  };

  const showHidePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const loginValidation = () => {

    
if(user?.email.length==0){
  setErr(EnglishText.ENTER_EMAIL);

}else if(user?.email.length>0){

  var re = /\S+@\S+\.\S+/;
  if (!re.test(user.email)) {
    setErr(EnglishText.VALID_EMAIL);
    // setuser({...user, email : ""});
  } else {
    setType(isOTPType == "" ? "password" : "");
    setErr("");
  }

}else{
  setType(isOTPType == "" ? "password" : "");
  setErr("");

}

  //  else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
  //     setErr(EnglishText.VALID_EMAIL);
  //     // setuser({...user, email : ""});
  //   } else {
  //     setType(isOTPType == "" ? "password" : "");
  //     setErr("");
  //   }
  };
  return (
    <>
      <div className="grid lg:grid-cols-2  px-2">
        <div className="lg:block hidden p-3 bg-brand-alabaster">
          <img
            width="0"
            height="0"
            className="w-full object-cover sm:h-full sm:w-3/4 md:w-full md:h-3/4"
            src="login2.svg"
            alt="banner"
          />
          <div className="font-medium text-brand-primary  text-xl text-center">
            {EnglishText.LOGIN_BANNER_MSG1}
          </div>
          <div className="text-xs p-1 font-normal text-brand-manatee text-center">
            {EnglishText.LOGIN_BANNER_MSG2}
          </div>
        </div>
        <div className="items-center bg-white px-6 py-6">
          <div className="w-full md:px-6 flex justify-between  text-xl ">
            <p className="font-medium text-brand-primary">{"Login"}</p>
            <div>
              <XIcon
                onClick={() => history.push(APP_ROUTES.DASHBOARD)}
                className="h-7 ml-18 font-medium text-sm cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col w-full bg-white sm:px-6">
            {!isSent ? (
              <div className="text-sm pt-4 font-normal  text-gray-primary">
                {EnglishText.LOGIN_BANNER_PARA}
              </div>
            ) : (
              <div className="text-sm pt-4 flex font-normal  text-gray-primary">
                <p className="mr-1">{"Provide 6 digit OTP sent to "}</p>
                <p className={"font-semibold"}>{user.email}</p>
                <p
                  onClick={reEnterMobile}
                  className={
                    "cursor-pointer ml-9 font-semibold text-brand-primary"
                  }
                >
                  {"Edit"}
                </p>
              </div>
            )}
            <div className="py-8">
              {!isSent && isOTPType == "" && (
                <div className="flex flex-col mb-6">
                  {user.email && (
                    <span
                      className={`${
                        user.email.length == 10 ? "text-brand-lightgreen " : ""
                      }  font-normal text-xs  tracking-widest`}
                    >
                      {EnglishText.LOGIN_PLACEHOLDER}
                    </span>
                  )}

                  <div className="flex">
                    <input
                      type="text"
                      name="email"
                       maxLength={40}

                      // id="sign-in-email-register"
                      className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                      placeholder={EnglishText.LOGIN_INPUT_PLACEHOLDER}
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  {err && (
                    <span className="text-red-600  font-normal text-xs  tracking-widest">
                      {err}
                    </span>
                  )}
                </div>
              )}
              {isOTPType === "" && (
                <div>
                  {isSent && (
                    <div className={"flex flex-col mb-6"}>
                      {user.otp && (
                        <span
                          className={`${
                            user.otp.length == 6 ? "text-brand-lightgreen " : ""
                          } text-red-600  font-normal text-xs  tracking-widest`}
                        >
                          {"Enter OTP"}
                        </span>
                      )}
                      <div className="flex relative ">
                        <input
                          name="otp"
                         // type="number"
                          id="sign-in-email-password"
                          ref={myRef}
                          value={user.otp}
                          maxLength={6}
                          minLength={6}

                          onChange={handleChangeOtp}
                          className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                          placeholder="Enter OTP"
                        />
                        <span
                          onClick={() => {
                            seconds <= 0 && setSeconds();
                          }}
                          className={`${
                            seconds == 0
                              ? "text-brand-secondary cursor-pointer "
                              : "text-gray-secondary cursor-not-allowed "
                          }  font-medium text-sm absolute right-1 mt-2 `}
                        >
                          {`Resend ${seconds > 0 ? "in 00:" + seconds : ""}`}{" "}
                        </span>
                      </div>
                      {err && (
                        <span
                          className={`${
                            err === "OTP sent"
                              ? "text-green-500 "
                              : "text-red-600 "
                          }  font-normal text-xs  tracking-widest`}
                        >
                          {err}
                        </span>
                      )}

                      <div className="flex w-full mt-8">
                        <button
                          onClick={sendOTPMobile}
                          className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal`}
                          disabled={user.otp.length !== 6}
                        >
                          Verify OTP
                          {showLoader && (
                            <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  {!isSent && (
                    <div className="flex w-full mt-8">
                      <button
                        onClick={sendOTPMobile}
                        className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}
                        
                      >
                        Use OTP
                        {showLoader && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {isOTPType === "password" && (
                <div>
                  <div className={"flex flex-col mb-6"}>
                    <div className="flex relative justify-center">
                      <input
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        id="sign-in-email-password"
                        value={user.password}
                        onChange={handleChange}
                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                        placeholder={EnglishText.ENTER_PASSWORD}
                      />
                      {passwordShown ? (
                        <EyeIcon
                          className="cursor-pointer mt-2 relative right-4 h-5"
                          onClick={showHidePassword}
                        />
                      ) : (
                        <EyeOffIcon
                          className="cursor-pointer mt-2 relative right-4 h-5"
                          onClick={showHidePassword}
                        />
                      )}
                    </div>
                    {err && (
                      <span className="text-red-600  font-normal text-xs  tracking-widest">
                        {err}
                      </span>
                    )}
                    <div className="text-right justify-end">
                      <span
                        className="text-brand-primary font-medium text-sm cursor-pointer lg:mr-4"
                        onClick={() => props.setLoginModal(true)}
                      >
                        {EnglishText.FORGOT_PASSWORD}
                      </span>
                    </div>
                    <div className="flex w-full mt-8">
                      <button
                        onClick={LoginWithPassword}
                        className={`p-2 bg-brand-secondary disabled:opacity-50  text-white w-full  rounded-lg text-center text-base font-normal}`}
                        disabled={!user.email}
                      >
                        Login
                        {showLoader && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Seperateor />
              <div className="flex w-full mb-4">
                <button
                  onClick={loginValidation}
                 
                  className={`p-2 border border-brand-secondary  text-brand-secondary w-full rounded-lg  text-center text-base font-normal`}
                >
                  {isOTPType == "" ? "Use Password" : "Login with OTP"}
                </button>
              </div>
              <FormFooter {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendOTP: (data) => dispatch(sendOtp(data)),
  verifyOTP: (data) => dispatch(verifyLogOtp(data)),
  loginWithPassword: (data) => dispatch(loginWithPassword(data)),
  setLoginModal: (data) => dispatch(setLoginModal(data)),
  getToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
