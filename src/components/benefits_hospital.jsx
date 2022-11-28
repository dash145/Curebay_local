import React from 'react'
import mark from '../Assets/Images/bg-lightblue.svg';
import markyellow from '../Assets/Images/bg-lightyellow.svg';
import markpurple from '../Assets/Images/bg-lightpurple.svg';


const data = [
  {
    title: 'Trusted Hospitals',
    text: 'CureBay has brought  all top and trusted hospitals aggregated on a platform for your ready reference.',
    img: mark
  },
  {
    title: 'Easy Hospital Admission',
    text: 'CureBay partnerships will help you get admission quickly without hassles.',
    img: markyellow
  },
  {
    title: 'Free Follow-Ups',
    text: 'Follow-ups are included in CureBay package- you don’t have to worry about paying again.',
    img: markpurple
  },
  {
    title: 'Attractive family packages',
    text: 'Our family packages will help you take care of the entire family needs at attractive prices.',
    img: mark
  },
  {
    title: 'CureBay support through hospital stay',
    text: 'CureBay will support you all through your hospital stay to make it as pleasant as possible.',
    img: markyellow
  },
  {
    title: 'Discounted prices',
    text: "CureBay's partnerships with hospitals ensure that you get services at discounted prices while receiving in best-in-class treatment.",
    img: markpurple
  },
]

function benefits_hospital() {
  return (
    <>
      <div className="text-center flex-col flex justify-center">
        <br></br><br></br>
        <p className=" text-black-500 font-bold text-lg md:text-xl" >Benefits of Hospital Services</p>
      </div>
      <div className="">
      <div className="lg:px-4  lg:py-16 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
          <div className="sm:mx-auto">
          <div className="grid grid-cols-1 gap-1 row-gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((col,i )=> (
                <div className="flex gap-2 mb-8 md:text-left lg:text-left" key={i}>
                  <div className="flex  rounded-full h-auto w-16">
                    <img src={col.img} alt="mark"  className='h-8 w-8' />
                  </div>
                  <div  className='w-11/12'>
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
export default benefits_hospital;
