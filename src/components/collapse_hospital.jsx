import React, { useState } from 'react';
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';


export const accordionData = [
  {
    title: "What information do I need to provide to enquire about treatment at CureBay's partner hospitals?",
    content: 'We will request you to provide as much information as possible about your condition including medical history, past scans and reports, current medication etc. We will also request you to bring details of doctor who has referred you.',
  },
  {
    title: 'Who will guide me about the cost and duration of stay at the hospital?',
    content: 'Once you submit the equiry form with all details, our support team will get back to you with a selection of hospitals you can get the treatment along with cost, time line and care plan before and after treatment.',
  },
  {
    title: 'How do I make payments for my hospitalization?',
    content: 'You have multiple options to pay including Wallet., UPI, Debit/Credit card, and Netbanking. Our support team will advise you payment details once treatment plan is agreed.',
  },
  {
    title: 'Is my booking confirmed once I pay at CureBay?',
    content: 'Our support team will guide you at each step  and they will confirm the appointment as soon as payment is done.',
  },
  {
    title: 'Will CureBay help to avail cashless treatments?',
    content: 'We will talk to the chosen hospital regarding your insurance scheme and will try and facilitate cashless treatment.',
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

const collapse_hospital = () => {
  return (
    <div>
      <div className="lg:block mx-2 lg:mb-8 lg:mt-1 lg:mx-10">
      <h1 className="text-center text-black-500 font-bold text-lg md:text-xl">Frequently Asked Questions</h1>
        <ul className="m-auto  border-2 border-gray-200 rounded-lg my-2 md:mx-16 mt-8" style={{boxShadow: "rgba(226, 226, 226, 0.5) 12px 20px 23px"}}>
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


export default collapse_hospital;
