import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { processing, products } from "../store/slice/store.slice";
import { getItems, selectItem } from "../services/store.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Card } from "flowbite-react";

const Detailpage = () => {
  const { id } = useParams();
  const { data, error, loading } = useSelector((store) => store.fakeStore);
  const dispatch = useDispatch();
  //   console.log(data, error, loading);
  const nav = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(processing());
      const res = await selectItem(id);
      dispatch(products(res?.data));
    };
    fetchItems();
  }, []);

  const handleBack = () => {
    nav(-1);
  };

  // console.log(data);

  const ratingStars = (rate) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rate ? (
          <FaStar className="!fill-[#FFC107]" />
        ) : (
          <FaRegStar className="!fill-[#FFC107]" />
        )
      );
    }
    // console.log(stars)
    return stars;
  };

  let rating = Math.round(data?.rating?.rate);
  console.log(rating);

  return (
    <div className="w-full h-screen flex flex-col ">
      <button
        onClick={handleBack}
        className="bg-[#374151] text-white rounded-xl w-36 h-11 text-2xl m-6 hover:scale-105 duration-200 active:scale-95"
      >
        Back
      </button>
      <div className="flex justify-center items-center my-auto mx-10 gap-9">
          <img src={data.image} className="w-[23%] mx-auto p-6 hover:scale-105 duration-200 hover:shadow-xl rounded-2xl" alt="" />
        
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <p className="text-2xl normal-case text-justify">
            {data.description}
          </p>
          <div className="flex justify-between text-3xl pt-4">
            <span className="flex">{ratingStars(rating)}</span>
            <p className="font-semibold">${data.price}</p>
          </div>
        </div>
      </div>

      <p className="text-2xl text-end font-semibold animate-bounce pr-4 pb-6 opacity-40">{`${data?.rating?.count} Items Left...`}</p>
    </div>
  );
};

export default Detailpage;
