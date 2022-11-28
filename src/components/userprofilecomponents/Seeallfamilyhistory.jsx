import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Patientprofileupbar from './Patientprofileupbar';
import Patientprofilesidebar from '../Patientprofilesidebar';
import Userprofilesidebar from "../userprofilesidebar";
import FamilyDropdown from '../../components/userprofilecomponents/FamilyDropDown';
import { getfamilyhistory, getfilteredfamilyhistory } from "../../Redux/Actions/UserprofileActions";
import Addmedicalhistory from './Addmedicalhistory';
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterMedicalHistory from './FilterMedicalHistory';
import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'


function Seeallfamilyhistory() {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [showFilter, setshowfilter] = useState(false);
    const familyhistorylist = useSelector((state) => state.allfamilyHistoryList);
    const { familyhistoryDataList } = familyhistorylist;
    const patientCode = useSelector((state) => state.authReducer.patientCode);

    const [isPatientCode,setPatientCode]=useState(patientCode)

    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location);
    }

    const [showmedicalhistorypopup, setshowmedicalhistorypopup] = useState(false);
    const [editmedicalhistory, seteditmedicalhistory] = useState();
    const patientDetails = useSelector((state) => state.particularpatientdetails);

    const addmedicalhistory = (event, data) => {
        event.preventDefault();
        setshowmedicalhistorypopup(true)
        seteditmedicalhistory(data)
    }

    const getMedicalHistoryFunc = () => {

        dispatch(getfamilyhistory(patientCode));
    };


    const loadPaymentFor = (patientCode)=>{
        setPatientCode(patientCode)
        dispatch(getfamilyhistory(patientCode));
       }

    useEffect(() => {
        getMedicalHistoryFunc(patientCode);
    }, [dispatch.patientCode]);

   

    useEffect(() => {
        getMedicalHistoryFunc();
    }, [patientCode]);


    const filter = (event) => {
        event.preventDefault();
        setshowfilter(true);
    };

    const closeFilter = () => {
        setshowfilter(false);
    }

    const filterData = (fromDate, toDate) => {
        let patient = localStorage.getItem("patientprofile");
        if (fromDate && toDate) {
            dispatch(getfilteredfamilyhistory(isPatientCode, fromDate, toDate));
        } else {
            dispatch(getfamilyhistory(isPatientCode));
        }
        setshowfilter(false);
    }
    const changedPatient = (patient) => {
        history.push({ pathname: `/profile/mydetails` });
    }

   
    return (
        <>


            <Patientprofileupbar patientChanged={changedPatient}></Patientprofileupbar>
            {/* breadcrumbs */}
            <ul class="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-2">
        <li class="inline-flex items-center">
          <a href="/">Home</a>
          <svg
            class="h-5 w-auto text-brand-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </li>

        <li class="inline-flex items-center">
        <a href="/profile/mydetails"> Profile</a>
          <svg
            class="h-5 w-auto text-brand-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </li>

        <li class="inline-flex items-center">
        <a href="/profile/mymedicalhistory"> Medical History</a>
          <svg
            class="h-5 w-auto text-brand-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </li>
        <li class="inline-flex items-center">
          <a>Get Family History</a>
        </li>
      </ul>

            <div class="flex justify-between " style={{ backgroundColor: "#F8F8F8"}}>
                <div class="lg:block hidden w-3/12 ml-6 mt-6">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>
                <div class=" md:w-full lg:w-8/12 lg:mr-16 lg:ml-16 mt-6">
                    <div className="flex flex-col">
                        <div className="-my-2 lg:-mx-8">
                        <p className="mt-3 text-medium font-bold text-2xl text-gray-800">Family History</p>
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-white mt-4 border border-gray-200">
                                <FamilyDropdown title="Get Family history For"  onSelect={loadPaymentFor}  />
                                <div className="shadow mx-2 overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                                    <div class="flex justify-end my-2 space-x-2">
                                        {/*<SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                                        <input className="text-brand-secondary placeholder-brand-secondary bg-transparent" placeholder="search or filter" />*/}
                                        <button
                                            onClick={filter}
                                            class="bg-brand-secondary  rounded text-white mx-2 h-9 w-9"
                                        >
                                            <FontAwesomeIcon icon={faFilter} />
                                        </button>
                                    </div>
                                    <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
                                    <div className="h-80 w-full overflow-y-scroll overflow-y-scroll">
                                        <table className="w-full lg:min-w-full table divide-y divide-gray-200 lg:px-2 ">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <div className="flex justify-center">
                                                        {/* <input type="radio" class="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Patientname
                                                        </th>

                                                    </div>



                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Description
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    {/* <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th> */}

                                                    {/* <th
                                                        scope="col"
                                                        className="pr-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th> */}
                                                    {/* <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody className=" md:divide-y divide-gray-200">


                                                {familyhistoryDataList.map((user, i) => (
                                                    <tr  key={i} >
                                                        <td data-label="Patientname" className="px-1 md:px-6 py-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className=" flex md:space-x-2">
                                                                    <input type="radio" class="hidden md:block form-radio mt-1 mr-2" name="accountType" value="personal" />
                                                                    <div className="text-sm w-32 md:w-auto truncate font-medium text-gray-500 ">{user.patientName}</div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td data-label="Description" className="px-2 md:px-6 py-2 whitespace-nowrap">
                                                        {user.description?.length >30 ?
                                                            <div className="w-11/12 md:w-auto text-sm truncate text-gray-500 ">{user.description?.slice(0,30)}<br/>{user.description?.slice(30,60)}<br/>{user.description?.slice(60,90)}<br/>{user.description?.slice(90,101)}</div>
                                                            :
                                                            <div className="w-11/12 md:w-auto text-sm truncate text-gray-500 ">{user.description}</div>
                                                        }
                                                        </td>

                                                        <td data-label="Date" className="px-1 md:px-6 py-2 whitespace-nowrap">
                                                            <span className="text-sm ml-2 md:ml-0text-gray-500 ">
                                                                {getLocalTime(user?.givenDate)?.split(" ")[0]}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showmedicalhistorypopup ? <Addmedicalhistory editmedicalhistory={editmedicalhistory} closePopup={() => setshowmedicalhistorypopup(!showmedicalhistorypopup)} ></Addmedicalhistory> : null
                }
                {showFilter && (
                    <FilterMedicalHistory
                        title="Family History"
                        filterData={filterData}
                        closePopup={closeFilter}
                        onClose={closeFilter} />
                )}
            </div>



        </>
    );
}
export default Seeallfamilyhistory;
