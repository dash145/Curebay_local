
// import checkUp from '../Assets/Images/check-up@2x.svg'
import arrowdown from '../Assets/Images/arrow.download.svg';
import React, { useState, useEffect } from 'react'
import { getmypriscriptionlist } from '../Redux/Actions/UserprofileActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes'
import { DownloadImage, viewImage } from '../helper/ImageDownload';

function Records() {

    const userData = useSelector((state) => state.authReducer.patientData);
    
    const [showreports, setshowreports] = useState(true);
    const [showpriscription, setshowpriscription] = useState(false);
    const [showMedicalReporst, setshowMedicalReporst] = useState(false);

    const history = useHistory();
    const redirectTo = (event) => {
        event.preventDefault();
        // history.push(location)
        if (showreports) {
            history.push(USERPROFILE_ROUTES.MYREPORTS)
        } else {
            history.push(USERPROFILE_ROUTES.MYPRISCRIPTION)
        }
    }

    const myreports = (event) => {
        event.preventDefault();
        setshowreports(true)
        setshowpriscription(false)
    }

    const mypriscription = (event) => {
        event.preventDefault();
        setshowreports(false)
        setshowpriscription(true)
    }
    const dispatch = useDispatch();
    const pres = useSelector((state) => state.mypriscription);
    const { mypriscriptionData } = pres;
    // const { patientDrugPrescriptionList, patientLabTestsList } = mypriscriptionData;

    useEffect(() => {
        console.log(mypriscriptionData)
        dispatch(getmypriscriptionlist(userData.code));

    }, []);
    return (
        <div className="mr-2 ml-1 my-4">
            <div className="bg-white rounded-2xl border border-gray-graynurse">
                <div className=" mx-10">
                    <div className="flex justify-between">
                        <nav className="flex border-b-2  border-gray-graynurse">
                            <button onClick={myreports} className={`text-gray-400  font-thin  py-2 px-7 lg:py-4 md:px:2 lg:px-6 block  focus:outline-none text-brand-biscay2 border-brand-primary ${showreports ? 'border-b-2  border-blue-500 ' : ''}`}>
                                Reports
                            </button>
                            <button onClick={mypriscription} className={`text-gray-400  font-thin  py-2 px-7 lg:py-4 md:px:2 lg:px-6 block  focus:outline-none text-brand-biscay2 border-brand-primary ${showpriscription ? 'border-b-2  border-blue-500 ' : ''}`} >
                                Prescription
                            </button>
                        </nav>
                        <div className="flex lg:block hidden">
                            <p onClick={(e) => redirectTo(e)} className="text-sm  text-brand-secondary font-medium pr-4 mt-4"> See all</p>
                        </div>
                    </div>
                    <div>
                        {
                            showreports &&
                            <table className="w-full divide-y divide-gray-100 px-6">
                                <thead >
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-1 py-3 text-left text-xs font-medium  text-gray-500"
                                        >
                                            Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-1 py-3 text-left text-xs font-medium  text-gray-500"
                                        >
                                            For
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-1 py-3 invisible md:visible text-left text-xs font-medium  text-gray-500"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {mypriscriptionData.filter(x => x.reportType === "Lab Reports" && x.docName).length === 0 ? <span>No Data found</span> : ''}
                                    {mypriscriptionData.filter(x => x.reportType === "Lab Reports" && x.docName).map((col, i) => (
                                        <tr key={i} className="border-dashed border-b">
                                            <td className="lg:py-4 lg:whitespace-nowrap lg:w-3/4">
                                                <div className="text-sm lg:whitespace-nowrap lg:w-3/4 w-36 truncate font-medium text-gray-500 " onClick={() => { DownloadImage(col.docName) }} >{col.docName ? col.docName : col.notes}</div>
                                            </td>
                                            <td className="lg:w-3/4 w-20 lg:py-4 lg:whitespace-nowrap truncate " >
                                                <span className="lg:whitespace-nowrap " >{col.patientName}</span>
                                            </td>
                                            <td className="lg:py-4 flex lg:flex hidden cursor-pointer whitespace-nowrap text-sm text-gray-500 ">
                                                <p onClick={() => { viewImage(col.docName) }} className=" text-brand-secondary  font-medium ">
                                                    View
                                                </p>
                                                <img onClick={() => { DownloadImage(col.docName) }} src={arrowdown} alt="" className="mx-7" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                        {/* Prescription table starts here */}

                        {
                            showpriscription &&

                            <table className="w-full divide-y divide-gray-100 px-6 bg-white overflow-x-scroll hide-scroll-bar ">
                                <thead >
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-1 py-3 text-left text-xs font-medium  text-gray-500"
                                        >
                                            Description
                                        </th>
                                        <div className="flex space-x-2">
                                            <th
                                                scope="col"
                                                className="px-1 py-3 text-left text-xs font-medium  text-gray-500"
                                            >
                                                For
                                            </th>
                                        </div>


                                        <th
                                            scope="col"
                                            className="px-1 py-3 invisible md:visible text-left text-xs font-medium  text-gray-500"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {/* {patientDrugPrescriptionList.concat(patientLabTestsList).filter(x => x.reportType === "Prescription" && x.docName).length === 0 ? <span>No Data found</span> : ''} */}
                                    {mypriscriptionData.length > 0 && mypriscriptionData[0].patientDrugPrescriptionList.concat(mypriscriptionData[0].patientLabTestsList).slice(0, 2).map((col, i) => (
                                        <tr key={i} className="border-dashed border-b">
                                            <td className="lg:py-4 whitespace-nowrap lg:w-3/4">
                                                <div className=" text-sm font-medium lg:w-3/4 w-36 truncate text-gray-500 " onClick={() => { DownloadImage(col.docName ?col.docName : "") }}>{col.docName ?col.docName : col.labTestDescription}</div>
                                            </td>
                                            <td className="lg:w-3/4 lg:py-4 whitespace-nowrap " >
                                                <span >{col.patientName}</span>
                                            </td>
                                            <td className="lg:py-4  flex lg:flex hidden cursor-pointer flex whitespace-nowrap text-sm text-gray-500 ">
                                                <p onClick={() => { viewImage(col.docName) }} className=" text-brand-secondary  font-medium ">
                                                    View
                                                </p>
                                                <img onClick={() => { DownloadImage(col.docName) }} src={arrowdown} alt="" className="mx-7" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Records;