import React from "react";
import delet from "../Assets/Images/delete.svg";
import tube from "../Assets/Images/tube.svg";
import avatar from "../Assets/Images/avatar.png";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function LabCart(props) {
  

  const [selectedPreferredDate, setSelectedPreferredDate] = useState();
  const [selectedPreferredLabDate, setSelectedPreferredLabDate] = useState();

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sampleStartTime, setSampleStartTime] = useState('');
  const [sampleEndTime, setSampleEndTime] = useState('');

  useEffect(() => {
    const startTime = props.labDetails.labStartTime ? (new Date(0, 0, 0, props.labDetails.labStartTime.split(":")[0], props.labDetails.labStartTime.split(":")[1])) : '';
  const endTime = props.labDetails.labEndTime ? (new Date(0, 0, 0, props.labDetails.labEndTime.split(":")[0], props.labDetails.labEndTime.split(":")[1])) : '';
  const sampleStartTime = props.labDetails.SCStartTime ? (new Date(0, 0, 0, props.labDetails.SCStartTime.split(":")[0], props.labDetails.SCStartTime.split(":")[1])) : '';
  const sampleEndTime = props.labDetails.SCEndTime ? (new Date(0, 0, 0, props.labDetails.SCEndTime.split(":")[0], props.labDetails.SCEndTime.split(":")[1])) : '';
    setStartTime(startTime);
    setEndTime(endTime);
    setSampleStartTime(sampleStartTime);
    setSampleEndTime(sampleEndTime);
  }, []);
  console.log(JSON.stringify(props.data) , "uifivvuguojblj")
  return (
    <>
      <div className="bg-white m-2 mt-5 p-2">
        <div className="flex">
          <div>
            <img
            // src={avatar}
              src={props.labDetails.hospitalPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${props.labDetails.hospitalPhoto }` : avatar}
              onError={(e) => (e.target.src = avatar)}
              alt="avatar"
              className="w-12 h-12 mt-5"
            />
          </div>
          <div className="p-5">
            <p className="lg:text-sm text-md  text-gray-primary font-medium">{props.labDetails.hospitalName}</p>
            <p className="lg:block hidden text-xs  text-gray-primary">{props?.patientLabTestsOrder[0]?.locationCity }
</p>

            
          </div>
        </div>
        {props.data.map((res, i) => (
          <div>
            {res.status == 1 && (
              <div class="flex bg-white">
              <div class="p-4 w-1/4">
                <div className="md:p-5 h-15 lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                  <img src={tube} alt="tablet" className="h-12 w-12" />
                </div>
              </div>
              <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="md:flex justify-between">
                  <div className="md:w-1/2 mt-1">
                    <div>
                      <p className="text-sm text-gray-800 flex items-center font-medium">
                        {res.labTestName ? res.labTestName :  res.labTestName}
                      </p>

                      <p className="text-sm text-gray-800 flex items-center font-medium mt-2">
                        {res.hospitalName }
                      </p>
                    </div>
                  </div>

                  <div className="w-1/7 flex mt-1">
                    <p className="text-gray-900 leading-none text-xs pt-1">
                      Price :{" "}
                    </p>
                    <p className="text-black font-medium text-sm pl-2">
                      ₹{" "}
                      {parseFloat(
                         res.discountAmount) ? parseFloat(res.discountAmount).toFixed(2) : res.amount
                      }
                    </p>
                    {
                                    parseFloat(
                                      res.discountAmount
                                   ) ? <p className="text-xs line-through text-gray-500  pl-8"> ₹ {res?.amount}</p> : null
                                  }
                  </div>

                  <div className="flex mt-1 justify-end lg:justify-center md:w-1/12">
                    {/* <img src={heart} alt="heart" className=" w-4 mr-2 cursor-pointer" /> */}
                    <DeleteIcon
                    style={{color:"#D22B2B"}}
                      className=" cursor-pointer"
                      onClick={(e) => {
                        props.deleteTest(e, { testId: res.id });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            )}

          </div>
          ))}
     

      </div>
    </>
  );
}
export default LabCart;
