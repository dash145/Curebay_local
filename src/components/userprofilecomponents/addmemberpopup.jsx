import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux';
import { editPatientDetails } from '../../Redux/Actions/UserprofileActions';
import steth from '../../Assets/Images/avatar.png';
import camera from '../../Assets/Images/camera.svg';
import { addRegistration } from '../../Redux/Actions/registrationAction';
import { members, bloodGrp } from '../../helper/family';
import { encodeBase64File } from '../../helper/filebase64';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import '../../components/userprofilecomponents/input.css'
const salutationData = [
    {
        sal: "Select Salutation",
    },
    {
        sal: "Mr.",
    },
    {
        sal: "Ms.",
    },
    {
        sal: "Mrs.",
    },
    {
        sal: "Dr.",
    },
];

function Addmemberpopup(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientinfo = useSelector((state) => state.patientinfo);
    const { patientinfoData, isLoading } = patientinfo;
    const [stateList, setStateList] = useState([]);

    const familymemberinfo = useSelector((state) => state.familymembers);
    const { FamilymembersData } = familymemberinfo;

    const [showEditmember, setshowEditmember] = useState(false);

    const[isHouseNumber,setHouseNumber]=useState(false)
    const[isFirstName,setFirstName]=useState(false)
    const[isRelation,setRelation]=useState(false)
    const[isGender,setGender]=useState(false)
    const[isDOB,setDOB]=useState(false)
    const[isBloodGroup,setBloodGroup]=useState(false)
    const[isAddress,setAddress]=useState(false)
    const[isPinCode,setPinCode]=useState(false)
    const[isCity,setCity]=useState(false)
    const[isState,setState]=useState(false)

    const [addmember, setaddmember] = useState({
        salutation: props?.editmembers != "" ? props?.editmembers?.salutation : "",
        firstName: props?.editmembers != "" ? props?.editmembers?.firstName : "",
        lastName: props?.editmembers != "" ? props?.editmembers?.lastName : "",
        relation: props?.editmembers != "" ? props?.editmembers?.relation : "",
        gender: props?.editmembers != "" ? props?.editmembers?.gender : "",
        dob: props?.editmembers != "" ? props?.editmembers?.dob : new Date(),
        bloodGroup: props?.editmembers != "" ? props?.editmembers?.bloodGroup : "",
        createdBy: userData.code,
        modifiedBy: userData.code,
        status: 1,
        parentCode: userData.code,
        photoName: props?.editmembers != "" ? props?.editmembers?.photoName : "",
        address1: props?.editmembers != "" ? props?.editmembers?.address1 : "",
        address2: props?.editmembers != "" ? props?.editmembers?.address2 : "",
        pinCode: props?.editmembers != "" ? props?.editmembers?.pinCode : "",
        city: props?.editmembers != "" ? props?.editmembers?.city : "",
        state: props?.editmembers != "" ? props?.editmembers?.state : "",
        photoName: props?.photoName != "" ? props?.editmembers?.photoName : "",
    })

    useEffect(() => {
        fetch(process.env.REACT_APP_BASEURL + "state/list")
            .then((res) => res.json())
            .then((result) => setStateList(result));
    }, [])


    // useEffect(() => {
    //     if (props && props?.editmembers && props.editmembers.id) {
    //         setaddmember(props?.editmembers)
    //         console.log("props".props?.editmembers)
    //         setshowEditmember(true)

    //     }
    // }, [props]);

    const redirectTo = (event) => {
        setTimeout(() => {
            props.closePopup()
        }, 100)
    };


    const handleChange = (e) => {
        setaddmember({ ...addmember, [e.target.name]: e.target.value });
    };

    // useEffect(() => {
    //     const arr = members.find((x => x.text === addmember.relation));
    //     console.log("arr", arr)
    //     if(arr){
    //         setaddmember({ ...addmember, ['gender']: arr.gender });
    //     }
    // }, [addmember.relation])

    const saveaddmember = (e) => {



        if(addmember.salutation==undefined || addmember.salutation ==""){
            setHouseNumber(true)
            return
        } else if (addmember.firstName==undefined || addmember.firstName =="") {
            setFirstName(true)
            setHouseNumber(false)
            return
        }else if (addmember.relation==undefined || addmember.relation =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(true)
            return
        }else if (addmember.gender==undefined || addmember.gender =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(true)
            return
        }else if (addmember.dob==undefined || addmember.dob =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(true)
            return
        }else if (addmember.bloodGroup==undefined || addmember.bloodGroup =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(true)
            return
        }else if (addmember.bloodGroup==undefined || addmember.bloodGroup =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(true)
            return
        }else if (addmember.address2==undefined || addmember.address2 =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(false)
            setAddress(true)
            return
        }else if (addmember.pinCode==undefined || addmember.pinCode =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(false)
            setAddress(false)
            setPinCode(true)

            return
        } else if (addmember.city==undefined || addmember.city =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(false)
            setAddress(false)
            setPinCode(false)
            setCity(true)

            return
        }else if (addmember.state==undefined || addmember.state =="") {
            setFirstName(false)
            setHouseNumber(false)
            setRelation(false)
            setGender(false)
            setDOB(false)
            setBloodGroup(false)
            setAddress(false)
            setPinCode(false)
            setCity(false)
            setState(true)
            return
        }
        setState(false)


        e.preventDefault();
        addmember.code = addmember.firstName
        console.log(addmember, "addmember");
        if(!addmember.dob){
            toast("Please add date of birth");
            return
        }
        if (props?.editmembers?.id) {
            dispatch(editPatientDetails(props?.editmembers?.id, addmember)).then((res) => {
                if (res === 1) {
                    toast("Profile Added Successfully");

                    
                }
            });
            redirectTo();

        } else {
            dispatch(addRegistration(addmember)).then((res) => {
                if (res === 1) {
                    toast("Profile Added Successfully");
                }
            });;
            redirectTo();
        }
    }


    const changeHandler = async (file) => {
        let b64File = await encodeBase64File(file);
        setaddmember({ ...addmember, ['photo']: b64File })
    }

    const changeDate = (e) => {
        setaddmember({ ...addmember, ['dob']: moment(e).format("MM/DD/yyyy") })
    }

    return (
        <>
            <ToastContainer />
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto h-64">
                    {/*content*/}
                    <div className="border-0 rounded-lg relative flex flex-col items-center lg:w-auto outline-none focus:outline-none lg:-top-20">

                        {/*body*/}
                        <div className="rounded-lg shadow-lg bg-white-600 w-full lg:w-3/4 h-112 p-5 bg-white antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">

                                {
                                    props?.editmembers != "" ? <h1 className="text-lg font-semibold md:text-2xl text-gray-800 ">Edit New Member</h1> :
                                        <h1 className="text-lg font-bold md:text-2xl text-gray-800 ">Add New Member</h1>
                                }
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>
                            <div className="lg:flex pt-2 ">
                                <div className="lg:w-1/6 text-center content-center justify-center">
                                    <div className="relative">
                                        <img
                                         src={addmember.photo ? `${'data:image;base64,'}` + addmember.photo : addmember.photoName ? ( addmember.photoName) : steth}
                                         alt="stethescope" className="lg:w-24 w-20 lg:h-24 h-20 mt-6 rounded-full" />
                                        <div className="-mt-4 justify-end flex absolute left-14">
                                            <label className="w-6 h-6 flex justify-center cursor-pointer text-xs bg-brand-primary font-normal rounded-full ">
                                                <input type='file' accept="image/*" onChange={(e) => { changeHandler(e.target.files[0]) }} className="hidden" />
                                                <img src={camera} alt="camera" className="w-5" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-5/6" >
                                    <div className="grid md:grid-cols-3 gap-6 lg:pt-6 mt-8">
                                        <div className="relative mb-5">
                                            <div className="flex lg:mr-10">
                                                <select
                                                    autoComplete="off"
                                                    id="salutation"
                                                    name="salutation"
                                                    disabled={false}
                                                    value={addmember.salutation}
                                                    className="lg:w-48 border-b-2 text-xs border-gray-300 mt-2 w-full bg-transparent text-gray-900 focus:outline-none"
                                                    placeholder="salutation"
                                                    onChange={handleChange}
                                                >
                                                    {salutationData.map((cit, i) => (
                                                        <option key={i} value={cit.sal}> {cit.sal}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <label
                                                htmlFor="salutation"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Salutation
                                            </label>

                                            {isHouseNumber && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select Salutation</label>}

                                        </div>
                                        <div className="relative mb-5">
                                            <div className="flex">
                                                <input autocomplete="off" id="firstName" name="firstName" value={addmember.firstName} type="text" className="peer text-xs h-7 lg:w-48 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="First Name" onChange={handleChange} />
                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}
                                            <label for="firstName" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                                            {isFirstName && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please enter first name</label>}

                                        </div>
                                        <div className="relative mb-5">
                                            <div className="flex">
                                                <input autocomplete="off" id="lastName" name="lastName" value={addmember.lastName} type="text" className="peer text-xs h-7 lg:w-48 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Last Name" onChange={handleChange} />
                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}
                                            <label for="lastName" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6 lg:pt-6 mt-8" >
                                        <div className="relative mb-5">
                                            <div className="flex space-x-4">
                                                <select className="lg:w-48 w-full  py-2 outline-none peer text-xs  border-b-2 border-gray-300 " name="relation" value={addmember.relation} onChange={handleChange} >
                                                    <option className="py-1" selected value="">Select relation</option>
                                                    {
                                                        members.map((data, i) => (
                                                            <option key={i} className="py-1" value={data.text}>{data.text}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <label for="relation" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Relation </label>

                                            {isRelation && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select relation</label>}

                                        </div>
                                        <div className="relative mb-5 ">
                                            <div className="flex lg:mr-10">
                                                <select className="lg:w-48 w-full text-xs py-2 outline-none peer border-b-2 border-gray-300 " name="gender" value={addmember.gender} onChange={handleChange} >
                                                    <option className="py-1" selected value="">Select Gender</option>
                                                    <option className="py-1" value="M">Male</option>
                                                    <option className="py-1" value="F">Female</option>
                                                    <option className="py-1" value="O">Others</option>
                                                </select>

                                            </div>
                                            <label for="gender" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Gender</label>
                                            {isGender && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select gender</label>}

                                        </div>
                                        <div className="relative ">
                                            <div className="flex mt-1">
                                                <DatePicker id="dob" name="dob" className="peer  text-xs bg-transparent h-8 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " dropdownMode="select" maxDate={new Date()} showMonthDropdown showYearDropdown dateFormat="dd/MM/yyyy" value={moment(addmember.dob).format("DD/MM/YYYY")} onSelect={changeDate} placeholderText={'DD/MM/YYYY'} disabledKeyboardNavigation={true} autoFocus={false} />
                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}
                                            <label for="dob" className="absolute left-0 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">DOB</label>
                                            {isDOB && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select DOB</label>}

                                        </div>
                                        <div className="relative lg:mt-0 mt-6">
                                            <div className="flex space-x-4">
                                                {/* <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Relationship" />
                                                    <img src={arrow} alt="my photo" className="absolute right-0 top-5" ></img> */}
                                                <select className="lg:w-48 w-full py-2 outline-none peer text-xs  border-b-2 border-gray-300 " name="bloodGroup" value={addmember.bloodGroup} onChange={handleChange} >
                                                    <option className="py-1" selected value="">Select bloodGroup</option>

                                                    {bloodGrp.map((data, i) => (
                                                        <option key={i} className="py-1 " value={data.text}>{data.text}</option>
                                                    ))}
                                                </select>

                                            </div>
                                            <label for="bloodGroup" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Blood Group </label>
                                            {isBloodGroup && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select Blood Group</label>}

                                        </div>
                                    </div>




                                    <div className="lg:flex justify-between content-center pt-6 pb-3">
                                        <div className="flex">
                                            {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                                            <p className="text-black-900 font-medium text-lg ">
                                                Address Details
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 xl:grid-cols-4 mt-4 justify-between content-center ">

                                        <div className="relative w-11/12">
                                            <input
                                                autoComplete="off"
                                                id="address1"
                                                name="address1"
                                                value={addmember.address1}
                                                type="text"
                                                className="border-b-2 border-gray-300 border-0 text-xs pt-2 w-full text-gray-900 bg-transparent focus:outline-none"
                                                //   readOnly={!showinput}
                                                onChange={handleChange}
                                                placeholder="House No /Street Name"
                                            />

                                            <label
                                                htmlFor="address1"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                House No /Street Name
                                            </label>
                                        </div>
                                        <div className="relative w-11/12">
                                            <input
                                                autoComplete="off"
                                                id="address2"
                                                name="address2"
                                                value={addmember.address2}
                                                type="text"
                                                className="border-b-2 border-gray-300 text-xs border-0 pt-2 w-full text-gray-900 bg-transparent focus:outline-none"
                                                //   readOnly={!showinput}
                                                onChange={handleChange}
                                                placeholder="Address"
                                            />
                                            <label
                                                htmlFor="address2"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Address
                                            </label>

                                            {isAddress && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please enter address</label>}

                                        </div>
                                        {/* <div className="relative w-11/12">
                                        <input
                                        autoComplete="off"
                                        id="pinCode"
                                        name="pinCode"
                                        maxLength="6"
                                        value={addmember.pinCode}
                                        type="number"
                                        className= "border-b-2 border-gray-300 pt-2 w-full text-gray-900 bg-transparent"
                                        //   readOnly={!showinput}
                                        onChange={handleChange}
                                        placeholder="Enter Pincode"
                                        />
                                        <label
                                        htmlFor="pinCode"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                        PinCode
                                        </label>
                                    </div> */}
                                        <div className="relative mb-4">
                                            <input
                                                ssautocomplete="off"
                                                maxLength="6"
                                                id="pinCode"
                                                name="pinCode"
                                                type="text"
                                                className="border-b-2 border-gray-300 text-xs pt-2 w-full text-gray-900 bg-transparent focus:outline-none"
                                                value={addmember.pinCode}
                                                placeholder=""
                                                onChange={handleChange}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9.]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor="pinCode"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                PinCode
                                            </label>
                                            {isPinCode && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please enter pin code</label>}

                                        </div>


                                        <div className="relative w-11/12">

                                            <select
                                                id="state"
                                                name="state"
                                                value={addmember?.state}
                                                //   disabled={!showinput}
                                                className="border-b-2 border-gray-300 text-xs mt-2 w-full bg-transparent text-gray-900 focus:outline-none"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select State</option>
                                                {stateList?.map((singleState, s) => (
                                                    <option key={s} value={singleState.code}>
                                                        {singleState.description}
                                                    </option>
                                                ))}
                                            </select>

                                            <label
                                                htmlFor="state"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                State
                                            </label>
                                            {isState && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select state</label>}

                                        </div>




                                        <div className="relative w-11/12">
                                            <input
                                                autoComplete="off"
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={addmember?.city}
                                                className="border-b-2 border-gray-300 text-xs pt-2 w-full text-gray-900 bg-transparent focus:outline-none"
                                                //   readOnly={!showinput}
                                                placeholder="City"
                                                onChange={handleChange}
                                            />
                                            <label
                                                htmlFor="city"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                City
                                            </label>
                                            {isCity && <label for="address1" className=" left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Please select city</label>}

                                        </div>

                                        

                                    </div>
                                    <div className="flex justify-end mt-3">
                                        <button onClick={saveaddmember} className="bg-brand-secondary  text-sm text-white font-normal cursor-pointer rounded-md py-2 px-3 mr-2">
                                            Save
                                            {isLoading && <div className="loader ml-3 float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Addmemberpopup;
