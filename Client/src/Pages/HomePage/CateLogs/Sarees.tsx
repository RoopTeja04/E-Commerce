import React, { useState, useEffect, useRef } from "react";
import { GetProductsForCategory } from "../../../Services/Api";
import { FaChevronRight, FaChevronLeft, FaExclamationCircle } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../../Stores/CartStores";
import UserErrorPopUp from "../../../Components/GlobalComponents/UserErrorPopUp";
import { useAuthStore } from "../../../Stores/AuthStore";

const Sarees = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [Product, setProduct] = useState<any[]>([]);
  const category = "saree";
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    success: false,
    text: "",
  });
  const [state, setState] = useState("");
  const [productId, setProductId] = useState("");
  const [popup, setPopup] = useState(false);

  const { addItemsInCart, getCartItems, loading, setLoading } = useCartStore();

  useEffect(() => {
    GetProducts(category);
  }, [category, setProduct]);

  const GetProducts = async (category: string) => {
    try {
      const res = await GetProductsForCategory(category);
      if (res.data && res.data.Products) {
        setProduct(res.data.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  const handleAddToCart = async (productId: string) => {
    if (!isAuthenticated) {
      setPopup(true);
      return;
    }

    setProductId(productId);
    setLoading(true);
    setState("cart");
    const res = await addItemsInCart(productId);
    setPopupInfo({ show: true, success: res.success, text: res.message });

    if (res.success) {
      setLoading(false);
      getCartItems();
      setState("");
    }

    setTimeout(() => {
      setPopupInfo((prev) => ({ ...prev, show: false }));
      setProductId("");
      setState("");
    }, 5000);
  };

  return (
    <>
      <div className="font-poppins my-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold ml-1">TRADITIONAL SAREES</h1>
          <button className="underline underline-offset-8 text-[#0f0fbd] font-normal uppercase cursor-pointer">
            View All
          </button>
        </div>

        <div className="h-0.5 w-full bg-[#f4f4f4] my-6 rounded-full" />

        <div className="relative flex items-center group">
          <button
            onClick={scrollLeft}
            className="absolute -left-2 z-10 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-gray-950 shadow-lg text-gray-950 focus:outline-none"
          >
            <span className="text-xl">
              <FaChevronLeft />
            </span>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth w-full py-4 px-4 no-scrollbar items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
                                       .no-scrollbar::-webkit-scrollbar {
                                           display: none;
                                       }
                                   `}</style>
            {Product.map((item, index) => (
              <div
                key={index}
                className="shrink-0 flex flex-col items-center justify-between space-y-4 w-[280px] p-4 rounded-2xl hover:shadow-lg hover:border hover:border-gray-800 transition-all duration-300 bg-white border border-transparent cursor-pointer"
                style={{ height: "400px" }}
              >
                <div
                  onClick={() =>
                    navigate("product", { state: { product: item._id } })
                  }
                  className="h-64 flex items-center justify-center overflow-hidden w-full"
                >
                  {item.imageURL.statusCode === 200 ||
                  item.imageURL.statusCode === 201 ? (
                    <img
                      src={item.imageURL.url}
                      alt={item.name}
                      className="max-h-full max-w-full w-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center rounded-lg">
                      <span className="text-gray-400 font-medium">
                        No Preview Available
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center w-full flex flex-col items-start space-y-1.5">
                  <p
                    onClick={() =>
                      navigate("product", { state: { product: item._id } })
                    }
                    className="font-semibold text-gray-800 text-lg line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {item.name.slice(0, 1).toUpperCase() +
                      item.name.slice(1).toLowerCase()}
                  </p>
                  <p className="text-[#0f0fbd] font-semibold mt-1 text-lg">
                    {item.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <button
                    disabled={
                      loading && state === "cart" && productId === item._id
                    }
                    onClick={() => handleAddToCart(item._id)}
                    className="bg-[#18181b] text-white px-4 py-3 rounded-md w-full hover:bg-black transition-colors disabled:cursor-not-allowed"
                  >
                    {loading && state === "cart" && productId === item._id
                      ? "Adding to Cart..."
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-2 z-10 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-gray-950 shadow-lg text-gray-950 focus:outline-none"
          >
            <span className="text-xl">
              <FaChevronRight />
            </span>
          </button>
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

export default Sarees;
