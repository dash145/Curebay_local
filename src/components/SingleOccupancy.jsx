import React from 'react'
import bethanyhospital from '../Assets/Images/bethanyhospital.svg';
import img1 from '../Assets/Images/1.svg';
import img2 from '../Assets/Images/2.svg';
import img3 from '../Assets/Images/3.svg';
import img4 from '../Assets/Images/4.svg';
import date from '../Assets/Images/date.svg';
import checkmark from '../Assets/Images/checkmark.svg';
import share from '../Assets/Images/share-2.svg';
import Doctors from './Doctors';
import Package from './HealthcarePackage';
function SingleOccypancy() {
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
          <a href="/hospital">Hospital</a>
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
          <a href="/components">Bethany Hospital</a>
        </li>
      </ul>

      <div className="flex">
        <div className="lg:w-1/3 pl-16 pt-5 flex sm:grid-cols-1 ">
          <div className=" flex ">
            <div className="justify-between h-96 ">
              <img src={img1} alt="img1" className="  w-16" />
              <img src={img2} alt="img1" className="pt-3 w-16" />
              <img src={img3} alt="img1" className="pt-3 w-16" />
              <img src={img4} alt="img1" className="pt-3 w-16" />
            </div>

            <img src={bethanyhospital} alt="img1" className="h-72 pl-5" />
          </div>
        </div>

        <div className="lg:w-2/3 pt-5 pl-5 ">
          <div className="">
            <p className="text-2xl font-medium text-brand-secondary ">Single Occupancy room </p>
            <p className="text-base text-gray-500 ">Bethany Hospital</p>
            <div className="flex">
              <p className="text-base pt-4 text-brand-secondary">Select Date :</p>
              <div className="h-10 w-40 border border-gray-200 p-2 ml-4 mt-2 rounded-lg flex ">
                <p className="text-sm text-gray-400">18 Dec - 22 Dec </p>
                <img src={date} alt="date" className="pl-3" />
              </div>
            </div>

            <div className="flex ">
              <div className="w-48">
                <div className="flex py-2 pt-4">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Air Condition</p>
                </div>
              </div>
              <div className="w-60 pl-10">
                <div className="flex py-2 pt-4">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Wardrobe</p>
                </div>
              </div>
            </div>
            <div className="flex ">
              <div className="w-48">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Washroom</p>
                </div>
              </div>
              <div className="w-60 pl-10">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Telephone</p>
                </div>
              </div>
            </div>
            <div className="flex ">
              <div className="w-48">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Patient bed</p>
                </div>
              </div>
              <div className="w-60 pl-10">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Attendent’s Couch</p>
                </div>
              </div>
            </div>
            <div className="flex ">
              <div className="w-48">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Television</p>
                </div>
              </div>
              <div className="w-72 pl-10">
                <div className="flex py-2 pt-1">
                  <img src={checkmark} alt="checkmark" />
                  <p className="text-brand-secondary text-sm font-medium  pl-4">Temperature control Facility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Package/>
      <Doctors/>
      <br/>
  
    </>
  );
}
export default SingleOccypancy;