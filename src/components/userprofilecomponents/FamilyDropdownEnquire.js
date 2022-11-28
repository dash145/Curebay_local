/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientfamilymembers } from '../../Redux/Actions/UserprofileActions';
import { setPatientCode, setDropDownPatientCode } from '../../Redux/Actions/userActions';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';

function FamilyDropdownEnquire(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientCode = useSelector(state => state.authReducer.patientCode)
    const familymemberinfo = useSelector((state) => state.familymembers)
    const memberCode = useSelector((state) => state.particularpatientdetails.memberCode)
    const { FamilymembersData } = familymemberinfo
    const [memberList, setMemberList] = useState([])

    const addSelf = () => {
        let data = {};
        data.name = userData.firstName;
        data.code = userData.code;
        let members = FamilymembersData;
        console.log(userData, "sdisdhfiosdhf", FamilymembersData)
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


    const onChange = (code, name) => {
        console.log(code ,name, "sdvhsdviuhsduv", memberList);
        props.onSelect(code, name);
        // dispatch(setDropDownPatientCode(code));
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

        
            <div className="w-full justify-between">
                <div className=''>
                    <p className=" font-bold text-xl " >{props.title}</p>
                    <div className="  rounded-lg ">
                        <select className="peer text-xs md:text-sm  w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600" onChange={(e) => onChange(e.target.value , e.target.selectedOptions[0].innerHTML)}>
                            {memberList.map((res, i) => (
                                <option key={i} className="py-1 text-sm text-green-600" selected={memberCode == res.code ? true : false} label = {res.name} value={res.code}>{res.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* <div>
                <button className="px-3 w-max place-self-end md:place-self-auto lg:px-4 py-2 text-white text-sm bg-brand-secondary rounded-lg mt-12 lg:mt-8 lg:mt-0" hidden={props?.hide} onClick={(e) => { gotoHistory(e) }}>Go Back</button>
                </div> */}
            </div>
       
    )
}
export default FamilyDropdownEnquire;
