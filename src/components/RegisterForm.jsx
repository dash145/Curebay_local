/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addRegistration } from '../Redux/Actions/registrationAction';
import { verifyRegOtp } from '../Redux/Actions/userActions';
import { sendOtp, setLoginModal, mobileExist, getToken } from '../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { XIcon } from '@heroicons/react/outline'
import RegForm from './regform2';
import { EnglishText } from '../application/Router/constants/EnglishText';
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";


const FormFooter = (props) => {
  return (
    <div>
      <div className="lg:mx-16 mx-10 lg:mb-0 mb-6 text-center  text-gray-primary"><span className="text-gray-primary text-sm font-normal inline flex  "> {EnglishText.LOGIN_OPTION} &nbsp; <p className="font-medium text-brand-primary cursor-pointer" onClick={(e) => { props.setLoginModal(false) }}>{'Login'}</p></span></div>
      <div className="text-center  text-xs text-gray-tertiary">By continuing you agree to our <Link
        to={APP_ROUTES.TERMS_AND_CONDITION}
        className="text-brand-secondary">Terms of service<br /></Link>
        and <Link to={APP_ROUTES.PRIVACY_POLICY} className="text-brand-secondary">Privacy & Legal Policy</Link>.</div>
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

const RegisterForm = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [mobileNo, setMobileNo] = useState('');
  const [hide, setHide] = useState(true);
  const [err, setErr] = useState('');
  const [IsRegForm, setShowRegistration] = useState(false);
  const [otp, setOtp] = useState('');
  const [showLoader, setLoader] = useState(false);
  const [seconds, setTimer] = useState(60);
  const [errorMsg, setError] = useState("");
  const [errorMsgBool, setErrorBool] = useState(false);

  const setSeconds = async () => {

    

    setTimer(60);
    let dataObj = {
      mobileNo: mobileNo,
      mobileCheck: 1,
    }
    await props.sendOTP(dataObj).then((result) => {
      console.log("result", result)
      setErr('OTP sent');
    }).catch((error) => {
      setLoader(false);
      if (error?.message) {
        setErr(error?.response?.data?.details[0]);
      }
    })
  }


  useEffect(() => {
    console.log(location, "location");

    if (location?.state?.detail == "RedirectToLogin") {
      props.setLoginModal(false)
    }
  }, [location])

  useEffect(() => {
    if (!hide) {
      if (!seconds) return;
      const interval = setInterval(() => {
        const newTime = seconds - 1
        setTimer(newTime);
      }, 1000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [seconds, hide])

  const sendOtpToMobile = async (e) => {
    e.preventDefault();

    if(errorMsgBool || mobileNo?.length===0)
    {
      return
    }
    
   
   


    // if(mobileNo?.length==0){
    //   setError(EnglishText.ENTER_PHONE)
    //   return
    // }

    // if(mobileNo.charAt(0) !== 9 || mobileNo.charAt(0) !== 8){
      
    //   setError("Please enter a valid mobile number");
    //   console.log("mobile", mobileNo, mobileNo.charAt(0));
    // } 
    
    
    
    setLoader(true);
    setErr('');
    let dataObj = {
      mobileNo: mobileNo,
      mobileCheck: 1,
      otp: otp
    }
    if (hide) {
      await props.mobileExist(dataObj).then(async (result) => {

        console.log('dsfnsdj',JSON.stringify())
        if (!result) {
          await props.sendOTP(dataObj).then((result) => {
            setHide(!hide);
            setLoader(false);
          })
        }
        else {
          setErr('The mobile number already exists');
          setLoader(false);
        }
      }).catch((error) => {
        if (error?.message) {
          setErr(error.response.data.details[0]);
          setLoader(false);
        }
      })
    }
    else {
      await props.getToken().then((result) => {
        props.verifyOTP(dataObj).then((result) => {
          setLoader(false);
          setShowRegistration(!IsRegForm)
          setHide(!IsRegForm)
          // history.push('/dashboard')
        }).catch((error) => {
          setLoader(false);
          if (error?.message) {
            setErr(error.response.data.details[0]);
          }
        })
      })
    }
  }
  const reEnterMobile = () => {
    setHide(!hide);
    setErr('')
  }


  const handleChangeInput = (e) => {
    setMobileNo(e.target.value);

    if(e?.target?.value?.length==0){
      setError("")
      setErr('')
      setErrorBool(false)

      return
    }
     let temp=e.target.value

     var regx = /^[6-9]\d{9}$/ ;

    if( !regx.test(e.target.value)){
      setError(EnglishText.LOGIN_ERROR)

      

      setErrorBool(true)

      return
    }

    setErrorBool(false)

    // if(temp.charAt(0) !== 9 || temp.charAt(0) !== 8 || temp.charAt(0) !== 7){
    //   setError("Please enter a valid indian mobile number");
    //   console.log("mobile", temp, temp.charAt(0));
    // } 

    if(e?.target?.value?.length==0){
      setError("")
      setErr('')
      
    }
    const re = /^[0-9]*$/; //rules
    if (re.test(e.target.value)) {
      setMobileNo(e.target.value);
    }

    
    
  }



  const handleChangeOtp = (e) => {


    const re = /^[0-9]*$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value.length <= 6 &&  setOtp(e.target.value);
    }


  };

  return (
    <>
      <div className="grid lg:grid-cols-2  px-2">
        <div className="lg:block hidden p-3 bg-brand-alabaster">
          <img
            width="0"
            height="0"
            className="w-full object-cover sm:h-full sm:w-3/4 md:w-full md:h-3/4 lg:mb-5"
            src="login2.svg"
            alt="banner"
          />
          <div className="font-medium text-brand-primary  text-xl text-center">{EnglishText.REGISTERFORM_BANNER_MSG1}</div>
          <div className="text-xs p-1 font-normal text-brand-manatee text-center">
            {EnglishText.REGISTERFORM_BANNER_MSG2}
          </div>
        </div>
        <div className="items-center bg-white px-6 py-6">
          <div className="lg:ml-6 w-full flex justify-between  text-xl">
            <p className="font-medium text-brand-primary">{'Register'}
            </p>
            <div>
              <XIcon onClick={() =>{history.push('/')

              // props.setLoginModal(false)
              }} className="h-7 ml-18 font-medium text-sm cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col w-full bg-white sm:px-6">
            {hide ? <div className="text-sm pt-4 font-normal  text-gray-primary">
              {EnglishText.REGISTERFORM_PARA}
            </div> : <div className="text-sm pt-4 flex font-normal  text-gray-primary">
              <p className="mr-1">{"Provide 6 digit OTP is send to "}</p>
              <p className={'font-semibold'}>{mobileNo}</p> 
              <p onClick={reEnterMobile} className={'cursor-pointer ml-9 font-semibold text-brand-primary'}>{'Edit'}</p>
            </div>}
            <div className="py-8">
              {!IsRegForm &&
                <form onSubmit={sendOtpToMobile}>
                  {hide && <div className="flex flex-col mb-6">
                    {/* {mobileNo && <span className={`${mobileNo.length == 10 ? 'text-brand-lightgreen ' : ''} text-red-600  font-normal text-xs  tracking-widest`}>{'Enter Your Phone Number'}</span>} */}
                    <div className="flex relative">
                      <input
                       
                        name="mobile"
                        maxLength={10}
                        //type="number"
                       minLength={10}
                       
                        
                        id="sign-in-email-register"
                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none ${mobileNo.length == 10 ? 'border-brand-lightgreen' : mobileNo === "" ? 'border-gray-highlight' : 'border-red-600'}`}
                        placeholder={EnglishText.REGISTERFORM_INPUT_PLACEHOLDER}
                        value={mobileNo}
                        onChange={handleChangeInput}
                      />
                    </div>

                    
                    {err && mobileNo?.length==10 && <span className="text-red-600  font-normal text-xs  tracking-widest">{err}</span>}

                    {errorMsg?.length!=0  && errorMsgBool   && <span className={`${!errorMsgBool ? 'text-brand-lightgreen ' : ''} text-red-600  font-normal text-xs  tracking-wides mt-2`}>{errorMsg}</span>}

                  </div>}
                  {!hide &&
                    <>
                      {/* {otp && <span className={`${otp.length == 6 ? 'text-brand-lightgreen ' : otp.length == "" ? "text-gray-secondary " : 'text-red-600 '}   font-normal text-xs  tracking-widest`}>{'Enter OTP'}</span>} */}
                      {otp && <span className={`${otp.length == 6 ? 'text-brand-lightgreen ' : ''} text-red-600  font-normal text-xs  tracking-widest`}>{'Enter OTP'}</span>}
                      <div className="flex flex-col mb-6">
                        <div className="flex relative ">
                          <input
                            name="otp"
                            
                            id="sign-in-email-password"
                            value={otp}
                            maxLength={6}
                            minLength={6}
                            onChange={handleChangeOtp}
                            className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${'border-gray-highlight'
                              }`}
                            placeholder="Enter OTP"
                          />
                          <span onClick={() => { seconds <= 0 && setSeconds() }} className={`${seconds == 0 ? "text-brand-secondary cursor-pointer " : 'text-gray-secondary cursor-not-allowed '}  font-medium text-sm absolute right-1 mt-2 `}>{`Resend ${seconds > 0 ? "in 00:" + seconds : ''}`} </span>
                        </div>
                        {err && <span className={`${err === "OTP Sent" ? "text-green-500 " : "text-red-600 "}  font-normal text-xs  tracking-widest`}>{err}</span>}
                      </div>
                    </>
                  }
                  <div className="flex w-full my-8">
                    <button
                      type="submit"
                      className={`p-2  bg-brand-secondary content-center  text-white w-full  rounded-lg text-center text-base font-normal}`}
                    >
                      {hide ? 'Send OTP' : 'Verify'}
                      {showLoader && <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                    </button>
                  </div>
                </form>
              }
              {IsRegForm && <RegForm mobileNo={mobileNo} />}

              {/* <Seperateor /> */}
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
  verifyOTP: (data) => dispatch(verifyRegOtp(data)),
  setLoginModal: () => dispatch(setLoginModal()),
  addRegistration: () => dispatch(addRegistration()),
  mobileExist: (data) => dispatch(mobileExist(data)),
  getToken: (data) => dispatch(getToken(data)),
});

export default connect(null, mapDispatchToProps,)(RegisterForm);


