import React from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from '../Router/constants/AppRoutes';

const NotFound = () => {
  const history = useHistory();

  const message = {
    buttonText: 'Back to Home',
  };
  const redirectTo = (event) => {
    event.preventDefault();
    history.push(APP_ROUTES.DASHBOARD);
  };
  return (
    <div className="h-screen w-3/4 md:w-1/2 mx-auto flex gap-2 flex-col items-center justify-center">
      <img src={`login.svg`} alt="" className="w-100 h-100" />
      <div className="pt-2 text-lg text-gray-1 font-medium text-center">{message.message1}</div>
      <div className="textgray-3 text-base text-center">{message.message2}</div>
      <button
        onClick={redirectTo}
        className={`my-6 py-2 px-4 bg-brand-primary text-white w-3/4 md:w-1/2 duration-150 disabled:cursor-default rounded transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none`}>
        {message.buttonText}
      </button>
    </div>
  );
};

export default NotFound;
