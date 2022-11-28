/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../application/Router/constants/AppRoutes'

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
  return (
    <div>
      <div className="text-center py-2 text-gray-primary">Already have an account ? <Link className="font-medium text-brand-primary" to={{ pathname: APP_ROUTES.LOGIN, state: { login: {} } }}>{'Sign In'}</Link></div>
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

const RegisterForm = (props) => {
  // const [isOTPField, setOtpField] = useState(false);
  const [user, setuser] = useState({
    userName: '',
    email: '',
    otp: '',
    password: ''
  })
  const [validation, setValidation] = useState({
    userName: '',
    email: '',
    passwword: '',
  })
  const submitted = '';
  const userData = {};
  const handleChange = (e) => {
    setValidation({ ...validation, [e.target.name]: e.target.value });

  };
  const handleValidation = () => { };

  // const swap = () => {
  //   setOtpField(!isOTPField);
  // }


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
              <div className="flex flex-col mb-6">
                <div className="flex relative">
                  <input
                    type="text"
                    name="email"
                    id="sign-in-email-register"
                    className={`appearance-none border-b  w-full py-2 px-4 bg-white placeholder-gray-secondary text-base focus:outline-none ${'border-gray-highlight'
                      }`}
                    placeholder="Enter Your Phone Number or Email Address"
                    value={user.email}
                    onChange={handleChange}
                    onBlur={(e) => handleValidation(e)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6 hidden">
                <div className="flex relative ">
                  <input
                    name="password"
                    type="password"
                    id="sign-in-email-password"
                    value={user.otp}
                    onChange={handleChange}
                    className={`appearance-none border-b w-full py-2 px-4 bg-white text-gray-3 placeholder-gray-4  text-base focus:outline-none ${submitted === 'signin' && !user.otp ? 'border-brand-error' : 'border-gray-6'
                      }`}
                    placeholder="Enter OTP"
                    onBlur={(e) => handleValidation(e)}
                  />
                </div>
              </div>
              <div className="flex w-full mt-8">
                <button
                  type="submit"
                  className={`p-4 bg-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1 ${userData?.registering ? 'disabled:opacity-50' : ''
                    }`}
                  disabled={userData?.registering}>
                  Use OTP
                </button>
              </div>
              <Seperateor />
              <div className="flex w-full mb-4">
                <button
                  type="submit"
                  className={`p-4 bg-brand-primary hover:bg-brand-hover focus:ring-brand-focus text-white w-full duration-150 disabled:cursor-default rounded-2xl transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-1 ${userData?.registering ? 'disabled:opacity-50' : ''
                    }`}
                  disabled={userData?.registering}>
                  Use Password
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

export default RegisterForm;
