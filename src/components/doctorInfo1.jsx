import react from 'react';

function Information(props) {
    return (
        <>
            <div className="">
                <p className="font-normal text-brand-primary m-1">{props.salutation} {props.firstName} {props.lastName} is experienced in managing</p>
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">Rheumatology: Ositeoarthritis gout, axial spondylitis, sciatica and disc herniations,
                        osteoporosis, etc.</li>
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">Immunology: Systemic lupus Erythematosus, rheumatoid arthritis, systemic sclerosis, etc.</li>
                </ul>
            </div>
            <div className="mt-3">
                <p className="font-normal text-brand-primary m-1">
                    Clinical Experience:</p>
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                        2012 - Present: Ositeoarthritis gout, axial spondylitis, sciatica and disc herniations, osteoporosis, etc.</li>
                </ul>
            </div>
            <div className="mt-3 mb-3">
                <p className="font-normal text-brand-primary m-1">
                    Training in Hospital:</p>
                <ul className="list-disc text-sm">
                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                        2010 - 2014: Resident Doctor, University of Medicine and Pharmacy at Tmrw.</li>

                    <li className="text-grey-600 text-sm font-thin mt-2 ml-7">
                        2004 - 2010: Doctor of Medicine, University of Medicine and Pharmacy at Eggcademy
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Information;