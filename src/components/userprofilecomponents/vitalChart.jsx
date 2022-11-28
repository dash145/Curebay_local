/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import hearts from "../../Assets/Images/heart.svg";
import { Bar } from "react-chartjs-2";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import AddVitalMenu from "./addVitalMenu";
import Addvitalspopup from "./Addvitalspopup";

function Myvitals(props) {
  const [data, setData] = useState([]);
  const [showEnterVitals, setShowEnterVitals] = useState(false);

  const userData = useSelector((state) => state.authReducer.patientData);
  console.log("userData", userData);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!userData?.id) {
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
  }, [history, location,userData?.id]);

  const addVitals = (event, det) => {
    event.preventDefault();
    console.log(det);
    setShowEnterVitals(true);
  };

  useEffect(() => {
    setData({
      labels: ["1/7", "8/7", "15/7", "22/7", "28/7"],
      datasets: [
        {
          label: "",
          data: [110, 120, 130, 140, 180],
          backgroundColor: ["#bcebff"],
          borderColor: ["#bcebff"],
          borderWidth: 0,
        },
      ],
    });
  }, [setData]);

  return (
    <>
      <div className="w-full p-4 border border-gray-200 rounded-xl justify-between my-5">
        <div className="flex justify-between">
          <div className="flex space-x-10">
            <p className="text-lg font-medium  ">
              Blood Pressure
            </p>
            <p className="text-sm font-normal text-gray-primary   pt-1 ">
              RR : 12-18 Breaths/min
            </p>
          </div>
          <AddVitalMenu
            menus={[
              {
                name: "Add",
                onClick: (e) => {
                  addVitals(e, props.data);
                },
              },
            ]}
          />
        </div>

        <div className="lg:flex space-x-10 justify-between">
          <div className="h-44">
            <Bar
              data={data}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        drawOnChartArea: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                      },
                    },
                  ],
                },
              }}
            ></Bar>
          </div>
          <div className="lg:block  lg:px-10 px-24">
            <div className="flex lg:space-x-8 space-x-10 py-2 pl-2 ">
              <h2 className="lg:text-sm font-medium text-brand-secondary ">
                SYS
              </h2>
              <img src={hearts} alt="more" />
            </div>
            <div className="flex lg:justify-center">
              <p className="text-2xl text-brand-secondary text-center pt-10">
                {props.data[0]?.systolic}&nbsp;
                <span className="text-base">mm/Hg</span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:flex space-x-10 justify-between">
          <div className="h-44">
            <Bar
              data={data}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            ></Bar>
          </div>
          <div className="lg:block lg:px-10 px-24">
            <div className="flex lg:space-x-8 space-x-10 py-2 pl-2">
              <h2 className="text-sm font-medium text-brand-secondary ">
                DIA
              </h2>
              <img src={hearts} alt="more" />
            </div>
            <div className="flex lg:justify-center">
              <p className="text-2xl text-brand-secondary text-center pt-10">
                {props.data[0]?.diastolic}&nbsp;
                <span className="text-base">mm/Hg</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showEnterVitals ? (
        <Addvitalspopup
          title={"Blood Pressure"}
          closePopup={() => setShowEnterVitals(!showEnterVitals)}
          userCode={userData.code}
          data={props.data}
        ></Addvitalspopup>
      ) : null}
    </>
  );
}
export default Myvitals;
