import React , {useEffect} from 'react'
import steth from '../Assets/Images/steth.svg';
import { useHistory , useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes';

function MedicineOrderPlaced() {
    const history = useHistory();
    const redirectTo = (event,location) => {
        event.preventDefault();
        history.push(location);
    };

    const search = useLocation().search;
    // const res = search.split("?search_query=")
    console.log(search , 'sdcndsicnsdipcdiv');

    // useEffect(() => {
      let params = (new URL(document.location)).searchParams
      console.log(params.get('Mode'), "dfidshfiods");
      const status = params.get("status");
      const trancationid = params.get("trancationid");
      const productinfo = params.get("productinfo");
      const remarks = params.get("remarks");
      const payMode = params.get("Mode");
     
      console.log(status , "dfidshfiods");
      console.log(trancationid , "dfidshfiods");
      console.log(productinfo , "dfidshfiods");

    
  
      if(status === 'success') {
          localStorage.setItem('paymentStatus', status);
          localStorage.setItem('trancationid', trancationid);
          localStorage.setItem('paymentRemarks', remarks);   
          localStorage.setItem('payMode', payMode);     
          const url = localStorage.getItem('redirectUrl');
          console.log(status, url , "dfsdfosdibobu");
          if(url){
            history.push(url);
          }
         
      };
      if(status === 'failure'){
        localStorage.setItem('paymentStatus', status);
        localStorage.setItem('paymentRemarks', remarks);       
          const url = localStorage.getItem('redirectUrl');
          history.push(url);
      }
  
    // }, [search]);

    

    let getParameterByName = (name) => {
      var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    };

    return (
        <>
        <div className="flex flex-wrap justify-center">
							<div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
						</div>
        </>

    );
}
export default MedicineOrderPlaced;
