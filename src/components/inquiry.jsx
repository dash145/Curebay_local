/* This example requires Tailwind CSS v2.0+ */
import React from 'react';



const Inquiry = (props) => {

    return (
        <>
            <div className="grid sm:grid-cols-2  px-2">
                <div className="p-3 bg-brand-alabaster">
                    <img
                        width="0"
                        height="0"
                        className="w-full object-cover sm:h-full sm:w-3/4 md:w-full md:h-3/4"
                        src="login.svg"
                        alt="banner"
                    />
                    <div className="font-medium text-brand-primary  text-xl text-center">COMING SOON</div>
                    <div className="text-xl w-2/3 text-gray-primary p-1 font-normal ml-24 text-center">
                        We will come super soon with this service. Till then you can avail other services.
                        Stay Safe , Stay Health.
                    </div>
                </div>
                <div className="items-center bg-white mt-20 h-3/4 py-6 w-3/5 shadow-lg  rounded-lg ">
                    <div className="text-center  text-xl">
                        <p className="font-medium text-brand-primary">{'Get Notifed'}
                        </p>
                    </div>
                    <div className="mt-3 mx-6">
                        <hr />
                    </div>
                    <div className="flex flex-col w-full  sm:px-6">

                        <div className="py-4">
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
                                    <div className="flex w-full mt-8">
                                        <button
                                            className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}>
                                            Notify Me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inquiry;
