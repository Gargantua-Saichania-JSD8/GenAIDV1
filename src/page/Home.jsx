import React, { useContext } from "react";
import Nav from "../components/Navbar/Nav";
import NavMobile from "../components/Navbar/NavMobile";
import CardCategry from "../components/Category/CardCategry";
import CardProduct from "../components/Product/CardProduct";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/productprovider";

const Home = () => {
  const { products, loading } = useContext(ProductContext);
  if (loading) {
    return <p>Loading products...</p>;
  }
  console.log({products})
  return (
    <>
      <Nav logo search />
      <div className="my-16 p-3 lg:my-40">
        <p>หมวดหมู่</p>
        <div className="flex items-center overflow-x-auto snap-x snap-mandatory -mx-4 space-x-7">
          {/* <CardCategry /> <CardCategry /> <CardCategry /> <CardCategry /> <CardCategry />
      <CardCategry /><CardCategry /><CardCategry /><CardCategry /><CardCategry /><CardCategry />     */}
        </div>
        <div className="p-3 flex justify-between">
          <p>สินค้าแนะนำ</p>
          <Link to="#" className="underline">
            เพิ่มเติม
          </Link>
        </div>
        <div className="p-2 grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-3 ">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
      <NavMobile />
    </>
  );
};

export default Home;
