import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';

function Removevitalspopup(props) {

    const location = useLocation();
    const history = useHistory();
    const [showEditmember, setshowEditmember] = useState(false);

    
    const goBack = () => {
        props.closePopup()
    }

 
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        {/*body*/}
                        <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <p class="text-medium font-medium text-2xl  text-center ">Are you sure you want to </p>
                            <p class="text-medium font-medium text-2xl  text-center "> delete {props?.title} vital?</p>
                           
                            <div className="flex justify-center space-x-4 py-4">
                                <button onClick={goBack} className="bg-white border border-brand-primary text-brand-secondary p-2 rounded-xl mr-2">No, Go Back</button>
                                <button onClick={goBack} className="bg-brand-secondary  text-sm text-white font-normal rounded-xl py-2 px-3 mr-2">Yes, Continue</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Removevitalspopup;