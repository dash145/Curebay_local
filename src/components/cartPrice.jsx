import React, { useState } from "react";
import axios from "axios";

import Down_Arrow from "../.../../Assets/Images/Down_Arrow.svg";
import Up_Arrow from "../.../../Assets/Images/Up_Arrow.svg";
import Markk from "../.../../Assets/Images/Markk.png";
import radiounactive from "../.../../Assets/Images/radiounactive.svg";

function CartPrice(props) {
  const [verify, updateVerify] = useState("");
  const [tId, setTId] = useState("");
  const [discount, updateDiscount] = useState(0);
  const [isShowCouponList, setShowCouponList] = useState(true);


  const hideShow = () => {
    if (isShowCouponList) {
      setShowCouponList(false);
    } else {
      setShowCouponList(true);
    }
  };

  console.log(props, "sdsjldbsdkj");

  return (
    <>
      <div class="md:w-2/6 lg:w-full md:mr-4 mt-10 md:ml-2">
        <div
          class=" bg-white-600 w-full   rounded-lg  py-3 px-7 antialiased "
          style={{ boxShadow: "0px 13px 20px rgba(0, 0, 0, 0.05)" }}
        >
          <p class="text-sm lg:text-base font-normal text-gray-800">Enter Coupon</p>

          <input
            placeholder="Enter Coupon Code"
            name="code"
            value={props.couponCode}
            onChange={(e) => props.onGetCouponCode(e.target.value)}
            className=" mt-4 bg-transparent  font-medium text-gray-500  text-left pl-2 py-2 w-full lg:w-96 border border-brand-secondary rounded-lg text-sm"
          />
          <div className="flex gap-4 w-full">
            <button
              className="btn btn-primary my-3 w-96  text-sm h-12 rounded-lg text-white font-normal"
              style={{background:"#66B889"}}
              onClick={props.coupon}
            >
              Select the coupon and click to apply
            </button>


          </div>

          <span
              className={
                props.isCouponApply
                  ? `text-green-600 mt-3 `
                  : `text-red-600 mt-3  `
              }
            >
              {props.couponVerify === "" ? "" : props.couponVerify}
            </span>

          <div
          class=" bg-white-600 w-full   rounded-lg  py-3 px-4 md:px-7 antialiased mt-4 "
          style={{ boxShadow: "0px 13px 20px rgba(0, 0, 0, 0.05)" }}
        >
          <p
            class="text-sm lg:text-base font-normal text-gray-800 leading-24 mb-2 "
            style={{ color: "#000000" }}
          >
            Price Details
          </p>

          {props.m_Amount > 0 ? (
            <div>
              <div className="flex justify-between">
                <p className=" text-sm lg:text-base font-normal text-gray-800 font-medium">Medicine Bill</p>
                <div className="md:flex">
                  <p></p>

                  {props.m_DisAmount >0 && props.m_DisAmount!=props.m_Amount && (
                    <p class="text-red-700">
                      ₹ {parseFloat(props.m_DisAmount).toFixed(2)}/-
                    </p>
                  )}

                  {props.m_DisAmount > 0 && props.m_DisAmount!=props.m_Amount ? (
                    <p class="line-through">
                      ₹ {parseFloat(props.m_Amount).toFixed(2)}/-{" "}
                    </p>
                  ) : (
                    <p class="text-gray-800">
                      ₹ {parseFloat(props.m_Amount).toFixed(2)}/-{" "}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {props.l_Amount > 0 ? (
            <div>
              <div className="flex justify-between">
                <p className=" text-sm lg:text-base font-normal text-gray-800 font-medium">Lab Test Bill</p>
                <div className="md:flex">
                  <p></p>

                  {props.l_DisAmount > 0 &&  props.l_DisAmount !=props.l_Amount && (
                    <p class="text-red-700">
                      ₹ {parseFloat(props.l_DisAmount).toFixed(2)}/-
                    </p>
                  )}

                  {props.l_DisAmount > 0 &&  props.l_DisAmount !=props.l_Amount ? (
                    <p class="line-through">
                      ₹ {parseFloat(props.l_Amount).toFixed(2)}/-{" "}
                    </p>
                  ) : (
                    <p class="text-gray-800">
                      ₹ {parseFloat(props.l_Amount).toFixed(2)}/-{" "}
                    </p>
                  )}
                </div>
              </div>
               </div>
          ) : null}

          {/* <div className="flex justify-between mt-3">

<p className="text-gray-800 ">Delivery Charge</p>

<p className="text-gray-800 ">-₹ 0/-</p>

</div> */}

          {/* {props.couponApplyAmt>0 && props.m_Amoun>0 ?

          <div className="flex justify-between mt-3">
            <p className="text-gray-800 font-medium">Coupon</p>
            <p className="text-red-800 ">- {parseFloat(props.couponApplyAmt).toFixed(0)}%</p>
          </div>:null} */}

          {props.totalDiscountAmount > 0 ? (
            <div className="flex justify-between mt-3">
              <p className="text-gray-800 font-medium">Discount</p>
              <p className="text-red-700 ">
                -₹ {parseFloat(props.totalDiscountAmount).toFixed(2)}/-
              </p>
            </div>
          ) : null}
          <hr className="mt-2 mb-2" />
          <div className="flex justify-between mt-3">
            <p className="text-brand-secondary font-medium"> Total</p>
            <p className="text-brand-secondary font-medium">
              ₹ {parseFloat(props.totalAmount).toFixed(2)}/-
            </p>
          </div>
        </div>

          <hr className="mt-8 mb-2" />

          <div>
            <div className="flex my-3">
              <p
                className="text-sm lg:text-base font-normal  not-italic "
                style={{ color: "#005D8D" }}
              >
                See all Coupon Code List
              </p>

              <img
                src={isShowCouponList ? Down_Arrow : Up_Arrow}
                alt="plus"
                onClick={(e) => {
                  hideShow();
                  // alert("djdj");
                  // if (quantity <= pharmaProductsList[0].quantity)
                  //   setQuantity(quantity + 1);
                }}
                className="w-3 cursor-pointer ml-auto"
              />
            </div>

            {isShowCouponList && (
              <div className="flex flex-col gap-4 ">
                {props.couponList.map((item, i) => {
                  return (
                    <div
                    key={i}
                      className="border-radius: 10px rounded-xl p-3 cursor-pointer"
                      style={{
                        border: "1px solid rgba(0, 93, 141, 0.15)",
                        background: !item?.isDefault
                          ? "rgba(188, 235, 255, 0.12)"
                          : "	rgba(25, 135, 84,0.23)",
                      }}
                      onClick={() =>  !item?.isDefault  ?props.onClickAt(item, i) :null}
                    >
                      <div className="flex justify-end mb-2">
                        {item?.isDefault && (
                          <img
                            src={Markk}
                            alt="plus"
                            className="mr-2    mt-1"
                            checked={item?.isDefault == true ? true : false}
                          />
                        )}

                        <p
                          className="text-sm lg:text-base font-normal leading-6 not-italic"
                          style={{ color: "#3A3A3A" }}
                        >
                          {item.title}
                        </p>
                      </div>

                      <p className="text-sm lg:text-base font-normal leading-6 not-italic">
                        {item.voucherCode}
                      </p>
                      <p
                        className="text-sm lg:text-base font-normal leading-6 not-italic font-[500]"
                        style={{ color: "#005D8D" }}
                      >
                        {item.voucherCampDescription}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>


      </div>
    </>
  );
}
export default CartPrice;
