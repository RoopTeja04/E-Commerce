import React, { useEffect, useState } from "react";
import useCartStore from "../../Stores/CartStores";
import { BiSolidCartDownload } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAuthStore } from "../../Stores/AuthStore";

const Cart = () => {
  const { user } = useAuthStore();
  const userId = user?.ID || user?._id;
  const navigate = useNavigate();
  const { getCartItems, cartProducts, DeleteCartItem, loading, setLoading } =
    useCartStore();

  const [state, setState] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    getCartItems();
  }, []);

  const handleDeleteCartItem = async (productId: string) => {
    setProductId(productId);
    setLoading(true);
    setState("delete");
    const res = await DeleteCartItem(productId);
    if (res) {
      setState("");
      setLoading(false);
      setProductId("");
    }
  };

  return (
    <>
      <div className="font-poppins pt-16 pb-20 px-14">
        {!userId ? (
          <div className="text-center text-2xl font-bold bg-[#f6f5f5] rounded-2xl py-20 w-full space-y-4 flex flex-col items-center">
            <div className="text-center space-y-4">
              <div className="text-yellow-500 flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-6xl text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Needs to Login!
              </h2>
              <p className="text-gray-600 text-lg">Please login to continue.</p>
              <button
                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        ) : cartProducts.length > 0 ? (
          <>
            <div className="text-center text-2xl font-bold bg-[#ebebeb] rounded-2xl w-full space-y-4">
              <div className="flex flex-col space-y-4 justify-center">
                  {cartProducts.map((product: any, index: number) => (
                    <div
                      key={product._id}
                    className={`flex items-center w-full space-x-8 pl-8 py-6 transition-colors ${index !== cartProducts.length - 1 ? "border-b border-gray-300" : ""}`}
                    >
                      <div
                        onClick={() =>
                          navigate("/product", {
                            state: { product: product._id },
                          })
                        }
                      className="h-64 w-60 flex items-center justify-center overflow-hidden cursor-pointer"
                      >
                        {product.imageURL.status_code === 200 ||
                        product.imageURL.status_code === 201 ? (
                          <img
                            src={product.imageURL.url}
                            alt={product.name}
                          className="max-h-full max-w-full w-auto object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="bg-gray-200 h-full w-full flex items-center justify-center rounded-lg">
                          <span className="text-gray-400 font-medium text-base">
                            No Preview Available
                            </span>
                          </div>
                        )}
                      </div>
                    <div className="flex flex-col space-y-0.5 items-start justify-center">
                      <p className="font-semibold text-gray-800 text-lg line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          {product.name.slice(0, 1).toUpperCase() +
                            product.name.slice(1).toLowerCase()}
                        </p>
                      <p className="text-[#0f0fbd] font-semibold mt-1 text-lg">
                          {product.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      <p className="text-gray-500 text-sm mt-2 font-semibold">
                        Added on: {new Date(product.createdAt).toDateString()}
                        </p>
                      </div>

                    <div className="flex flex-col justify-center ml-auto pr-8 w-56 space-y-4">
                        <button
                          disabled={
                            loading &&
                            state === "delete" &&
                            productId === product._id
                          }
                          onClick={() => handleDeleteCartItem(product._id)}
                        className="w-full border-2 border-red-400 text-red-500 transition-colors rounded-full font-medium text-base py-2.5"
                        >
                          {loading &&
                          state === "delete" &&
                          productId === product._id
                            ? "Removing..."
                          : "Remove From Cart"}
                        </button>
                        <button
                          onClick={() =>
                            navigate("/product", {
                              state: { product: product._id },
                            })
                          }
                        className="w-full border-2 border-[#0f0fbd] bg-[#0f0fbd] text-white hover:bg-blue-800 transition-colors rounded-full font-medium text-base py-2.5 cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </>
        ) : (
          <div className="text-center text-2xl font-bold bg-[#ebebeb] rounded-2xl py-20 w-full space-y-4 flex flex-col items-center">
            <BiSolidCartDownload className="text-6xl mx-auto text-gray-600" />
            <p className="text-xl font-semibold tracking-wide text-gray-600">
              Cart is Empty
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#0f0fbd] text-white px-6 py-2 rounded-md flex items-center gap-2 cursor-pointer"
            >
              <IoMdArrowBack />
              <p className="text-base font-semibold">Back To Home</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
