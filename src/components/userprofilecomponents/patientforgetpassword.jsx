import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { Link, Route, Routes, useLocation, useHistory } from "react-router-dom";
import { setLoginModal } from '../../Redux/Actions/userActions';
import ForgetPassword from "../../Assets/Images/Key-pana.svg";
import { patientResetPassword, patientFeedback } from '../../Redux/Actions/UserprofileActions';
import { useSelector } from 'react-redux';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { EnglishText } from '../../application/Router/constants/EnglishText';



const Patientforgetpassword = (props) => {
    const patientinfo = useSelector((state) => state.patientinfo);
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('red');
    const [showLoader, setLoader] = useState(false);
    const { isLoading, errMsg, isError, resetPasswordData } = useSelector(state => state.resetpassword)
    const { patientinfoData } = patientinfo;
    const dispatch = useDispatch()
    const history = useHistory()
    const [regexP] = useState(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    const [password, setPassword] = useState({
    
        newPassword: "",
        confirmPassword: ""
    })
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false)
    const [newPasswordShown, setnewPasswordShown] = useState(false)
    const [validationError, setvalidationError] = useState("")
    const [confirmValidation, setConfirmValidation] = useState("")
    const [newPassValidation, setNewPassValidation] = useState("")
    const location = useLocation()
    const params = location.search;
    // console.log(params.get("patientcode") , "sdvbsoudvhosdu")

    const handlePasswordChange = (e) => {
        setPassword({
            ...password, [e.target.name]: e.target.value.trim()
        })
            passwordValidate(e.target.value) 

            if(e.target.value.trim().length==0){
                setConfirmValidation("")
                return
            }
    }


    const handlePasswordChangeNewPassword = (e) => {

        

     
        setPassword({
            ...password, [e.target.name]: e.target.value.trim()
        })
        passwordValidateNew(e.target.value) 

        if(e.target.value.trim().length==0){
            setNewPassValidation("")
            return
        }
    }

    useEffect(() => {
        setPassword({

            newPassword: "",
            confirmPassword: ""
        })

    }, [isError])

    const passwordValidateNew = value => {
        console.log(value, "dscksbascjblasjlc")
        const regexNum = /\d/;
        const regexUppercase = /[A-Z]/;
        const regexCharLength = /^.{8,72}$/;
        const special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        // console.log(regexNum.test(value), "sdfdshidosfpids")
        if (!regexNum.test(value)) {
            setNewPassValidation("MUST contain at least one number")
        } else if (!regexUppercase.test(value)) {
            setNewPassValidation("MUST contain at least one uppercase letter")
        } else if (!regexCharLength.test(value)) {
            setNewPassValidation("MUST contain at least 8 characters")
        } else if (!special.test(value)) {
            setNewPassValidation("MUST contain at least one special character (!”#$%&'()*+,-./:;<=>?)")
        }  else if(value.length==0){
            setNewPassValidation("")
        }
        
        else {
            setNewPassValidation("")
        }

    };


    const passwordValidate = value => {
        console.log(value, "dscksbascjblasjlc")
        const regexNum = /\d/;
        const regexUppercase = /[A-Z]/;
        const regexCharLength = /^.{8,72}$/;
        const special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        // console.log(regexNum.test(value), "sdfdshidosfpids")
        if (!regexNum.test(value)) {
            setConfirmValidation("MUST contain at least one number")
        } else if (!regexUppercase.test(value)) {
            setConfirmValidation("MUST contain at least one uppercase letter")
        } else if (!regexCharLength.test(value)) {
            setConfirmValidation("MUST contain at least 8 characters")
        } else if (!special.test(value)) {
            setConfirmValidation("MUST contain at least one special character (!”#$%&'()*+,-./:;<=>?)")
        } else {
            setConfirmValidation("")
        }

    };

    const showConfirmidePassword = (e) => {
        setconfirmPasswordShown(!confirmPasswordShown)

    }

    const shownewHidePassword = (e) => {
        setnewPasswordShown(!newPasswordShown)

    }


    const handleSubmit = e => {
        e.preventDefault();

        if(newPassValidation.length !=0)
        return
       
        const res = params.split("?patientcode=")

        if (password?.newPassword.length==0) {

            setNewPassValidation("Please enter new  Password");
            return
        }
        if (password?.confirmPassword.length==0) {
            setConfirmValidation("Please enter confirm Password");
            return
        }
        if (password?.newPassword !== password?.confirmPassword) {
             setConfirmValidation("Confirm Password doses not match New Password")
            return
        }

        setConfirmValidation("")
        //setNewPassValidation("")
        

        let data = {
            currentPasswordVal: Base64.encode(password.newPassword),
            patientCode: res[1],
        }
        console.log(data, "userData")
        dispatch(patientResetPassword(data)).then((result) => {
            // console.log("result", result);


            setColor('green');
            setLoader(false);
            // setMsg("The password has been changed successfully") 
            setConfirmValidation(EnglishText.SUCCESS_PASSWORD)
            setTimeout(() => {
                history.push({ pathname: APP_ROUTES.LOGIN, state: { background: "/", login: true } });
            }, 1500)

        }).catch((res) => {
            setColor('red')
            setLoader(false);
            toast(res.response.data.details[0]);
        });
    };

    // useEffect(() => {

    //     console.log("   ", resetPasswordData)
    //     if (resetPasswordData.details?.length ) {
    //         history.push({ pathname: APP_ROUTES.LOGIN, state: { background: "/", login: true } });
    //     } else {
    //         history.push({ pathname: APP_ROUTES.FORGET_PASSWORD, state: { login: false } });
    //     }
    // }, [resetPasswordData])

    // console.log(validationError, "safoahipfvwhipf")

    return (
        <>

           
            <div className=" flex justify-center mx-5 lg:mx-24 lg:my-24 ">
                <div>
                    <img className="h-full w-full" src={ForgetPassword} alt="forget password" />
                </div>
                <form className="mb-10 p-10 rounded-lg" onSubmit={handleSubmit}>
                    <h3 className="my-2 text-brand-primary font-medium text-center text-2xl ">{EnglishText.NEW_PASSWORD}</h3>

                    <p className="text-gray-500  text-xs text-center mb-5">{EnglishText.PASSWORD_LENGTH}</p>

                    <div className='flex relative justify-center'>
                        <input type={newPasswordShown ? "text" : "password"} className="my-2 border border-gray-300 px-4 rounded-sm text-lg  focus:outline-none" value={password.newPassword} placeholder="New Password ..." name='newPassword' onChange={handlePasswordChangeNewPassword} />
                        {newPasswordShown ? <EyeIcon className='cursor-pointer mt-2 relative right-7 top-1 h-5' name="new" onClick={shownewHidePassword} /> : <EyeOffIcon name="new" className='cursor-pointer mt-2 relative right-7 top-1 h-5' onClick={shownewHidePassword} />}
                    </div>

                   

                         <div className=" justify-start">
                        <span className="text-red-500   text-xs ml-8">{newPassValidation}</span>
                       
                    </div>
                    

                   


                    {/* {!password?.newPassword && <span className="text-red-500  text-xs">"Confirm Password" doses not match "New Password".</span>} */}

                    {/* <div className='text-red-500  text-xs flex relative justify-start ml-6' >{validationError}</div> */}
                    <div className='text-grey-500 justify-center  text-xs my-5 flex relative' >
                        {/* <div className='mr-4'>Note -</div> */}
                        <ul style={{ listStyleType: 'disc' }}>
                            <li>{EnglishText.LENGTH_8}</li>
                            <li>{EnglishText.SPECIAL_CHARACTER}</li>
                            <li>{EnglishText.ONE_NUMBER}</li>
                            <li>{EnglishText.ONE_UPPERCASE}</li>

                        </ul>
                    </div>
                    <div className='flex relative justify-center'>
                        {/* <label>Confirm Password</label> */}
                        <input  type={confirmPasswordShown ? "text" : "password"} className="my-2 border border-gray-300 px-4 rounded-sm text-lg  focus:outline-none" value={password.confirmPassword} placeholder="Confirm Password ..." name="confirmPassword" onChange={handlePasswordChange} />
                        {confirmPasswordShown ? <EyeIcon className='cursor-pointer mt-2 relative right-7 top-1 h-5' name="confirm" onClick={showConfirmidePassword} /> : <EyeOffIcon name='confirm' className='cursor-pointer mt-2 relative right-7 top-1 h-5' onClick={showConfirmidePassword} />}
                    </div>
                    <div className="flex justify-start">
                        <span className="text-red-500  text-xs text-xs ml-8">{confirmValidation}</span>
                        {/* <span className="text-green-500  text-xs ml-6">{confirmValidation}</span> */}
                    </div>

                    {/* { password?.confirmPassword && password?.newPassword !== password?.confirmPassword && <span className="text-red-500  text-xs">{EnglishText.UNMATCHED_PASSWORD}</span>} */}

                    <div className="flex justify-center">
                        <button type='submit' className="bg-brand-secondary text-white px-3 py-1 my-2 rounded-md text-xl font-normal ">Submit
                            {showLoader && <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                        </button>
                        {/* {isLoading && <div className="loader float-right ml-2 ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>} */}
                    </div>


                </form>

            </div>
        </>
    )
}

export default Patientforgetpassword


