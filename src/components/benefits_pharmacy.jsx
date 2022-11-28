import React from 'react'
import mark from '../Assets/Images/bg-lightblue.svg';
import markyellow from '../Assets/Images/bg-lightyellow.svg';
import markpurple from '../Assets/Images/bg-lightpurple.svg';


const data = [
  {
    title: 'Blazing-Fast Delivery',
    text: 'Get immediate medicine delivery from the nearest and recognized pharmacies through CureBay.',
    img: mark
  },
  {
    title: 'Prescription Validation',
    text: 'Our authorized and verified pharmacists verify your prescription before handing it over to the nearest pharmacy from your location.',
    img: markyellow
  },
  {
    title: 'Order Confirmation Message',
    text: 'Get immediate confirmation messages from CureBay once a pharmacy accepts your medicine order.',
    img: markpurple
  },
  {
    title: 'Transparent Order Tracking',
    text: 'Track your medicine order from CureBay and remain up-to-date with the consignment status at any point in time.',
    img: mark
  },
  {
    title: 'Damage Coverage',
    text: 'Get hassle-free exchange and return services if you are delivered with damaged medicines from CureBay.',
    img: markyellow
  },
  {
    title: 'Expiry Coverage',
    text: 'Although highly unlikely, CureBay gets you covered with a free exchange of expired medicines delivered by our registered pharmacies.',
    img: markpurple
  },
]

function benefits_pharmacy() {
  return (
    <>
      <div className="text-center flex-col flex justify-center">
        <br></br><br></br>
        <p className=" text-black-500 font-bold text-lg md:text-xl" >Benefits of CureBay Consultation</p>
      </div>
      <div className="">
        <div className="lg:px-4  lg:py-16 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
          <div className="sm:mx-auto">
            <div className="grid grid-cols-1  row-gap-4 lg:grid-cols-3">
              {data.map(col => (
                <div className="flex space-x-3 mb-8">
                  <div className="flex flex-wrap rounded-full h-10 w-14">
                    <img src={col.img} alt="mark" />
                  </div>
                  <div>
                    <p className="mb-4 text-lg font-medium">{col.title}</p>
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
export default benefits_pharmacy;
