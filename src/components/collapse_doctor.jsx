import React, { useState } from 'react';
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';


export const accordionData = [
  {
    title: 'What is an online consultation?',
    content: 'Online consultation involves speaking to a doctor via audio/video/ chat about your health concerns. You get a prescription at the end of online consultation which you could use buy medicines or for ordering tests.',
  },
  {
    title: 'How to choose a doctor for online consultation?',
    content: 'Doctor can be chosen from list of available doctors, by searching based on Specialities or searching based on common health concerns. Book an appointment with selected doctor for the desired slot and join for the video consultation at booked time.',
  },
  {
    title: 'Is the prescription from online consultation valid?',
    content: 'All CureBay doctors are registered in National Medical Register and authorized to issue prescriptions. Prescription they generate in online consultation is valid and equivalent to one provided after a physical visit.',
  },
  {
    title: 'Who is a specialist?',
    content: 'Specialists undertake extra training in a specific area of medicine after completing their MBBS degree. Specialists can better diagnose complex health problems and suggest more appropriate treatment options than non-specialists.',
  },
  {
    title: 'Can I show my test reports to the doctor on the video call?',
    content: 'You can share prescriptions/test reports with the doctors during an online consultation. All you need to do is to click on the plus sign (+) at the bottom left of the screen to send the documents to the doctor.',
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

const collapse_doctors = () => {
  return (
    <div className="">
      <div className="lg:block mx-1 lg:mb-8 lg:my-0 lg:mx-10">
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


export default collapse_doctors;
