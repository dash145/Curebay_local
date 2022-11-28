import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import more from "../../Assets/Images/More .svg";

function AddVitalMenu(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex justify-end space-x-2">
      <>
        <Menu as="div" className="ml-3 relative">
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`p-2 flex text-sm rounded-full focus:outline-none`}
                >
                  <img src={more} alt="more" />
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
                  className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {props.menus?.map((menu, i) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={menu.onClick}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {menu.name}
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </>
    </div>
  );
}

export default AddVitalMenu;
