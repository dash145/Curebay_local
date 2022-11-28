import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import userprofileService from '../Redux/services/userprofileservice'
import {
  getAllProductByIds} from "../Redux/Actions/pharmacyAction";
import { AddtoCart } from "../Redux/Actions/cartPlaceOrderAction";
import DiagnosticService from "../Redux/services/CartPlaceService";

function PrescriptionUploaded() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);


  const patientPrescriptions = useSelector(
    (state) => state.patientpriscriptionlist
  );

  const [openList, setOpenList] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [VisitId, setVisitId] = useState("");

  const [isAdding, setIsAdding] = useState(-1);

  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [prescribedList, setPrescribedList] = useState();
  const [selectedItem, setSelectedItem] = useState([]);


  const [drugList, setDrugList] = useState([]);
  const [selectedDrugItem, setSelectedDrugItem] = useState(null);

  // const medicineList = useSelector(
  //   (state) => state.
  // );

  const { cartList } = useSelector((state) => state.cartReducer);

  const [showFilter, setShowFilter] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loading , setLoading] = useState({
    loadingSelectedPrescription: false,
    loadingAddedTocart: false,
    addToCartMessage:"",
    errorinSelectedPrescription: false,
    errorMessageforSelectedPrescription: "",
    errorinAddingtoCart: false,
    errorMessageWhenAddingToCart: ""

  })
  const [disable, setDisable] = useState(false);

  const pharmaProductsList = useSelector(
    (state) => state.particularPharmacy.particularPharma
  );

  const { name, storeId, locationId, isPOS, ePrescription } = {}

  const [checkedbox, setCheckedbox] = useState([]);
  const [cartData, setCartData] = useState({
    medicines: [],
    labtest: []
  });

  // const [checked1, setChecked1] = useState(true);
  var checked = prescribedList

  const handleChange = (res, index, type, e) => {
    console.log(type , "dljvbweojv")
    if(type == "medicines"){
      if(e.target.checked){
        if(cartData?.medicines?.length){
          setCartData({
            medicines: [...cartData.medicines , res] , labtest: [...cartData?.labtest]})
        } else{
          setCartData({
              medicines: [res] , labtest: [...cartData?.labtest]}
          )
        }
      } else if(!e.target.checked){
        let data = cartData.medicines.filter(item => item.id !== res.id)
        setCartData({
          medicines: [...data] , labtest: [...cartData?.labtest]})
      }
    } else{
      if(type == "labtest"){
        if(e.target.checked){
          if(cartData?.labtest?.length){
            setCartData({
              labtest: [...cartData.labtest , res] ,  medicines: [...cartData?.medicines]})
          } else{
            setCartData({
              medicines: [...cartData?.medicines] , labtest: [res]
            })
          }
        } else if(!e.target.checked){
          let data = cartData.labtest.filter(item => item.id !== res.id)
          setCartData({
            labtest: [...data] , medicines: [...cartData?.medicines]})
        }
      }
    }


  }


  // const handleChange1 = () => {
  //   setChecked1(!checked1);
  // };

  // const onSearch = () => {
  //   let payload = {
  //     // storeId: storeId,
  //     // locationId: locationId,
  //     drugsInfoMedicineName: text,
  //     status: 1
  //   }
  //   dispatch(getParticularPharmacy(payload)).then((res) => {
  //     console.log(res);
  //   })
  // };


  const redirectTo = (e, data) => {
    e.preventDefault();
    history.push(data);
  };

  const redirectToQuote = (event, location, data) => {
    console.log(data, location)
    event.preventDefault();
    history.push(
      location,
      data);
  };
  const ViewPrescription = (res) => {
    console.log(res);
    if (res.visitId !== 0) {
      setVisitId(res.prescription.visitId);
      setOpen(true);
    }

  };

 console.log("dljvbweojv",cartData);

  useEffect(() => {
    loadPrescriptions(1);
  }, [dispatch, userData.code]);


  const loadPrescriptions = (selectPrevDate) => {
    setIsLoading(true)
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let now = new Date();
    let backdate = 0;
    let payload = {}
     if(selectPrevDate == 1){
      backdate = new Date(now.setDate(now.getDate() - 30));
    } else if(selectPrevDate == 2){
      backdate = new Date(now.setDate(now.getDate() - 60));
    } else if(selectPrevDate == 3){
      backdate = new Date(now.setDate(now.getDate() - 90));
    } 
    if(selectPrevDate == 0){
      payload = {
        patientId: userData.code,
        visitSummary: 'Y',
        status: 1,
        documentRequired: 'Y'
      }
    } else{
      payload = {
        patientId: userData.code,
        visitSummary: 'Y',
        status: 1,
        fromDate: moment(backdate).format("MM/DD/yyyy"),
        toDate: moment(Date.now()).format("MM/DD/yyyy"),
        documentRequired: 'Y'
      }
    }
    
    console.log(payload)
    userprofileService.getmypriscription(payload).then((res) => {
      if (res.data) {
        console.log(res.data);
        setPrescriptionsList(res.data);
      }
      setIsLoading(false)
    },
      (err) => {
        console.log('Error : ' + JSON.stringify(err));
        setIsLoading(false)
      });
  }

  const handleDateSelectDate = (e) =>{
    loadPrescriptions(e.target.value)
  }

  const prescriptionSelected = async (data) =>{
    console.log(data , 'dssdiovvdshiosdiovhdipv');
    setSelectedDrugItem(data.id)
    setLoading({
      loadingSelectedPrescription: true,
    loadingAddedTocart: false,
    addToCartMessage:"",
    errorinSelectedPrescription: false,
    errorMessageforSelectedPrescription: "",
    errorinAddingtoCart: false,
    errorMessageWhenAddingToCart: ""
    })
    console.log(data , "dslcnobewobeo")
    let prescribedItems = {
      medicines:[],
      labtest:[]
    };

    if(!data.patientDrugPrescriptionList?.length && !data?.patientLabTestsList?.length){
      setSelectedDrugItem(null)
      setLoading({
        loadingSelectedPrescription: false,
        errorinSelectedPrescription: true,
        errorMessageforSelectedPrescription: "No Data found",

      })
      return
    }

    if(data.patientDrugPrescriptionList?.length){
      let medicineCode = data.patientDrugPrescriptionList.map(drug =>{ return drug.drugCode});
      var raw = JSON.stringify(medicineCode);



      await dispatch(getAllProductByIds(raw)).then((res) => {
        data.patientDrugPrescriptionList.map(item =>{
          let data = res.find(item1 => item1.id == item.drugCode);
            console.log(data , "dsvsdoivdsovds");
            data.quantity = item.quantity
            data.drugsInfoMedicineName = item.drugName
            data.drugsInfoPrescription = item.medicineType == "Rx" ? "Yes" : "No"
            data.docName = item.docName
            prescribedItems.medicines.push(data)
            console.log(data , "Sfasasfaosda" , item)
            setSelectedDrugItem(null)
            setLoading({
              loadingSelectedPrescription: false,
              errorinSelectedPrescription: false,
              errorMessageforSelectedPrescription: "",

            })
        })
      }).catch(err =>{
        setSelectedDrugItem(null)
        setLoading({
          loadingSelectedPrescription: false,
          errorinSelectedPrescription: true,
          errorMessageforSelectedPrescription: "Medicines are not available",

        })
      })
    } else{
      setLoading({
        loadingSelectedPrescription: false,
        errorinSelectedPrescription: false,
        errorMessageforSelectedPrescription: "",

      })
    }

    // console.log("medicine list", patientDrugPrescriptionList);

    data?.patientLabTestsList?.map(item =>{
      prescribedItems.labtest.push(item)
    });

    if(prescribedItems?.medicines?.length || prescribedItems?.labtest?.length){
      setPrescribedList(prescribedItems);
    }

  }




  const convertToLocalTime = (date) => {
    const format = 'MM/DD/YYYY HH:mm'; // YYYY-MM-DD hh:mm:ss
    const localTime = moment.utc(date).toDate();
    return moment(localTime).format(format);
  }

  // if (prescriptionsList.length == 0 && !isLoading) {
  //   return <div className="h-96 flex justify-center items-center" >
  //     <h2>No E-Prescription Found.</h2>
  //   </div>
  // }

  const addtoCart = (e) => {
    e.preventDefault();
    console.log(drugList , "dljvbweojv" , cartData )
    setLoading({
      loadingAddedTocart: true,
      errorinAddingtoCart: false,
      errorMessageWhenAddingToCart: "",
      addToCartMessage: ""

    })
    // let filterData = drugList.filter(res => {return  cartData.find(res1 => res1 == res.productId)})
    // console.log('filterData ', filterData);

    let dataObj = [];
    let isAdded = false;
    let doc = prescribedList?.medicines?.filter(item => item.docName != null)
    console.log(doc, "sdvdishvods");
    if(!doc?.length){
      setLoading({
        loadingAddedTocart: false,
        errorinAddingtoCart: true,
        errorMessageWhenAddingToCart: "e-prescription document is not present. Please contact curebay support",
  
      })
          let timeout = setTimeout(() => {
        setLoading({
          loadingAddedTocart: false,
          errorinAddingtoCart: false,
          errorMessageWhenAddingToCart: "",
      
        })
        clearTimeout(timeout)
      },2000)
    }
    cartData?.medicines?.map((data, index)=>{

      setIsAdding(index);
      console.log("index", index);
      console.log(ePrescription, data, "afjkaskjvwekvesvew")

      let prescriptionRequired = 'N';
      let ePrescriptionRequired = 'Y';
      // if (data?.drugsInfoPrescription == 'No') {
      //         prescriptionRequired = 'N';
      //         ePrescriptionRequired = 'N';
      // } else if (data?.drugsInfoPrescription == 'Yes') {
      //   prescriptionRequired = 'Y';
      //   ePrescriptionRequired = 'Y';
      // }
      const totalAmount = data.medicineRate * data.quantity;
      console.log('totalAmount', cartList);
      if (cartList && cartList?.patientMedicineOrder?.length) {
        console.log("Enter")
        cartList.patientMedicineOrder.forEach((element) => {
          element.patientMedicineOrderDetailsList.push({
            drugCode: data.id,
            drugName: data.drugsInfoMedicineName,
            unitPrice: data.medicineRate,
            discountAmount: 0.00,
            totalAmount: totalAmount,
            quantity: data.quantity,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            orderId: null,
            patientId: userData.code,
            prescriptionRequired: prescriptionRequired,
            ePrescriptionRequired: ePrescriptionRequired,
            medicineTypeOfSell: null,
          })
        })
        isAdded = true;
        dataObj = cartList;
      };
        if (!isAdded) {
          console.log("Enter")
          dataObj = {
            cartId: cartList && cartList.id ? cartList.cartId : "",
        createdBy: userData.code,
        createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        modifiedBy: userData.code,
        modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        orderId: null,
        patientId: userData.code,
        status: 1,
        labOrdersYN: false,
        drugsOrdersYN: true,
        patientLabTestsOrder:[],
        patientMedicineOrder: [
          {
            orderId: "",
            patientId: userData.code,
            prescriptionId: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            txnId: "",
            totalAmount: totalAmount,
            address1: null,
            address2: null,
            address3: null,
            city: null,
            state: null,
            country: null,
            pincode: null,
            deliveryAddress1: null,
            deliveryAddress2: null,
            deliveryAddress3: null,
            deliveryCity: null,
            deliveryState: null,
            deliveryCountry: null,
            deliveryZipcode: null,
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            status: 1,
            procedureStatus: -1,
            payMode: "E",
            collectionStatus: null,
            paymentLinkForPatient: "N",
            discountCouponCode: null,
            patientName: userData.firstName,
            patientGender: userData?.gender,
            patientMobile: userData?.mobile,
            docName: doc?.length ? doc[0].docName : null,
            patientMedicineOrderDetailsList: [
              {
                drugCode: data.id,
                drugName: data.drugsInfoMedicineName,
                unitPrice: data.medicineRate,
                discountAmount: 0.00,
                totalAmount: totalAmount,
                quantity: data.quantity,
                cartId: cartList && cartList.id ? cartList.cartId : "",
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                modifiedBy: userData.code,
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                orderId: null,
                patientId: userData.code,
                prescriptionRequired: prescriptionRequired,
                ePrescriptionRequired: ePrescriptionRequired,
                medicineTypeOfSell: null,
              },
            ],
          },
        ],
          }
          isAdded = true;
        }
        else{
          if(!cartList?.patientMedicineOrder?.length){
            console.log("Enter")
            dataObj.patientMedicineOrder.forEach((element) => {
              element.patientMedicineOrderDetailsList.push({
                drugCode: data.id,
                drugName: data.drugsInfoMedicineName,
                unitPrice: data.medicineRate,
                discountAmount: 0.00,
                totalAmount: totalAmount,
                quantity: data.quantity,
                cartId: cartList && cartList.id ? cartList.cartId : "",
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                modifiedBy: userData.code,
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                orderId: null,
                patientId: userData.code,
                prescriptionRequired: prescriptionRequired,
                ePrescriptionRequired: ePrescriptionRequired,
                medicineTypeOfSell: null,
              })
            })
          }
        }
    })

    cartData?.labtest?.map((data, index)=>{
      setIsAdding(index);
      const totalAmount = data.unitPrice * data.quantity;
      console.log('totalAmount', cartList);
      if (cartList && cartList.patientLabTestsOrder?.length) {
        console.log("Enter")
        cartList.patientLabTestsOrder.forEach((element) => {
          element.patientLabTestsOrderDetailsList.push({
              amount: data?.amount,
              createdBy: userData.code,
              createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
              hospitalId: data.hospitalId,
              labTestCode: data.labTestId,
              labTestName: data.labTestName,
              locationId: data.locationId,
              modifiedBy: userData.code,
              cartId: cartData && cartData.cartId ? cartData.cartId : "",
              modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
              parentId: data.parentId,
              parentTestName: data?.parentTestName,
              patientId: userData.code,
              status: 1,
          })
        })
        isAdded = true;
        dataObj = cartList;
      };
        if (!isAdded) {
          console.log("Enter")
          dataObj = {
            cartId: cartList && cartList.id ? cartList.cartId : "",
        createdBy: userData.code,
        createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        modifiedBy: userData.code,
        modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        orderId: null,
        patientId: userData.code,
        status: 1,
        labOrdersYN: true,
        drugsOrdersYN: false,
        patientMedicineOrder:[],
        patientLabTestsOrder: [
          {
            orderId: "",
            cartId: cartData.cartId ? cartData.cartId : "",
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            hospitalId: data.hospitalId,
            hospitalName: data.hospitalName,
            locationId: data.locationId,
            locationName: data.locationName,
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            patientId: userData.code,
            status: 1,
            patientLabTestsOrderDetailsList: [
              {
                amount: data?.amount,
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                hospitalId: data.hospitalId,
                labTestCode: data.labTestId,
                labTestName: data.labTestName,
                locationId: data.locationId,
                modifiedBy: userData.code,
                cartId: cartData && cartData.cartId ? cartData.cartId : "",
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                parentId: data.parentId,
                parentTestName: data?.parentTestName,
                patientId: userData.code,
                status: 1,
              },
            ],
          },
        ],
          }
          isAdded = true;
        }
        else
          if(!cartList?.patientLabTestsOrder?.length && dataObj?.patientLabTestsOrder?.length){
            console.log("Enter")
            dataObj.patientLabTestsOrder.forEach((element) => {
              element.patientLabTestsOrderDetailsList.push({
                amount: data?.amount,
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                hospitalId: data.hospitalId,
                labTestCode: data.labTestId,
                labTestName: data.labTestName,
                locationId: data.locationId,
                modifiedBy: userData.code,
                cartId: cartData && cartData.cartId ? cartData.cartId : "",
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                parentId: data.parentId,
                parentTestName: data?.parentTestName,
                patientId: userData.code,
                status: 1,
              })
            })

        }  else if(!dataObj?.patientLabTestsOrder?.length){
          let laborder = {
            // patientLabTestsOrder: [
                orderId: "",
                cartId: cartData.cartId ? cartData.cartId : "",
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                hospitalId: data.hospitalId,
                hospitalName: data.hospitalName,
                locationId: data.locationId,
                locationName: data.locationName,
                modifiedBy: userData.code,
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                patientId: userData.code,
                status: 1,
                patientLabTestsOrderDetailsList: [
                  {
                    amount: data?.amount,
                    createdBy: userData.code,
                    createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                    hospitalId: data.hospitalId,
                    labTestCode: data.labTestId,
                    labTestName: data.labTestName,
                    locationId: data.locationId,
                    modifiedBy: userData.code,
                    cartId: cartData && cartData.cartId ? cartData.cartId : "",
                    modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                    parentId: data.parentId,
                    parentTestName: data?.parentTestName,
                    patientId: userData.code,
                    status: 1,
                  },
                ],
            // ],
          }
          dataObj.patientLabTestsOrder = [laborder]
        }
    })
    if(dataObj?.patientMedicineOrder?.length && dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.length > 0){
      let id = dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.map(item => item.drugCode);
      id.map((item , index , self) =>{
        if(self.indexOf(item) === index){
       } else{
        dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[self.indexOf(item)].quantity += dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[index].quantity
        dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[self.indexOf(item)].totalAmount = dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[self.indexOf(item)].quantity * dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[self.indexOf(item)].unitPrice
         }

   })

      let res = dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.filter((item , i , self) =>{
        if(id.indexOf(item.drugCode) == i){
          return item
        }
      })

      dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList = res
    }
    // dataObj.patientMedicineOrder[0].docName = "PHOTO298317102022103828487.JPEG"
    // console.log(cartData?.medicines[1].docName, "sidvhisodbvs", cartData);
    console.log(cartData,"Data object",dataObj);
    dispatch(AddtoCart(dataObj)).then((res) => {
      setIsAdding(-1)
      setLoading({
        loadingAddedTocart: false,
        errorinAddingtoCart: false,
        errorMessageWhenAddingToCart: "",
        addToCartMessage:"Added Successfully"
    
      })

      let timeout = setTimeout(() => {
        setLoading({
          loadingAddedTocart: false,
          errorinAddingtoCart: false,
          errorMessageWhenAddingToCart: "",
          addToCartMessage:""
      
        })
        clearTimeout(timeout)
      },1200)
    }).catch(err =>{
        setLoading({
          loadingAddedTocart: false,
          errorinAddingtoCart: true,
          errorMessageWhenAddingToCart: "Something went wrong"

        })
        let timeout = setTimeout(() => {
          setLoading({
            loadingAddedTocart: false,
            errorinAddingtoCart: false,
            errorMessageWhenAddingToCart: ""
        
          })
          clearTimeout(timeout)
        },1200)
      })
    e.preventDefault();

  };

  // dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));


// console.log( "prescriptionsListnowdn",cart   )

  return (
    <>
      {/* breadcrumbs */}
      <div className="lg:flex justify-center mb-8">
        <div className="flex h-100 w-full">
          <div className="w-full">
            <div className="py-2 align-middle inline-block w-full lg:px-8">
              <div className="flex justify-between">
              <p class="text-lg font-medium text-gray-700 md:pl-10 lg:pl-6">
                Select e-Prescription
              </p>
              <p className="font-medium text-xs" ><span className="text-red-600" >* </span>Showing 1 month record</p>
              </div>
              <div className="flex justify-end">
                <select onChange={handleDateSelectDate} className="border mb-2 px-2 py-1" >
                  <option value={1} >1 month</option>
                  <option value={2}>2 month</option>
                  <option value={3}>3 month</option>
                  <option value={0}>All</option>
                </select>
              </div>
              <div className="h-100 m-auto w-full md:w-11/12 lg:w-full  lg:mx-1 overflow-scroll hide-scroll-bar">

                <table className="w-full lg:min-w-full  divide-y divide-gray-200 lg:px-2 overflow-scroll ">
                  <thead className="bg-gray-50 flex flex-col">
                    <tr className="flex">
                      <div className="w-7/12">

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                      </div>


                      <th
                        scope="col"
                        className="px-6 py-3 w-3/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 w-2/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex justify-end">
                          {/* <button
                            onClick={filter}
                            class="bg-brand-secondary  rounded text-white h-9 w-9"
                          >
                            <FontAwesomeIcon icon={faFilter} />
                          </button> */}
                        </div>

                      </th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 flex flex-col  h-60">
                    {isLoading ? <div>
                      <div
                        className="flex relative flex-wrap items-center justify-center m-5"

                      >
                        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                      </div>
                    </div> : null}
                    {prescriptionsList.map((res, i) => {
                      console.log(res, 'hey');
                      return (
                        <tr
                          key={i}
                          className="border-b bg-white border-gray-200 pt- flex"
                        >
                          <td className="px-6 py-2 whitespace-nowrap w-7/12">
                            <div className="flex items-center overflow-scroll hide-scroll-bar w-10/12">
                              <div className=" flex space-x-2">
                                {/* <input
                                  type="radio"
                                  class="form-radio mt-1 mr-2"
                                  name="prescription"
                                  value="personal"
                                // onClick={() =>
                                //   prescriptionSelected(res)
                                //   //props.onSelect(desc, false, res)
                                // }
                                /> */}
                                <div className="flex space-x-2">
                                  {/* <img src={logo} alt="" /> */}
                                  <div className="text-sm font-medium text-gray-500 ">
                                    {/* {res?.patientDocumentList?.documentType} */}
                                    {(res?.patientDocumentList && res?.patientDocumentList[0]?.documentType === 'string' ? 'eRx' : 'hw-Rx') +
                                      ' Dr.' + res.userName + ' - Pt ' +
                                      res.patientName +
                                      //  ' Appt' +
                                      // res.appointmentId +
                                      ' - ' + res.consultReason + ' (' + (res?.patientDocumentList && res?.patientDocumentList[0]?.documentType === 'string' ? 'ePrescription' : 'Hand Written') + ')'}
                                    {/* {(res?.patientDocumentList?documentType === ''?'hw-Rx':'eRx' )+' Dr.' + res.userName + ' - Pt ' + res.patientName + ' Appt' + res.appointmentId + ' - ' + res.consultReason + ' (' + (res.prescritptionType === "H" ? 'Hand Written' : 'ePrescription') + ')'} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap w-3/12">
                            <span className="text-sm text-gray-500 ">
                              {convertToLocalTime(res.createdDate)}
                            </span>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium w-2/12">
                            <div className="flex space-x-4 justify-end items-center">
                              {res?.patientDocumentList && res?.patientDocumentList[0]?.documentType === 'string' ?
                                <button className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded"

                                  onClick={() =>
                                    prescriptionSelected(res)
                                    //props.onSelect(desc, false, res)
                                  }
                                  disabled = {loading.loadingSelectedPrescription}
                                >
                                  View e-Prescription {" "}
                                  {
                                    loading.loadingSelectedPrescription && selectedDrugItem == res.id && <div className="loader ml-2 float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-4 w-4" />
                                  }
                                </button> :
                                <button class="bg-brand-secondary text-white font-medium  py-2 px-2 rounded"
                                  onClick={(e) =>
                                    redirectTo(e, APP_ROUTES.MEDICINE)
                                  }>
                                  Search {" "}
                                </button>
                              }
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
                {
                  loading.errorinSelectedPrescription && <div className="h-100 lg:w-full  lg:mx-1 text-center  overflow-x-scroll hide-scroll-bar">
                    <div className="text-md font-semibold" >{loading.errorMessageforSelectedPrescription} </div>
                    </div>
                }
              {(prescribedList?.medicines?.length ||prescribedList?.labtest?.length) && (
                <div className="h-100 lg:w-full  lg:mx-1  overflow-x-scroll hide-scroll-bar">
                  <table className="min-w-full mt-10  divide-gray-200 lg:px-2 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prescribed Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    {prescribedList?.medicines?.length ? prescribedList.medicines.map((res, i) => {
                      console.log(i , "asccjaspi")
                      return (
                        <>
                          {i == 0 && <div className={"px-6 py-2 text-md text-gray-500 font-medium"}>
                                  Medicine
                                </div>}
                          <tbody className="bg-white divide-y divide-gray-200">

                            <tr key={i} className={res.title ? "bg-gray-50 " : "border-b border-gray-200"}>
                              <td className="flex px-6 py-2 whitespace-nowrap">
                                <div className={res.title ? "hidden" : "text-sm text-gray-500 "}>
                                  <input className="mx-3" type="checkbox"
                                    onChange={(e)=>{handleChange(res, i, 'medicines', e)}} />
                                </div>
                                <div className={res.title ? "text-sm text-gray-500 font-medium" : "text-sm text-gray-500 "}>
                                  {res.drugsInfoMedicineName}
                                </div>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                <div className="text-sm text-right text-gray-500 ">
                                  {res.quantity}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>

                      )
                    }): null}
                    {prescribedList?.labtest?.length > 0 && prescribedList.labtest.map((res, i) => {
                      return (
                        <>
                        {i == 0 && <div className={"px-6 py-2 text-md text-gray-500 font-medium"}>
                                  Lab Test
                                </div> }
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr key={i} className={res.title ? "bg-gray-50 " : "border-b border-gray-200"}>

                              <td className="flex px-6 py-2 whitespace-nowrap">
                                <div className={res.title ? "hidden" : "text-sm text-gray-500 "}>
                                  {/* <input className="mx-3" type="checkbox"

                                    onChange={(e)=>{handleChange(res, i, 'labtest', e)}} /> */}
                                </div>
                                <div className={res.title ? "text-sm text-gray-500 font-medium" : "text-sm text-gray-500 "}>
                                  {res.labTestName}
                                </div>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-500 ">
                                  {res.quantity? res.quantity: ""}
                                </div>
                              </td>



                              <td className="px-1 py-2 whitespace-nowrap">
                              </td>

                            </tr>


                          </tbody>

                        </>

                      )
                    })}
                  </table>
                  <div className="flex flex-col justify-center items-center w-100 mt-5">
                    {prescribedList?.medicines?.length > 0 ? <button disabled={!(cartData?.medicines?.length || cartData?.labtest?.length)|| loading.loadingAddedTocart} onClick={(e) => { addtoCart(e)}}
                      className="bg-brand-secondary  text-white text-xs py-2 px-3 rounded">Add to Cart
                      {
                        loading.loadingAddedTocart &&
                        <div className="loader ml-2 float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-4 w-4" />
                      }
                      </button> : null}
                      {
                        loading.errorinAddingtoCart ? <div className="text-md font-semibold text-gray-400 mt-2">{loading.errorMessageWhenAddingToCart} </div> : <div className="text-md font-semibold text-gray-400 mt-2" >{loading.addToCartMessage} </div>
                      }
                  </div>
                </div>
              )}



            </div>
          </div>


        </div>




      </div>

    </>
  );
}
export default PrescriptionUploaded;
