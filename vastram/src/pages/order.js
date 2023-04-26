import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';

const Order = ({ cart, subTotal }) => {
    
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            router.push('/login');
            // return () => {toast.success('Please Login First :)')};
        }
    }, [router, router.query]);
    
    return (
        <section className="text-gray-600 body-font overflow-hidden w-full">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Vasatram Pvt. Ltd.</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">ORDER ID: <span className='font-serif'>#6464654</span></h1>
                        <p className="leading-relaxed mb-4">Your Order has been placed with temporary order id: <span className='font-serif'>#6464654</span></p>
                        <div className="flex mb-4 font-medium ">
                            <a className="flex-grow text-center py-2 text-lg px-1">Description</a>
                            <a className="flex-grow text-center py-2 text-lg px-1">Quantity</a>
                            <a className="flex-grow text-center py-2 text-lg px-1">Price</a>
                        </div>
                        {Object.keys(cart).map(item => {
                            return (
                                <Link href={`/product/${item}`} key={item}>
                                    <div key={item} className="flex border-t border-gray-200 py-2 justify-around items-center">
                                        <div className="w-full text-center text-gray-500">{cart[item].name}</div>
                                        <div className="w-full text-center font-serif text-gray-900">{cart[item].qty}</div>
                                        <div className="w-full text-center font-serif text-gray-900">₹ {cart[item].qty * cart[item].price}</div>
                                    </div>
                                </Link>
                            );
                        })}

                        <div className="flex justify-start gap-x-10 md:gap-x-16 items-start mt-10">
                            <div className="title-font font-medium md:text-xl text-sm font-serif text-gray-900 flex flex-col gap-y-2 md:flex-row md:gap-x-3"><span>SubTotal:</span> <span>₹ {subTotal}</span></div>
                            <div className="flex gap-x-1">

                                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded tracking-wide">Track Order</button>
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {


    return {
        props: {
            
        }
    }

}

export default Order