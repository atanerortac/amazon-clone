import React, { useState } from "react";
import Image from "next/image";

import { StarIcon, PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import {
  addToBasket,
  removeFromBasket,
  removeInBasket,
} from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
      quantity,
      totalPrice,
    };
    dispatch(addToBasket(product));
  };
  const removeItemInBasket = () => {
    dispatch(removeInBasket({ id }));
  };
  const removeItemToBasket = () => {
    // setExit(true);
    dispatch(removeFromBasket({ id }));
  };
  const variants = {
    hidden: { opacity: 0, x: 0, y: 200 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      // animate={!exit ? "enter" : "exit"} // Animated state to variants.enter
      animate="enter"
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "spring" }} // Set the transition to linear
      className=""
    >
      <div className="grid grid-cols-5 ">
        <Image src={image} height={200} width={200} objectFit="contain" />

        {/* Middle section */}

        <div className="col-span-3 mx-5">
          <p>{title}</p>
          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-xs my-2 line-clamp-3">{description}</p>
          {quantity === 1 ? (
            <Currency quantity={price} currency="USD" />
          ) : (
            <>
              <p>
                {quantity} x <Currency quantity={price} currency="USD" /> ={" "}
                <Currency quantity={totalPrice} currency="USD" />
              </p>
            </>
          )}

          {hasPrime && (
            <div className="flex items-center space-x-2 ">
              <img
                loading="lazy"
                className="w-12"
                src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
                alt="prime"
              />
              <p className="text-xs text-gray-500">Free Next-day Delivery</p>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
          <div className="flex items-center flex-grow">
            <button className="button m-auto justify-center align-middle rounded-r-none ">
              <PlusSmIcon onClick={addItemToBasket} className="h-5" />
            </button>
            <span className="text-center w-full -mt-1">{quantity}</span>
            <button
              onClick={removeItemInBasket}
              className="button m-auto align-middle rounded-l-none "
            >
              <MinusSmIcon className="h-5" />
            </button>
          </div>

          {/* <button className="button mt-auto" onClick={addItemToBasket}>
          Add to Basket
        </button> */}

          <button className="button mt-auto" onClick={removeItemToBasket}>
            Remove from Basket
          </button>
        </div>
      </div>
    </motion.main>
  );
};

export default CheckoutProduct;
