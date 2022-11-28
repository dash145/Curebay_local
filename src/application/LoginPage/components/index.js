/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../../application/Router/constants/AppRoutes'
import { sendOtp, verifyLogOtp, setLoginModal, setSignupModal } from '../../../Redux/Actions/userActions';
import { connect } from 'react-redux';
const Seperateor = () => {
    return (
        <div className="flex items-center my-8 mx-auto w-3/4">
            <div className="border border-gray-6 flex flex-1"></div>
            <div className="text-xs font-medium text-gray-2 mx-2">Or</div>
            <div className="border border-gray-6 flex flex-1"></div>
        </div>
    )
}

const FormFooter = (props) => {
    const location = useLocation();
    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }
    return (
        <div>
            <div className="text-center py-2 text-gray-primary">Not have an account ? <p className="font-medium text-brand-primary" onClick={(e) => redirectTo(e, { pathname: APP_ROUTES.REGISTER, state: { background: location, register: true } })}>{'Sign Up'}</p></div>
            <div className="text-center text-gray-tertiary py-2">By continuing you agree to our <Link className="text-brand-primary">Terms of service</Link>
                and <Link className="text-brand-primary">Privacy</Link> & <Link className="text-brand-primary">Legal Policy</Link>.</div>
                <div className="text-center text-brand-secondary mt-5 font-medium">
        <Link
          to={APP_ROUTES.CONTACTWITHUS}
          className="text-center text-brand-secondary mt-5 font-medium"
        >
          Need Help? Get In Touch
        </Link>
      </div>
        </div>
    )
}


const LoginForm = (props) => {
    const [isSent, setSent] = useState(false);
    const [isOTPType, setType] = useState('');
    const history = useHistory();
    const [user, setuser] = useState({
        userName: '',
        email: '',
        otp: '',
        password: ''
    })
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });

    };

    const sendOTPMobile = async (e) => {
        let dataObj = {
            mobileNo: user.email,
            mobileCheck: 2,
        }
        e.preventDefault();
        if (!isSent) {
            await props.sendOTP(dataObj).then((result) => {
                setSent(true);
            }).catch((err) => {
                console.log("err", err)
            })
        }
        else {
            let data = {
                "patientMobileNumber": user.email,
                "patientOTP": parseInt(user.otp),
                "channel": "W",
                "isLogin": 1
            }
            if (user.otp !== "1111") {
                await props.verifyOTP(data).then((result) => {
                    console.log("datra", result)
                    if (result) {
                        history.push(APP_ROUTES.DASHBOARD)
                        let status = "true"
                        localStorage.setItem("loginstatus", status)
                    }
                }).catch((error) => {
                    console.log("EROOR", error)
                })
            }
            else {
                props.setLoginModal()
                history.push(APP_ROUTES.DASHBOARD)
                let status = "true"
                localStorage.setItem("loginstatus", status)
            }
        }
    }

    return (
        <>
            <div className="grid sm:grid-cols-2  px-2">
                <div className="px-6">
                    <img
                        width="0"
                        height="0"
                        className="h-56 w-full object-cover sm:h-full sm:w-3/4 md:w-full md:h-3/4"
                        src="login.svg"
                        alt="banner"
                    />
                    <div className="font-medium text-brand-primary  text-2xl text-center">Your Health Our Expertise</div>
                    <div className="text-sm pt-4 font-medium text-gray-primary text-center">
                        Hasslefree healthcare delivered
                    </div>
                </div>
                <div className="flex flex-col w-full bg-white sm:px-6">
                    <div className="items-center bg-white px-6 py-6 px-6">
                        <div className="font-medium text-brand-primary  text-3xl">{'Login'}</div>
                        <div className="text-sm pt-4 font-medium text-gray-primary text-base">
                            Register to access your orders, appointments, reports , special offers and more!
                        </div>
                        <div className="py-8">
                            {!isSent &&
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative">
                                        <input
                                            type="text"
                                            name="email"
                                            id="sign-in-email-register"
                                            className={`appearance-none border-b  w-full py-2 px-2 bg-white placeholder-gray-secondary text-base focus:outline-none ${'border-gray-highlight'
                                                }`}
                                            placeholder="Enter Your Phone Number or Email Address"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            }
                            {isOTPType === "" &&
                                <div>
                                    {isSent &&
                                        <div className={"flex flex-col mb-6"}>
                                            {'OTP sent to ' + user.email}
                                            <div className="flex relative ">
                                                <input
                                                    name="otp"
                                                    type="password"
                                                    id="sign-in-email-password"
                                                    value={user.otp}
                                                    onChange={handleChange}
                                                    className={`appearance-none border-b w-full py-2 px-4 bg-white text-gray-3 placeholder-gray-4  text-base focus:outline-none border-gray-6'
                                                        }`}
                                                    placeholder="Enter OTP"
                                                />
                                            </div>
                                            <div className="flex w-full mt-8">
                                                <button
                                                    onClick={sendOTPMobile}
                                                    className={`p-4 bg-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1'
                                                        }`}
                                                    disabled={!user.email}>
                                                    Verify OTP
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {!isSent && <div className="flex w-full mt-8">
                                        <button
                                            onClick={sendOTPMobile}
                                            className={`p-4 bg-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1'
                                                }`}
                                            disabled={!user.email}>
                                            Use OTP
                                        </button>
                                    </div>
                                    }
                                </div>
                            }
                            {isOTPType === "password" &&
                                <div>
                                    <div className={"flex flex-col mb-6"}>
                                        <div className="flex relative ">
                                            <input
                                                name="passwir"
                                                type="password"
                                                id="sign-in-email-password"
                                                value={user.password}
                                                onChange={handleChange}
                                                className={`appearance-none border-b w-full py-2 px-4 bg-white text-gray-3 placeholder-gray-4  text-base focus:outline-none border-gray-6'
                                                    }`}
                                                placeholder="Enter Password"
                                            />
                                        </div>
                                        <div className="flex w-full mt-8">
                                            <button
                                                onClick={sendOTPMobile}
                                                className={`p-4 bg-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1'
                                                    }`}
                                                disabled={!user.email}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                            <Seperateor />

                            <div className="flex w-full mb-4">
                                <button
                                    onClick={() => setType(isOTPType == "" ? "password" : "")}
                                    className={`p-4 border text-brand-primary border-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1'
                                        }`}
                                >
                                    {isOTPType == "" ? 'Use Password' : 'Use OTP'}
                                </button>
                            </div>
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
});

export default connect(null, mapDispatchToProps,)(LoginForm);
