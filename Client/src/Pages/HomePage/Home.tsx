import React from 'react';
import Mobiles from './CateLogs/Mobiles';

const Home = () => {
    return (
        <>
            <div>
                <h1>Banner</h1>
            </div>

            <div className='flex justify-between my-8 font-poppins'>
                <div className='flex flex-col space-y-2'>
                    <p className='text-[#a1a1aa] font-medium tracking-widest uppercase'>The Selection</p>
                    <h1 className='text-5xl font-semibold'>Curated Excellence</h1>
                </div>


                <p className='text-[#72727b] font-normal tracking-wide'>A hand-picked selection of our most prestigious <br />
                    offerings, defined by uncompromising quality and <br />
                    timeless design.
                </p>
            </div>

            <Mobiles />
        </>
    )
}

export default Home