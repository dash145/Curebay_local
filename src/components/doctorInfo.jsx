import react from 'react';
import { useState } from 'react';
import Information from './doctorInfo1';
import { ChevronDownIcon } from '@heroicons/react/outline'

function DoctorInfo(props) {
    const [tab, setTab] = useState(1);

    const [open, setOpen] = useState(false);

    const checkOpen = (no) => {
        setTab(no);
        setOpen(!open);
    }

    return (
        <div className="">
            <div className="lg:w-2/3 pr-5">
                <nav className="lg:flex  flex-col sm:flex-row">
                    <button onClick={() => checkOpen(1)} className={`lg:block flex justify-between text-gray-400 lg:text-center lg:text-center text-left w-48 font-normal  py-4 px-6 ${tab === 1 ? 'border-b-2 border-brand-secondary  text-brand-secondary font-medium ' : ' '} block border-gray-secondary  border-b-2 focus:outline-none`}>
                        Information
                        <ChevronDownIcon className="lg:hidden h-6 " />
                    </button>
                    {tab == 1 && open && <div className="lg:hidden" >
                        <Information {...props} />
                    </div>}
                    {/*<button onClick={() => checkOpen(2)} className={`lg:block flex justify-between text-gray-400  lg:text-center text-left w-full font-normal  py-4 px-6 ${tab === 2 ? 'border-b-2 border-brand-secondary text-brand-secondary font-medium ' : ' '} block border-gray-secondary border-b-2 focus:outline-none`}>
                        Stories
                        <ChevronDownIcon className="lg:hidden h-6" />
                    </button>
                    <button onClick={() => checkOpen(3)} className={`lg:block flex justify-between text-gray-400 lg:text-center text-left w-full font-normal  py-4 px-6 ${tab === 3 ? 'border-b-2 border-brand-secondary text-brand-secondary font-medium ' : ' '} block border-gray-secondary  border-b-2 focus:outline-none`}>
                        Consult Q&A
                        <ChevronDownIcon className="lg:hidden h-6" />
                    </button>*/}
                </nav>
            </div>
            <div className="lg:block hidden">
                <Information {...props} />
                <hr />
            </div>
            
        </div>
    )
}
export default DoctorInfo;