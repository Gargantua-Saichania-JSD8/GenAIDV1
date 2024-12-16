import React, { useState, useContext, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import QuantityInput from "./QuantityInput";
import { AuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartProvider";

const CardCart = ({ cartData, isCheckOut }) => {
  const { token } = useContext(AuthContext);
  const { cartItems, addToCart, delCart, setToCheckout, toCheckout } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(cartData.quantity);
  const [previousQuantity, setPreviousQuantity] = useState(cartData.quantity);

  // Track the checked state for this specific item
  const isChecked = toCheckout.some((item) => {
    console.log(`Checking if item with id ${item.productid} is in to Checkout`);
    return item.productid === cartData.productid;
  });

  useEffect(() => {
    setQuantity(cartData.quantity); // Sync quantity with cartData when component loads
  }, [cartData.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity !== previousQuantity) {
      setQuantity(newQuantity);
      addToCart(cartData, newQuantity);
      setPreviousQuantity(newQuantity);

      if (newQuantity > 0) {
        setToCheckout((prevToCheckout) =>
          prevToCheckout.map((item) =>
            item.productid === cartData.productid
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        setToCheckout((prevToCheckout) =>
          prevToCheckout.filter((item) => item.productid !== cartData.productid)
        );
      }
    }
  };

  // const handleCheckboxChange = (event) => {
  //   console.log(
  //     `Checkbox with id ${cartData.productid} is ${
  //       event.target.checked ? "checked" : "unchecked"
  //     }`
  //   );
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     setToCheckout([...toCheckout, cartData]); // Add to checkout
  //     console.log(
  //       `Added item with id ${cartData.productid} to checkout`,
  //       toCheckout
  //     );
  //   } else {
  //     setToCheckout(
  //       toCheckout.filter((item) => item.productid !== cartData.productid)
  //     ); // Remove from checkout
  //     console.log(
  //       `Removed item with id ${cartData.productid} from checkout`,
  //       toCheckout
  //     );
  //   }
  // };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setToCheckout((prevToCheckout) => [...prevToCheckout, cartData]); // Add to checkout
    } else {
      setToCheckout(
        (prevToCheckout) =>
          prevToCheckout.filter((item) => item.productid !== cartData.productid) // Remove from checkout
      );
    }
  };

  return (
    <div className="flex  justify-evenly bg-white p-2 h-44  items-center max-w-96 mx-auto rounded-xl my-6 lg:px-10 lg:min-w-full lg:mx-0 lg:justify-between">
      <div className="flex gap-2 h-full w-[40%] lg:w-[15%]">
        <div className="flex items-center">
          {isCheckOut ? (
            ""
          ) : (
            <input
              type="checkbox"
              name={"check" + cartData.productid}
              id={"check" + cartData.productid}
              className="m-auto w-4 h-4"
              onChange={handleCheckboxChange}
              checked={isChecked} // Set individual checkbox checked state
            />
          )}
        </div>
        <div className="h-full">
          <img
            className="h-full w-auto object-contain"
            src={cartData.image}
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col flex-1s lg:flex-row lg:justify-between lg:gap-14">
        <div>
          <span className="text-lg">{cartData.productname}</span>
        </div>

        <div className="text-ga-secondary text-2xl font-bold">
          {cartData.price}.-{" "}
        </div>
        <div className="flex justify-end lg:justify-start">
          {isCheckOut ? (
            ""
          ) : (
            <QuantityInput onChange={handleQuantityChange} value={quantity} />
          )}
        </div>
      </div>

      <div className="self-start m-3 lg:self-center">
        {isCheckOut ? (
          <span className="text-neutral-400 flex self-center">
            X {cartData.quantity}
          </span>
        ) : (
          <RiDeleteBin6Fill
            color="red"
            size={25}
            onClick={() => delCart(cartData.productid)}
          />
        )}
      </div>
    </div>
  );
};

export default CardCart;
