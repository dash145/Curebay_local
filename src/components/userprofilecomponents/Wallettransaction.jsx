import Userprofilesidebar from '../userprofilesidebar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { walletTransactiondetails } from '../../Redux/Actions/UserprofileActions';

function Wallettransaction() {

    const dispatch = useDispatch();



  const userData = useSelector(state => state.authReducer.patientData)
  console.log("patient code", userData.code)



  const walletinfo = useSelector((state) => state.patientwallet);
  console.log("zzzz", walletinfo);

  useEffect(() => {
    dispatch(walletTransactiondetails(userData.code));
  }, []);

  return (
    <div>
        
      
    </div>
  )
}

export default Wallettransaction
