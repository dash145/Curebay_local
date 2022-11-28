/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientfamilymembers } from '../../Redux/Actions/UserprofileActions';
import { setPatientCode, setDropDownPatientCode } from '../../Redux/Actions/userActions';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';

function FamilyDropdown(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientCode = useSelector(state => state.authReducer.patientCode)
    const familymemberinfo = useSelector((state) => state.familymembers)
    //const [memberCode , setMemberCode] = useState(patientCode)

    const memberCode = useSelector((state) => state.particularpatientdetails.memberCode)

    const { FamilymembersData } = familymemberinfo
    const [memberList, setMemberList] = useState([])

    const addSelf = () => {
        let data = {};
        data.name = userData.firstName;
        data.code = userData.code;
        let members = FamilymembersData;
        console.log("sdisdhfiosdhf", JSON.stringify(members))
        console.log("sdisdhfiosdhuserDataf", JSON.stringify(userData))
        members.unshift(data);
        let uniqueObjArray = [
            ...new Map(members.map((item) => [item["firstName"], item])).values(),
        ];
        setMemberList(uniqueObjArray);
    }

    useEffect(() => {
        if (FamilymembersData) {
            addSelf();
        }
    }, [FamilymembersData]);


    const onChange = (code) => {
        props.onSelect(code);
        //setMemberCode(code)
         dispatch(setDropDownPatientCode(code));
    }

    useEffect(() => {
        console.log(patientCode, "sdfisdhiodsh")
        dispatch(getPatientfamilymembers(userData.code));
    }, []);

    const gotoHistory = (e) => {
        e.preventDefault();
        history.push(USERPROFILE_ROUTES.MYDETAILS)
    }

   
    return (

        <div className="md:flex justify-between mt-2 mb-2 mx-2 lg:mx-0">
            <div className="flex justify-between pr-2  w-full">
                <div className='md:flex pr-2  items-center'>
                    <p className=" font-bold text-xl " style={{ color: "#66B889" }} >{props.title}</p>
                    <div className="h-10 w-40 border border-gray-200 p-2 md:ml-4  rounded-lg flex space-x-6">
                        <select className="w-full bg-transparent text-sm font-semibold text-gray-400 outline-none" onChange={(e) => onChange(e.target.value)}>
                            {memberList.map((res, i) => (
                                <option key={i} className="py-1 text-sm text-green-600" selected={memberCode == res.code ? true : false} value={res.code}>{res.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* <div>
                <button className="px-3 w-max place-self-end md:place-self-auto lg:px-4 py-2 text-white text-sm bg-brand-secondary rounded-lg mt-12 lg:mt-8 lg:mt-0" hidden={props?.hide} onClick={(e) => { gotoHistory(e) }}>Go Back</button>
                </div> */}
            </div>
        </div>
    )
}
export default FamilyDropdown;
