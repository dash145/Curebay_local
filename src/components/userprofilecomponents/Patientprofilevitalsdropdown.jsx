import React from "react";
import { createPopper } from "@popperjs/core";
import DownArrow from '../../Assets/Images/arrow-alt-down@2x.svg';
import profile from '../../Assets/Images/profile-1@2x.svg';
import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, ShoppingCartIcon, MenuIcon, UserCircleIcon } from '@heroicons/react/outline'
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";

const Patientprofilevitalsdropdown = ({ color }) => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
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
     <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className={` flex text-sm rounded-full focus:outline-none`}>
                          {/* <span className="sr-only">Open menu</span>
                          <img src={profile} alt="" /> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={USERPROFILE_ROUTES.MYDETAILS}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                My Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                onClick={''}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
    </>
  );
};

export default function Dropdown() {
  return (
    <>
      <Patientprofilevitalsdropdown color="white" />
    </>
  );
}