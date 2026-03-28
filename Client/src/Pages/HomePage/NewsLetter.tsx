import React from 'react'

const NewsLetter = () => {
    return (
        <>
            <div className='bg-[#09090b] h-full text-white flex flex-col items-center py-28'>
                <div className='flex flex-col items-center space-y-6 mb-10'>
                    <h1 className='text-5xl font-bold'>THE INNER CIRCLE</h1>
                    <p className='text-[#515157]'>Join the LUXE newsletter for exclusive access to limited drops, curated styling guides, and private events.</p>
                </div>

                <div className='flex items-center justify-center space-x-6 w-full'>
                    <input 
                        type="text" 
                        placeholder='Enter Your Email' 
                        className='bg-[#18181b] w-full max-w-180 py-4 px-6 outline-none border border-[#27272a] uppercase'
                    />
                    <button
                        className='bg-[#ffffff] py-4 px-8 text-black font-medium uppercase tracking-wide'
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewsLetter