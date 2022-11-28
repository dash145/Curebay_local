import React from 'react'
// import stethoscope from '../Assets/Images/11.svg';
import stethoscope from '../Assets/Images/stethoscope-new.svg';
import labImage from '../Assets/Images/lab.svg';
import how_it_word_secound from '../Assets/Images/Get a detailed report.png';
import how_it_word from '../Assets/Images/Get a free home sample pickup.png';
import how_it_word_third from '../Assets/Images/Choose for a speciality or symptom.png';
import DetailReportIcon from '../Assets/Images/detailReportIcon.svg';
import prescription from '../Assets/Images/12.svg';
import heart from '../Assets/Images/13.svg';
import howItWork from '../Assets/Images/how-it-work.png';

import point1 from '../Assets/Images/HIW/Doctors icons/Point-1 Icon.svg';
import point2 from '../Assets/Images/HIW/Doctors icons/Point-2 Icon.svg';
import point3 from '../Assets/Images/HIW/Doctors icons/Point-3 Icon.svg';
import point4 from '../Assets/Images/HIW/Doctors icons/Point-4 Icon.svg';


function HiwDoctor() {
	return (
		<>
			<div className=" flex flex-col lg:flex-row md:ml-36 md:mr-36 mx-auto">
				{/* <div>
					<p className="mx-3  text-green-500 font-medium text-lg md:text-2xl" >How it works</p>
					<br />
				</div> */}
				{/* <div className=" justify-around w-auto bottom-24 relative">
					<div className="lg:flex md:flex justify-around w-auto top-24 relative">
						<div className="lg:my-8 md:w-1/3">
							<div className="flex flex-wrap mx-auto rounded-full bg-brand-lightblue h-20 w-20 content-center justify-center">
								<img src={stethoscope} className="h-12" aria-hidden="true" alt="" />
							</div>
							<p className="lg:w-72 text-brand-primary  lg:font-semibold md:font-medium lg:flex lg:justify-end md:px-5 lg:px-0 lg:ml-16 mt-2">{'Choose for speciality or symptoms'}</p>
						</div>
						<div className="lg:hidden md:hidden justify-center flex lg:justify-start lg:transform lg:rotate-90 lg:mb-11">
							<p className="vertical border "></p>
						</div>
						<div className="lg:my-8 md:w-1/3">
							<div className="flex flex-wrap mx-auto rounded-full bg-brand-lightblue h-20 w-20 content-center justify-center">
								<img src={heart} className="h-12" aria-hidden="true" alt="" />
							</div>
							<p className="lg:w-72 text-brand-primary  lg:font-semibold md:font-medium lg:flex lg:justify-end md:px-8 lg:px-0 lg:ml-14 mt-2">{'Get a free home sample pickup'}</p>
						</div>
						<div className="lg:hidden md:hidden justify-center flex lg:justify-start lg:transform lg:rotate-90 lg:mb-11">
							<p className="vertical border "></p>
						</div>
						<div className="lg:my-8 md:w-1/3">
							<div className="flex flex-wrap mx-auto rounded-full bg-brand-lightblue h-20 w-20 content-center justify-center">
								<img src={prescription} className="h-12" aria-hidden="true" alt="" />
							</div>
							<p className="lg:w-72 text-brand-primary  lg:font-semibold md:font-medium lg:flex lg:justify-end lg:ml-2 mt-2">{'Get a detailed report'}</p>
						</div>
					</div>
					<div className="hidden md:block container mx-auto lg:px-52 md:px-32 md:mt-1 lg:mt-0">
						<hr className="justify-between border-brand-frenchpass"  />
					</div>
				</div> */}

				<div className=' lg:mt-0   m-auto '>
					<div className=' text-center font-bold text-xl md:text-xl mb-8 ml-6'>How It Works</div>
					<div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-6 xl:gap-10 '>
						<div className='flex gap-2 md:gap-0'>
							<div className="mr-4">
								<img className="h-8 md:h-7" src={point1} alt="point1" />
							</div>
							<h2 className="text-gray-primary font-medium ">Choose doctor for consultation based on symptoms or specilaity</h2>
						</div>
						<div className='flex gap-2 md:gap-0'>
							<div className="mr-4">
								<img className="h-8 md:h-7" src={point2} alt="point1" />
							</div>
							<h2 className="text-gray-primary font-medium ">Choose suitable slot for appointment and pay</h2>
						</div>
						<div className='flex gap-2 md:gap-0'>
							<div className="mr-4">
								<img className="h-8 md:h-7" src={point3} alt="point1" />
							</div>
							<h2 className="text-gray-primary font-medium ">Join consultation and get your prescription</h2>
						</div>

						<div className='flex gap-2 md:gap-0'>
							<div className="mr-3">
								<img className="h-12" src={point4} alt="point1" />
							</div>
							<h2 className="text-gray-primary font-medium ">Our doctors can refer you to specialists if further examination is required</h2>
						</div>
					</div>

				</div>
			</div>
		</>
	);
}
export default HiwDoctor;
