import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { SlPlus, SlMinus } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { SheetClose } from "./ui/sheet";
import { useRef } from "react";

const FormSheet = ({ orderProduct, deleteInfo, updateItem }) => {
  // console.log(orderProduct);

  const [orderItem, setOrderItem] = useState(orderProduct);
  // const handleTotalRef = useRef(null);
  const [total, setTotal] = useState();

  // const res = orderProduct.filter((i)=> i.id > 1);
  // console.log(res)
  // const { value } = useSelector((store) => store.fakeStore);
  // const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1);

  const handleDelete = (id) => {
    const res = orderItem.filter((i) => i.id !== id);
    console.log(res);
    setOrderItem(res);
    deleteInfo(id, res);
  };

  // useEffect(() => {
  //   setOrderItem(orderProduct)
  // //  console.log(res)

  // },[orderProduct])

  // const handlePlus = (id) => {
  //   console.log(id);
  //   // setQuantity(quantity+1)
  //   // const res = document.getElementById(id).innerText;
  //   // console.log(quantity)
  //   // console.log(res)
  //   orderItem.find((i) => {
  //     if (i.id == id) {
  //       setQuantity(quantity + 1);
  //     }
  //   });
  // };

  const handlePlus = (id) => {
    // console.log(orderItem);
    setOrderItem((pre) =>
      pre.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
    // dispatch(increase());
  };

  const handleMinus = (id) => {
    // console.log(orderItem);
    setOrderItem((pre) =>
      pre.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
    );
    // dispatch(decrease());
    // setQuantity(quantity - 1);
  };

  // console.log(handleTotalRef.current.innerText)

  useEffect(() => {
    const calc = orderItem
      .map((i) => (i.quantity ? i.price * i.quantity : i.price))
      .reduce((pv, cv) => pv + cv, 0)
      .toFixed(2);
    console.log(calc);

    setTotal(calc);
  }, [orderItem]);

  console.log(orderItem);

  useEffect(() => {
    updateItem(orderItem);
  }, [orderItem]);

  return (
    <>
      {orderItem.length > 0 ? (
        <div className=" w-full h-full flex flex-col gap-4 overflow-y-scroll">
          {orderItem.map((i) => (
            <div className="relative w-full h-44 border-2 border-gray-400 p-3 rounded-lg">
              <button
                className="absolute top-3 right-3 "
                onClick={handleDelete.bind(this, i.id)}
              >
                <FaTrashAlt className="size-6" />
              </button>

              <img src={i.image} className="w-[25%] " alt="" />
              <h1 className="line-clamp-1 text-lg font-semibold text-gray-500">
                {i.title}
              </h1>
              <div className="w-full flex justify-between pt-1">
                <p className="font-bold text-xl">$ {i.price}</p>
                <div className="flex justify-center items-center gap-2">
                  <button id={i.id} onClick={handleMinus.bind(this, i.id)}>
                    <SlMinus className="size-6" />
                  </button>
                  <p className="quantity" id={i.id}>
                    {i.quantity || 1}
                  </p>
                  <button id={i.id} onClick={handlePlus.bind(this, i.id)}>
                    <SlPlus className="size-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <img src="../../public/Empty-amico.svg" alt="" />
        </>
      )}

      <div className="w-full h-12 px-4 text-xl font-semibold flex justify-between items-center">
        <p>Total Price</p>
        <p>$ {total}</p>
      </div>
    </>
  );
};

export default FormSheet;
