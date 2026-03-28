import React from 'react';
import Mobiles from './CateLogs/Mobiles';
import Laptop from './CateLogs/Laptop';
import Sarees from './CateLogs/Sarees';
import NewsLetter from './NewsLetter';

const Home = () => {
    return (
        <div className='space-y-10'>
            <div className='px-10'>
                <h1>Banner</h1>
            </div>

            <div className='flex justify-between my-8 font-poppins px-10'>
                <div className='flex flex-col space-y-2'>
                    <p className='text-[#a1a1aa] font-medium tracking-widest uppercase'>The Selection</p>
                    <h1 className='text-5xl font-semibold'>Curated Excellence</h1>
                </div>


                <p className='text-[#72727b] font-normal tracking-wide'>A hand-picked selection of our most prestigious <br />
                    offerings, defined by uncompromising quality and <br />
                    timeless design.
                </p>
            </div>

            <div className='px-10'>
                <Mobiles />
                <Laptop />
                <Sarees />
            </div>

            <div className='mt-16'>
                <NewsLetter />
            </div>
        </div>
    )
}

export default Home