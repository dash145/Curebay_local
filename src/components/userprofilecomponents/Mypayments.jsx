import Userprofilesidebar from '../userprofilesidebar';
import FamilyDropdown from './FamilyDropDown';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { patientpaymentdetails } from '../../Redux/Actions/UserprofileActions';
import moment from 'moment';
import { getPaymentListDetails } from '../../Redux/Actions/payment';
import CancelPayment from '../Notifications/cancelPayment';
import ViewPaymet from '../Notifications/viewPayment';
import DownloadRecipt from '../Notifications/downloadRecipt';
import { XIcon } from "@heroicons/react/outline";
import http from '../../Redux/services/http-common';
import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'

function Mypayments() {

    const dispatch = useDispatch();
    const patientCode = useSelector(state => state.authReducer.patientCode)
    //   const userData = useSelector((state) => state.authReducer.patientData);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);
    const [paymentList, setPaymentList] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selection, setSelection] = useState(null);
    const [showView, setShowView] = useState(false);
    const [showRecept, setShowRecept] = useState(false);
    const [selectTrans, setSelectTrans] = useState(null);
    const [selectAll, setSelectAll] = useState(null);


    useEffect(() => {
        dispatch(patientpaymentdetails(patientCode));
    }, [patientCode]);

    let params = {
        status: 1,
        patientId: patientCode
    }
    useEffect(() => {
        dispatch(getPaymentListDetails(params));
        initFilters1();
    }, []);

    const patientpaymenthistorylist = useSelector((state) => state.paymentListReducer);
    let { isLoading, paymentData, isError } = patientpaymenthistorylist;

    console.log("payment data", JSON.stringify(paymentData));
    useEffect(() => {
        if (Array.isArray(paymentData)) {
            let data = paymentData.map(item => {
                if (item.totalAmount) {
                    item.paymentDateTime = moment(item.paymentDateTime).format("DD-MM-YYYY hh:mm A")
                    return { ...item, totalAmount: item.totalAmount.toFixed(1) }
                } else {
                    item.paymentDateTime = moment(item.paymentDateTime).format("DD-MM-YYYY hh:mm A")
                    return item
                }
            })
            setPaymentList(data);
        }
    }, [paymentData]);


    // useEffect(() => {

    //     const locationid = localStorage.getItem("locationid");
    //     const access_token = localStorage.getItem("access_token");

    //     console.log("locationid", access_token);


    //     let loginObj = JSON.parse(localStorage.getItem("loginObj"));
    //     delete loginObj.menus;
    //     delete loginObj.userSession;
    //     delete loginObj.hospitalLocation;
    //     loginObj = JSON.stringify(loginObj);

    //     // let patient = localStorage.getItem("activePatient");
    //     // if (patient) {
    //     //   const patientArr = JSON.parse(patient);
    //     //   patient = patientArr.code;
    //     // }

    //     var apiUrl = 'MMI/accesstoken'
    //     http.get(apiUrl).then(async (response) => {
    //         let data = response.data;

    //         let url = process.env.REACT_APP_USER_BASEURL + `che/patient-billing?from=react&styleType=2&loginObj=${loginObj}&menu=0&locationid=${"LOC_GOP"}&access_token=${data.access_token}` + (patientCode ? `&patient=${patientCode}&hideMenu=${true}` : ``);
    //        // setUrl(url);

    //         console.log("res kkkkk", url)

    //     });


    //     console.log('isssssss',url);
    //   });

    console.log("payment list", paymentList);

    const cancelPayment = (rowData) => {
        return (
            <span><button className='text-brand-secondary' onClick={onButtonCancelClick}>click</button></span>
        )
    }
    const onButtonCancelClick = () => {
        setShowFilter(true);
    }
    const closeFilter = () => {
        setShowFilter(false);
    }

    const openRecept = () => {
        setShowRecept(true);
    }

    const viewPayment = () => {
        // setShowView(true);
    }

    const onSelectionChange = (e) => {
        console.log(e, "dsoivnodvnfovodsif")
        // const value = e.value;
        setSelectTrans(e)
        setShowView(true);
    }

    const onSelectAllChange = (e) => {

    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'serviceName': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'txnId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'patientName': { value: null, matchMode: FilterMatchMode.IN },
            'paymentDateTime': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'totalAmount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue1('');
    }

    const loadPaymentFor = (patient) => {
        let params = {
            status: 1,
            patientId: patient
        }
        patientpaymentdetails(patient)
        dispatch(getPaymentListDetails(params));
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} /> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

   console.log("payment list", paymentList);


    return (
        <>
            {showFilter && (
                <CancelPayment
                    onClose={closeFilter}
                    closePopup={closeFilter}
                />
            )}
            {showView && (
                <ViewPaymet
                    onClose={() => { setShowView(false); setSelectTrans(null) }}
                    closePopup={() => { setShowView(false); setSelectTrans(null) }}
                    selection={selectTrans}
                    openRecept={openRecept}
                />
            )}
            {showRecept && (
                <DownloadRecipt
                    onClose={() => { setShowRecept(false); setSelectTrans(null) }}
                    closePopup={() => { setShowRecept(false); setSelectTrans(null) }}
                    selection={selectTrans}
                />
            )}
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base my-8">
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
                    <a>My payments</a>

                </li>

            </ul>

            <div className="flex justify-around " style={{ background: "#F8F8F8" }}>
                <div className="lg:block hidden w-3/12 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>



                <div className="lg:w-7/12 xl:w-8/12 w-full ">

                    <p className="font-bold text-2xl mt-4 mb-6">My Payments</p>

                    <div className="bg-white border border-gray-200 overflow-x-scroll hide-scrollbar">

                    <div className='pl-6'>
                    <FamilyDropdown title={'Get Payments For'} onSelect={loadPaymentFor} />

                    </div>
                        <div className="flex w-full flex-col">
                            <div className="">


                                <div className="py-2 md:ml-6 mb-10 align-middle inline-block ">


                                    <hr classname="border-dash text-black w-10 mt-2 h-20"></hr>
                                    {/* <div className="lg:h-96 lg:w-full">
                                        <DataTable responsiveLayout="scroll" value={paymentList}
                                            onSelectionChange={(e) => onSelectionChange(e)}
                                            onSelectAllChange={onSelectAllChange}
                                            selectionMode="single"
                                            selection={selectTrans}
                                            stripedRows
                                            filterDisplay="menu"
                                            filters={filters1}
                                            header={renderHeader}
                                            globalFilterFields={['serviceName', 'txnId', 'patientName', 'totalAmount', 'paymentDateTime']}
                                            selectAll={selectAll}
                                            loading={isLoading}
                                            scrollable
                                            scrollHeight='300px'
                                            scrollDirection="both"
                                            breakpoint='786px'>
                                            <Column field="serviceName" header="Transaction Type" style={{ width: '14rem', justifyContent: "center"}}></Column>
                                            <Column className="" field="txnId" header="Transaction ID" style={{ width: '14rem', justifyContent: "center" }}></Column>
                                            <Column field="patientName" header="Patient Name" style={{ width: '14rem', justifyContent: "center" }}></Column>
                                            <Column field="totalAmount" header="Total Amount" style={{ width: '14rem', justifyContent: "center" }}></Column>
                                            <Column field="{moment(paymentDateTime).format('DD/MM/yyyy')}" header="Date of Payment" style={{ width: '14rem', justifyContent: "center" }}></Column>

                                        </DataTable>





                                </div> */}


                                    <div className="md:shadow w-full block md:block border-b border-gray-200 sm:rounded-lg mb-8 ">
                                        <hr classname="hidden border-dash text-black w-10 mt-4 h-20 my-2"></hr>
                                        <div className="h-full md:h-96 w-full md:mx-1 overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 ">
                                            <table className="max-w-full h-full  md:h-28 md:divide-y md:divide-gray-200 table">
                                                <thead className="bg-gray-50  ">
                                                    <tr>

                                                            {/* <input type="radio" class="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-6 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                                            >
                                                                Transaction Type
                                                            </th>



                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                                        >
                                                            Transaction ID

                                                        </th>

                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                                        >
                                                            Patient Name

                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                                        >
                                                            Total Amount

                                                        </th>

                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                                        >
                                                            Date of Payment

                                                        </th>


                                                    </tr>
                                                </thead>
                                                <tbody className="md:divide-y divide-gray-200">
                                                    {paymentList.map((lab, i) => (
                                                        <tr key={i} onClick={() => onSelectionChange(lab)} className="cursor-pointer">
                                                            <td data-label="Transaction Type" className="md:px-6 md:py-6 md:whitespace-nowrap" >
                                                                <div className="flex items-center">
                                                                    <div className=" flex md:space-x-2">
                                                                        <div className="text-xs font-normal text-black  break-all">
                                                                            {lab.serviceName}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td data-label="Transaction ID" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                                                <div className="flex md:justify-center text-xs  break-all">
                                                                    {lab.txnId}
                                                                </div>
                                                            </td>
                                                            <td data-label="Patient Name" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                                                <div className="flex md:justify-center text-xs break-all">
                                                                    {lab.patientName}
                                                                </div>
                                                            </td>
                                                            <td data-label="Total Amount" className="md:text-center md:px-6 md:py-6 md:whitespace-nowrap">
                                                                <div className=' text-xs  break-all'>{lab.totalAmount}</div>
                                                            </td>

                                                            <td data-label="Document Title" className="md:text-center md:px-6 md:py-6 md:whitespace-nowrap">
                                                                <div className=' text-xs  break-all'>{getLocalTime(lab.createdDate)}</div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Mypayments;
