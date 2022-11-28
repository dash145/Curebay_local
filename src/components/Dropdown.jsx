import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import DownArrow from '../Assets/Images/arrow-alt-down@2x.svg';
import { useHistory } from "react-router";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

const DropdownComponent = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  useEffect(()=>{
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
  },[dropdownPopoverShow])


  const history = useHistory();
  const redirectTo = (event, location) => {
    event.preventDefault();
    setDropdownPopoverShow(!dropdownPopoverShow)
    history.push(location)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap -ml-2">
        <div className="w-full">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "flex items-center lg:pr-9 lg:pl-2 xl:px-3 py-2 rounded-md text-sm font-medium hover:text-brand-lightgreen text-brand-primary  outline-none focus:outline-none  transition-all  mx-2 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={e =>{redirectTo(e,APP_ROUTES.COMINGSOON)}}
            >
              Allied Services
              {/* <img className="" src={DownArrow} alt="arrow-down" /> */}
            </button>
            {/* <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={e =>{redirectTo(e,APP_ROUTES.COMINGSOON)} }
              >
                Allied Services
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default function Dropdown() {
  return (
    <>
      <DropdownComponent color="white" />
    </>
  );
}
