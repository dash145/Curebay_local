import React, { useState } from 'react';
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';

export const accordionData = [
  {
    title: 'Is CureBay a pharmacy?',
    content: 'No. CureBay is a platform which works with pharmacies to deliver your medicines quickly.',
  },
  {
    title: 'Will my order be confirmed once I upload my prescription?',
    content: 'It takes a little more time. We will validate your precription once you upload it and share with our pharmacy partners to get the best possible price with shortest delivery time. We will confirm the order once we choose the right pharmacy to deliver to you.',
  },
  {
    title: 'Can anyone see patients data?',
    content: 'CureBay has strict policies to protect user data and ensure privacy- only the patient and authorized medical professionals can see the health data. Medical professionals and partners too will have access only to portions of data that is necessary to deliver the services requested by patient.',
  },
  {
    title: 'Do you provide online doctor consultation for emergencies?',
    content: 'We have special provisions to provide audio consultations for emergencies. Additionally, CureBay offers around-the-clock emergency medical service, which you can access by calling on +91 - 8335 000 999.',
  },
  {
    title: 'How do I pay for CureBay services?',
    content: 'You have multiple options to pay including Wallet, UPI, Debit/Credit card, and Netbanking. ',
  }
];

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="border-b-2 hover:bg-gray-100/100 w-full m-auto border-gray-100" style={{boxShadow: "rgba(226, 226, 226, 0.2) 12px 20px 20px"}}>
      <div className="flex cursor-pointer justify-between items-center p-4 " onClick={() => setIsActive(!isActive)}>
        <div className="w-11/12 font-medium text-black-500">{title}</div>
        <div className="flex justify-end text-3xl font-semibold  text-brand-primary w-16">{isActive ? <div>-</div> : <div>+</div>}</div>
      </div>
      {isActive && <div className="w-11/12 text-black-700 m-auto p-4 font-custom">{content}</div>}
    </div>
  );
};

const Collapse = () => {
  return (
    <div>
      <div className="lg:block mx-1 mt-8 lg:my-8 lg:mx-10">
        <h1 className="text-center font-bold text-lg md:text-xl" style={{color:"#262626"}}>Frequently Asked Questions</h1>
        <ul className="m-auto  border-2 border-gray-200 rounded-lg my-2 md:mx-16 mt-8"  style={{boxShadow: "rgba(226, 226, 226, 0.5) 12px 20px 23px"}}>
          {accordionData.map(({ title, content },i) => (
            <li key={i}>
            <Accordion title={title} content={content} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default Collapse;
