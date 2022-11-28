import React from 'react'
import close from '../Assets/Images/closee.svg'
import Dob from '../Assets/Images/calendar.svg'

function MedicalCondition() {
    return (
      <>
      <div className="flex justify-center py-10">
      <div className="w-6/12 shadow-lg bg-white-600  h-112 p-5 antialiased justify-between border border-gray-500">
                    <div className="pl-2 pr-5  flex items-center justify-between">
                        <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">Add Medical Condition</p>
                        <div className="flex space-x-6">
                        <img src={close} alt="close" className="w-4"/>
                        </div>
                       
                    </div>
                    <hr className="mt-2" /> 


                    <div className="flex justify-between pt-5">
                        <div className="flex justify-center">
                            <div className="w-52 h-80 bg-green-100 border-dashed border-2  border-gray-400  py-16  text-center">
                                <svg className="h-12 w-12 text-brand-secondary ml-20"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/> 
                                <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /> 
                                <polyline points="9 15 12 12 15 15" />  <line x1="12" y1="12" x2="12" y2="21" /></svg>
                                <p className="text-xs font-medium">Drag and drop documents</p>
                            <div className="flex justify-center mt-5 space-x-3">
                                <button className="text-xs bg-brand-secondary text-white font-normal py-2 px-2 rounded">Use camera</button>
                                <button className="text-xs bg-brand-secondary text-white font-normal py-2 px-2 rounded">Browse File</button>
                            </div>
                        </div>
                    </div>


                    {/*  */}

                    <div>  <p className="pl-12 pb-2 text-sm text-gray-700 font-medium">Personal Details</p>
                                    <div className="flex space-x-12 pt-4 pl-12">
                                        <div className="relative">
                                            <div className="flex">
                                               
                                                <select className="w-36  py-2 outline-none peer text-xs text-gray-700  border-b-2 border-gray-300 ">
                                                    <option className="py-1 text-xs">Enter Relationship</option>
                                                    <option className="py-1">Option 2</option>
                                                    <option className="py-1">Option 3</option>
                                                </select>
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record For</label>
                                        </div>
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className=" text-xs peer w-36  h-8  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="DD/MM/YYYY" />
                                                <img src={Dob} alt="my photo" ></img>
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record On</label>
                                        </div>
                                    </div>


                                    <div className="pl-12">

                                        <p className="text-gray-700 font-medium text-sm mt-4">Are you suffering from any medical condition?</p>
                                    </div>
                                    <div className=" flex space-x-8 pl-12">

                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" className="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">Yes</div>
                                        </div>

                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" className="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">No</div>

                                        </div>
                                    </div>

                                      <div className="flex space-x-12 pt-4 pl-12">
                                        <div className="relative">
                                            <div className="flex">
                                               <lable className="py-2 w-36 text-xs text-gray-700 border-b-2 border-gray-300">Enter Medical History </lable>
                                               
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs 
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
                                            peer-focus:text-gray-600 peer-focus:text-sm">Medical history name<span className="text-red-500">*</span></label>
                                        </div>
                                        <div className="relative">
                                                <select className="w-36  py-2 outline-none peer text-xs text-gray-700 border-b-2 border-gray-300 ">
                                                    <option className="py-1 text-xs ">Please Select</option>
                                                    <option className="py-1">Option 2</option>
                                                    <option className="py-1">Option 3</option>
                                                </select>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs 
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
                                            peer-focus:text-gray-600 peer-focus:text-sm">Illness Type<span className="text-red-500">*</span></label>
                                        </div>
                                    </div>




                                    
                                    <div className="flex space-x-12 pt-4 pl-12 pt-8">
                                    <div className="relative">
                                            <div className="flex">
                                            <lable className="py-2 w-36 text-xs text-gray-700 border-b-2 border-gray-300">Enter Doctor name </lable>
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs 
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
                                            peer-focus:text-gray-600 peer-focus:text-sm">Doctor name </label>
                                        </div>
                                        <div className="relative">
                                            <div className="flex">
                                               <lable className="py-2 w-36 text-xs text-gray-700 border-b-2 border-gray-300">Enter Information  </lable>
                                               
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs 
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
                                            peer-focus:text-gray-600 peer-focus:text-sm">Additional Notes<span className="text-red-500">*</span></label>
                                        </div>
                                    </div>

                                    <div className="flex space-x-12 pt-4 pl-12 pt-8">
                                    <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className=" text-xs peer w-36  h-8  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="DD/MM/YYYY" />
                                                <img src={Dob} alt="my photo" ></img>
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">End date</label>
                                        </div>
                                        </div>


                                    <div className="flex justify-end mt-3">

                                        <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Save Data </button>
                                    </div>

                        </div>


                    </div>


{/*  */}

                           





























      </div>
      </div>
   </>
  );
}
export default MedicalCondition;