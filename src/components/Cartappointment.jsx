import React from 'react'
import steth from '../Assets/Images/steth.svg';
import { Link } from 'react-router-dom';
import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes';

function Cartappointment() {
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
          <a href="/diagnosis">Lab Test</a>
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
        <h2 className="text-green-500 text-3xl font-normal text-center  "><b>Appointment confirmed</b> </h2>

      </div>

      <div className="flex items-center justify-center ">

        <div className=" py-4 px-8  bg-white shadow-lg rounded-lg my-7 mb-12  ">

          <div className="flex h-full ">
            <img src={steth} alt="stethescope" className="w-10 mt-2" />
            <div>
              <div className="flex justify-between">
                <p className="text-sm pl-2 pt-2">Blood Sugar Test</p>
                <p className="text-xs pl-16 pt-3 text-green-600">Today</p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="h-5 w-14 pl-2 bg-purple-400 rounded-2xl flex">
                  <p className="text-xs text-white">Mother </p>
                  <p className="text-sm pl-8">Online</p>
                </div>
                <p className="text-xs font-medium">3:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  mb-8 justify-center items-center mb-2">
        <Link to={USERPROFILE_ROUTES.MYAPPOINTMENTS} className="bg-brand-primary  text-xl m-8 font-medium text-white p-2 rounded-xl mr-2"> Go to Appointments</Link>
        {/* <Link to="#" className="border border-brand-primary text-sm text-brand-primary rounded-xl p-2 mr-2"><a href="" className="text-xl m-8 font-medium text-indigo-500">Add to Calendar</a></Link> */}
      </div>
    </>
  );
}
export default Cartappointment;
