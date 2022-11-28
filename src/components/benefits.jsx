import React from 'react'
import mark from '../Assets/Images/bg-lightblue.svg';
import markyellow from '../Assets/Images/bg-lightyellow.svg';
import markpurple from '../Assets/Images/bg-lightpurple.svg';


const data = [
  {
    title: 'Hybrid Fulfillment Model',
    text: 'We are introducing a hybrid model to provide healthcare services through a 3-tier model of Hub, Spoke and a network of satellite health centres',
    img: mark
  },
  {
    title: 'Anytime Doctor Consultation',
    text: 'Have an emergency? Book a doctor appointment immediately and get expert consultations through CureBay.',
    img: markyellow
  },
  {
    title: 'Fast Medicine Delivery',
    text: 'Get medicines, at discounted prices, delivered to your doorstep and track delivery in real time.',
    img: markpurple
  },
  {
    title: 'Convenient Diagnostics',
    text: 'Avail diagnostic services at your convenience with sample collected at home, reports delivered digitally  and at discounted prices.',
    img: mark
  },
  {
    title: 'Best Partner Hospitals',
    text: 'CureBay partners with the best hospitals and clinics in your town to make better health checkups and packages easily accessible to everyone.',
    img: markyellow
  },
  {
    title: 'Consult Best Specialists',
    text: 'Consult with the best specialists over video.',
    img: markpurple
  },
]

function benefits() {
  return (
    <div className='my-8 lg:mt-10'>
      <div className="text-center flex-col flex justify-center">
        <br></br><br></br>
        <p className="font-bold text-xl md:text-xl" style={{color:"#262626"}}>Benefits of CureBay Services</p>
      </div>
      <div className="">
        <div className="lg:px-4 mt-6 md:mt-12 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
          <div className="sm:mx-auto">
            <div className="grid grid-cols-1 gap-1 row-gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((col, i) => (
                <div key={i} className="flex gap-2 mb-8 md:text-left lg:text-left">
                  <div className="flex rounded-full h-auto w-16">
                    <img src={col.img} alt="mark" className='w-8 h-8' />
                  </div>
                  <div className='w-11/12'>
                    <p className="mb-4 text-md font-bold">{col.title}</p>
                    <p className="text-gray-primary font-medium ">
                      {col.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default benefits;
