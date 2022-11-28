import React, { useEffect } from 'react'
import steth from '../Assets/Images/steth.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes';

function CartOrderSucess() {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const link = state.link
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };
console.log(state);
  useEffect(() =>{
    localStorage.removeItem("paymentRemarks")
  },[])
console.log(state, "dsivhsdovous");
  return (
    <div className="m-8 md:m-20">

      {/* breadcrumbs */}


      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-green-500 text-xl font-normal text-center  mb-8">{state.remark}</h2>
      </div>
      <div className="flex text-center justify-center ">


        {/* <div className="py-4 px-8  bg-white shadow-lg rounded-lg my-1 mb-8 ">

                    <div className="flex h-full  justify-start ">
                        <img src={steth} alt="stethescope" className="w-10 mt-2" />
                        <div>
                            <div className="flex justify-between">
                                <p className="text-sm pl-2 pt-2">Medicines for - R ...</p>
                                <p className="text-xs pl-16 pt-3 text-green-600">Upcoming</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div > */}
        {/* <p className="text-xs text-white">Jeevan Medical </p> */}
        {/* <p className="text-sm pl-8">Jeevan Medical</p>
                                </div>
                                <p className="text-xs font-medium">9 Jul, 6:30 PM</p>
                            </div>
                        </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="flex mb-8 justify-center items-center">
        <button onClick={(e) => redirectTo(e, link == "PATIENTMEDICINEORDERS" ? USERPROFILE_ROUTES.PATIENTMEDICINEORDERS: USERPROFILE_ROUTES.MY_ORDERS)} className="bg-brand-primary text-white p-2 rounded-xl text-center"><a href="#" className="text-lg md:text-xl mx-3 md:m-8 font-medium text-white-500">Go to My Orders</a></button>
        {/* <button onClick={(e) => { redirectTo(e, APP_ROUTES.ORDER_DETAILS) }} className="border border-brand-primary text-sm text-brand-primary rounded-xl p-2 mr-2"><a href="#" className="text-xl m-8 font-medium text-indigo-500">Track Order</a></button> */}
      </div>





    </div>

  );
}
export default CartOrderSucess;
