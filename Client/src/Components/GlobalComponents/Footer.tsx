import React from 'react';
import { IoMdCard } from "react-icons/io";
import { AiOutlineWallet } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { MdOutlineHeadsetMic, MdOutlineShoppingBag } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <>
            <div className='flex flex-col justify-center border-t border-[#e2e8f0] bg-[#f1f5f9] pb-8'>
                <div className='flex flex-row justify-between pt-12 px-8 mx-10'>
                    <div className='space-y-1'>
                        <h1 className='text-2xl font-semibold'>Join our newsletter</h1>
                        <p className='text-gray-500'>Subscribe to receive updates, access to exclusive deals, and more directly in <br /> your inbox.</p>
                    </div>
                    <div className='flex space-x-2 items-center w-[40%]'>
                        <input
                            type="text"
                            placeholder='Enter your email address'
                            className='border border-gray-300 rounded-md px-3 py-2 w-[90%] bg-white outline-none'
                        />
                        <button className='bg-[#0f0fbd] text-white px-4 py-2 rounded-md text-sm font-medium'>Subscribe</button>
                    </div>
                </div>

                <div className='border-t border-[#e2e8f0] mx-10 my-8 py-8 flex flex-row justify-between'>
                    <div className='flex flex-col items-start space-y-4'>
                        <div className='flex flex-row space-x-2 items-center'>
                            <MdOutlineHeadsetMic className='text-2xl text-[#0f0fbd]' />
                            <p className='text-sm font-semibold text-[#0f0fbd] uppercase'>Customer Service</p>
                        </div>
                        <p className='text-gray-500 text-sm'>FAQ</p>
                        <p className='text-gray-500 text-sm'>Returns & Exchanges</p>
                        <p className='text-gray-500 text-sm'>Shipping Information</p>
                        <p className='text-gray-500 text-sm'>Contact Us</p>
                    </div>
                    <div className='flex flex-col items-start space-y-4'>
                        <div className='flex flex-row space-x-2 items-center'>
                            <IoLink className='text-2xl text-[#0f0fbd]' />
                            <p className='text-sm font-semibold text-[#0f0fbd] uppercase'>Quick Links</p>
                        </div>
                        <p className='text-gray-500 text-sm'>About Us</p>
                        <p className='text-gray-500 text-sm'>Carrers</p>
                        <p className='text-gray-500 text-sm'>Store Locator</p>
                        <p className='text-gray-500 text-sm'>Sustainability</p>
                    </div>
                    <div className='flex flex-col items-start space-y-4'>
                        <div className='flex flex-row space-x-2 items-center'>
                            <MdOutlineShoppingBag className='text-2xl text-[#0f0fbd]' />
                            <p className='text-sm font-semibold text-[#0f0fbd] uppercase'>Shop</p>
                        </div>
                        <p className='text-gray-500 text-sm'>Watches</p>
                        <p className='text-gray-500 text-sm'>Jewellery</p>
                        <p className='text-gray-500 text-sm'>Handbags</p>
                        <p className='text-gray-500 text-sm'>Shoes</p>
                        <p className='text-gray-500 text-sm'>Accessories</p>
                    </div>
                    <div className='flex flex-col items-start space-y-4 mr-14'>
                        <div className='flex flex-col space-y-2 items-start'>
                            <p className='text-sm font-semibold text-[#0f172a] uppercase'>Follow Us</p>
                            <div className='flex flex-row space-x-4 mt-2'>
                                <div className='p-2 bg-[#e2e8f0] rounded-full flex items-center'>
                                    <FaFacebookF className='text-2xl text-[#0f172a]' />
                                </div>
                                <div className='p-2 bg-[#e2e8f0] rounded-full flex items-center'>
                                    <FaInstagram className='text-2xl text-[#0f172a]' />
                                </div>
                                <div className='p-2 bg-[#e2e8f0] rounded-full flex items-center'>
                                    <FaTwitter className='text-2xl text-[#0f172a]' />
                                </div>
                                <div className='p-2 bg-[#e2e8f0] rounded-full flex items-center'>
                                    <FaLinkedinIn className='text-2xl text-[#0f172a]' />
                                </div>
                            </div>

                            <div className='mt-4 border border-[#d0d3f0] rounded-md bg-[#e6eaf6] py-5 pl-4 pr-12 space-y-0.5'>
                                <p className='text-gray-500 text-sm font-semibold tracking-wide'>NEED HELP?</p>
                                <p className='text-black font-semibold tracking-wide'>1-800-LUXE-001</p>
                                <p className='text-gray-500 text-sm font-normal tracking-wide'>Mon-Fri: 9am - 6pm IST</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-t border-[#e2e8f0] mx-10'>
                    <div className='py-8 flex flex-row justify-between'>
                        <p className='text-[#64748b] text-md font-light'>© 2024 Elegant Commerce Store. All rights reserved.</p>
                        <div className='flex flex-row space-x-8'>
                            <p className='text-[#64748b] text-md font-light'>Privacy Policy</p>
                            <p className='text-[#64748b] text-md font-light'>Terms of Use</p>
                            <p className='text-[#64748b] text-md font-light'>Cookie Settings</p>
                        </div>
                        <div className='flex flex-row space-x-4'>
                            <IoMdCard className='text-2xl text-[#64748b]' />
                            <AiOutlineWallet className='text-2xl text-[#64748b]' />
                            <BsCashStack className='text-2xl text-[#64748b]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer