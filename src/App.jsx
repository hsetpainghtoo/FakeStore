import React from "react";
import { storeApi } from "./services/storeApi";
import { Button, Card, Tooltip } from "flowbite-react";
import { addItems, deleteItems, getItems } from "./services/store.service";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { processing, products } from "./store/slice/store.slice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./components/ui/sheet";
// import {Button} from "./components/ui/button"
import FormSheet from "./components/FormSheet";
import { BsCart3 } from "react-icons/bs";

const App = () => {
  const { error, data, loading } = useSelector((store) => store.fakeStore);
  const dispatch = useDispatch();
  // console.log(error, data, loading);

  const [item, setItem] = useState();
  const [product, setProduct] = useState([]);
  // const [disable, setDisable] = useState("Add To Cart");
  // console.log(item);

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(processing());
      const res = await getItems(item);
      // console.log(res.data);
      setItem(() => dispatch(products(res?.data)));
    };
    fetchItems();
  }, []);

  const handleGetProduct = (data) => {
    console.log(data);
    setProduct((pre) => [...pre, data]);
    const res = document.getElementsByTagName("button");
    // console.log(res.item(data.id))
    res.item(data.id).innerText = "Added";
  };

  const deleteAppear = (id, res) => {
    console.log(res);
    console.log(id);
    document.getElementsByTagName("button").item(id).innerText = "Add To Cart";
    const button = document.getElementsByTagName("button").item(id);
    button.disabled = false;
    setProduct(res);
  };

  const handleDisabledBtn = (e) => {
    e.target.disabled = true;
    // setProduct([]);
    console.log("disabled");
  };

  const updateItem = (data) => {
    console.log(data);
    setProduct(data);
  };

  console.log(product);

  return (
    <Sheet>
      <div className="flex justify-center items-center mt-12">
        <SheetTrigger className="hover:scale-105 active:scale-95 duration-200 w-[40%] py-3 flex justify-center items-center text-white text-2xl rounded-xl bg-[#374151]">
          <BsCart3 className="size-10 " /> &nbsp; Let's Go Shopping!
        </SheetTrigger>
      </div>
      <SheetContent className="h-full flex flex-col justify-between items-center ">
        <SheetHeader>
          <SheetTitle className="text-2xl">Your Order List</SheetTitle>
        </SheetHeader>
        <FormSheet
          orderProduct={product}
          updateItem={updateItem}
          deleteInfo={deleteAppear}
        />

        <SheetClose asChild>
          <button
            className="w-full py-2 rounded-lg text-white font-bold text-lg bg-[#374151] hover:bg-[#374151]"
            type="submit"
          >
            Confirm Order
          </button>
        </SheetClose>
      </SheetContent>

      <div className="w-full h-full  py-10 flex justify-center items-center flex-wrap gap-16">
        {item?.payload?.map((i) => (
          <Card
            key={i.id}
            className="w-[25%] hover: hover:shadow-2xl hover:scale-105 duration-200"
          >
            <Tooltip
              className="text-lg bg-[#374151]"
              arrow={false}
              content={`Items Left: ${i.rating.count}`}
            >
              <img src={i.image} className=" h-[180px] mx-auto" alt="" />
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {i.title}
              </h5>
            </Tooltip>
            <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
              {i.description}
            </p>

            <div className="w-full flex justify-between">
              <p className="text-2xl font-bold">$ {i.price}</p>
              <span className="flex font-bold text-lg ">
                <img
                  className="w-5 h-5 mr-1 mt-1"
                  src="../public/star.png"
                  alt="Star"
                />
                {i.rating.rate} / 5
              </span>
            </div>
            <div className="gap-4">
              <button
                disabled={false}
                onClickCapture={handleDisabledBtn}
                // onClickCapture={handleDisabledBtn.bind(this, i)}
                onClick={handleGetProduct.bind(this, i)}
                className=" w-full disabled:cursor-not-allowed disabled:bg-[#374151] disabled:text-white text-lg font-bold hover:bg-[#374151] hover:text-white focus:bg-[#374151]  focus:text-white hover:scale-105 duration-200 rounded-lg py-2 active:scale-95 bg-white text-black border-2 border-black"
              >
                Add To Cart
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Sheet>
  );
};

export default App;
