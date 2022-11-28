import React, { useState, useEffect } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import med from '../Assets/Images/bg-medicine.svg';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes'
import { useHistory } from 'react-router-dom';
import moment from "moment";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import RescheduleModal from '../components/reShedculeModal';
import { getPatientmedicinedeliveryList} from '../Redux/Actions/patientAction';
import { useDispatch, useSelector } from "react-redux";

function OrderedCard(props) {
    const history = useHistory();
    const dispatch = useDispatch()
  const patientCode = useSelector((state) => state.authReducer.patientCode);
  const medicinedeliverylist = useSelector((state) => state.patientmedicinedeliverylist);
  const { PatientmedicinedeliveryData, isLoading } = medicinedeliverylist;
    const redirectTo = (event, location, data) => {
        event.preventDefault();
        history.push({ pathname: location, state: data })
    }
    const { data, type } = props;
    useEffect(() =>{
        const payload = {
            patientId: patientCode,
            photoRequired: "Y",
            status: 1
        }
       dispatch(getPatientmedicinedeliveryList(payload, 1))
    },[])

    console.log(PatientmedicinedeliveryData, "PatientmedicinedeliveryDataisdvisdv");

    return (
        <>

                {PatientmedicinedeliveryData?.data?.filter(x => x?.patientOrderId).map((user, i) => (
                <div key={i}>
                    <div className="flex items-center py-2 px-4 overflow-hidden">
                        <div>
                            <img className="h-12" src={med} alt="" />
                        </div>
                        <div className="flex justify-between flex-wrap mx-3 my-1  font-normal w-full">
                            <div className="">
                                <div className="w-full truncate">
                                    <span>Order no: {user?.patientOrderId}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap " >
                            </div>
                        </div>
                    </div>
                    {i !== 1 && <hr className="mx-3" />}
                </div>
            ))}
        </>
    );
}
export default OrderedCard;
