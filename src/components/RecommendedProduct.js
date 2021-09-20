import React from "react";
import Image from "next/dist/client/image";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import router from "next/router";
const RecommendedProduct = ({ id, category }) => {
  return (
    <div className="mx-auto bg-white my-3 overflow-hidden">
      <ul className="grid w-auto mx-6 grid-flow-col ">
        {category
          .filter((item) => item.id !== id)
          .map(({ id, title, price, image, rating }) => (
            <li
              onClick={() => router.push("/products/" + id)}
              className="space-x-3 flex flex-col relative mt-4 justify-center gap-2 cursor-pointer"
              key={id}
            >
              <Image
                src={image}
                height={120}
                width={120}
                objectFit="contain"
                className="cursor-pointer items-start"
              />
              <h1 className="my-1 text-amazon_text line-clamp-2">{title}</h1>
              <div className="flex self-start">
                {Array(Math.round(Number(rating.rate)))
                  .fill()
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                  ))}
                <span className="text-sm ml-3 text-amazon_text">
                  {rating.count} ratings
                </span>
              </div>
              <span className="text-amazon_text-third text-lg font-semibold flex">
                <Currency quantity={price} currency="USD" />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecommendedProduct;
