import React from 'react';
import { useHistory } from 'react-router';
import EmpCart from '../Assets/Images/emptyCart.svg';

const EmptyCart = () => {
  console.log("TEst");
    const history = useHistory();
    const message = {
        buttonText: 'Continue Shopping',
        message1:"Your cart is empty. Please add items to the cart."
    };
    const redirectTo = (event) => {
        event.preventDefault();
        history.goBack();
    };
    return (
        <div className=" rounded-md  bg-white m-16  mx-auto flex gap-2 flex-col items-center justify-center w-3/4">
            <img src={EmpCart} alt="" className="w-72 h-72" />
            <div className=" text-base text-gray-800  font-semibold text-center">{message.message1}</div>
            <div className="textgray-3 text-base  text-center">{message.message2}</div>
            <button onClick={redirectTo} className={`mt-3 mb-6 py-2 px-4 text-white disabled:cursor-default rounded transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none`} style={{background:"#66B889"}}> {message.buttonText}
            </button>
        </div>
    );
};

export default EmptyCart;
