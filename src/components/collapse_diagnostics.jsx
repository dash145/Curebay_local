import React, { useState } from 'react';
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';


export const accordionData = [
  {
    title: 'Can I get a diagnostic test done at home?',
    content: "You can get sample collected at home for tests where it is not mandatory to visit the lab. A health worker will visit your location to collect the sample and deliver to chosen labs to complete the test. You will have to visit the lab for radiology tests since it is not allowed to be conducted at home.",
  },
  {
    title: 'Should I not eat before taking the test?',
    content: 'It depends on the type of test you are This will depend on the test you are going to take. Our support team will notify you about the tests that need fasting.',
  },
  {
    title: 'Will you deliver my reports?',
    content: 'You can access the test results from the “Health Records” section on the CureBay app within 24-48 hours in most cases. All you need to do is to sign in to your account and check the “Health Records” tab . Please note that some of your test results may take longer than 48 hours depending on the time taken to complete the test. We will deliver the reports to you address, where it is not possible to get a digital copy.',
  },
  {
    title: 'Can I see a doctor after getting my reports?',
    content: 'Yes. Your doctor can see the test results under "Health Records" section if you are consulting doctor in CureBay platform. Alternatively you can download the reports from "Health Records" section and share with doctor too.',
  },
  {
    title: 'Do you accept credit cards for payment?',
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

const collapse_diagnostics = () => {
  return (
    <div>
      <div className="lg:block mx-1 lg:mb-8 lg:mt-1 lg:mx-10">
        <h1 className="text-center text-black-500 font-bold text-lg md:text-xl">Frequently Asked Questions</h1>
        <ul className="m-auto  border-2 border-gray-200 rounded-lg my-2 md:mx-16 mt-8" style={{boxShadow: "rgba(226, 226, 226, 0.5) 12px 20px 23px"}}>
          {accordionData.map(({ title, content },i) => (
            <li key={i} className=''>
            <Accordion title={title} content={content} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default collapse_diagnostics;
