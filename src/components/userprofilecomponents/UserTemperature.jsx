/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import AddVitalMenu from "./addVitalMenu";
import Addvitalspopup from "./Addvitalspopup";

function Temperature(props) {
  const userData = useSelector((state) => state.authReducer.patientData);
  console.log("userData", userData);

  const history = useHistory();
  const location = useLocation();

  const [showEnterVitals, setShowEnterVitals] = useState(false);

  const addVitals = (event, det) => {
    event.preventDefault();
    console.log(det);
    setShowEnterVitals(true);
  };

  useEffect(() => {
    if (!userData?.id) { 
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
  }, [history,userData.id,location]);

  return (
    <div className="w-full p-4 border border-gray-200 rounded-xl justify-between my-5">
      <div className="flex justify-between">
        <p className="text-lg font-medium  ">{props.title}</p>
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

      <div className="flex justify-between pt-3">
        <p className="text-sm font-medium text-brand-secondary ">
          {props.subtitle}
        </p>
        <img src={props.img} alt="temp" />
      </div>
      {props?.temp && (
        <div className="flex justify-between mt-11  mx-5">
          <div className="text-center">
            <p className="text-md text-gray-primary font-semibold ">
              Low
            </p>
            <span className="text-2xl text-gray-primary font-normal ">
              {props.data[0]?.temperature}{" "}
              <span className="text-base text-gray-primary font-normal ">
                °F
              </span>
            </span>
          </div>
          <div className="text-center">
            <p className="text-md text-gray-primary font-semibold ">
              Avg
            </p>
            <span className="text-2xl text-gray-primary font-normal ">
              {props.data[0]?.temperature}{" "}
              <span className="text-base text-gray-primary font-normal ">
                °F
              </span>
            </span>
          </div>
          <div className="text-center">
            <p className="text-md text-gray-primary  font-semibold ">
              High
            </p>
            <span className="text-2xl text-gray-primary font-normal ">
              {props.data[0]?.temperature}{" "}
              <span className="text-base text-gray-primary font-normal ">
                °F
              </span>
            </span>
          </div>
        </div>
      )}
      {!props.temp && (
        <div className="p-3 text-center mt-8">
          <span className=" text-2xl font-normal text-brand-secondary text-montserrat">
            {props.text}&nbsp;
            <span className="text-base font-normal text-brand-secondary text-montserrat">
              {props.minText}
            </span>
          </span>
        </div>
      )}
      {showEnterVitals ? (
        <Addvitalspopup
          title={props.title}
          closePopup={() => setShowEnterVitals(!showEnterVitals)}
          userCode={userData.code}
          data={props.data}
        ></Addvitalspopup>
      ) : null}
    </div>
  );
}
export default Temperature;
