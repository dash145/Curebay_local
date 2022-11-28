import React from 'react';
import { XIcon } from '@heroicons/react/outline';

function Trackmappopup( props) {
    const base_url= `https://curebayordertrack.accioapp.com/?orderid=${props.orderID}`;

    const redirectTo = (event) => {
        setTimeout(() => {
            props.closePopup()
        }, 500)
    };

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-screen h-full">
                <div className="border-0 rounded-lg relative flex flex-col items-center lg:w-auto outline-none focus:outline-none">
                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                <div className="rounded-lg shadow-lg bg-white-600 w-full lg:w-10/12 h-96 p-5 bg-white antialiased justify-between border border-gray-200">
                    <iframe 
                     style={{ width: "100%", height: "200%" }} 
                    src={`${base_url}`}>
                        
                    </iframe>
                </div>
                </div>
            </div>

        </div>
    )

}

export default Trackmappopup;
