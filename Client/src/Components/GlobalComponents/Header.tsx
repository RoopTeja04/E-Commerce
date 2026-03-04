import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/Whisk_b266906902ea1f9b0e14a4acebefb24beg.png';
import { IoLocationSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { FiPackage } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import axios from 'axios';

const Header = () => {

    const token = localStorage.getItem("token");

    const [Location, setLoaction] = useState<string>("");
    const [showLocationPopUp, setShowLocationPopUp] = useState<boolean>(false);
    const [pincode, setPinCode] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handlePinCode = async (Location: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`https://api.postalpincode.in/pincode/${Location}`)
            const data = res.data[0];
            if (data.Status === "Success") {
                const postOffice = data.PostOffice[0];
                setPinCode(postOffice.Pincode)
                setDistrict(postOffice.District)
                setState(postOffice.State)
                setCountry(postOffice.Country)
                setShowLocationPopUp(false)
                setError("");
            }
            if (data.Status === "Error") {
                setError("Invalid Pincode! Please Enter Valid Pincode")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex flex-col'>
                <div className='flex flex-row items-center justify-between py-4 px-8 space-x-10 border-b-2 border-[#efeffa] text-md'>
                    <Link to="/" className='w-[20%] flex items-center space-x-4'>
                        <img
                            src={Logo}
                            alt='Logo'
                            className='h-12.5 rounded-md w-13'
                        />
                        <h1 className='font-semibold tracking-wide text-3xl text-[#0f0fbd]'>LUXE</h1>
                    </Link>
                    <div className='w-[80%] flex items-center space-x-4'>
                        <button
                            onClick={() => setShowLocationPopUp(!showLocationPopUp)}
                            className='flex items-center space-x-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f0fbd] focus:ring-offset-2 focus:rounded-md'
                        >
                            <IoLocationSharp
                                className='text-5xl text-[#0f0fbd]'
                            />
                            {pincode
                                ?
                                <div className='flex flex-col text-start'>
                                    <div className='flex items-baseline gap-1.5'>
                                        <span className='text-xs text-gray-500'>Deliver to - <strong className='text-black'>{district}, {state}</strong></span>
                                    </div>
                                    <p className='text-xs text-gray-500'>{pincode}, {country.slice(0, 2).toUpperCase()}</p>
                                </div>
                                :
                                <p className='text-start font-medium text-sm text-gray-500'>Select Your Delivery Location</p>
                            }
                        </button>
                        <input
                            className='w-full py-2 border-2 border-black rounded-md px-2 text-base'
                            placeholder='Search Items'
                        />
                    </div>
                    <div className='w-[35%] flex items-center justify-end space-x-6'>
                        <Link
                            to={token ? "account" : "/login"}
                            className='flex felx-row space-x-2 items-center'
                        >
                            <VscAccount
                                className='text-2xl text-[#000000]'
                            />
                            <div className='flex flex-col items-start -space-y-1'>
                                <p className='text-xs font-medium text-gray-400'>ACCOUNT</p>
                                <p className='text-base text-gray-700 font-semibold'>Sign In</p>
                            </div>
                        </Link>
                        <Link
                            to="orders"
                            className='flex felx-row space-x-2 items-center'
                        >
                            <FiPackage
                                className='text-2xl text-[#000000]'
                            />
                            <div className='flex flex-col items-start -space-y-1'>
                                <p className='text-xs font-medium text-gray-400'>TRACK</p>
                                <p className='text-base text-gray-700 font-semibold'>Orders</p>
                            </div>
                        </Link>
                        <Link
                            to="cart"
                            className='flex felx-row space-x-4 items-center'
                        >
                            <div className="relative inline-block">
                                <FaCartShopping className="text-2xl text-black" />

                                <span className="absolute -top-3 -right-2 bg-[#0f0fbd] text-white text-xs rounded-full px-1.5 py-0.5">
                                    0
                                </span>
                            </div>
                            <div className='flex flex-col items-start -space-y-1'>
                                <p className='text-xs font-medium text-gray-400'>CART</p>
                                <p className='text-base text-gray-700 font-semibold'>Sign In</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row items-center py-4 px-8 justify-center space-x-10 border-b-2 border-[#efeffa] text-md font-medium'>
                    <p>New Arrivals</p>
                    <p>Watched</p>
                    <p>Jewelry</p>
                    <p>Handbags</p>
                    <p>Shoes</p>
                    <p>Accessories</p>
                    <p className='text-red-600 uppercase font-semibold'>Sale</p>
                </div>
            </div>

            {
                showLocationPopUp && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-poppins">
                        <div className="bg-white/80 border border-white/40 shadow-xl p-8 rounded-xl w-[500px] backdrop-saturate-150 space-y-4">
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg font-medium'>Enter your Pincode to check delivery availability</h1>
                                <RxCross1
                                    onClick={() => { setShowLocationPopUp(!showLocationPopUp); setError("") }}
                                    className='text-black text-3xl font-bold'
                                />
                            </div>
                            <div className='space-y-4'>
                                <p className='font-base tracking-wide'>Check delivery options, shipping charges, and estimated arrival date.</p>
                                <input
                                    onChange={(e) => setLoaction(e.target.value)}
                                    type='text'
                                    placeholder='Enter your Pincode'
                                    className='w-full py-2 px-4 rounded-md border-2 border-gray-800 outline-none'
                                />
                            </div>

                            <button
                                onClick={() => handlePinCode(Location)}
                                className='w-full py-2.5 px-4 rounded-md bg-black text-white font-base cursor-pointer'
                            >
                                {loading ? "Checking..." : "Check"}
                            </button>

                            {
                                error &&
                                <div className='border-2 border-red-600 text-center rounded-md'>
                                    <p className='text-red-600 py-2 rounded-md'>{error}</p>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header