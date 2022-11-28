import React, { useState, useEffect } from "react";
import HIW from '../../components/HIW';
import Benefits from '../../components/benefits';
import Membership from '../../components/membership';
import Collapse from '../../components/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import noDataFound from "../../Assets/Images/No data-found.svg";

import AllSearchDoctors from '../../components/allSearchDoctors';
import AllSearchHospitals from '../../components/allSearchHospitals';
import AllSearchLabs from '../../components/AllsearchLabs';
import { useLocation, useHistory } from "react-router-dom";
import { gethospitallist } from '../../Redux/Actions/hospitalpageActions'

//const [isAdding, setIsAdding] = useState(-1);


import http from "../../Redux/services/http-common";

import { getDoctorslist } from '../../Redux/Actions/doctorAction';
import AllMedicine from '../../components/AllMedicine';
import axios from "axios";
function AllSearch() {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()
  const { data } = location;
  const { cartList } = useSelector((state) => state.cartReducer);

  const search = useSelector(state => state.authReducer.search);

  const search_params = useLocation().search;
  const search_query = new URLSearchParams(search_params).get('search_query');
  // const search_query = searchParams.get('search_query')
  console.log(search_query, "sdvshouvhrouvbhdbis")
  const hospitallist = useSelector((state) => state.hospitallist);
  const { hospitallistData, isLoading } = hospitallist;



  //   const lablistData = useSelector(state => state.listpartnerslab);
  // const { partnerlablisttData } = lablistData

  const doctorlist = useSelector((state) => state.doctorlist);
  const { doctorData } = doctorlist;

  const { coords} = useSelector(state => state.authReducer);

  console.log("search", search, "data", data)
  const [loading1, setLoading1] = useState(true)
  const [loading3] = useState(true)
  const [loading4, setLoading4] = useState(true);
  const [medicineSearch, setMedicineSearch] = useState([]);
  const [partnerlablisttData, setpartnerlablisttData] = useState([]);

  const fetchAll = () => {
    dispatch(getDoctorslist(coords, search_query ? search_query : "", 1, 20)).then(res => setLoading1(false)).catch(err => setLoading1(false));
    //dispatch(gethospitallist(coords, search_query ? search_query : "", 1, 20)).then(res => setLoading2(false)).catch(err => setLoading2(false));
    if (coords && search_query) {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${search_query}`
        )
        .then((res) => {
          setpartnerlablisttData(res.data);
        });
    }
  }
  useEffect(async () => {
    fetchAll();


    const response = await http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${search_query}`);

    setMedicineSearch(response.data);

    if (response.data.length === 0) {
      setLoading4(false);
      setMedicineSearch([]);
    } else {
      setLoading4(false);
      setMedicineSearch(response.data);

    }


  }, [search_query, sessionStorage.getItem('customPinCode')]);


  useEffect(() => {
    let customPinCode = sessionStorage.getItem('customPinCode')
    if (customPinCode) {

      dispatch(gethospitallist(coords, search_query ? search_query : "", 1, 20));
    }
  }, [sessionStorage.getItem('customPinCode'), search_query]);


  ///////////////add to cart functionality///

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location)
  }

  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientMedicineOrder) {
        for (const product of cartList.patientMedicineOrder) {
          if (product && product.patientMedicineOrderDetailsList) {
            for (const drug of product.patientMedicineOrderDetailsList) {
              ids.push(drug.drugCode);
            }
          }
        }
      }
    }
    console.log("Drug Info Ids", ids);
    return ids;
  }

  const drugIDsInCart = getProductsIDs();




  if (loading1 && loading3 && loading4) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
      </div>
    );
  }
  console.log(medicineSearch);
  return (
    <>

      {/* <ul className="lg:flex hidden text-gray-800 text-xs lg:text-xs  px-4 pt-5">
        <li className="inline-flex items-center">
          <a href="/">Home</a>
          <svg
            className="h-5 w-auto text-gray-800"
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
        <li className="inline-flex items-center cursor-pointer">
          <p>{'All Search'}</p>
        </li>
        <li className="inline-flex items-center cursor-pointer">
          <svg
            className="h-5 w-auto text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p>{data ? data : ''}</p>
        </li>

      </ul> */}

      
      { doctorData.length>0  &&
        <AllSearchDoctors data={doctorData} searchKey={search_query} isLoading={isLoading} />
      }

      
    
       { hospitallistData.length>0  &&
        <AllSearchHospitals data={hospitallistData} searchKey={search_query} isLoading={isLoading} />
       }

      
      

      {
        partnerlablisttData.length>0 &&
        <AllSearchLabs data={partnerlablisttData} isLoading={isLoading} />
      }
        
      

    
        <AllMedicine data={medicineSearch} isLoading={isLoading} />
      

      {
        doctorData?.length === 0 && hospitallistData?.length === 0 && partnerlablisttData?.length === 0 && medicineSearch.length === 0 &&
        <div className="w-full">
          <div className="flex flex-col items-center my-12">
            <img className="h-32 " src={noDataFound} alt="no data" />
            <p className="text-sm text-gray-400 font-semibold">No Search Result Found</p>
          </div>

        </div>
      }


      <Membership />
      <div className="lg:bg-white lg:rounded-3xl py-6 content-center my-10  justify-center">
        <HIW />
        <Benefits />
        <Collapse />
      </div>
    </>
  );
}
export default AllSearch;