
import React from 'react';

function PrescribedLabTest(props) {
    const { data } = props;;
    return (
        <div className="p-4 bg-white border border-brand-graynurse rounded-xl">
            <p className="text-base  font-medium mb-2">Lab Test Prescribed</p>
            <div className="grid grid-cols-2  justify-start ">
                <div className="text-sm font-medium  text-brand-manatee">Test Name</div>
                <div className="text-sm font-medium  text-brand-manatee">Test Type</div>
            </div>
            {data && data.length>0 && data.map((res, i) => (
                <div key={i} className="grid grid-cols-2  justify-start mt-1">
                    <div className="text-xs font-normal  text-gray-primary">{res.labTestDescription}</div>
                    <div className="text-xs font-normal  text-gray-primary">Pathalogy</div>
                </div>
            ))}
            {/* <div className="flex justify-end">
                <p className="text-xs pl-16 pt-3 text-green-600">Today</p>
                <button className="border border-brand-secondary text-brand-secondary text-white  py-2 px-4 rounded-lg font-medium text-sm ml-4 mt-6">Select Lab</button>
                <button className="bg-brand-secondary text-white py-2 px-4 rounded-lg font-medium text-sm ml-4 mt-6">Book Now</button>
            </div> */}
        </div>
    )
}
export default PrescribedLabTest;