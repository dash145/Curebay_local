import Userprofilesidebar from '../userprofilesidebar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { walletdetails, walletTransactiondetails } from '../../Redux/Actions/UserprofileActions';

import userprofileservice from '../../Redux/services/userprofileservice';

import FilterListIcon from '@mui/icons-material/FilterList';
import DatePicker from "react-datepicker";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { getLocalTime } from '../../Assets/utils/LocalTimeFormat'

import patientwalletinfoReducer from '../../Redux/Reducers/patientwalletinfoReducer';
import Wallettransaction from './Wallettransaction';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";




function Mywallet() {


  const dispatch = useDispatch();
  const [filterPopup, setFilterPopup] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transactionList, setTransactionList] = useState([]);

  const [walletTransactionList, setWalletTransactionList] = useState([]);

  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  const [filters1, setFilters1] = useState(null);

  const [selectTrans, setSelectTrans] = useState(null);
  const [showView, setShowView] = useState(false);

  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [selectAll, setSelectAll] = useState(null);

  const openFilter = (e) => {
    console.log(e);
    setFilterPopup(true);

    setfromDate("")
    settoDate("")
    setTransactionId("")
  };

  const onHide = (name) => {
    console.log(name);
    setFilterPopup(false);
  };


  useEffect(() => {
    if (Array.isArray(transactionList)) {
      let data = transactionList.map(item => {
        if (item.amount) {
          item.createdOn = getLocalTime(item?.createdOn)
          return { ...item, amount: item.amount.toFixed(1) }
        } else {
          item.createdOn = getLocalTime(item?.createdOn)
          return item
        }
      })
      setWalletTransactionList(data);
      initFilters1();
    }
  }, [transactionList]);

  const onSelectionChange = (e) => {
    console.log(e, "dsoivnodvnfovodsif")
    // const value = e.value;
    setSelectTrans(e.value)
    setShowView(true);
  }

  const onSelectAllChange = (e) => {

  }

  console.log("transactionList", transactionList);

  const initFilters1 = () => {
    setFilters1({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'transactionId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'status': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'transactionType': { value: null, matchMode: FilterMatchMode.IN },
      'amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      'modifiedOn': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    setGlobalFilterValue1('');
  }

  const clearFilter1 = () => {
    initFilters1();
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1['global'].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  }

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        <Button type="button" label="Clear" className="w-8/12 md:w-max p-button-outlined" onClick={clearFilter1} />
        <span className="p-input-icon-left w-min md:w-max">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue1} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    )
  }

  const filterData = (name) => {

    if (fromDate.length > 0 && toDate.length == 0) {
      return
    }
    console.log(name);
    setFilterPopup(false);
    if (transactionId.trim().length == 0 && toDate.length == 0 && fromDate.length == 0) {
      setTransactionList(walletinfo.walletTransactiondetails)
      return
    }

    if (transactionId.trim().length != 0 && toDate.length == 0 && fromDate.length == 0) {
      const filtered = transactionList.filter(item => { return item.transactionId === transactionId; });
      setTransactionList(filtered)
      return
    }

    // if (transactionId.trim().length == 0 && toDate.length != 0 && fromDate.length != 0) {
    //   const filtered = transactionList.filter(item => { return item.toDate === toDate,item.fromDate === fromDate; });
    //   setTransactionList(filtered)
    //   return
    // }

    if (transactionId.trim().length == 0 && toDate.length != 0 && fromDate.length != 0) {
      console.log(fromDate, transactionList, "filteredArr", toDate);

      let filteredArr = []
      transactionList?.map(el => {
        let tempdate = el.modifiedOn
        let dateSlice = tempdate.substring(0, 10)

        //  console.log("filteredArr", dateSlice, dateSlice>fromDate && dateSlice<toDate, dateSlice>fromDate , dateSlice<toDate);

        if (dateSlice >= fromDate && dateSlice <= toDate) {
          // console.log("filteredArr",fromDate<dateSlice<toDate);
          filteredArr.push(el)
        }
      })
      console.log(filteredArr, "filteredArr");
      setTransactionList(filteredArr)


      // const filtered = transactionList.filter(item => { return item.toDate === toDate,item.fromDate === fromDate; });
      // setTransactionList(filtered)
      return
    }




    // setTransactionId("")
  };


  const loadWalletTransactions = (payload) => {
    userprofileservice.getpatientwalletTransactiondetails(payload).then(
      (res) => {
        console.log(res);
        setFilterPopup(false);
        if (res.data) {
          setWalletTransactionList(res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };



  const okFilter = (e) => {
    console.log("Filter Click");
    let payload = {};
    if (fromDate) {
      payload.fromDate = fromDate;
    }
    if (toDate) {
      payload.toDate = toDate;
    }
    
    loadWalletTransactions(payload);

    setfromDate("")
    settoDate("");
    
  };







  const handleChange = (e) => {
    // alert(e.target.value)
    setTransactionId(e.target.value)
  }

  const renderFooter = (name) => {
    return (
      <div>
        <button
          onClick={() => onHide(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Cancel
        </button>

        <button
          onClick={() => okFilter(name)}

          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Ok
        </button>
      </div>
    );
  };


  const userData = useSelector(state => state.authReducer.patientData)
  console.log("patient code", userData.code)




  useEffect(() => {
    dispatch(walletdetails(userData.code));
    dispatch(walletTransactiondetails(userData.code));
    // debugger
  }, [userData.code]);

  const walletinfo = useSelector((state) => state.patientwallet);
  console.log("zzzz", walletinfo);



  // const walletTransactioninfo = useSelector((state) => state.patientwallet);
  // console.log("yyyyyy", walletTransactioninfo);

  useEffect(() => {
    setTransactionList(walletinfo.walletTransactiondetails)
  }, [walletinfo]);


  const changeDate = (e) => {
    // setaddlist({ ...addlist, ["fromDate"]: moment(e).format("MM/DD/yyyy") });
    setfromDate(moment(e).format("yyyy-MM-DD"))
    settoDate("")

  }
  const changeToDate = (e) => {

    if (fromDate.length == 0) {
      alert('Please select To Date')
      return
    }
    //setaddlist({ ...addlist, ["toDate"]: moment(e).format("MM/DD/yyyy") });
    settoDate(moment(e).format("yyyy-MM-DD"))
  }

  return (
    <>
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mt-8 mb-2">
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
          <a href="/profile/mydetails">Profile</a>
          <svg
            className="h-5 w-auto ttext-brand-secondary"
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
          <a>CureBay Wallet</a>

          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>

        </li>

      </ul>
      <br />

      <div className="lg:flex justify-between" style={{ background: "#F8F8F8" }}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>


        <div className="block w-full lg:w-8/12 mr-12 text-medium font-medium   ">

          <p className="mt-8 mb-4 font-bold text-2xl">CureBay Wallet</p>

          <div className="bg-white px-2 md:px-10 pb-5 border boder-gray-200">

            <div className="flex flex-wrap gap-8 md:gap-28 mt-8 text-xl">
              <h3 className="text-sm font-bold">Balance: <span className="text-gray-500 font-normal " style={{ fontFamily: "Segoe UI" }}>Rs.{walletinfo?.patientwalletinfoData?.balance && walletinfo?.patientwalletinfoData?.balance.toFixed(2)}</span></h3>
              <h3 className="text-sm font-bold">Bonus: <span className="text-gray-500 font-normal" style={{ fontFamily: "Segoe UI" }}>Rs.{walletinfo?.patientwalletinfoData?.bonus && walletinfo?.patientwalletinfoData?.bonus.toFixed(2)}</span></h3>
              <h3 className="text-sm font-bold">Total: <span className="text-gray-500 font-normal" style={{ fontFamily: "Segoe UI" }}>Rs.{walletinfo?.patientwalletinfoData?.totalAmount && walletinfo?.patientwalletinfoData?.totalAmount.toFixed(2)}</span></h3>
            </div>

            <div className="flex text-lg  font-bold justify-between mt-10 ">
              <h3 className="ml">Wallet Transactions</h3>
              {/* <div
                onClick={(e) => openFilter(e)}
                className="text-white bg-brand-lightgreen rounded-md px-2 cursor-pointer hover:border-solid border-2 border-brand-lightgreen hover:bg-white hover:text-brand-primary"><FilterListIcon /></div> */}
              {/* <div onClick={(e) => openFilter(e)} className=" flex justify-center bg-brand-secondary  rounded items-center text-white mx-2 h-9 w-9 cursor-pointer">
                <FontAwesomeIcon icon={faFilter} />
              </div> */}
            </div>

            {/* <div className=" border border-gray-300  my-10  p-4 mx-12 rounded-lg h-full md:h-80 w-11/12 md:mx-1 overflow-x-auto overflow-y-scroll overflow-x-scroll scrollbar-hide"> */}

            <div className=" border border-gray-200 sm:rounded-lg my-8">
              {/* <hr className="hidden md:blockborder-dash text-black w-100 mt-4 h-120 my-2"></hr> */}
              {/* <div className="h-full md:h-80 w-full md:mx-1  overflow-x-scroll overflow-y-scroll">
              <table class="justify-between text-center text-base">
                <thead className="">
                  <tr className="">
                    <th className="pr-3 font-medium  text-gray-700 mt-3 w-1/6">Transaction ID</th>
                    <th className="pr-3 font-medium  text-gray-700 mt-3 w-1/6">Status</th>
                    <th className="pr-3 font-medium  text-gray-700 mt-3 w-1/6">Transaction Type</th>
                    <th className="pr-3 font-medium  text-gray-700 mt-3 w-1/6">Amount</th>
                    <th className="pr-3 font-medium  text-gray-700 mt-3 w-1/6">Transaction Date</th>
                    <th className="font-medium  text-gray-700 mt-3 w-1/6">Description</th>
                  </tr>
                </thead>


                {transactionList.map((user, i) => {

                  return (

                    <tbody key={i}>

                      <tr className="text-sm text-gray-500">
                        <td className="pt-3 w-1/6">{user.transactionId.toUpperCase()}</td>
                        <td className="pt-3 w-1/6">{user.status}</td>
                        <td className="pt-3 w-1/6">{user.transactionType}</td>
                        <td className="pt-3 w-1/6">{user.amount && user.amount.toFixed(2)}</td>
                        <td className="pt-3 w-1/6">{user.modifiedOn}</td>
                        <td className="pt-3 w-1/6">{user.description}</td>
                      </tr>

                    </tbody>


                  )
                })}
              </table>
            </div> */}


              <div className="lg:h-96 lg:w-full">
                <DataTable responsiveLayout="scroll" value={walletTransactionList}
                  onSelectionChange={(e) => onSelectionChange(e)}
                  onSelectAllChange={onSelectAllChange}
                  selectionMode="single"
                  selection={selectTrans}
                  stripedRows
                  filterDisplay="menu"
                  filters={filters1}
                  header={renderHeader}
                  globalFilterFields={['transactionId', 'status', 'transactionType', 'amount', 'createdOn', 'description']}
                  selectAll={selectAll}
                  // loading={isLoading}
                  scrollable
                  scrollHeight='300px'
                  scrollDirection="both"
                  breakpoint='786px'>
                  {/* <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column> */}
                  <Column field="transactionId" header="Transaction ID" style={{ width: '14rem', justifyContent: "center" }}></Column>
                  <Column field="status" header="Status" style={{ width: '10rem', justifyContent: "center" }}></Column>
                  <Column field="transactionType" header="Transaction Type" style={{ width: '10rem', justifyContent: "center" }}></Column>
                  <Column field="amount" header="Amount" style={{ width: '10rem', justifyContent: "center" }}></Column>
                  <Column field="createdOn" header="Date" style={{ width: '10rem', justifyContent: "center" }}></Column>
                  <Column field="description" header="Description" style={{ width: '22rem', justifyContent: "center" }}></Column>
                  {/* <Column field="download" header="" style={{ width: '10rem', justifyContent: "center" }} body = {<h1 className='cursor-pointer'>Download</h1>} ></Column> */}
                  {/* <Column field="cancel" header="Cancel Payment" style={{ width: '10rem', justifyContent: "center" }} body={cancelPayment}></Column> */}
                  {/* <Column field="quantity" header="View" style={{ width: '10rem' }}></Column> */}
                </DataTable>
              </div>

            </div>

          </div>



        </div>


      </div>

      {filterPopup && (
        <Dialog
          header="Filter"
          visible={filterPopup}
          modal={false}
          resizable={false}
          draggable={false}
          // style={{ width: "50vw", height: "auto" }}
          className="w-11/12 md:w-8/12 lg:w-2/5 h-auto lg:h-5/6"
          footer={renderFooter("displayModal")}
          onHide={() => onHide("displayModal")}
        >
          <p className="p-m-0 lg:-mt-2">
            <div className="lg:flex lg:justify-center pt-0 ">
              <div className="lg:w-10/12">
                <div className="flex flex-col md:flex-row justify-between lg:pt-1 mt-5 lg:space-x-10 ">

                  {/* <div className="relative w-full md:w-3/12 lg:w-4/12 mb-5">
                    <label
                      for="orderId"
                      className="left-0 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Transaction ID
                    </label>
                    <input
                      autocomplete="off"
                      id="orderId"
                      name="orderId"
                      type="text"
                      value={transactionId}
                      className={
                        "peer -mx-1 w-full h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }
                      placeholder="Transaction ID"
                      onChange={handleChange}
                    />
                  </div>

                  <p className="mt-5 px-10">OR</p> */}

                  <div className="relative w-full md:w-3/12 lg:w-4/12 mb-5">
                    <label
                      for="fromDate"
                      className="left-0 text-gray-600 ml-1 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      From Date
                    </label>

                    <DatePicker
                      id="fromDate"
                      name="fromDate"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      value={fromDate}
                      onSelect={changeDate}
                      disabledKeyboardNavigation={true}
                      autoFocus={false}
                      autoComplete="off"
                      placeholderText="From Date"
                      className={
                        "peer ml-1 w-full  h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }

                    />
                  </div>

                  <div className="relative w-full md:w-3/12 lg:w-4/12 mb-5">
                    <label
                      for="toDate"
                      className="left-0 text-gray-600 ml-1 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      To Date
                    </label>

                    <DatePicker
                      id="toDate"
                      name="toDate"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      minDate={new Date(fromDate)}
                      dateFormat="dd/MM/yyyy"
                      value={toDate}
                      autoComplete="off"
                      onSelect={changeToDate}
                      maxDate={new Date()}
                      disabledKeyboardNavigation={true}
                      autoFocus={false}
                      placeholderText="To Date"
                      className={
                        "peer ml-1 w-full h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }
                    />


                    {fromDate.length > 0 && toDate.length == 0 &&
                      <label
                        for="toDate"
                        className="left-0 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Please select To Date
                      </label>
                    }
                  </div>


                </div>


              </div>
            </div>
          </p>
        </Dialog>
      )}

    </>
  )
}
export default Mywallet;
