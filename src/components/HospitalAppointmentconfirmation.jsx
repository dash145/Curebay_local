import React from 'react'
import nurse from '../Assets/Images/nurseh.svg';
import { useHistory, Link } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';

function HospitalAppointmentConfirmation() {

  const history = useHistory();
  const redirectTo = (event) => {
    event.preventDefault();
    history.push(APP_ROUTES.POST_CONSULTATION);
  };




  return (
    <>
      {/* breadcrumbs */}
      <ul className="flex text-brand-secondary text-sm lg:text-base pl-10 pt-5">
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
          <a href="/doctors">Doctor</a>
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
          <a>Appointment Successfull</a>
        </li>
      </ul>

      <br /><br />
      <br /><br />

      <div className="flex flex-col justify-center items-center">
        <p className="text-green-500 text-2xl font-medium text-center  ">Appointment confirmed </p>

      </div>

      <div className="flex items-center justify-center ">

        <div className=" py-4 px-8 w-96 bg-white shadow-lg rounded-lg my-7 mb-12 border border-gray-200 ">

          <div className="flex h-full ">
              <div className="w-12 h-12 bg-blue-200 rounded-full">
            <img src={nurse} alt="nurse" className="w-10 pl-2 pt-2" />
            </div>
           <div>
            <div className="flex space-x-14">
                <p className="text-sm text-brand-secondary  pl-3">Bethany Hospital</p>
                <p className="text-xs font-medium text-green-400  ">Upcoming</p>
            </div>
            <div className="flex justify-between mt-2">
                <div className="flex">
                <div className="h-5 w-14 pl-2 ml-2 bg-blue-500 rounded-2xl flex">
                  <p className="text-xs text-white ">Mother </p>
                  </div>
                  <p className="text-sm pl-3">Single Room</p>
                </div>
                <p className="text-xs font-medium text-gray-500">18 Dec</p>
              </div>
            </div>
            {/* <div>
              <div className="flex justify-between">
                <p className="text-sm pl-2 pt-1">Dr Akshay Shetty</p>
                <p className="text-xs pl-16 pt-1 text-green-600">Today</p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="h-5 w-14 pl-2 bg-purple-400 rounded-2xl flex">
                  <p className="text-xs text-white">Mother </p>
                  <p className="text-sm pl-8">Online</p>
                </div>
                <p className="text-xs font-medium">3:30 PM</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex  mb-8 justify-center items-center">
        <Link to="/" className="bg-brand-secondary  text-base px-6 font-medium text-white p-2 rounded-xl mr-2 "> Go to Appointment</Link>
        <Link to="#" className="border border-brand-secondary px-8 text-base text-brand-secondary rounded-xl p-2 mr-2 font-medium"><a href="">Add to Calendar</a></Link>
      </div>
    </>
  );
}
export default HospitalAppointmentConfirmation;
