import react from 'react';

function Information(props) {
    return (
        <>
            <div className="mt-2">
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">ICU: {props?.hosp?.icu > 0 ? "Available": "Not Available"}
                        </li>
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">ICCU: {props?.hosp?.iccu > 0 ? "Available": "Not Available"}</li>
                </ul>
            </div>
            <div className="mt-3">
             
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                    General Ward:  {props?.hosp?.generalWard > 0 ? "Available": "Not Available"}</li>
                </ul>
            </div>
            <div className="mt-3 mb-1">
              
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                    Air Condition:  {props?.hosp?.airCondition > 0 ? "Available": "Not Available"}</li>

                   
                </ul>
            </div>

            <div className="mt-3">
             
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                    Single Room:  {props?.hosp?.singleRoom > 0 ? "Available": "Not Available"}</li>
                </ul>
            </div>
            <div className="mt-3 mb-1">
              
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                    Double Share Room:  {props?.hosp?.doubleRoom > 0 ? "Available": "Not Available"}</li>

                   
                </ul>
            </div>
        </>
    )
}
export default Information;