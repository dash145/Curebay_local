import React, { useEffect } from 'react';
import CureBay from '../Assets/Videos/CureBay.mp4';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });

    return (
        <div className='lg:block bg-brand-lightblue mt-8 mb-5 place-content-center'>
            <div className='flex flex-col items-center justify-items-center'>
               <h1 className="mt-5 text-medium font-medium text-2xl ">Why CureBay</h1>
               <div className="mt-3 border-b-4 w-10 bg-brand-white"></div>
            </div>
            <p className='px-8 md:px-36 pb-6 mt-4'>
                Healthcare is a huge challenge in India. We have a large population spread over large and diverse geography. There is a considerable shortage of healthcare providers (1 doctor per 12000 people in public healthcare against a WHO recommended ratio of 1 doctor per 1,000 and for nurses it is 1:600 against 1:300 recommended). Even more worrying is the fact that with 75% of doctors in urban areas, 74% of multi-speciality hospitals in top 8 metros and 60% of available beds in private hospitals in top cities , availability of healthcare is skewed towards urban population – just 28% of Indian population. This leaves the remaining 72% of Indian semi-urban and rural population with very few reliable sources of healthcare.
            </p>

            <p className='px-8 md:px-36 pb-6 font-medium'>
                  We at CureBay are on a mission to bridge this gap in the Indian healthcare system.
                  And we are going to achieve our mission by bridging the gap that exists in the primary healthcare to the underserved markets.
            </p>
            <p className='px-8 md:px-36 pb-10 font-medium'>
                  Our vision is to make quality healthcare accessible to each and every Indian citizen, whoever they are and wherever they are.
            </p>
            <div className='px-8 md:px-36 pb-5'>
                  <video className='w-full' controls>
                   <source src={CureBay} type="video/mp4"></source>
                  </video>
            </div>
        </div>
    )
}

export default AboutUs
