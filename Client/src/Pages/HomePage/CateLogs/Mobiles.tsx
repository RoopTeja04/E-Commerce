import React, { useState, useEffect, useRef } from 'react'
import { GetProductsForCategory } from '../../../Services/Api';

const Mobiles = () => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const [Product, setProduct] = useState<any[]>([]);
    const category = "mobile";

    useEffect(() => {
        GetProducts(category);
    }, [category, setProduct])

    const GetProducts = async (category: string) => {
        try {
            const res = await GetProductsForCategory(category);
            if (res.data && res.data.Products) {
                setProduct(res.data.Products);
                console.log(res.data.Products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    };

    return (
        <>
            <div className='font-poppins my-8'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold ml-1'>FLAGSHIP DEVICES</h1>
                    <button className='underline underline-offset-8 text-[#0f0fbd] font-normal uppercase cursor-pointer'>View All</button>
                </div>

                <div className='h-0.5 w-full bg-[#f4f4f4] my-6 rounded-full' />

                <div className="relative flex items-center group">

                    {/* LEFT BUTTON */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-2 z-10 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
                    >
                        <span className="text-xl">◀</span>
                    </button>

                    {/* PRODUCTS */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth w-full py-4 px-4 no-scrollbar items-center"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style>{`
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {
                            Product.map((item, index) => (
                                <div
                                    key={index}
                                    className="shrink-0 flex flex-col items-center justify-between space-y-4 w-[280px] p-4 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 bg-white border border-transparent hover:border-gray-100 cursor-pointer"
                                    style={{ height: '360px' }}
                                >
                                    <div className="h-56 flex items-center justify-center overflow-hidden w-full">
                                        <img
                                            src={item.imageURL}
                                            alt={item.name}
                                            className="max-h-full max-w-full w-auto object-contain hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="text-center w-full mt-auto mb-2">
                                        <p className="font-semibold text-gray-800 text-lg line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                                        <p className="text-[#0f0fbd] font-semibold mt-1 text-lg">
                                            {item.price.toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: 0
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-2 z-10 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
                    >
                        <span className="text-xl">▶</span>
                    </button>

                </div>
            </div>
        </>
    )
}

export default Mobiles