import React from 'react'
import mark from '../Assets/Images/bg-lightblue.svg';
import markyellow from '../Assets/Images/bg-lightyellow.svg';
import markpurple from '../Assets/Images/bg-lightpurple.svg';


const data = [
  {
    title: 'Sample collected at home',
    text: 'We will have health worker visit you and collect test samples at your convenience.',
    img: mark
  },
  {
    title: 'Use our promo codes to get discounts',
    text: 'Choose from available promo codes and offers to get discounts on lab tests.',
    img: markyellow
  },
  {
    title: 'Same Day Digital Reports',
    text: 'Get your test reports from our partner labs in digital format on the same day.',
    img: markpurple
  },
  {
    title: 'Search from several test packages',
    text: 'Choose from a selection of test packages we have created to suit your needs.',
    img: mark
  },
  {
    title: 'Get test reports via Email',
    text: 'All your test reports will be emailed to you as soon as they are ready and we will also keep a copy for your future reference.',
    img: markyellow
  },
  {
    title: 'All your reports in one App',
    text: 'Download CureBay App to access all your lab test reports in one place.',
    img: markpurple
  },
]

function benefits_diagnostics() {
  return (
    <>
      <div className="text-center flex-col flex justify-center">
        <br></br><br></br>
        <p className=" text-black-500 font-bold text-lg md:text-xl" >Benefits of Diagnostic Services</p>
      </div>
      <div className="">
        <div className="lg:px-4  lg:py-16 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
          <div className="sm:mx-auto">
            <div className="grid grid-cols-1 gap-1 row-gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((col,i) => (
                <div key={i} className="flex gap-2 mb-8 md:text-left lg:text-left">
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
export default benefits_diagnostics;
