import React from 'react'
import steth from '../Assets/Images/steth.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { memberColor } from '../config/constant';
import { useSelector } from 'react-redux';
function AppoinmentConfirmation() {

  const location = useLocation();
  const history = useHistory()
  const { state } = location;
  const { isLoading, success, errMsg } = useSelector(state => state.doctorAppointment);
  console.log(state, "dsvisdovsdjvidsjv");
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
          <a>{`Payment ${ isLoading && !success ? 'Pending' : (!isLoading && success ? 'Successfull' : 'Unsuccessfull')}`}</a>
        </li>
      </ul>

      <br /><br />
      <br /><br />

      {isLoading ?
        <div className="flex flex-wrap justify-center">
          <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
        </div> : ''
      }

      {success ?
        <div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-green-500 text-3xl font-normal text-center  "><b>Appointment confirmed</b> </h2>
          </div>
          <div className="flex items-center justify-center ">

            <div className=" py-4 px-8  bg-white shadow-lg rounded-lg my-7 mb-12  ">

              <div className="flex h-full ">
                <img src={steth} alt="stethescope" className="w-10 mt-2" />
                <div>
                  <div className="flex justify-between ">
                    <p className="text-sm pl-2 pt-2">{state?.userSalutation + " " + state?.userName}</p>
                    <p className="text-xs pl-16 pt-3 text-green-600"> {moment() === moment(state.whenAppointment, "MM/DD/yyyyy") ? "Today" : state.whenAppointment}</p>
                  </div>
                  <div className="flex justify-between mt-2 pl-2">
                    <div className={`h-4 px-2 bg-brand-${memberColor[state.relation]} rounded-2xl flex`}>
                      <p className="text-xs text-white">{state.relation} </p>
                    </div>
                    <p className="text-sm mr-14">{state?.consultationsType === "V" ? 'Online' : 'InPerson'}</p>
                    <p className="text-xs font-medium">{state?.fromTime ? moment(state.fromTime, 'hh:mm').format("HH:mm A") : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  mb-8 justify-center items-center">
            <button  onClick={() => history.push({pathname: '/' , state :{fromPayment: true}})} className="bg-brand-primary  text-xl m-8 font-medium text-white p-2 rounded-xl mr-2"> Go to Home</button>
            {/* <Link to="#" className="border border-brand-primary text-sm text-brand-primary rounded-xl p-2 mr-2"><a href="" className="text-xl m-8 font-medium text-indigo-500">Go to PHR</a></Link> */}
          </div>
        </div> : ''}
      {errMsg ? <div className="flex flex-col justify-center items-center">
        <h2 className="text-red-500 text-3xl font-normal text-center  "><b>Sorry!<br />Your Appointment has not been confirmed.Please contact Admin</b> </h2>
        <div className="flex  mb-8 justify-center items-center">
          <button onClick={() => history.push({pathname: '/' ,search: '?some=search-string', state :{fromPayment: true}})} className="bg-brand-primary  text-xl m-8 font-medium text-white p-2 rounded-xl mr-2"> Go to Home</button>
          {/* <Link to="#" className="border border-brand-primary text-sm text-brand-primary rounded-xl p-2 mr-2"><a href="" className="text-xl m-8 font-medium text-indigo-500">Go to PHR</a></Link> */}
        </div>
      </div> : ''}
    </>

  );
}
export default AppoinmentConfirmation;
