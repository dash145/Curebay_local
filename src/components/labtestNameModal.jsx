import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline'

function LabTestNameModal(props) {
    console.log("props", props)
    const [selectAll, setselectAll] = useState(false);
    useEffect(() => {
      checkCheckAll();
      console.log(props)
    }, [selectAll,props]);
  
    const selectAllChk = (e) =>{
      if(e.target.checked) {
        setselectAll(true);
      } else {
        setselectAll(false);
      }
      // checkCheckAll()
      props.toggleSelectAll(e, props?.data[0]);
    }
  
    const selectChk = (e, res) =>{
      checkCheckAll();
      // res.status = e.target.checked ? 1:0;
      props.handleChange(e, res);
      
    }
  
    const checkCheckAll = () =>{
      setselectAll(false);
      if(props.data && props.tests.length) {
        const count = props.tests.filter((x) => ((x.parentTestCode === props.data[0].parentTestCode) && x.status == 1)).length;
        // console.log(props.tests.filter((x) => ((x.parentTestCode === props.data[0].parentTestCode))))
        // console.log(count)
        // console.log(props.data.length)
        if(count == props.data.length) {
          setselectAll(true);
        }
      }
      
    }

    console.log(props.data , "asasdjbvkjsdvab")
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">
                                <h1 className="text-medium font-medium text-2xl text-blue-900 ">Test Lists</h1>
                                <XIcon onClick={() => props.onClose()} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>
                            <div className="h-52 overflow-auto hide-scroll-bar">
                            <div className="flex space-x-3 space-y-1">
                  <input
                    type="checkbox"
                    className="form-checkbox mt-2.5"
                    onChange={(e) =>selectAllChk(e)}
                    // value={res}
                    /**Below Code to show partial Select checkbox */
                    ref={(input) => {
                      if (input) {
                        input.indeterminate =
                          props.tests.length > 0 &&
                          props.tests.length < props?.data.length;
                      }
                    }}
                    checked={selectAll}
                  />
                  <p key={"all"}>All</p>
                </div>
                {props?.data.map((res, i) => (
                  <div className="flex space-x-3 space-y-1">
                    <input
                      type="checkbox"
                      className="form-checkbox mt-2.5"
                      onChange={(e) => selectChk(e, res)}
                      // value={res}
                      /**Below Code to show partial Select checkbox */
                      // ref={(input)=>{
                      //     if(input){
                      //         input.indeterminate = !input.indeterminate;
                      //     }
                      // }}
                      checked={props?.tests?.filter(
                        (hos) => ((res.code === hos.code) && hos.status === 1 && (hos.hospitalId === res.hospitalId))
                      ).length}
                    />
                   {res.serviceDiscountPercentage ? (<p key={i}>{ res.alternateLabTestName ?  res.alternateLabTestName :  res.labTestName} - <span class="line-through">{res.amount +" INR"}</span> <span class="text-red-500">{res.amount - ((res.amount/100) * res.serviceDiscountPercentage) +" INR"}</span><span>{"(" + res.serviceDiscountPercentage+ "% off)"}</span></p>)
                    :(<p key={i}>{ res.alternateLabTestName ?  res.alternateLabTestName :  res.labTestName} - <span>{res.amount +" INR"}</span></p>)}
                  </div>
                ))}
                                {/* {props?.data.map((res, i) => (
                                    <div className="flex">
                                        <span className="mr-2">{i + 1}. </span>
                                        <p key={i}>{res.name}</p>
                                    </div>
                                ))} */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default LabTestNameModal;