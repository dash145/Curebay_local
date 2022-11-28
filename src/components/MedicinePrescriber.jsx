
import React from 'react';
import { useHistory } from 'react-router-dom'
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
function PrescribedMedicine(props) {
    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }
    const { data } = props;
    console.log(data, "dtatinmeidciin")
    return (
        <div className="p-3 bg-white border border-brand-graynurse rounded-xl">
            <p className="text-base  font-medium mb-2">Medicines Prescribed</p>
            <div className="grid grid-cols-4 lg:space-x-7  lg:gap-3 lg:justify-start justify-around">
                <div className="text-xs font-medium  text-brand-manatee w-full">Medicine Name</div>
                <div className="text-xs font-medium  text-brand-manatee">Dosage</div>
                <div className="text-xs font-medium  text-brand-manatee">Instructions</div>
                <div className="text-xs font-medium  text-brand-manatee">Durations</div>
            </div>
            {data && data.length > 0 && data.map((res, i) => (
                <div key={i} className="grid grid-cols-4 lg:space-x-7  lg:gap-3 lg:justify-start justify-around mt-2">
                    <div className="text-xs font-normal  text-gray-primary">{res.drugName}</div>
                    <div className="text-xs font-normal  text-gray-primary">{res.dosage}</div>
                    <div className="text-xs font-normal  text-gray-primary">{res.instruction == "0" ? "After Meal" : "Before Meal"}</div>
                    <div className="text-xs font-normal  text-gray-primary">{res.duration}</div>
                </div>
            ))}
            {/* <div className="flex justify-end">
                <p className="text-xs pl-16 pt-3 text-green-600">Today</p>
                <button className="border border-brand-secondary text-brand-secondary text-white  py-2 px-4 rounded-lg font-medium text-sm ml-4 mt-6">Select Pharmacy</button>
                <button onClick={(e) => { redirectTo(e, APP_ROUTES.PRESCRIPTION) }} className="bg-brand-secondary text-white py-2 px-4 rounded-lg font-medium text-sm ml-4 mt-6">Order Now</button>
                <button onClick={history.push({ pathname: APP_ROUTES.PRESCRIPTION })} className="bg-brand-secondary text-white py-2 px-4 rounded-lg font-medium text-sm ml-4 mt-6">Order Now</button>
            </div> */}
        </div>
    )
}
export default PrescribedMedicine;