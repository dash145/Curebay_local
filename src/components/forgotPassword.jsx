/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes'
import { sendOtp, verifyLogOtp, setLoginModal, forgotPassword, getToken } from '../Redux/Actions/userActions';
import { patientResetPasswordOTP } from '../Redux/Actions/UserprofileActions';
import { connect } from 'react-redux';
import { XIcon, EyeOffIcon, EyeIcon } from '@heroicons/react/outline'
import { Base64 } from 'js-base64';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { FORGOTPASSWORDLINK, NOEMAIL } from '../config/constant';
import { EnglishText } from '../application/Router/constants/EnglishText';
import axios from 'axios';
const Seperateor = () => {
    return (
        <div className="flex items-center my-5 mx-auto w-3/4">
            <div className="border border-gray-6 flex flex-1"></div>
            <div className="text-xs font-medium text-gray-secondary mx-2">OR</div>
            <div className="border border-gray-6 flex flex-1"></div>
        </div>
    )
}

const FormFooter = (props) => {
    return (
        <div>
            <div className="mx-16 my-5 text-center  text-gray-primary"><span className="text-gray-primary text-sm font-normal inline flex  "> {EnglishText.LOGIN_OPTION}&nbsp; <p className="font-medium text-brand-primary cursor-pointer" onClick={(e) => { props.setLoginModal(false) }}>{'Login'}</p></span></div>
            <div className="text-center text-brand-secondary mt-5 font-medium">
                <Link
                    to={APP_ROUTES.CONTACTWITHUS}
                    className="text-center text-brand-secondary mt-5 font-medium"
                >
                    Need Help? Get In Touch
                </Link>
            </div>        </div>
    )
}


const ForgotPassword = (props) => {
    const { isLoading, isError, changepasswordData } = useSelector(state => state.changepassword)
    const dispatch = useDispatch();
    const [re] = useState(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);
    const [phoneregex] = useState(/^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/)
    const [err, setErr] = useState(false);

    const [sendOTP, setSendOTP] = useState(false);
    const [otp, setOtp] = useState("")

    const history = useHistory();
    const [isDisable, setDisable] = useState(true);
    const [email, setEmail] = useState('');
    const [patientOTP, setPatientOTP] = useState('');
    const [patientEmail, setPatientEmail] = useState('');

    const [showLoader, setLoader] = useState(false);
    const [seconds, setTimer] = useState(60);

    const myRef = useRef(null);
    const [user, setuser] = useState({
        userName: '',
        email: '',
        otp: '',
        password: ''
    })


    const setSeconds = async (e) => {
        forgetpasswordOTP(e);
    }

    useEffect(() => {
        if (sendOTP) {
            if (!seconds) return;
            const interval = setInterval(() => {
                const newTime = seconds - 1;
                setTimer(newTime);
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [seconds, sendOTP]);

    const handleChange = (val) => {

        if (phoneregex.test(val)) {
            if (val.length == 10) {
                setDisable(false);
                setErr(true);
            } else {
                setDisable(true);
                setErr(false);
            }
        } else if (re.test(val)) {
            setDisable(false);
            setErr(true);
        } else {
            setDisable(true);
            setErr(false);
        }
        setEmail(val)
    }

    const sendOTPMobile = async (e) => {



        setLoader(true);
        setErr('');
        let data;
        if (phoneregex.test(email)) {
            data = {
                mobileNumber: email,
                mobileCheck: 2,
                email: "",
            }
        } else {
            data = {
                email: email,
                mobileCheck: 2,
                mobileNumber: "",
            }
        }
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_BASEURL}PatientOTP/forgetPassValidation?patientOTP=${otp}&patientEmail=${data.email}&patientMobileNumber=${data.mobileNumber}`)
            .then(res => {
                // console.log("responsexxx", res.data.data);
                window.open(res.data.data, "_self")
                setLoader(true);
            })
            .catch(error => {
                console.log(err)
                setLoader(false);
                if (error?.message) {
                    setErr(error.response.data.details[0]);
                }
            })
    }

    const forgetpasswordOTP = (e) => {
        setSendOTP(true);
        e.preventDefault();

        if(email.length==0){
            setErr(EnglishText.ENTER_PHONE_OR_EMAIL_ID);
            return;
      
          }
        
        let data;
        if (phoneregex.test(email)) {
            data = {
                mobileNumber: email,
                mobileCheck: 2,
                email: "",
            }
        } else {
            data = {
                email: email,
                mobileCheck: 2,
                mobileNumber: "",
            }
        }

        dispatch(patientResetPasswordOTP(data)).then(res => {
            if (res.data == 1) {
                setSendOTP(true);
                setTimer(60);
            }
        }).catch(error => {
            if (error?.message) {

                if (!isNaN(email)) {
                    setErr("This phone number is not registered");
                    
                  }else{
                    setErr("This email id is not registered");

                  }
                //setErr(error.response.data.details[0]);
            }
        })
    }

    // const forgetpasswordOTP = (e) => {
    //     e.preventDefault();
    //     if()
    //     let data;
    //     data = {
    //         "OTP": patientOTP,
    //         "email": patientEmail,
    //     }
    // }
    const handleOtpChange = (e) => {


        const re = /^[0-9]*$/; //rules
        if (e.target.value === "" || re.test(e.target.value)) {
          e.target.value.length <= 6 &&  setOtp(e.target.value);
        }

    }


    return (
        <>
            <div className=" px-2">
                <div className="items-center bg-white px-2 py-6">
                    <div className="mb-10 ml-6  flex justify-between  text-xl">
                        <p className="font-medium text-brand-primary">{'Forgot Password'}
                        </p>
                        <div>
                            <XIcon onClick={() => history.goBack()} className="h-7 ml-18 font-medium text-sm cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full bg-white sm:px-6">
                        <div className="py-8">
                            {!sendOTP ? <div className="flex flex-col mb-6">
                                {/* {email && <span className={`${err ? 'text-brand-lightgreen ' : ''}  font-normal text-xs  tracking-widest`}>{'Enter your Phone Number or Email Address'}</span>} */}
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="email"
                                        maxLength={isNaN(email)?60:10}
                                        id="sign-in-email-register"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder={EnglishText.FORGOT_PASSWORD_PLACEHOLDER}
                                        value={email}
                                        onChange={(e) => { handleChange(e.target.value) }}
                                    />
                                </div>
                                {err && <span className="text-red-600  font-normal text-xs  tracking-widest">{err}</span>}
                                <button
                                    // onClick={sendEmail}
                                    onClick={forgetpasswordOTP}
                                    className={`disabled:opacity-50 p-2 mt-4 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}
                                    // disabled={isDisable}
                                    >
                                    Send OTP
                                    {isLoading && <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                                </button>
                                {isError && <span className={`text-red-600   font-normal text-xs  tracking-widest`}>{NOEMAIL}</span>}
                                {changepasswordData && <span className={`text-green-600  font-normal text-xs mt-2 tracking-widest`}>{FORGOTPASSWORDLINK}</span>}
                            </div> : <div>
                                <div className={"flex flex-col mb-6"}>
                                    {otp && <span className={`${otp.length == 6 ? 'text-brand-lightgreen ' : ''} text-red-600  font-normal text-xs  tracking-widest`}>{'Enter OTP'}</span>}
                                    <div className="flex relative ">
                                        <input
                                           
                                            name="otp"
                                            id="sign-in-email-password"
                                            ref={myRef}
                                            value={otp}
                                            maxLength={6}
                                            minLength={6}
                                            onChange={handleOtpChange}
                                            className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${'border-gray-highlight'
                                                }`}
                                            placeholder="Enter OTP"
                                        />
                                        <span
                                            onClick={(e) => {
                                                seconds <= 0 && setSeconds(e);
                                            }}
                                            className={`${seconds == 0
                                                ? "text-brand-secondary cursor-pointer "
                                                : "text-gray-secondary cursor-not-allowed "
                                                }  font-medium text-sm absolute right-1 mt-2 `}
                                        >
                                            {`Resend ${seconds > 0 ? "in 00:" + seconds : ""}`}{" "}
                                        </span>
                                    </div>
                                    {err && <span className={`${err === "OTP sent" ? "text-green-500 " : "text-red-600 "}  font-normal text-xs  tracking-widest`}>{err}</span>}

                                    <div className="flex w-full mt-8">
                                        <button
                                            onClick={sendOTPMobile}
                                            className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal`}
                                            disabled={otp.length !== 6}
                                            >
                                            Verify OTP
                                            {showLoader && <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                                        </button>
                                    </div>
                                </div>
                            </div>}



                            <FormFooter {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    sendOTP: (data) => dispatch(sendOtp(data)),
    verifyOTP: (data) => dispatch(verifyLogOtp(data)),
    forgotPassword: (data) => dispatch(forgotPassword(data)),
    setLoginModal: () => dispatch(setLoginModal()),
    getToken: () => dispatch(getToken())

});

export default connect(null, mapDispatchToProps,)(ForgotPassword);
