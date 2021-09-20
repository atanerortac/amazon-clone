import React, { useState } from "react";
import Image from "next/dist/client/image";
import Currency from "react-currency-formatter";
import { StarIcon, LockClosedIcon } from "@heroicons/react/solid";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

const ProductDetail = ({ product }) => {
  const [hasPrime] = useState(Math.random() < 0.5);
  const [quantityValue, setQuantity] = useState({ value: 1, label: 1 });

  const rate = Math.round(Number(product.rating.rate));
  const options = [];
  for (let i = 1; i <= 10; i++) {
    options.push(i);
  }
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const quantity = quantityValue.value;
    const productDetail = {
      ...product,
      hasPrime,
      quantity,
    };
    dispatch(addToBasket(productDetail));
  };

  return (
    <div className="flex p-5 space-y-10 bg-white">
      {/* <h1 className="text-3xl border-b pb-4">{product.title}</h1> */}
      <div className="flex-grow-0 h-full w-5/12 inline-block sm:h-3/5  ">
        <Image
          src={product.image}
          height={500}
          width={500}
          objectFit="contain"
        />
      </div>
      <div className="flex-grow w-1/2 mx-5">
        <h1 className="font-semibold text-xl">{product.title}</h1>
        <div className="flex my-3 pb-2 border-b-2">
          {Array(rate)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
          <span className="text-sm ml-3 text-amazon_text">
            {product.rating.count} ratings
          </span>
        </div>
        <p className="line-clamp-5 text-s my-2 lg:line-clamp-none">
          {product.description}
        </p>
        <span className="text-amazon_text-third text-lg font-semibold">
          <Currency quantity={product.price} currency="USD" />
        </span>
      </div>
      <div className="flex-col w-60 mx-5 border-2 rounded-md p-3 space-y-1.5 ">
        <span className="text-amazon_text-third text-lg font-semibold flex">
          <Currency quantity={product.price} currency="USD" />
        </span>
        <span className="flex text-amazon_text">
          Arrives:<b className="ml-2 ">Tomorrow</b>
        </span>
        <p className="text-lg text-amazon_text-light font-semibold">
          In Stock.
        </p>
        <Dropdown
          options={options}
          onChange={setQuantity}
          value={"Quantity: " + options[0]}
          placeholder="Select an option"
        />
        <button
          className="button mt-auto flex-grow w-full rounded-xl"
          onClick={addItemToBasket}
        >
          Add to Basket
        </button>
        <span className="flex py-3">
          <LockClosedIcon className="h-5 text-gray-600 self-center" />
          <p className="text-amazon_text ml-1 text-sm ">Secure Transaction</p>
        </span>
        <table>
          <tbody className=" text-sm">
            <tr className="w-full">
              <td>Ships from </td>
              <td className="text-amazon_text flex ml-2">Amazon</td>
            </tr>
            <tr>
              <td>Sold By </td>
              <td className="text-amazon_text flex ml-2">Amazon</td>
            </tr>
          </tbody>
        </table>
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
        <span>
          <p className="text-amazon_text text-sm">
            Return policy: Eligible for Return, Refund or Replacement
          </p>
        </span>
      </div>
    </div>
  );
};

export default ProductDetail;
