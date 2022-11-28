import React, { useState } from 'react';
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';


export const accordionData = [
  {
    title: 'Is CureBay a pharmacy?',
    content: 'We partner with authorized pharmacies, which work with registered pharmacists. So, CureBay is a platform that connects you with verified pharmacies near your location.',
  },
  {
    title: 'If I upload a prescription, will my order be confirmed immediately?',
    content: 'After we validate your prescription, our vendors update us on their medicine stock availability. We will inform you through SMS and email if all medicines are available at the nearest pharmacies or some of them are out of stock. As a lead generation platform, we will connect you to only those pharmacies that can confirm your order after credential and prescription verification.',
  },
  {
    title: 'Can anyone see patients data?',
    content: 'CureBay has strict policies to protect user data and privacy. So, a user can see their data only and access a smartphone or web app to fetch their data from our platform.',
  },
  {
    title: 'Do you provide online doctor consultation for emergencies?',
    content: 'We have special provisions to provide audio consultations for emergencies. Additionally, CureBay offers around-the-clock emergency medical service, which you can access by calling on +91 -8335 000 999 or tapping the “Quick Consult” tab on the homepage of our website or mobile app.',
  },
  {
    title: 'How to pay?',
    content: 'We have a prepaid payment model for scheduling online and offline consultations through the CureBay platform. You can choose any ways to pay and confirm a medical consultation with us - Wallet., UPI, Debit/Credit card, and Netbanking.',
  }
];

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center p-4" onClick={() => setIsActive(!isActive)}>
        <div className="w-11/12">{title}</div>
        <div className="w-auto">{isActive ? '^' : <img alt="" SRC={DownArrow} />}</div>
      </div>
      {isActive && <div className="p-4 font-custom">{content}</div>}
    </div>
  );
};

const collapse_pharma = () => {
  return (
    <div>
      <div className="lg:block mx-2 lg:my-8 lg:mx-10">
        <h1 className="text-center  text-green-500 font-medium text-lg md:text-xl">Frequently Asked Questions</h1>
        <ul className="list-disc m-auto md:mx-16 mt-8">
          {accordionData.map(({ title, content }) => (
            <li>
               <Accordion title={title} content={content} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default collapse_pharma;
