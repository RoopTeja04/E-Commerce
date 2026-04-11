import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../../Stores/ProductStroes";
import RelatedProducts from "./RelatedProducts";

const ProductSinglePage = () => {
  const Location = useLocation();
  const { product } = Location.state || {};

  const { getProductsById, productSingle } = useProductStore();

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    getProductsById(product);
    setImageError(false);
  }, [product]);

  return (
    <>
      <div className="font-poppins py-24 px-24">
        <div className="grid grid-cols-2 gap-28 mb-18">
          <div>
            {imageError || !productSingle?.imageURL ? (
              <div className="bg-gray-200 h-96 w-full flex items-center justify-center rounded-lg">
                <span className="text-gray-400 font-medium">
                  No Preview Available
                </span>
              </div>
            ) : (
              <img
                src={productSingle?.imageURL}
                alt={productSingle?.name}
                onError={() => setImageError(true)}
                className="max-w-72 h-auto object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">
              {productSingle?.name &&
                productSingle.name.slice(0, 1).toUpperCase() +
                  productSingle.name.slice(1).toLowerCase()}
            </h1>
            <p className="text-xl font-semibold">
              ₹{" "}
              {productSingle?.price?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}{" "}
              /-
            </p>
            <p className="text-gray-500">
              Category:{" "}
              {productSingle?.category &&
                productSingle.category.slice(0, 1).toUpperCase() +
                  productSingle.category.slice(1).toLowerCase()}
            </p>

            <div className="flex space-x-4 mt-4">
              <button className="bg-[#18181b] text-white px-4 py-3 rounded-md w-full">
                Add to Cart
              </button>
              <button className="bg-[#fafafa] text-black px-4 py-3 rounded-md w-full border border-gray-950 cursor-pointer">
                Buy Now
              </button>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">
                {productSingle?.description &&
                  productSingle.description.slice(0, 1).toUpperCase() +
                    productSingle.description.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <h1 className="text-2xl font-semibold">Related Products</h1>
          <RelatedProducts
            category={productSingle?.category}
            ProductID={productSingle?._id}
          />
        </div>
      </div>
    </>
  );
};

export default ProductSinglePage;
