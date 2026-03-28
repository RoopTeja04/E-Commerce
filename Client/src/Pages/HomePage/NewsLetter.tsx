import React, { useState, useEffect } from 'react';
import { SubscribeNewsLetter } from "../../Services/Api";

const NewsLetter = () => {

    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setIsError(false);
                setLoading(false);
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (message) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [message]);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await SubscribeNewsLetter(email);
            if (response.status === 200) {
                setMessage(response.data.message || "Subscribed successfully!");
                setIsError(false);
                setEmail("");
            }
        } catch (error: any) {
            setIsError(true);
            setMessage(error.response?.data?.error || "An error occurred");
            setEmail("");
        }
        finally{
            setLoading(false);
            setEmail("");
        }
    }

    return (
        <>
            {message && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                    <div
                        className={`relative px-8 py-6 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-200
                            ${isError
                                ? 'bg-red-600 text-white border border-red-700 shadow-lg'
                                : 'bg-white text-black border border-gray-200 shadow-lg'
                            }`}
                    >
                        {message}
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <div className='bg-[#09090b] h-full text-white flex flex-col items-center py-28 relative'>
                <div className='flex flex-col items-center space-y-6 mb-10'>
                    <h1 className='text-5xl font-bold'>THE INNER CIRCLE</h1>
                    <p className='text-[#515157]'>
                        Join the LUXE newsletter for exclusive access to limited drops, curated styling guides, and private events.
                    </p>
                </div>

                <div className='flex items-center justify-center space-x-6 w-full'>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Your Email'
                        className='bg-[#18181b] w-full max-w-180 py-4 px-6 outline-none border border-[#27272a] uppercase'
                    />
                    <button
                        onClick={handleSubscribe}
                        className='bg-[#ffffff] py-4 px-8 text-black font-medium uppercase tracking-wide'
                    >
                        { loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewsLetter;