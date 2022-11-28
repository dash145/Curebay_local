import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useEffect } from "react";
import moment from "moment";
import { gethospitalclinicList } from "../Redux/Actions/doctorAction";
import lodash from "lodash";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import ic_morning from "../Assets/Images/ic_morning.svg";
import ic_evening from "../Assets/Images/ic_evening.svg";
import { getDoctorsslots } from "../Redux/Actions/doctorAction";
import { log } from "@craco/craco/lib/logger";
import {Calendar} from "primereact/calendar"
function NewDoctorSlots(props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const params = useParams();
  const search = useLocation().search;
  const when_appointment_search_param = new URLSearchParams(search).get("when");
  const paid_search_param = new URLSearchParams(search).get("paid");
  const id_search_param = new URLSearchParams(search).get("id");
  const reason_search_param = new URLSearchParams(search).get("reason");
  const rel_search_param = new URLSearchParams(search).get("rel");
  const key_search_param = new URLSearchParams(search).get("key");
  const from_time_search_param = new URLSearchParams(search).get("from");
  const { userData, doctorsAppointment, doctorData } = props;

  const redirectTo = (data, query) => {
    if (userData?.id) {
      history.push({
        pathname: APP_ROUTES.PAYMENT,
        search: `?${query}`,
        state: data,
      });
    } else {
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
  };
  // const [currentDate, setCurrentDate] = useState(moment('05/01/2021', 'MM/DD/yyyy'));
  const [screen, setscreen] = useState(window.innerWidth);
  const [currentDate, setCurrentDate] = useState();
  const [days, setDays] = useState([]);
  const [days1, setDays1] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [sortedSlots, setSortedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const hospitalcliniclist = useSelector((state) => state.particulardoctor);
  const [hospitalId, sethospitalId] = useState("");
  const [locationId, setLocationId] = useState("");
  const { hospitalcliniclistData } = hospitalcliniclist;
  const [slot, setSelectedSlot] = useState({});
  const [isShow, setShowTimeSlots] = useState(false);
  const [timeIndex, selectTimeIndex] = useState({});
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentAmount, setAppointmentAmount] = useState(0);
  const [hideModal, setHideModal] = useState(false);
  const { isLoading, doctorsslot } = useSelector((state) => state.doctorsslot);
  const [bg, setBg] = useState(false);
  const [countTimeSlots, setCountTimeSlots] = useState({});
  const [hideSlot, setHideSlot] = useState(true);
  const [filteredDate, setFilteredDate] = useState([])
  const [checkboxChecked ,setCheckboxChecked] = useState(false)
  const [filterDateCount, setFilterDateCount] = useState(0)
  const [refreshSlots, setRefreshSlots] = useState(false)
  const [msgForFilter, setMsgForFilter] = useState("")
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const [isTimeSlotEmptyForEliteDoctor, setIsTimeSlotEmptyForEliteDoctor] =
    useState(false);
  const [timeSelectedFromInput, setTimeSelectedFromInput] = useState(null);
  const [isProcessEnabled, setisProcessEnabled] = useState(false);
  const getDays = () => {
    if(!checkboxChecked){
        let days = [];
        let daysRequired = 3;
        for (let i = 0; i < daysRequired; i++) {
          days.push({
            vis: moment(currentDate).add(i, "days").format("ddd,DD"),
            date: moment(currentDate).add(i, "days").format("MM/DD/yyyy"),
          });
        }
        setDays(days);
    }

  };

  const getFilterDays = (val) =>{
    if(filteredDate?.length){
        console.log(filteredDate[filterDateCount], "sdvhsduivgsudv");
    }
    if(checkboxChecked){
    let days = [];
    let daysRequired = 0;
    let intialValue = filterDateCount
    if(val == "forward"){
        daysRequired = intialValue + 3;
    } else if(val == "backward"){
        daysRequired = intialValue - 3;
        intialValue = daysRequired - 3
    }
    for (let i = intialValue; i < daysRequired; i++) {
        if(filteredDate[i]){
            days.push({
                vis: filteredDate[i].vis,
                date: filteredDate[i].date,
              });
        }
     
    }
    setDays(days);
    setFilterDateCount(daysRequired)
}
  }

  const getDays1 = () => {
    let days1 = [];
    let daysRequired = 2;
    for (let i = 0; i < daysRequired; i++) {
      days1.push({
        vis: moment(currentDate).add(i, "days").format("ddd,DD"),
        date: moment(currentDate).add(i, "days").format("MM/DD/yyyy"),
      });
    }
    setDays1(days1);
  };

  const sortSlots = (to, from) => {
    dispatch(getDoctorsslots(props?.doctid, to, from)).then((res) => {
      if (res.length) {
        if (!doctorData?.quickConsulted) {
          setIsTimeSlotEmptyForEliteDoctor(true);
        }
        let sortData = res?.sort(
          (a, b) => moment(b.modifiedDate) - moment(a.modifiedDate)
        );
        setSortedSlots(sortData);
      } else {
        if (!doctorData?.quickConsulted) {
          setIsTimeSlotEmptyForEliteDoctor(true);
        }
      }
    });
  };

  useEffect(() => {
    if (paid_search_param == "no") {
      console.log(paid_search_param, "sdvdshosdhouds");
      setSelectedDate(when_appointment_search_param);
    }
  }, [when_appointment_search_param]);

  useEffect(() => {
    if (paid_search_param !== "no") {
      if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
        sortSlots(
          moment().add(1, "days").format("MM/DD/yyyy"),
          moment().add(1, "days").format("MM/DD/yyyy")
        );
        setSelectedDate(moment().add(1, "days").format("MM/DD/yyyy"));
        setCurrentDate(moment().add(1, "days"));
      } else {
        sortSlots(moment().format("MM/DD/yyyy"), moment().format("MM/DD/yyyy"));
        setCurrentDate(moment());
        setSelectedDate(moment().format("MM/DD/yyyy"));
      }
    } else {
      if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
        sortSlots(when_appointment_search_param, when_appointment_search_param);
        setSelectedDate(when_appointment_search_param);
        setCurrentDate(when_appointment_search_param);
      } else {
        sortSlots(when_appointment_search_param, when_appointment_search_param);
        setCurrentDate(when_appointment_search_param);
        setSelectedDate(when_appointment_search_param);
      }
    }
  }, [doctorData?.starDoctor , refreshSlots]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const divideTimeSlot = (selectSlot, selectDate) => {
    if (selectSlot.length > 0) {
      var m_Stops = [];
      var a_Stops = [];
      var e_Stops = [];
      for (var i in selectSlot) {
        var startTime = moment(selectSlot[i].fromTime, "hh:mm A");
        var endTime = moment(selectSlot[i].toTime, "hh:mm A");
        var interval = parseInt(
          selectSlot[i].consultationDuration
            ? selectSlot[i].consultationDuration
            : 15
        );
        var day = moment(selectDate, "MM/DD/yyyy").format("dddd");
        if (
          selectSlot[i][day.toLowerCase()] !== "N" &&
          (selectSlot[i].video != "N" || selectSlot[i].audio != "N")
        ) {
          console.log("Yes ky", selectSlot[i].video);
          setShowTimeSlots(true);
          setHideModal(false);
          while (startTime <= endTime) {
            let checkIsAppointed = doctorsAppointment.find((x) => {
              return (
                moment(x.whenAppointment, "MM/DD/yyyy").isSame(selectDate) &&
                moment(x.fromTime, "hh:mm").isSame(startTime)
              );
            });

            if (startTime < moment("12: 00", "hh:mm A")) {
              m_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
            if (
              startTime >= moment("12: 00", "hh:mm A") &&
              startTime < moment("17: 00", "hh:mm A")
            ) {
              a_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
            if (startTime >= moment("17: 00", "hh:mm A")) {
              e_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
          }
        }
      }
      let mSlots = lodash
        .uniqBy(m_Stops, "time")
        .sort((a, b) => moment(a.time) - moment(b.time));
      // .sort((a, b) => {
      //     return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
      // });

      let aSlots = lodash.uniqBy(a_Stops, "time");
      let eSlots = lodash.uniqBy(e_Stops, "time");
      //let mSlots = lodash.uniqBy(e_Stops, 'time');
      console.log("aSlots", aSlots);
      setTimeSlots({ morning: mSlots, afternoon: aSlots, evening: eSlots });
    } else {
      setShowTimeSlots(false);
      setHideModal(true);
    }
  };

  const changeWeek = (val) => {
    //setShowTimeSlots(false);
    setHideModal(false);
    setSelectedDate("");
    setHideSlot(false);
    if (val === "forward") {
      var newDate = moment(days[2].date).add(1, "days");
      setCurrentDate(newDate);
      setSelectedDate(newDate);
      getFilterDays("forward")
    //   setFilterDateCount(filterDateCount + 2)
    }

    if (val === "forward1") {
      var newDate = moment(days[2].date).add(0, "days");
      setCurrentDate(newDate);
      setSelectedDate(newDate);
    //   getFilterDays("forward1")

    }

    if (val === "backward") {
      var newDate = moment(days[0].date).subtract(3, "days");
      setCurrentDate(newDate);
      setSelectedDate(newDate);
      getFilterDays("backward")
    //   setFilterDateCount(filterDateCount - 2)
    }

    if (val === "backward1") {
      var newDate = moment(days[0].date).subtract(2, "days");
      setCurrentDate(newDate);
      setSelectedDate(newDate);
    }
  };

  const goToPayment = () => {
    let dataObj = {
      consultationsReason: "Fever",
      consultationsType: props?.appointmentType,
      doctorType: doctorData?.quickConsulted == 0 ? "I" : "E",
      createdBy: userData?.id,
      fromTime: moment(timeIndex.time, "hh:mm A").format("HH:mm"),
      hospitalId: props?.hospitalId,
      locationId: props?.locationId,
      modifiedBy: userData?.code,
      patientEmail: userData?.email,
      patientId: userData?.code,
      patientMobileNo: userData?.mobile,
      patientName: userData.firstName,
      status: 1,
      toTime: moment(timeIndex?.time, "hh:mm A")
        .add(timeIndex?.interval, "minutes")
        .format("HH:mm"),
      userEmail: doctorData?.email,
      userId: doctorData?.code,
      userMobile: doctorData?.mobile,
      userName: doctorData?.firstName + " " + doctorData?.lastName,
      userQualification: doctorData?.qualification,
      userSalutation: doctorData?.salutation,
      whenAppointment: selectedDate,
      amount:
        props?.appointmentType === "V"
          ? props?.fees?.videoConsFee
          : props.fees?.inPersonConsFee,
    };
    if(localStorage.getItem("state")){
      localStorage.removeItem("state")
    }
    if (
      id_search_param &&
      reason_search_param &&
      rel_search_param &&
      key_search_param
    ) {
      redirectTo(
        dataObj,
        `q=pay&id=${id_search_param}&reason=${reason_search_param}&rel=${rel_search_param}&key=${key_search_param}`
      );
    } else {
      redirectTo(dataObj, `q=pay`);
    }
  };

  const confirmAppointment = () => {
    let dataObj = {
      consultationsReason: "Fever",
      consultationsType: props?.appointmentType,
      doctorType: doctorData?.quickConsulted == 0 ? "I" : "E",
      createdBy: userData?.id,
      fromTime: moment(timeSelectedFromInput, "LT").format("HH:mm"),
      hospitalId: props?.hospitalId,
      locationId: props?.locationId,
      modifiedBy: userData?.code,
      patientEmail: userData?.email,
      patientId: userData?.code,
      patientMobileNo: userData?.mobile,
      patientName: userData.firstName,
      status: 14,
      toTime: moment(timeSelectedFromInput, "hh:mm A")
        .add(15, "minutes")
        .format("HH:mm"),
      userEmail: doctorData?.email,
      userId: doctorData?.code,
      userMobile: doctorData?.mobile,
      userName: doctorData?.firstName + " " + doctorData?.lastName,
      userQualification: doctorData?.qualification,
      userSalutation: doctorData?.salutation,
      whenAppointment: selectedDate,
      amount:
        props?.appointmentType === "V"
          ? props?.fees?.videoConsFee
          : props.fees?.inPersonConsFee,
    };
    if(localStorage.getItem("state")){
      localStorage.removeItem("state")
    }
    console.log(dataObj, "svshvoishobvsh");
    redirectTo(dataObj, "q=confirm");
  };

  useEffect(() => {
    getDays();
  }, [currentDate]);

  useEffect(() => {
    getFilterDays("forward");
  }, [filteredDate]);

  useEffect(() => {
    getDays1();
  }, [currentDate]);

  useEffect(() => {
    dispatch(gethospitalclinicList(params.doctid));
  }, []);

  const getselectedSlot = (date, index) => {
    console.log("is date hai", JSON.stringify(date));
    setisProcessEnabled(false)
    selectTimeIndex({});
    setSelectedDate(date);
    var arr = [];
    for (var i in sortedSlots) {
      if (
        moment(date).isBetween(
          moment(sortedSlots[i].fromDate, "MM/DD/yyyy"),
          moment(sortedSlots[i].toDate, "MM/DD/yyyy"),
          null,
          "[]"
        )
      ) {
        arr.push(sortedSlots[i]);
      } else {
        setSelectedSlot({});
        setShowTimeSlots(false);
        setHideModal(true);
      }
    }

    console.log("is date hai array", JSON.stringify(arr));
    divideTimeSlot(arr, date);
  };

  const onDateChange = (date) => {
    sortSlots(date, date);
  };

  const onSelectHosptial = (e) => {
    let value = JSON.parse(e.target.value);

    setLocationId(value.locationId);
    sethospitalId(value.hospitalId);
  };

  useEffect(() => {
    if (hospitalcliniclistData.length > 0) {
      setLocationId(hospitalcliniclistData[0].locationId);
      sethospitalId(hospitalcliniclistData[0].hospitalId);
    }
  }, [hospitalcliniclistData.length]);

  useEffect(() => {
    if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
      if (sortedSlots && selectedDate) {
        if (paid_search_param == "no") {
          getselectedSlot(when_appointment_search_param);
        } else {
          getselectedSlot(selectedDate);
        }
      }
    } else {
      if (sortedSlots && selectedDate) {
        if (paid_search_param == "no") {
          getselectedSlot(when_appointment_search_param);
        } else {
          getselectedSlot(selectedDate);
        }
      }
    }
  }, [sortedSlots, doctorsAppointment]);

  if (!sortedSlots.length && isLoading) {
    return (
      <div className="flex flex-wrap justify-center">
        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
      </div>
    );
  }

  const getTodaySlots = (resDate, selectedDate) => {
    let Count = 0;
    var arr = [];
    for (var i in sortedSlots) {
      if (
        moment(resDate).isBetween(
          moment(sortedSlots[i].fromDate, "MM/DD/yyyy"),
          moment(sortedSlots[i].toDate, "MM/DD/yyyy"),
          null,
          "[]"
        )
      ) {
        arr.push(sortedSlots[i]);
      }
    }

    let CountSlots = CountTimeSlot(arr, resDate);

    let l = moment(new Date(), "MM/DD/yyyy").format("MM/DD/yyyy");
    if (moment(l, "MM/DD/yyyy").isSame(resDate)) {
      if (CountSlots) {
        if (CountSlots?.m_Stops) {
          CountSlots?.m_Stops
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                let Ldate = moment(
                  `${resDate} ${res.time}`,
                  "MM/DD/yyyy hh:mm A"
                ).format("MM/DD/yyyy hh:mm A");
                let Cdate = moment().format("MM/DD/yyyy hh:mm A");
                if (!moment(Ldate).isBefore(moment(Cdate))) {
                  Count++;
                }
              }
            });
        }
        if (CountSlots?.a_Stops) {
          CountSlots?.a_Stops
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                let Ldate = moment(
                  `${resDate} ${res.time}`,
                  "MM/DD/yyyy hh:mm A"
                ).format("MM/DD/yyyy hh:mm A");
                let Cdate = moment().format("MM/DD/yyyy hh:mm A");
                if (!moment(Ldate).isBefore(moment(Cdate))) {
                  Count++;
                }
              }
            });
        }
        if (CountSlots?.e_Stops) {
          CountSlots?.e_Stops
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                let Ldate = moment(
                  `${resDate} ${res.time}`,
                  "MM/DD/yyyy hh:mm A"
                ).format("MM/DD/yyyy hh:mm A");
                let Cdate = moment().format("MM/DD/yyyy hh:mm A");
                if (!moment(Ldate).isBefore(moment(Cdate))) {
                  Count++;
                }
              }
            });
        }
      } else {
        Count = 0;
      }
    } else {
      if (CountSlots) {
        if (CountSlots?.mSlots) {
          CountSlots?.mSlots
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                Count++;
              }
            });
        }
        if (CountSlots?.aSlots) {
          CountSlots?.aSlots
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                Count++;
              }
            });
        }

        if (CountSlots?.eSlots) {
          CountSlots?.eSlots
            ?.filter((x) => x.hospitalId === props.hospitalId)
            .map((res, i) => {
              if (!res.isBooked) {
                Count++;
              }
            });
        }
      } else {
        Count = 0;
      }
    }
    return Count;
  };

  const getTodaySlotsCount = (resDate, index) => {
    let Count = 0;
    if (timeSlots?.morning?.length != 0) {
      timeSlots?.morning
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            (res.inPerson === "Y" && props.appointmentType === "I") ||
            (res.video === "Y" && props.appointmentType === "V") ||
            (res.quickConsultation === "Y" && props.appointmentType === "Q")
          ) {
            if (
              !res.isBooked &&
              !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
                moment()
              )
            ) {
              Count++;
            }
          }
        });
    }

    if (timeSlots?.afternoon?.length != 0) {
      timeSlots?.afternoon
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            (res.inPerson === "Y" && props.appointmentType === "I") ||
            (res.video === "Y" && props.appointmentType === "V") ||
            (res.quickConsultation === "Y" && props.appointmentType === "Q")
          ) {
            if (
              !res.isBooked &&
              !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
                moment()
              )
            ) {
              Count++;
            }
          }
        });
    }

    if (timeSlots?.evening?.length != 0) {
      timeSlots?.evening
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            !res.isBooked &&
            !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
              moment()
            )
          ) {
            Count++;
          }
        });
    }

    return Count;
  };

  const getTodaySlotsCountMorning = (resDate) => {
    let Count = 0;
    if (timeSlots?.morning?.length != 0) {
      timeSlots?.morning
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            (res.inPerson === "Y" && props.appointmentType === "I") ||
            (res.video === "Y" && props.appointmentType === "V") ||
            (res.quickConsultation === "Y" && props.appointmentType === "Q")
          ) {
            if (
              !res.isBooked &&
              !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
                moment()
              )
            ) {
              Count++;
            }
          }
        });
    }
    return Count;
  };

  const getTodaySlotsCountEvening = (resDate) => {
    let Count = 0;
    if (timeSlots?.evening?.length != 0) {
      timeSlots?.evening
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            (res.inPerson === "Y" && props.appointmentType === "I") ||
            (res.video === "Y" && props.appointmentType === "V") ||
            (res.quickConsultation === "Y" && props.appointmentType === "Q")
          ) {
            if (
              !res.isBooked &&
              !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
                moment()
              )
            ) {
              Count++;
            }
          }
        });
    }
    return Count;
  };

  const getTodaySlotsCountAfterNoon = (resDate) => {
    let Count = 0;
    if (timeSlots?.afternoon?.length != 0) {
      timeSlots?.afternoon
        ?.filter((x) => x.hospitalId === props.hospitalId)
        .map((res, i) => {
          if (
            (res.inPerson === "Y" && props.appointmentType === "I") ||
            (res.video === "Y" && props.appointmentType === "V") ||
            (res.quickConsultation === "Y" && props.appointmentType === "Q")
          ) {
            if (
              !res.isBooked &&
              !moment(`${resDate} ${res.time}`, "MM/DD/yyyy hh:mm A").isBefore(
                moment()
              )
            ) {
              Count++;
            }
          }
        });
    }

    return Count;
  };

  const CountTimeSlot = (selectSlot, selectDate) => {
    let SlotCoutData = {
      m_Stops: [],
      a_Stops: [],
      e_Stops: [],
    };

    if (selectSlot.length > 0) {
      for (var i in selectSlot) {
        var startTime = moment(selectSlot[i].fromTime, "hh:mm A");
        var endTime = moment(selectSlot[i].toTime, "hh:mm A");
        var interval = parseInt(
          selectSlot[i].consultationDuration
            ? selectSlot[i].consultationDuration
            : 15
        );

        var day = moment(selectDate, "MM/DD/yyyy").format("dddd");

        if (selectSlot[i][day.toLowerCase()] !== "N") {
          while (startTime <= endTime) {
            let checkIsAppointed = doctorsAppointment.find((x) => {
              return (
                moment(x.whenAppointment, "MM/DD/yyyy hh:mm A").isSame(
                  selectDate
                ) && moment(x.fromTime, "hh:mm A").isSame(startTime)
              );
            });
            if (startTime < moment("12: 00", "hh:mm A")) {
              SlotCoutData.m_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
            if (
              startTime >= moment("12: 00", "hh:mm A") &&
              startTime < moment("17: 00", "hh:mm A")
            ) {
              SlotCoutData.a_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
            if (startTime >= moment("17: 00", "hh:mm A")) {
              SlotCoutData.e_Stops.push({
                time: new moment(startTime).format("hh:mm A"),
                isBooked: checkIsAppointed ? true : false,
                hospital: selectSlot[i].hospitalName,
                hospitalId: selectSlot[i].hospitalId,
                inPerson: selectSlot[i].inPerson,
                video: selectSlot[i].video,
                audio: selectSlot[i].audio,
                quickConsultation: selectSlot[i].quickConsultation,
                interval: interval,
              });
              startTime.add(interval, "minutes");
            }
          }
        }
      }

      let mSlots = lodash
        .uniqBy(SlotCoutData.m_Stops, "time")
        .sort((a, b) => moment(a.time) - moment(b.time));

      // SlotCoutData.mSlots = lodash.uniqBy(SlotCoutData.m_Stops, 'time').sort((a, b) => {
      //     return new Date('01/01/1970 ' + a.time) - new Date('01/01/1970 ' + b.time);
      // });
      SlotCoutData.aSlots = lodash.uniqBy(SlotCoutData.a_Stops, "time");
      SlotCoutData.eSlots = lodash.uniqBy(SlotCoutData.e_Stops, "time");
      SlotCoutData.m_Stops = lodash.uniqBy(mSlots, "time");
    } else {
      return SlotCoutData;
    }
    return SlotCoutData;
  };

  console.log(timeSelectedFromInput, "sihshushusdhsu", timeSlots);

  const onCustomSlotSelect = (e) => {
    console.log(moment(e.target.value, "LT").format("HH:mm"), "sdvihboeurhboureb");
    let currentTime = moment(
      `${selectedDate} ${moment(e.target.value, "LT").format("hh:mm A")}`,
      "MM/DD/yyyy hh:mm A"
    );
    let startTime = moment(`${selectedDate} 00:00`, "MM/DD/yyyy HH:mm");
    let endTime = moment(`${selectedDate} 06:00`, "MM/DD/yyyy HH:mm");
    selectTimeIndex({});
    setTimeSelectedFromInput(e.target.value);
    

    if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
      if (currentTime.isBefore(moment(`${moment().add(1, "days").format("MM/DD/yyyy")} ${moment().hour()}:${moment().minute()}`))) {
        toast.warning("This doctor can't be book within 24 hours.");
        setisProcessEnabled(false)
        return;
      }
    } else if (currentTime.isBefore(moment())) {
      toast.warning("Please select future time slot.");
      setisProcessEnabled(false)
      return;
    }

    if (currentTime.isBetween(startTime, endTime)) {
      toast.warning("Cannot book slot between 12:00 am to 6:00 am.");
      setisProcessEnabled(false)
      return;
    }
    let time = [];
    // selectTimeIndex({ e: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId, interval: res.interval })
    if (timeSlots?.morning?.length) {
      timeSlots.morning
        .filter((x) => x.hospitalId === props.hospitalId)
        .map((item, i) => {
          time.push({
            m: true,
            index: i,
            time: item.time,
            hospital: item.hospital,
            hospitalId: item.hospitalId,
            interval: item.interval,
            booked: item.isBooked,
          });
        });
    }
    if (timeSlots?.afternoon?.length) {
      timeSlots.afternoon
        .filter((x) => x.hospitalId === props.hospitalId)
        .map((item, i) => {
          time.push({
            a: true,
            index: i,
            time: item.time,
            hospital: item.hospital,
            hospitalId: item.hospitalId,
            interval: item.interval,
            booked: item.isBooked,
          });
        });
    }
    if (timeSlots?.evening?.length) {
      timeSlots.evening
        .filter((x) => x.hospitalId === props.hospitalId)
        .map((item, i) => {
          time.push({
            e: true,
            index: i,
            time: item.time,
            hospital: item.hospital,
            hospitalId: item.hospitalId,
            interval: item.interval,
            booked: item.isBooked,
          });
        });
    }
    if (time?.length > 0) {
      let res = time.find(
        (item) => item.time == moment(e.target.value, "LT").format("hh:mm A")
      );
      console.log(res, "sdvdsvsdhvosd");

      if (res?.time && !res?.isBooked) {
        // console.log(res);
        setisProcessEnabled(false)
        selectTimeIndex(res);
      }

      if (res?.booked) {
        toast.warning("Slot already booked, select another slot.");
        setisProcessEnabled(false)
        selectTimeIndex({});
        return;
      }
    }
    setisProcessEnabled(true)
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
        setCheckboxChecked(true);
        setIsFilterLoading(true)
        setRefreshSlots(false)
        let from = ""
        if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
            from = moment().add(1, "days").format("MM/DD/yyyy");
          } else {
            from = moment().format("MM/DD/yyyy")
          }

      dispatch(getDoctorsslots(props?.doctid, from,moment().add(30, "days").format("MM/DD/YYYY"))
      ).then((res) => {
        if (res.length) {
          let days = [];
            let resDate = null
          let sortData = res?.sort(
            (a, b) => moment(a.fromDate) - moment(b.fromDate)
          );
             
          sortData.map((item) => {
            resDate = moment(item.fromDate).format("MM/DD/yyyy")
            while(moment(resDate).isSameOrBefore(moment(item.toDate, "MM/DD/yyyy")) ){
                let d = moment(resDate).day();
                let pastDateCheck = ""
                if (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1) {
                  pastDateCheck = moment().add(1, "days").format("MM/DD/yyyy");
                } else {
                  pastDateCheck = moment().format("MM/DD/yyyy")
                }
                if(((d == 0 && item.sunday == "Y") || (d == 1 && item.monday == "Y") ||
                (d == 2 && item.tuesday == "Y") || (d == 3 && item.wednesday == "Y") ||
                (d == 4 && item.thursday == "Y") || (d == 5 && item.friday == "Y") ||
                (d == 6 && item.saturday == "Y"))
                ){
                    if(!days.find(res1 => res1.date == moment(resDate).format("MM/DD/yyyy")) && !moment(resDate).isBefore(pastDateCheck) ){
                        days.push({
                            vis: moment(resDate).format("ddd,DD"),
                            date: moment(resDate).format("MM/DD/yyyy"),
                          });
                    }
                   
                      
                }
                resDate = moment(resDate).add(1, "days").format("MM/DD/yyyy")
        }
          });
            setFilteredDate(days)
            setCurrentDate(days[0].date);
            setSelectedDate(days[0].date)
            sortSlots(days[0].date, days[0].date)
        } else {
            setMsgForFilter("No slot available")
          if (!doctorData?.quickConsulted) {
            setIsTimeSlotEmptyForEliteDoctor(true);
          }
        }
        setIsFilterLoading(false)
      });
    } else {
        setCheckboxChecked(false);
        setFilterDateCount(0)
        setRefreshSlots(true);
        setMsgForFilter("")
        setIsFilterLoading(false)
    }
  };

  console.log(currentDate,selectedDate, "uguigugvgivouv");
  return (
    <>
      <ToastContainer autoClose={2500} hideProgressBar={true} />
      <div className="mt-4 -mx-5">
        {!key_search_param ? <div className="ml-4 flex items-center" >
          <input checked = {checkboxChecked} onClick={(e) => handleCheckbox(e)} type="checkbox" />
          <span className="font-semibold text-md ml-2 mr-2" >Filter available slots</span>
          { isFilterLoading &&
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-4 w-4" ></div>}
        </div> : null}

        {(screen > 1334 && !msgForFilter) ? (
          <>
            <div className="flex flex-wrap justify-between pb-4">
              <button
                onClick={() =>
                  when_appointment_search_param ? null : changeWeek("backward")
                }
                disabled={
                  (days[0]?.date ===
                  (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1
                    ? moment().add(1, "days").format("MM/DD/yyyy")
                    : moment().format("MM/DD/yyyy")) || (filteredDate[0]?.date == days[0]?.date) )
                }
                type="button"
                className="disabled:opacity-50 py-2 sm:p-2 md:p-2 lg:p-2 mr-2"
              >
                <i
                  className="fa fa-angle-left bg-blue-200 rounded-2xl p-2"
                  aria-hidden="true"
                  style={{ fontSize: "24px" }}
                ></i>
              </button>
              {days.map((res, i) => (
                <button
                  onClick={() => {
                    if (when_appointment_search_param) {
                      return;
                    }
                    setHideSlot(true);
                    getselectedSlot(res.date, i);
                    onDateChange(res.date);
                  }}
                  key={i}
                  type="button"
                  className={`${
                    selectedDate === res.date
                      ? "border-b-2 border-opacity-100"
                      : "border border-brand-biscay2"
                  } border-brand-secondary w-28 sm:w-36 md:w-40 h-16 mx-1 whitespace-nowrap m-1 p-2 border-opacity-5`}
                >
                  <span className="inline-block  font-medium text-sm">
                    {moment(res?.date, "MM/DD/yyyy").format("DD,MMM,yyyy")}
                  </span>
                  <span className="inline-block pl-2  font-medium text-sm">
                    {res?.date === moment().format("MM/DD/yyyy")
                      ? "[" + "Today" + "]"
                      : "[" + res?.vis.split(",")[0] + "]"}
                  </span>
                  {/* <div className='block text-green-400 pb-4'>{i==0 ? getTodaySlotsCount(res.date) + ' ' + 'Slots Available' : i==1? getTodaySlotsCount(res.date) + ' ' + 'Slots Available' :getTodaySlotsCount(res.date) + ' ' + 'Slots Available'}</div> */}
                </button>
              ))}
              <button
                onClick={() =>
                  when_appointment_search_param ? null : changeWeek("forward")
                }
                type="button"
                className="disabled:opacity-50 p-2"
                disabled = { checkboxChecked ? filteredDate[filteredDate.length - 1]?.date == days[days.length - 1]?.date : false }
              >
                <i
                  className="fa fa-angle-right bg-blue-200 rounded-full p-2"
                  aria-hidden="true"
                  style={{ fontSize: "24px" }}
                ></i>
              </button>
            </div>
          </>
        ) : !msgForFilter ? (
          <>
            {" "}
            <div className="flex justify-between">
              <button
                onClick={() =>
                  when_appointment_search_param ? null : changeWeek("backward")
                }
                disabled={
                    (days[0]?.date ===
                    (doctorData?.starDoctor == "1" || doctorData?.starDoctor == 1
                      ? moment().add(1, "days").format("MM/DD/yyyy")
                      : moment().format("MM/DD/yyyy")) || filteredDate[0]?.date == days[0]?.date )
                  }
                type="button"
                className="disabled:opacity-50 p-2 mr-0 sm:mr-2 md:mr-2 lg:mr-2"
              >
                <i
                  className="fa fa-angle-left bg-blue-200 rounded-2xl p-2"
                  aria-hidden="true"
                  style={{ fontSize: "18px" }}
                ></i>
              </button>
              <div className="grid grid-cols-3  justify-around sm:justify-around md:justify-around lg:justify-around pb-4">
                {days.map((res, i) => (
                  <button
                    onClick={() => {
                      if (when_appointment_search_param) {
                        return;
                      }
                      setHideSlot(true);
                      getselectedSlot(res.date, i);
                      onDateChange(res.date);
                    }}
                    key={i}
                    type="button"
                    className={`${
                      selectedDate === res.date
                        ? "border-b-2 border-opacity-100"
                        : "border border-brand-biscay2"
                    } border-brand-secondary w-18 sm:w-36 md:w-36 lg:w-36 h-16 mx-1 whitespace-nowrap m-1 p-2 border-opacity-5`}
                  >
                    <span
                      className="inline-block  font-medium "
                      style={{ fontSize: "10px" }}
                    >
                      {moment(res?.date, "MM/DD/yyyy").format("DD/MM/yyyy")}
                    </span>
                    <span className="hidden sm:inline-block md:inline-block lg:inline-block pl-2  font-medium text-xs sm:text-sm md:text-sm lg:text-sm">
                      {res?.date === moment().format("MM/DD/yyyy")
                        ? "[" + "Today" + "]"
                        : "[" + res?.vis.split(",")[0] + "]"}
                    </span>
                    {/* <div className='block text-green-400 font-medium text-xs sm:text-sm md:text-sm lg:text-sm pb-4'>{res?.date === moment().format('MM/DD/yyyy') && selectedDate === moment().format('MM/DD/yyyy') ? getTodaySlots(res.date, selectedDate,i) + ' ' + 'Slots Available' : getTodaySlots(res.date, selectedDate,i) + ' ' + 'Slots Available'}</div> */}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  when_appointment_search_param ? null : changeWeek("forward")
                }
                type="button"
                className="disabled:opacity-50 py-2 sm:p-2 md:p-2 lg:p-2"
                disabled = { checkboxChecked ? filteredDate[filteredDate.length - 1]?.date == days[days.length - 1]?.date : false }
              >
                <i
                  className="fa fa-angle-right bg-blue-200 rounded-full p-2"
                  aria-hidden="true"
                  style={{ fontSize: "18px" }}
                ></i>
              </button>
            </div>
          </>
        ): <p className="flex justify-center mt-10 font-medium text-sm" >{msgForFilter}</p>}

        {isShow ? (
          <>
            {" "}
            {getTodaySlotsCountMorning(selectedDate) > 0 && (
              <div className="mt-2 mb-5 flex flex-col sm:flex-row md:flex-row lg:flex-row">
                <div className="w-full sm:w-2/6 md:w-2/6 lg:w-2/6 flex space-x-3 justify-center items-center">
                  <img src={ic_morning} alt="right arrow" />
                  <label className="text-sm">Morning Slots</label>
                </div>
                <div className="w-full flex flex-wrap ml-0 sm:ml-4 md:ml-4 lg:ml-4 justify-around">
                  {timeSlots?.morning
                    ?.filter((x) => x.hospitalId === props.hospitalId)
                    .map((res, i) => {
                      console.log(
                        moment(res.time, "LT").format("hh:mm A"),
                        "sdviodshvousdhvod"
                      );
                      if (
                        (res.inPerson === "Y" &&
                          props.appointmentType === "I") ||
                        (res.video === "Y" && props.appointmentType === "V") ||
                        (res.quickConsultation === "Y" &&
                          props.appointmentType === "Q")
                      ) {
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={
                              (when_appointment_search_param
                                ? false
                                : res.isBooked) ||
                              moment(
                                `${selectedDate} ${res.time}`,
                                "MM/DD/yyyy hh:mm A"
                              ).isBefore(
                                doctorData?.starDoctor == "1" ||
                                  doctorData?.starDoctor == 1
                                  ? moment(
                                      `${moment()
                                        .add(1, "days")
                                        .format(
                                          "MM/DD/yyyy"
                                        )} ${moment().hour()}:${moment().minute()}`
                                    )
                                  : moment()
                              ) ||
                              from_time_search_param
                                ? res.time ==
                                  moment(from_time_search_param, "LT").format(
                                    "hh:mm A"
                                  )
                                  ? false
                                  : true
                                : false
                            }
                            onClick={() => {
                              selectTimeIndex({
                                m: true,
                                index: i,
                                time: res.time,
                                hospital: res.hospital,
                                hospitalId: res.hospitalId,
                                interval: res.interval,
                              });
                              setisProcessEnabled(false)
                              if (!hideSlot) {
                                toast("Please Select The Appointment Date");
                              }
                            }}
                            className={`${
                              timeIndex.m && timeIndex.index === i
                                ? " bg-green-500 text-white "
                                : "border text-brand-biscay "
                            } disabled:opacity-50 ${
                              res.isBooked &&
                              !when_appointment_search_param &&
                              " cursor-not-allowed "
                            } p-1 w-20 m-1  rounded text-xs font-medium`}
                          >
                            {res.time}
                          </button>
                        );
                      }
                    })}
                </div>
              </div>
            )}
            {getTodaySlotsCountAfterNoon(selectedDate) > 0 && (
              <div>
                <hr />

                <div className="mt-2 mb-5 flex flex-col sm:flex-row md:flex-row lg:flex-row">
                  <div className="w-full sm:w-2/6 md:w-2/6 lg:w-2/6 flex space-x-3 justify-center items-center">
                    <img src={ic_evening} alt="right arrow" />
                    <label className="text-sm">Afternoon Slots</label>
                  </div>
                  <div className="w-full flex flex-wrap ml-0 sm:ml-4 md:ml-4 lg:ml-4 justify-around">
                    {timeSlots?.afternoon
                      ?.filter((x) => x.hospitalId === props.hospitalId)
                      .map((res, i) => {
                        if (
                          (res.inPerson === "Y" &&
                            props.appointmentType === "I") ||
                          (res.video === "Y" &&
                            props.appointmentType === "V") ||
                          (res.quickConsultation === "Y" &&
                            props.appointmentType === "Q")
                        ) {
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={
                                (when_appointment_search_param
                                  ? false
                                  : res.isBooked) ||
                                moment(
                                  `${selectedDate} ${res.time}`,
                                  "MM/DD/yyyy hh:mm A"
                                ).isBefore(
                                  doctorData?.starDoctor == "1" ||
                                    doctorData?.starDoctor == 1
                                    ? moment(
                                        `${moment()
                                          .add(1, "days")
                                          .format(
                                            "MM/DD/yyyy"
                                          )} ${moment().hour()}:${moment().minute()}`
                                      )
                                    : moment()
                                ) ||
                                from_time_search_param
                                  ? res.time ==
                                    moment(from_time_search_param, "LT").format(
                                      "hh:mm A"
                                    )
                                    ? false
                                    : true
                                  : false
                              }
                              onClick={() => {
                                selectTimeIndex({
                                  a: true,
                                  index: i,
                                  time: res.time,
                                  hospital: res.hospital,
                                  hospitalId: res.hospitalId,
                                  interval: res.interval,
                                });
                                setisProcessEnabled(false)
                                if (!hideSlot) {
                                  toast("Please Select The Appointment Date");
                                }
                              }}
                              className={`${
                                timeIndex.a && timeIndex.index === i
                                  ? " bg-green-500 text-white "
                                  : "border text-brand-biscay "
                              } disabled:opacity-50 ${
                                res.isBooked &&
                                !when_appointment_search_param &&
                                " cursor-not-allowed "
                              } p-1 w-20 m-1  rounded text-xs font-medium`}
                            >
                              {res.time}
                            </button>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            )}
            {getTodaySlotsCountEvening(selectedDate) > 0 && (
              <div>
                <hr />

                <div className="mt-2 mb-5 flex flex-col sm:flex-row md:flex-row lg:flex-row">
                  <div className="w-full sm:w-2/6 md:w-2/6 lg:w-2/6 flex space-x-3 justify-center items-center">
                    <img src={ic_evening} alt="right arrow" />
                    <label className="text-sm">Evening Slots</label>
                  </div>
                  <div className="w-full flex flex-wrap ml-0 sm:ml-4 md:ml-4 lg:ml-4 justify-around">
                    {timeSlots?.evening
                      ?.filter((x) => x.hospitalId === props.hospitalId)
                      .map((res, i) => {
                        if (
                          (res.inPerson === "Y" &&
                            props.appointmentType === "I") ||
                          (res.video === "Y" &&
                            props.appointmentType === "V") ||
                          (res.quickConsultation === "Y" &&
                            props.appointmentType === "Q")
                        ) {
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={
                                (when_appointment_search_param
                                  ? false
                                  : res.isBooked) ||
                                moment(
                                  `${selectedDate} ${res.time}`,
                                  "MM/DD/yyyy hh:mm A"
                                ).isBefore(
                                  doctorData?.starDoctor == "1" ||
                                    doctorData?.starDoctor == 1
                                    ? moment(
                                        `${moment()
                                          .add(1, "days")
                                          .format(
                                            "MM/DD/yyyy"
                                          )} ${moment().hour()}:${moment().minute()}`
                                      )
                                    : moment()
                                ) ||
                                from_time_search_param
                                  ? res.time ==
                                    moment(from_time_search_param, "LT").format(
                                      "hh:mm A"
                                    )
                                    ? false
                                    : true
                                  : false
                              }
                              onClick={() => {
                                selectTimeIndex({
                                  e: true,
                                  index: i,
                                  time: res.time,
                                  hospital: res.hospital,
                                  hospitalId: res.hospitalId,
                                  interval: res.interval,
                                });
                                setisProcessEnabled(false)
                                if (!hideSlot) {
                                  toast("Please Select The Appointment Date");
                                }
                              }}
                              className={`${
                                timeIndex.e && timeIndex.index === i
                                  ? " bg-green-500 text-white "
                                  : "border text-brand-biscay "
                              } disabled:opacity-50 ${
                                res.isBooked &&
                                !when_appointment_search_param &&
                                " cursor-not-allowed "
                              } p-1 w-20 m-1  rounded text-xs font-medium`}
                            >
                              {res.time}
                            </button>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mb-4"></div>
        )}
        {isTimeSlotEmptyForEliteDoctor && !key_search_param && !msgForFilter ? (
          <div className="flex items-center flex-col justify-center">
            {" "}
            <p className="font-medium text-md">
              Select preferred time for doctor appointment
            </p>{" "}
            <div className="relative my-4">
              {
              !timeSelectedFromInput && <span className="absolute top-4 left-4 font-medium text-sm" >Select preferred time <i
              className="fa fa-caret-down pl-2"
              aria-hidden="true"
              // style={{ fontSize: "24px" }}
            ></i></span>
            }
              
            <Calendar inputStyle={{background: "transparent"}} timeOnly showTime hourFormat="12" value={timeSelectedFromInput} onChange={(e) => onCustomSlotSelect(e)}></Calendar>
              {/* <input
                className="border rounded px-2 py-1"
                type="time"
                value={timeSelectedFromInput}
                onChange={(e) => {
                  onCustomSlotSelect(e);
                }}
              /> */}
            </div>
            {isProcessEnabled && (
              <div className="text-center w-full sm:text-right md:text-right lg:text-right pb-4">
                <button
                  onClick={confirmAppointment}
                  disabled={timeSelectedFromInput ? false : true}
                  className={`disabled:opacity-50 bg-brand-secondary text-white w-full sm:w-48 md:w-48 lg:w-48  px-5 py-3 text-sm  font-medium rounded-md`}
                >
                  <b>Proceed</b>
                </button>
              </div>
            )}
          </div>
        ) : null}
        {!isProcessEnabled && timeIndex.time && (
          <div className="flex items-center flex-col justify-center">
            <div className="text-center w-full sm:text-right md:text-right lg:text-right pb-4">
              <button
                disabled={!timeIndex.time || !hideSlot}
                onClick={goToPayment}
                className={`disabled:opacity-50 ${
                  !timeIndex.time && " cursor-not-allowed "
                } bg-brand-secondary text-white w-full sm:w-48 md:w-48 lg:w-48  px-5 py-3 text-sm  font-medium rounded-md`}
              >
                <b>Proceed to Payment</b>
              </button>
            </div>
          </div>
        )}
        {/* <input type= "datetime-local" min = {`${moment(selectedDate).format("YYYY-MM-DD")}T08:30`} max = {`${moment(selectedDate).format("YYYY-MM-DD")}T18:30`} /> */}
      </div>
    </>
  );
}
export default NewDoctorSlots;
