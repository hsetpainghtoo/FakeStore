import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MdFormatListBulletedAdd } from "react-icons/md";
import SelectCategory from "./SelectCategory";

const AddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-full hover:scale-105 active:scale-95 !duration-200 py-3 flex justify-center items-center text-white text-2xl rounded-xl !bg-[#374151]">
          <MdFormatListBulletedAdd className="!size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your New Product Info</DialogTitle>
          {/* <DialogDescription>
            Make changes to your shore here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className=" items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input type="number" className="col-span-3" />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Product Description
            </Label>
            <Textarea placeholder="Tell about your product..." />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Paste your product image link here
            </Label>
            <Input className="col-span-3" />
          </div>
          <div className="flex justify-between items-center w-full  gap-4">
            <Label htmlFor="name" className="text-right">
              Product Category
            </Label>
            <SelectCategory className="!w-full" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
