/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Column } from "primereact/column";
import DatePicker from "react-datepicker";
import { DataTable } from "primereact/datatable";
import { SHA512 } from "crypto-js";
import http from "../Redux/services/http-common";

import ReportServices from "../Redux/services/reportServices";
import { ToastContainer, toast } from "react-toastify";
import comingsoon from '../Assets/Images/Ambulance-img.png';

const ComingSoon = (props) => {
  // const userData = useSelector((state) => state.authReducer.patientData);
  // const [serviceCatege, setServiceCategory] = useState([]);
  // const [totalAmount, setTotalAmout] = useState(0);
  // const [serviceData, setServiceData] = useState([]);
  // const [formData, setFormData] = useState({
  //     serviceCategory: 'Allied Service',
  //     description : '',
  //     amount: '',
  //     discount: 0,
  //     discountAmount : '',
  //     hospitalName: '',
  //     hospitalId : '',
  //     pickedDate : moment().format("DD/MM/YYYY")
  // });

  // const [billData, setBillData] = useState([]);

  // useEffect(() => {
  //   ReportServices.alliedService().then(res => {
  //     if(res?.data) {
  //       setServiceCategory(res.data.filter(i => i.name === 'Ambulance' || i.name === 'Physiotherapy'));
  //     } else {
  //       setServiceCategory([])
  //     }
  //   })
  // }, []);

  // const procseedClick = () => {
  //   const d = new Date();
  //   let tId = d.getTime().toString();
  //   let amount = totalAmount;

  //   var hashString = "7R4RJX1X" + "|" + tId + "|" + amount + "|" + "Allied Order" + "|" + userData?.firstName + "|" + userData?.email + "|" + "||||||||||" + "jBgXAUMvjJ";
  //   var hashed = SHA512(hashString, "HEX").toString();
  //   var pd = {
  //      key: "7R4RJX1X",
  //      txnid: tId,
  //      amount: amount,
  //      firstname: userData.firstName,
  //      email: userData.email,
  //      phone: userData.mobile,
  //      productinfo: "Allied Order",
  //      procedureStatus: 0,
  //      surl: "/",
  //      furl: "/",
  //      hash: hashed,
  //   };
  //   console.log(pd , "slvdsvkjvdsakjd");
  //   loadScript(pd);
  // }

  // function loadScript(pd) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = "https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js";
  //     script.id = "bolt";
  //     script.onload = () => {
  //       console.log(pd , "pd")
  //       redirectToPayU(pd);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  // const redirectToPayU = (pd) => {
  //   const amount = totalAmount;

  //   window.bolt.launch(pd, {
  //     responseHandler: function (result) {
  //       const { response } = result;
  //       let obj = {
  //         amount: response.amount ? response.amount : 0,
  //         createdBy: userData.code,
  //         email: userData.email,
  //         firstname: userData.firstName,
  //         hash: response.hash,
  //         modifiedBy: userData.code,
  //         patientId: userData.code,
  //         paymentMode: response.mode,
  //         payuMoneyId: response.mihpayid,
  //         phone: userData.mobile,
  //         productinfo: response.productinfo,
  //         remarks: "",
  //         status: 1,
  //         procedureStatus: 0,
  //         txnDate: moment().format("yyyy-MM-DD HH:mm:ss"),
  //         txnid: response.txnid,
  //       };
  //       http.post("PayUMoneyTransaction/", obj).then((result) => {
  //           redirectAfterTxn(response.txnid);
  //         }).catch((err) => {
  //           console.log("err", err);
  //         });
  //     },
  //     catchException: function (response) {
  //       console.log("error", response);
  //     },
  //   });
  // };

  // const redirectAfterTxn = async (txnid) => {

  // }

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //     if(e.target.name ==='description') {
  //         ReportServices.getAlliedServiceDetails(e.target.value).then((res) => {
  //           if(res?.data.length != 0) {
  //             setFormData({...formData,
  //               discount: res.data[0].discountPercentage,
  //               hospitalName : res.data[0].hospitalName,
  //               hospitalId : res.data[0].hospitalId,
  //               [e.target.name]: e.target.value
  //             });
  //             setServiceData(res?.data);
  //           } else {
  //             setFormData({
  //               serviceCategory: 'Allied Service',
  //               description : e.target.value,
  //               amount: '',
  //               discount: 0,
  //               discountAmount : '',
  //               hospitalName: '',
  //               hospitalId : '',
  //               pickedDate : moment().format("DD/MM/YYYY")
  //           });
  //             setServiceData(res?.data);
  //           }
  //         }).catch(err => {
  //           console.log(err);
  //         });
  //     }
  //  };

  // const getDisCount = () => {
  //    let disCountAmount;
  //        disCountAmount = formData.discount/parseInt(formData.amount) * 100;
  //     return parseInt(formData.amount) - disCountAmount;
  // }
  // const addData = () => {

  //    if(formData.amount === ""){
  //      toast('Please Enter the Amount');
  //    } else if(formData.hospitalName === "")  {
  //     toast('Please Select the Servivce Provider');
  //    } else {
  //      setFormData({...formData, description: '', amount : '', discount: '' , hospitalName: ''});
  //      setTotalAmout(totalAmount + getDisCount());
  //      setBillData([...billData, {
  //       serviceCategory : formData.serviceCategory,
  //       service:  formData.description,
  //       amount : formData.amount,
  //       discount: formData.discount,
  //       taxAmount : '',
  //       ServiceProvider : formData.hospitalName
  //    }
  // ]);
  //   }
  // }
  return (
    <div className="mt-10 lg:mt-10">
      <div className="flex flex-col md:flex bg-white  px-2 items-center pb-4 rounded-3xl border-2 border-gray-300 shadow-lg py-10 mx-3 lg:mx-28 mb-10">

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col justify-start ">
            <p className="font-medium text-brand-lightgreen  text-xl text-center">
              COMING SOON
            </p>
            <p className="text-lg text-brand-primary p-1  font-normal text-center">
            Thanks for your interest. We are working to bring this service soon. Stay safe, Stay healthy.
            </p>
          </div>
        </div>

        <div className="p-4 w-full lg:w-1/2 flex justify-center items-center">
          <img
            width="auto"
            height="auto"
            className=""
            src={comingsoon}
            alt="banner"
          />
        </div>


        {/* <div className="items-center bg-white md:mt-20 h-3/4 pt-6 w-full md:w-2/5 shadow-xl  rounded-lg ">
                    <div className="text-center  text-xl">
                        <p className="font-medium text-brand-primary">{'Get Notifed'}
                        </p>
                    </div>
                    <div className="mt-3 mx-6">
                        <hr />
                    </div>
                    <div className="flex flex-col w-full p-6">
                        <div className="pt-6">
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs  text-brand-manatee tracking-widest`}>{'Name '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs text-brand-manatee  tracking-widest`}>{'Mobile Number '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Mobile no"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs text-brand-manatee tracking-widest`}>{'Enter Email Id '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2">
                                <span className={` font-normal text-xs text-brand-manatee tracking-widest`}>{'Select Service which you wan to be notified'}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="email"
                                        id="sign-in-email-register"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Please Select"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={"flex flex-col"}>
                                    <div className="flex w-full mt-12">
                                        <button
                                            className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}>
                                            Notify Me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>

      {/* <div className="md:flex gap-8 pb-12 bg-white  px-2">
        <div className="items-center bg-white md:mt-20 h-3/4 m-8 pt-6 w-full md:w-full shadow-xl rounded-lg ">
          <div className="text-center  text-xl flex justify-end p-2">
            <button
              className="text-sm text-white bg-brand-secondary p-2"
              onClick={procseedClick}
            >
              {"Proceed to Pay"}{" "}
            </button>
          </div>
          <div className="mt-3">
            <hr />
          </div>
          <div className="grid grid-cols-4 mx-6 my-8 space-x-4">
            <div className="flex flex-col mb-6">
              <span
                className={` font-medium text-sm  text-brand-manatee tracking-widest`}
              >
                {"Service Category"}
              </span>
              <div className="flex mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  readonly
                  value={formData.serviceCategory}
                  className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                  placeholder="Enter Aliged Service"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span className={` font-medium text-sm  text-brand-manatee tracking-widest`}>{"Service Provider"} </span>
              <div className="relative w-full">
                <Dropdown
                  className="appearance-none border-b bg-white focus:outline-none w-full"
                  value={formData.description}
                  options={serviceCatege}
                  onChange={handleChange}
                  optionLabel="description"
                  optionValue="code"
                  filter
                  showClear
                  id="code"
                  name="description"
                  filterBy="description"
                  placeholder="Select Provider"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span className={` font-medium text-sm  text-brand-manatee tracking-widest`}>{"Service Provider"} </span>
              <div className="relative w-full">
                <Dropdown
                  className="appearance-none border-b bg-white focus:outline-none w-full"
                  value={formData.hospitalName}
                  options={serviceData}
                  onChange={handleChange}
                  optionLabel="hospitalName"
                  optionValue="hospitalName"
                  filter
                  showClear
                  id="code"
                  name="hospitalName"
                  filterBy="hospitalName"
                  placeholder="Select Service Provider"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span
                className={` font-medium text-sm  text-brand-manatee tracking-widest`}
              >{`Amount`}</span>
              <div className="flex mt-2">
              <input
                  autocomplete="off"
                  id="amount"
                  name="amount"
                  type="text"
                  value={formData.amount}
                  className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                  placeholder="Enter Amout"
                  onKeyPress={(event) => {
                    if(!/[0-9.]/.test(event.key)) {
                      event.preventDefault();
                      }
                    }}
                    onChange={handleChange}
                    onBlur={(e) => {
                      e.preventDefault();
                        setFormData({...formData, [e.target.name]: e.target.value});
                         let total;
                             total = parseInt(formData.amount) - (parseInt(formData.amount) * formData.discount/100);
                         setFormData({...formData, discountAmount: total})
                        }
                      }
                  />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span
                className={` font-medium text-sm  text-brand-manatee tracking-widest`}
              >{`Discount`}</span>
              <div className="flex mt-2">
                <input
                  type="number"
                  name="discount"
                  id="Amout"
                  readonly
                  value={formData.discount}
                  className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                  placeholder="Enter Amount"

                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span
                className={` font-medium text-sm  text-brand-manatee tracking-widest`}
              >{`Discount Amount`}</span>
              <div className="flex mt-2">
                <input
                  type="number"
                  name="discountAmount"
                  id="Amout"
                  readonly
                  value={formData.discountAmount}
                  className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <span
                className={` font-medium text-sm  text-brand-manatee tracking-widest`}
              >{`Date of Service`}</span>
               <DatePicker
                value={formData.pickedDate}
                onChange={(date) => {
                  setFormData({...formData, pickedDate : moment(date).format("DD/MM/YYYY")});
                }}
                className="mt-4 appearance-none text-sm  border-b  w-full  bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'"
                placeholderText="Pick Date"
              />
            </div>
          </div>
          <div className="mt-3 mx-4">
            <hr />
          </div>
          <div className="flex justify-end m-4 space-x-6">
                 <p>
                    Discount Amount: <span>{formData.discount}</span> INR
                </p>
                <p>
                  Payable Amount: <span>{totalAmount}</span> INR
                </p>
               <button className="bg-brand-secondary text-white px-8 py-1 ml-4" onClick={(e) => {addData(e)}}> Add </button>
          </div>
          <div className="mt-6 mx-3">
              <hr />
          </div>

          <div className="my-4 mx-2">
              <div className="card">
                <DataTable value={billData} responsiveLayout="scroll">
                     <Column field="serviceCategory" header="Service Category" sortable></Column>
                     <Column field="service" header="Service" sortable></Column>
                     <Column field="amount" header="Amount" sortable></Column>
                     <Column field="discount" header="Discount(%)" sortable></Column>
                     <Column field="discountAmount" header="Discount Amount" sortable></Column>
                     <Column field="ServiceProvider" header="SERVICE PROVIDER/DOCTOR" sortable></Column>
                </DataTable>
            </div>
          </div>
          {/* <div className="flex flex-row w-full p-6">
                        <div className="pt-6">
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs  text-brand-manatee tracking-widest`}>{'Name '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs text-brand-manatee  tracking-widest`}>{'Mobile Number '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Mobile no"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <span className={` font-normal text-xs text-brand-manatee tracking-widest`}>{'Enter Email Id '}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2">
                                <span className={` font-normal text-xs text-brand-manatee tracking-widest`}>{'Select Service which you wan to be notified'}
                                    <span className="text-brand-star">*</span>
                                </span>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="email"
                                        id="sign-in-email-register"
                                        className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'}`}
                                        placeholder="Please Select"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={"flex flex-col"}>
                                    <div className="flex w-full mt-12">
                                        <button
                                            className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}>
                                            Notify Me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
      {/* </div>
     </div> */}
      {/* breadcrumbs */}
      {/* <ul className="flex text-brand-secondary text-sm lg:text-base py-5">
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
                    <a href="/components">Health Services</a>
                </li>
            </ul> */}
    </div>
  );
};

export default ComingSoon;
