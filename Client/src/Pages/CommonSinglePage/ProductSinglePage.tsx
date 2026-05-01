import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../../Stores/ProductStroes";
import RelatedProducts from "./RelatedProducts";
import useCartStore from "../../Stores/CartStores";
import { SiTicktick } from "react-icons/si";
import { FaExclamationCircle } from "react-icons/fa";
import UserErrorPopUp from "../../Components/GlobalComponents/UserErrorPopUp";
import { useAuthStore } from "../../Stores/AuthStore";

const ProductSinglePage = () => {
  const Location = useLocation();
  const { product } = Location.state || {};

  const { getProductsById, productSingle } = useProductStore();
  const { addItemsInCart, getCartItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    success: false,
    text: "",
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    getProductsById(product);
    setImageError(false);
  }, [product]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setPopup(true);
      return;
    }
    if (!productSingle?._id) return;
    setLoading(true);
    const res = await addItemsInCart(productSingle._id);
    setLoading(false);
    setPopupInfo({ show: true, success: res.success, text: res.message });

    if (res.success) {
      getCartItems();
    }

    setTimeout(() => {
      setPopupInfo((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

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
              <button 
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-[#18181b] text-white px-4 py-3 rounded-md w-full disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add to Cart"}
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

      {popupInfo.show && (
        <div
          className={`fixed top-24 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 animate-fade-in flex items-center gap-3 border ${
            popupInfo.success
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {popupInfo.success ? (
            <SiTicktick className="text-xl" />
          ) : (
            <FaExclamationCircle className="text-xl" />
          )}
          <div className="font-semibold text-[15px]">{popupInfo.text}</div>
        </div>
      )}

      {popup && (
        <div>
          <UserErrorPopUp />
        </div>
      )}
    </>
  );
};

export default ProductSinglePage;
