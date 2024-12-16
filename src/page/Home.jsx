import React, { useContext } from "react";
import Nav from "../components/Navbar/Nav";
import NavMobile from "../components/Navbar/NavMobile";
import CardCategory from "../components/Category/CardCategry"; // ปรับชื่อไฟล์
import CardProduct from "../components/Product/CardProduct";
import { Link } from "react-router-dom";
import { CategoryContext } from "../context/CategoryProvider";
import { ProductContext } from "../context/ProductProvider";
import About from "../components/footer/about";

const Home = () => {
  const { categories, loading: categoryLoading, error: categoryError } =
    useContext(CategoryContext); // ดึงข้อมูลหมวดหมู่จาก Context
  const { product, loading: productLoading } = useContext(ProductContext); // ดึงข้อมูลสินค้า

  return (
    <>
      {/* Navbar */}
      <Nav logo search />

     {/* Banner Section */}
      <div className="hidden md:block  ">
      <div className="flex  bg-ga-primary w-full h-72 mt-28 items-center">
        <img
          src="/img/CartmainGenAID.png"
          alt="cart"
          className="flex h-[240px] ml-28"
        />
        <div className="text-white text-6xl ">
        "ให้คำปรึกษาด้านสุขภาพ ส่งยาถึงที่" 
        </div>
        <div className="absolute left-[54%] text-white text-6xl pt-36">
          แม้อยู่ไกลก็สบายใจได้
         </div>

        </div>
      </div>

      {/* Category Section */}
      <div className="py-16 p-3">
        <p className="text-3xl px-5 pb-2">หมวดหมู่สินค้า</p>
        {/* <div className="flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth mx-4 space-x-7"> */}
        <div className="no-scrollbar flex items-center overflow-x-auto snap-x snap-mandatory mx-4 space-x-7 cursor-grab" 
             onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
             onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
             onMouseLeave={(e) => e.currentTarget.style.cursor = 'grab'}
             onMouseMove={(e) => {
               if (e.buttons === 1) {
                 e.currentTarget.scrollLeft -= e.movementX;
               }
          }}>
          {/* Map categories to CardCategory */}
          {categoryLoading ? (
            <p>Loading categories...</p>
          ) : categoryError ? (
            <p className="text-red-500">{categoryError}</p>
          ) : (
            categories.map((category) => (
              <CardCategory key={category._id} categories={[category]} />
            ))
          )}
        </div>

        {/* Best Selling Section */}
        <div className="grid grid-flow-col justify-items-stretch">
          <section id="bestselling">
            <p className="flex text-3xl px-5 py-3 justify-self-end">
              สินค้าแนะนำ
            </p>
          </section>
          <Link
            to="#"
            className="flex px-5 underline justify-self-end items-center"
          >
            เพิ่มเติม
          </Link>
        </div>

        {/* Products */}
        <div className="p-2 grid grid-cols-2 gap-3 lg:grid-cols-6 lg:grid-rows-2 lg:gap-3">
          {productLoading ? (
            <p>Loading products...</p>
          ) : (
            product
              .filter((product) => product.rating >= 4)
              .slice(0, 12)
              .map((product) => (
                <CardProduct key={product.id} product={product} />
              ))
          )}
        </div>

        {/* Discounted Section */}
        <section id="discounted">
          <p>สินค้าลดราคา</p>
        </section>

        {/* About Section */}
        <div id="about">
          <p className="text-center text-3xl">เกี่ยวกับเรา</p>
          <hr />
          <About />
        </div>
      </div>

      {/* Mobile Navigation */}
      <NavMobile />
    </>
  );
};

export default Home;
