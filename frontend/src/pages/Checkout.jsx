import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../featurs/cartSlice";

const Checkout = () => {
  const cartState = useSelector(selectCart);
  let totalCost = cartState.reduce((tot, x) => tot + x.qty * x.price, 0);

  return (
    <div className="scrollbarnone w-full h-screen pt-20 px-32 flex scrollbar-hide mb-10 ">
      <div className="w-2/3 px-4 py-4 overflow-auto scrollbar-hide bg-slate-100 mr-3 ">
        <div>
          <h1>Billing Address</h1>
          <div className="grid grid-cols-2	gap-2">
            <input type="text" />
            <input type="text" />
            <input type="email" />
            <input type="number" />
          </div>
          <input type="text" className="w-full"/>
          <div className="grid grid-cols-3 gap-2">
            <input type="text" placeholder="City"/>
            <input type="text" placeholder="State"/>
            <input type="number" placeholder="pincode"/>
          </div>
        </div>
        <div>
          <h1>Payment Method</h1>
        </div>
      </div>
      <div className="w-1/3 bg-white border border-slate-300 rounded-md h-full flex flex-col">
        <div className="px-10 bg-slate-300">
          <div className={billitemsStyle}>
            <span>Price:</span>
            <span>₹{totalCost}</span>
          </div>
          <div className={billitemsStyle}>
            <span>Delivery Charges :</span>
            <span>₹100</span>
          </div>
          <div className={billitemsStyle}>
            <span>Total Price:</span>
            <span>
              <b>₹{totalCost + 100}</b>
            </span>
          </div>
        </div>
        <div className="border grow  overflow-auto flex flex-col grow auto">
          {cartState.map((x) => {
            return (
              <div className="flex my-3" key={x._id}>
                <div className="w-32 h-32 flex items-center  inline-block  shrink-0">
                  <img className={imgStyle} src={x.images[0]} alt="" />
                </div>
                <div className="inline-block px-2">
                  <h2>{x.name.slice(0, 25)}</h2>
                  <p>qty : {x.qty}</p>
                  <p>₹ {x.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

const imgStyle = "max-w-full max-h-full ";

const billitemsStyle = "flex items-center justify-between my-3";
