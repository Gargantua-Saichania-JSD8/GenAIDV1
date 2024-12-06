import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
// สร้างProductContextเพื่อให้เกิดการแชร์ข้อมูลระหว่าง component ต่างๆ
export const ProductContext = createContext();
// สร้างฟังชั่น productprovider ที่มีพารามิตเอร์เป็นค่าchildren(เป็นการรับค่า prop เข้ามา)
const Productprovider = ({ children }) => {
  //สร้างuseStateมารับค่าข้อมูลสินค้าที่ได้จากapl
  const [products, setProducts] = useState([]);
  //สร้างมาเพื่อทำหน้าloading ก่อนเข้า
  const [loading, setLoading] = useState(true);

  //ใช้ useEffectเพื่อเรียก apl เมื่อ render ครั้งแรก
  useEffect(() => {
    //สร้างfunction newData เพื่อใช้ asy await ในการเรียก API
    const newData = async () => {
      //try catch ไว้ดักจับerror
      try {
        //สร้างfunction newData เพื่อใช้ asy await ในการเรียก API
        const getData = await axios.get(
          "https://api.jsonbin.io/v3/b/673a2a59e41b4d34e455da2d?meta=false"
        );
        setProducts(getData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    // console.log("e");

    //เรียกใช้ F
    newData();
  }, []);

  return (
    <div>
      {/* ใช้ useContext ส่งค่าข้ามcomponent  ทำการดึงค่าตัวแปลมาให้ children กำหนวดค่าให้ value*/}
      <ProductContext.Provider value={{ products, loading }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default Productprovider;
