import { storeApi } from "./storeApi";

export const getItems = async () => {
  try {
    const res = await storeApi.get("/products");
    // console.log(res.data);
    return res;
  } catch (e) {
    return { error: true, msg: e.message };
  }
};

export const deleteItems = async (id) => {
    try{
        const res = await storeApi.delete(`/products/${id}`)
        console.log(res)
        return res;
    }catch(e){
        return {error:true, msg:e.message}
    }
}


export const addItems = async(formData)=>{
  try{
      const res = await storeApi.post("/products",formData);
      console.log(res.data)
      return res;
  }catch(e){
    return {error:true, msg:e.message}
  }
}
