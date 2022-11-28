import React from 'react'
import { useHistory } from 'react-router';
function NoAppointmentData(props) {
    console.log("props", props)
    const history = useHistory();
    return (
        <div className="flex py-4 px-6 ">
            <div>
                <img className="lg:h-28 lg:w-28" src={props.img} alt="" />
            </div>

            <div className="mx-4 text-brand-primary   font-medium flex flex-col w-50">
                <span>{props.title}</span>
                {props?.code && <div className="inline flex my-2">
                    <span className="lg:text-base text-sm w-20 text-gray-primary">
                        Use code :
                    </span>
                    <p className="px-1 lg:text-base text-sm w-12 text-brand-cerulean">{props.code}</p>
                </div>
}                
                <div>
                <button onClick={() =>history.push(props.link)} className="p-2 bg-brand-secondary text-white  font-medium rounded-lg">
                        {props.name}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default NoAppointmentData;
