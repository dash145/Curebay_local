/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { useDispatch, useSelector } from 'react-redux';
import { patientChangepassword, patientFeedback } from '../../Redux/Actions/UserprofileActions';
import { editPatientDetails, getPatientDetails } from '../../Redux/Actions/UserprofileActions';
import { Base64 } from 'js-base64';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { spe } from '../../Redux/Constants/SpecialityConstants';
import { ToastContainer, toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { Logout } from '../../Redux/Actions/userActions';

function Changepassword() {
    const { isLoading, errMsg, isError, changePasswordData } = useSelector(state => state.changepassword)

    const history = useHistory();
    const location = useLocation();
    const [digit, setDigit] = useState(false);
    const [err, setErr] = useState('');
    const [passLength, setPassLength] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [special, setSpecial] = useState(false);
    const [regexP] = useState(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    const [isDisable, setDisable] = useState(true);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientinfo = useSelector((state) => state.patientinfo);
    const { patientinfoData } = patientinfo;
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        rePassword: ""
    })
    const [confirmValidation, setConfirmValidation] = useState("")

    const [oldPasswordShown, setoldPasswordShown] = useState(false)
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false)
    const [newPasswordShown, setnewPasswordShown] = useState(false)
    const { patientData, patientSession, isOpen, index } = userData;

    useEffect(() => {
        dispatch(getPatientDetails(userData.code));
    }, []);

    useEffect(() => {
        // setFeedback(patientinfoData)
        console.log(patientinfoData, "scsancoasnoas", userData)
    }, [patientinfoData]);

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
        if (e.target.name === "newPassword") {
            passwordValidate(e.target.value)

        }
    };

    useEffect(() => {
        setPassword({
            oldPassword: "",
            newPassword: "",
            rePassword: ""
        })

    }, [isError])

    const logout = (e) => {
        localStorage.clear();
        let dataObj = {
            sessionId: patientSession?.id,
            userCode: patientSession?.patientCode
        }
        dispatch(Logout(dataObj));
        history.push(APP_ROUTES.DASHBOARD)
    };

    //   useEffect(() => {

    //     console.log("sdsdnvoisdno", changePasswordData.details)
    //     // if (changePasswordData.details?.length ) {
    //     //     // history.push({ pathname: APP_ROUTES.LOGIN, state: { background: "/", login: true } });
    //     // } else {
    //     //     // history.push({ pathname: APP_ROUTES.FORGET_PASSWORD, state: { login: false } });
    //     // }
    // }, [changePasswordData])

    const savechangepassword = (e) => {
        e.preventDefault();
        let data = {
            createdBy: patientinfo.code,
            currentPasswordVal: Base64.encode(password.oldPassword),
            email: patientinfo.email,
            mobile: patientinfo.mobile,
            modifiedBy: userData.code,
            passWordVal: Base64.encode(password.rePassword),
            patientCode: userData.code,
            status: 1
        }
        console.log(data, "userData", userData)



        dispatch(patientChangepassword(data)).then((result) => {
            console.log("xxxxxxx", result);
            setConfirmValidation('The password has been changed successfully!');
            // <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>

            setTimeout(() => {
                // toast('The password has been changed successfully');
                history.push({ pathname: APP_ROUTES.LOGIN, state: { background: "/", login: true } });
                logout();
            }, 1500)
        }).catch((res) => {
            // debugger
            // console.log("Error at line 112", res.response.data.details);
            toast(res.response.data.details[0]);
            // setTimeout(()=>{
            //     history.push({ pathname: APP_ROUTES.LOGIN, state: { background: "/", login: true } });
            // })
        });

        console.log("Message", changePasswordData);

        // if(isDisable) {
        //     toast('Password Saved Successfully');
        //     setErr("");
        //     // setErr('feedback saved successfully');
        // }else{
        //     setErr(' saved successfully');
        // }
        // to dispatch newly created object to createlocation action
    }
    const passwordValidate = value => {
        const regexNum = /\d/;
        const regexUppercase = /[A-Z]/;
        const regexCharLength = /^.{8,72}$/;
        const special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        regexNum.test(value)
            ? setDigit(true)
            : setDigit(false);
        regexUppercase.test(value)
            ? setUpperCase(true)
            : setUpperCase(false);
        regexCharLength.test(value)
            ? setPassLength(true) :
            setPassLength(false);
        special.test(value)
            ? setSpecial(true) :
            setSpecial(false);
    };

    useEffect(() => {
        if (password.rePassword === password.newPassword && regexP.test(password.newPassword) && password.oldPassword) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
        console.log("sdsf")
    }, [password])

    useEffect(() => {
        if (userData?.id) {
            console.log("patientinfo", userData.code)

        }
        else {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }
    }, []);


    const showoldhidePassword = (e) => {
        setoldPasswordShown(!oldPasswordShown)

    }


    const shownewHidePassword = (e) => {
        setnewPasswordShown(!newPasswordShown)

    }

    const showConfirmidePassword = (e) => {
        setconfirmPasswordShown(!confirmPasswordShown)

    }



    return (
        <>
            <ToastContainer />
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-4 pt-5">
                <li className="inline-flex items-center">
                    <a href="/">Home</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <a href="/profile/changepassword">Profile</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>


                <li className="inline-flex items-center">
                    <a href="/profile/changepassword">Change Password</a>

                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    ></path>

                </li>

            </ul>
            <br />
            <div className="flex justify-between " style={{ background: "#F8F8F8" }}>
                <div className="lg:block hidden w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-9/12 w-full mt-5 ">
                    <div>
                        <div className="pb-4">
                            <h1 className="text-medium font-bold text-2xl text-gray-800">
                                Change Password
                            </h1>
                        </div>
                        <div className="  bg-white w-11/12 h-112 p-5 antialiased justify-between lg:border border-gray-200">

                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex relative pt-2">
                                    <input type={oldPasswordShown ? "text" : "password"} autocomplete="off" id="oldPassword" name="oldPassword" value={password.oldPassword} maxLength="32" className="peer bg-transparent h-10 lg:w-6/12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 text-xs" placeholder="Enter Current Password" onChange={handleChange} />
                                    {oldPasswordShown ? <EyeIcon className='cursor-pointer mt-2 relative right-7 top-1 h-5' name="confirm" onClick={showoldhidePassword} /> : <EyeOffIcon name='confirm' className='cursor-pointer mt-2 relative right-7 top-1 h-5' onClick={showoldhidePassword} />}
                                    <label for="oldPassword" className="absolute left-0 -top-3.5 text-brand-manatee text-sm ">Current Password <span className="text-brand-star">*</span></label>
                                </div>
                                <div className="flex relative pt-4">
                                    <input type={newPasswordShown ? "text" : "password"} autocomplete="off" id="newPassword" name="newPassword" value={password.newPassword} maxLength="32" className="peer bg-transparent h-10 lg:w-6/12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 text-xs" placeholder="Enter New Password" onChange={handleChange} />
                                    {newPasswordShown ? <EyeIcon className='cursor-pointer mt-2 relative right-7 top-1 h-5' name="new" onClick={shownewHidePassword} /> : <EyeOffIcon name="new" className='cursor-pointer mt-2 relative right-7 top-1 h-5' onClick={shownewHidePassword} />}
                                    <label for="newPassword" className="absolute left-0 -top-3.5  text-sm text-brand-manatee pt-3">New Password <span className="text-brand-star">*</span></label>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-3 ">
                                    <span disabled className={`${passLength ? "text-green-500 " : "text-gray-400 "}cursor-not-allowed bg-gray-200 w-34 text-xs px-2 py-1  rounded-sm mr-2`}>8 characters</span>
                                    <span disabled className={`${special ? "text-green-500 " : "text-gray-400 "}cursor-not-allowed bg-gray-200 w-34 text-xs px-2 py-1  rounded-sm mr-2`}>1 special character</span>
                                    <span disabled className={`${upperCase ? "text-green-500 " : "text-gray-400 "}cursor-not-allowed bg-gray-200 w-34 text-xs px-2 py-1  rounded-sm mr-2`}>1 uppercase</span>
                                    <span className={`${digit ? "text-green-500 " : "text-gray-400 "} cursor-not-allowed bg-gray-200 text-xs px-2 w-34 py-1 p rounded-sm mr-2`}>1 numeric</span>
                                </div>
                                <div className="flex relative pt-4">
                                    <input type={confirmPasswordShown ? "text" : "password"} autocomplete="off" id="rePassword" name="rePassword" value={password.rePassword} maxLength="32" className="peer bg-transparent h-10 lg:w-6/12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 text-xs" placeholder="Confirm New Password" onChange={handleChange} />
                                    {confirmPasswordShown ? <EyeIcon className='cursor-pointer mt-2 relative right-7 top-1 h-5' name="confirm" onClick={showConfirmidePassword} /> : <EyeOffIcon name='confirm' className='cursor-pointer mt-2 relative right-7 top-1 h-5' onClick={showConfirmidePassword} />}
                                    <label for="rePassword" className="absolute left-0 -top-3.5  text-sm text-brand-manatee pt-3">Confirm New Password <span className="text-brand-star">*</span></label>
                                </div>
                                {password?.rePassword && password?.newPassword !== password?.rePassword && <span className="text-red-500  text-xs">Confirm New Password doses not match New Password.</span>}
                                <span className="text-red-500  text-xs">{errMsg}</span>
                                <span className="text-green-500  text-xs">{confirmValidation}</span>
                                <div className="flex justify-end">
                                    <button onClick={() => history.goBack()} className="bg-white text-brand-secondary p-2 rounded-xl mr-2 text-sm">Cancel</button>
                                    <button onClick={savechangepassword} disabled={isDisable} className={`disabled:opacity-50 bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2`}>
                                        Save Changes
                                        {/* {isLoading && <div className="loader float-right ml-2 ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>} */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Changepassword;
