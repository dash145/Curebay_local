import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useGAEventsTrackers from "../config/useGAEventsTrackers";

import steth from '../Assets/Images/avatar.png';
import Addmemberpopup from "./userprofilecomponents/addmemberpopup";
import moment from 'moment';



import { getPatientfamilymembers, onPatientfamilyMembersDelete } from '../Redux/Actions/UserprofileActions';


function Familysearch(props) {
  console.log(props, "hey props");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const GAEventsTrackers = useGAEventsTrackers();
  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData } = patientinfo;
  

  const familymemberinfo = useSelector((state) => state.familymembers);
  const { FamilymembersData } = familymemberinfo;

  const { speciality, healthConcerns } = location;
  //const doctorlist = useSelector((state) => state.doctorlist);
  //  const { doctorData, total, currentPage } = doctorlist;
  const particulardoctor = useSelector((state) => state.particulardoctor);
  const { particularDoct } = particulardoctor;
  const userData = useSelector((state) => state.authReducer.patientData);
  const specialistDoctor = useSelector(
    (state) => state.particulardoctorspeciality
  );
  const { specialityData, isLoading } = specialistDoctor;
  const { slotData } = useSelector((state) => state.doctorsslot);
  const doctorsAppointment = useSelector(
    (state) => state.doctorAppointmentList
  );
  const { doctorappointmentList } = doctorsAppointment;
  const [stateindex, setIndex] = useState(-1);
  const { coords } = useSelector((state) => state.authReducer);
  const search = useSelector((state) => state.authReducer.search);
  const [currentPinCode, setCurrentPincode] = useState("");
  const [doctorData, setsearchData] = useState([]);
  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);
  const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);
  const [Editmember, setEditmember] = useState();
  const [position, setPosition] = useState({});

  const [pageStart, setPageStart] = useState(1);
  const [hasMore, setHasMore] = useState(true);



  const editmembers = (e, user) => {
    e.preventDefault();
    setshowaddmemberpopup(true);
    setEditmember(user);
};


const deleteMembers = (e, user) => {
    e.preventDefault();
    console.log('isssss', JSON.stringify(user))

    //setEditmember(user);

    //onPatientfamilyMembersDelete

    dispatch(onPatientfamilyMembersDelete(user?.code)).then((res) => {
        dispatch(getPatientfamilymembers(userData.code));

    });
};

useEffect(() => {
    dispatch(getPatientfamilymembers(userData.code)).then((res) => {
        console.log('is memebership response', JSON.stringify(res))
    });
}, [showaddmemberpopup, patientinfoData]);

  return (
    <>
      <div className="lg:py-4">

        <ul className="lg:flex  text-brand-secondary text-sm lg:text-base px-3  pt-5">
          <li className="inline-flex items-center">
            <a href="/">Home</a>
            <svg
              className="h-5 w-auto text-brand-secondary"
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
       
          <li className="inline-flex items-center">
            <a>Family Members</a>
          </li>
        </ul>
        <div className=" lg:block text-gray-primary font-bold text-lg px-3 w-full my-6">
          <p className="flex md:justify-center mb-3">Available Family Members</p>
        </div>
    

        
            <div className="border border-gray-200" style={{ background: "white" }}>
                            <div className="w-full flex justify-end ">
                            <div className="flex justify-center items-center border border-gray-800 rounded-lg w-36 py-2 mt-3 mr-7" >
                                <p onClick={(e) => editmembers(e, '')} className="text-sm cursor-pointer text-gray-900 font-semibold"> + Add Members</p>
                            </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 pb-4 space-y-3 gap-2">


                                {FamilymembersData.map((user, i) => (
                                    <div className=" bg-white w-11/12 h-112 p-2 antialiased justify-between border border-gray-200 mt-2 mx-auto lg:mx-3 rounded-lg" key={i}>
                                        <div className="lg:flex w-full lg:flex lg:flex-col  ">

                                            <div className="flex gap-3 items-center lg:gap-0">

                                                <img src={user?.photoName ? `${user.photoName}` : steth} alt="profile" className="w-12 h-12 mt-lg:ml-4 rounded-full border" />
                                                <div className="w-full">
                                                    <div className="flex flex-col lg:flex-row justify-between lg:ml-2">
                                                        <div className="lg:flex lg:flex-col justify-center ">
                                                            {/* <span className={`text-sm pl-2 text-white font-bold bg-brand-${memberColor[user.relation]} rounded-full lg:shadow-lg w-auto lg:my-4  px-2 text-center`}>{user.relation}</span> */}
                                                            <p className=" pt-1 text-medium font-bold text-sm  my-1 ">{user.name}</p>
                                                            <div className=" flex ">
                                                                <p className="text-xs  text-center  font-medium "><span className="font-semibold">Patient ID:</span>{" "}{user.code}</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2 lg:gap-0 mt-2 ld:mt-0'>
                                                            <p onClick={(e) => editmembers(e, user)} className="text-xs cursor-pointer text-white font-medium lg:pr-2 px-4 lg:my-4 flex items-center rounded-md lg:mx-1 lg:pl-2 lg:py-1" style={{background:"#66B889"}}>Edit</p>
                                                            <p onClick={(e) => deleteMembers(e, user)} className="text-xs cursor-pointer text-gray-700 font-medium pr-2 lg:my-4 border border-gray-500 rounded-md mx-1 pl-2 py-1">Delete</p>
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>

                                            <hr className="mt-2"></hr>
                                            <div className="flex justify-between mt-2">

                                                <p className=" lg:ml-5  text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">DOB : </span>{moment(user.dob).format("DD/MM/yyyy")}</p>
                                                <p className=" lg:ml-2 text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">Blood group : </span>{user.bloodGroup}</p>

                                            </div>

                                            <div className="flex justify-between">
                                                <p className=" lg:ml-5  text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">Relation : </span>{user.relation}</p>
                                                <p className=" lg:ml-2  text-sm text-gray-500   font-medium my-1 "><span className="text-gray-900 font-semibold">Gender : </span>{user.gender === "F" ? "Female" : (user.gender === "M" ? "Male" : "Others")}</p>
                                                {/* <p className="text-sm ml-5 text-sm text-gray-600   font-medium  my-1">Health Condition : Healthy</p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


        
        <br />
      </div>

      {
                        showaddmemberpopup ?
                            <Addmemberpopup editmembers={Editmember} closePopup={() => setshowaddmemberpopup(!showaddmemberpopup)} ></Addmemberpopup> : null
                    }
    </>
  );
}
export default Familysearch;

