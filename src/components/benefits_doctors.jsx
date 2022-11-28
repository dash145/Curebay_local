import React from 'react'
import mark from '../Assets/Images/bg-lightblue.svg';
import markyellow from '../Assets/Images/bg-lightyellow.svg';
import markpurple from '../Assets/Images/bg-lightpurple.svg';


const data = [
  {
    title: 'Access to Specialists',
    text: 'Get access to specialists across Cardiology, Nephrology, Oncology, Dermatology and more through CureBay.',
    img: mark
  },
  {
    title: 'Get Anytime Consultation',
    text: 'Consult top doctors anytime from comfort of your home.',
    img: markyellow
  },
  {
    title: 'Don’t wait in queue any more',
    text: 'Decide when you want to consult doctor, join the call from computer or mobile without waiting.',
    img: markpurple
  },
  {
    title: 'Instant Appointment Confirmation',
    text: 'Appointment is confirmed as soon as you complete the payment for consultation with a doctor.',
    img: mark
  },
  {
    title: 'Standard Prescription',
    text: "Get doctor's prescription right after the consultation which can be used to order medicines online as well as offline.",
    img: markyellow
  },
  {
    title: 'Free Follow-Ups',
    text: 'Share test resports and progress for free with doctor.',
    img: markpurple
  },
]

function benefits_doctors() {
  return (
    <>
      <div className="text-center flex-col flex justify-center">
        <br></br><br></br>
        <p className=" text-black-500 font-bold text-lg md:text-xl" >Benefits of Doctor Services</p>
      </div>
      <div className="">
        <div className="lg:px-4  lg:py-16 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
          <div className="sm:mx-auto">
            <div className="grid grid-cols-1 gap-1 row-gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((col,i) => (
                <div className="flex gap-2 mb-8 md:text-left lg:text-left" key={i}>
                  <div className="flex  rounded-full h-auto w-16">
                    <img src={col.img} alt="mark" className='h-8 w-8' />
                  </div>
                  <div className='w-11/12'>
                    <p className="mb-4 text-md font-bold">{col.title}</p>
                    <p className="text-gray-primary font-normal ">
                      {col.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default benefits_doctors;
