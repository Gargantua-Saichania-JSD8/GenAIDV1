import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Navbar/Nav";
import NavMobile from "../components/Navbar/NavMobile";
import CardCart from "../components/Product/CardCart";
import CardSum from "../components/Checkout/CardSum";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ProductContext } from "../context/ProductProvider";
import { CartContext } from "../context/CartProvider";
const Cart = () => {
  const { cartItems, toCheckout, setToCheckout } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  console.log(total);

  const updateTotal = (newTotal) => {
    setTotal(newTotal);
    console.log("total is ", total);
  };

  useEffect(() => {
    // setToCheckout(cartItems);
    updateTotal();
  }, [toCheckout]);

  // useEffect(() => {
  //   setToCheckout([]);
  // }, [total]);

  const { token } = useContext(AuthContext);
  const isLoggedIn = token !== null;

  return (
    <>
      <Nav back title="รถเข็น" />

      <div className="py-16 lg:py-40  lg:w-[80%] lg:place-self-center lg:flex lg:gap-7 ">
        <div className="lg:w-[70%] ">
          {cartItems.map((item) => (
            <CardCart key={item.productid} cartData={item} />
          ))}
        </div>
        <div className="lg:w-[30%] pb-3 lg:pt-6 text-center">
          <CardSum onTotalUpdate={updateTotal} />
          <div className="hidden lg:block ">
            
            <Link to="/checkout">
              <button className="bg-ga-primary  text-white rounded-md p-2 w-40 text-xl mt-7">
                สั่งสินค้า
              </button>
            </Link>
          </div>
        </div>
        <NavMobile checkout total={total} />
      </div>
    </>
  );
};

export default Cart;
