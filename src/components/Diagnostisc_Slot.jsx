import React, { useState } from "react";
import arroww from "../Assets/Images/arrowdown.svg";
import moment from "moment";
import { useEffect } from "react";
import { useLocation } from "react-router";
function Slot(props) {
  const location = useLocation();
  const { state } = location;
  const { labStartTime, labEndTime } = state;
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/yyyy")
  );
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState("0");
  const getDays = () => {
    let days = [];
    let daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      days.push(
        moment(currentDate, "DD/MM/yyyy").add(i, "days").format("DD/MM/yyyy")
      );
    }
    setDays(days);
  };

  const OnSelect = (val) => {
    setSelectedSlot(val);
  };

  const changeWeek = (val) => {
    if (val === "forward") {
      var newDate = moment(days[6], "DD/MM/yyyy")
        .add(1, "days")
        .format("DD/MM/yyyy");
      setCurrentDate(newDate);
    }
    if (val === "backward") {
      newDate = moment(days[0], "DD/MM/yyyy")
        .subtract(7, "days")
        .format("DD/MM/yyyy");
      setCurrentDate(newDate);
    }
  };

  const TimeSlots = (s, e) => {
    var sTime = moment(s, "hh:mm A");
    var eTime = moment(e, "hh:mm A");
    var slot = [];
    while (sTime <= eTime) {
      slot.push({
        time: new moment(sTime).format("hh:mm A"),
        text: `${new moment(sTime).format("hh:mm A")} to ${moment(sTime)
          .add(30, "minutes")
          .format("hh:mm A")}`,
      });
      sTime.add(30, "minutes");
    }
    setSlots(slot);
  };

  useEffect(() => {
    getDays();
  }, [currentDate]);
  useEffect(() => {
    if (state.id) {
      let stime = labStartTime ? labStartTime : "9:00";
      let etime = labEndTime ? labEndTime : "14:00";
      TimeSlots(stime, etime);
    }
  }, []);
  return (
    <div className="mt-4 mx-4">
      {props.hide && (
        <div className="w-60 h-8 border border-gray-300 rounded-md flex justify-between px-3">
          <p className=" text-sm text-gray-400 pl-2 pt-1">
            Choose Your Diagnostics
          </p>
          <img src={arroww} alt="arrow" className="w-4 " />
        </div>
      )}
      <br />
      <div className="flex">
        <div
          onClick={() => setAppointmentType("0")}
          className={
            appointmentType === "0"
              ? "bg-green-500 rounded-lg  z-10"
              : " border border-r-0 left-3 rounded-lg  relative"
          }
        >
          <button
            className={`h-12  w-32 text-base  ${appointmentType === "0" ? "text-white" : "text-brand-primary"
              } font-medium`}
          >
            Home Sample
          </button>
        </div>
        <div
          className={
            appointmentType === "0"
              ? "border-r border-t border-b rounded-lg  relative right-3"
              : "bg-green-500 rounded-lg  z-10"
          }
        >
          <button
            onClick={() => setAppointmentType("1")}
            className={`h-12 w-32 text-base font-medium ${appointmentType === "0"
              ? "text-brand-primary bg-white-500"
              : "text-white"
              }`}
          >
            In Lab
          </button>
        </div>
      </div>
      <div className="my-6 flex lg:flex-wrap  ">
        <button
          onClick={() => changeWeek("backward")}
          disabled={days[0] === moment().format("DD/MM/yyyy")}
          type="button"
          className="disabled:opacity-50 border rounded-lg w-20 h-12 mr-3"
        >
          <i
            className="pt-1 fa fa-angle-left"
            aria-hidden="true"
            style={{ fontSize: "32px" }}
          ></i>
        </button>
        {days.map((res, i) => (
          <button
            onClick={() => {
              setSelectedDate(res);
            }}
            key={i}
            type="button"
            className={`${selectedDate === res
              ? "bg-green-500"
              : "border border-brand-biscay2"
              } rounded-lg border w-28 h-12 mx-3`}
          >
            <p
              className={` ${selectedDate !== res ? "text-brand-biscay2" : "text-white"
                }  pt-1 font-medium  text-sm`}
            >
              {moment(res, "DD/MM/yyyy").format("ddd")}
            </p>
            <p
              className={` ${selectedDate !== res ? "text-brand-biscay2" : "text-white"
                } font-medium text-sm  pb-2`}
            >
              {moment(res, "DD/MM/yyyy").format("DD")}
            </p>
          </button>
        ))}
        <button
          onClick={() => changeWeek("forward")}
          type="button"
          className="rounded-lg border w-20 h-12 ml-3"
        >
          <i
            className="pt-1 fa fa-angle-right"
            aria-hidden="true"
            style={{ fontSize: "32px" }}
          ></i>
        </button>
      </div>
      <br />
      <div className="pb-4 w-full">
        <p className=" text-2xl font-normal text-brand-primary">Timings</p>
        <div className="w-2/3">
          {slots.map((res, i) => (
            <button
              onClick={() => {
                OnSelect(res.time);
              }}
              type="button"
              className={`border p-1 m-1 rounded text-xs font-normal ${selectedSlot === res.time
                ? "text-white bg-green-500"
                : "text-brand-primary"
                }`}
            >
              {res.text}
            </button>
          ))}
        </div>
      </div>
      <div className="text-right pb-4">
        <p className="text-lg text-gray-600 font-medium pl-2">
          ₹ {props.data.amount}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={(e) => {
              let date = moment(
                `${selectedDate} ${selectedSlot}`,
                "DD/MM/yyyy hh:mm a"
              ).format("YYYY-MM-DD HH:mm:ss");
              props.add(e, date, appointmentType === "0" ? "N" : "Y");
            }}
            disabled={!selectedSlot || props.isLoading}
            className="bg-brand-secondary text-white px-5 py-3 text-sm  font-medium rounded-xl disabled:opacity-50"
          >
            {/* <b>Proceed to Payment</b> */}
            <b>Add to Cart</b>
            {props.loading && (
              <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5" />
            )}
          </button>
        </p>
      </div>
    </div>
  );
}
export default Slot;
