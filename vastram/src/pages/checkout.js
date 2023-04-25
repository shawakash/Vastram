import Link from 'next/link';
import React from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { RiAddCircleLine, RiDeleteBin6Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = ({ cart, removeFromCart, addInCart, subTotal, clearCart }) => {
    let totalItem = 0;
    Object.keys(cart).map(item => {
        totalItem += parseInt(cart[item].qty);
    })
    return (
        <>
            <div className="checkout flex flex-col sm:w-3/4 w-80 gap-y-6 md:gap-y-20 pb-8 ">
                <div className="head flex justify-center items-center text-2xl md:text-4xl text-[#b6464c] font-head font-semibold">
                    Checkout
                </div>
                <div className="details flex flex-col gap-y-2">
                    <div className="font-medium text-base md:text-lg w-fit px-2 rounded-lg hover:shadow-lg transition-all">1. Consumer Details</div>
                    <form action="" className="details flex flex-col shadow-md rounded-lg gap-y-4 py-10 px-8 md:px-10 tracking-wide">
                        <div className="flex gap-x-2 md:gap-x-8">
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="name" className="font-medium text-slate-700 text-sm md:text-base ">Name</label>
                                <input type="text" name='name' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="email" className="font-medium text-slate-700 text-sm md:text-base ">Email</label>
                                <input type="email" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="address" className="font-medium text-slate-700 text-sm md:text-base ">Address</label>
                            <textarea rows={'5'} cols={'10'} type="text" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                        <div className="flex gap-x-2 md:gap-x-8">
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="Phone" className="font-medium text-slate-700 text-sm md:text-base ">Phone</label>
                                <input type="number" name='Phone' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="city" className="font-medium text-slate-700 text-sm md:text-base ">City</label>
                                <input type="text" name='city' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                        </div>
                        <div className="flex gap-x-2 md:gap-x-8">
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="state" className="font-medium text-slate-700 text-sm md:text-base ">State</label>
                                <input type="text" name='state' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="pincode" className="font-medium text-slate-700 text-sm md:text-base ">Zip/Pin code</label>
                                <input type="number" name='pincode' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="font-medium text-base md:text-lg w-fit px-2 rounded-lg hover:shadow-lg transition-all">2. Cart Review And Payment</div>
                    <div className="sideCart w-full flex flex-col gap-y-5 p-10 bg-[#ecd5d7] bg-opacity-95 rounded-lg items-center tracking-wide ">
                        <h2 className="heading font-semibold md:font-bold text-[#b6464c] text-base md:text-xl">Shopping Cart</h2>
                        <ol className="list-disc list-outside font-normal flex flex-col w-full gap-y-2 text-sm md:text-lg pl-2 text-black">
                            {Object.keys(cart).length == 0 ? <div className='font-medium text-lg'>Add items to use this</div> :
                                Object.keys(cart).map((k) => {
                                    return (
                                        <li className="" key={k}>
                                            <div className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">

                                                <div className="product w-1/2 tracking-wide font-medium">{cart[k]?.name}</div>
                                                <div className="item-info w-1/3 font-serif flex items-center gap-x-2 ">
                                                    <div onClick={(_) => {
                                                        addInCart(k, 1, 534, 'M', "The Dohti(M, White)", "White")
                                                        toast.success("Added One Item To The Cart :) ")
                                                    }} className="incr text-lg text-slate-700"><RiAddCircleLine /></div>
                                                    <div className="count text-slate-800">{cart[k]?.qty}</div>
                                                    <div onClick={() => {
                                                        removeFromCart(k, 1)
                                                        toast.success("Removed one Item From Cart :( ")
                                                    }} className="decr text-slate-700"><HiOutlineMinusCircle /></div>
                                                </div>
                                                <div className="item-total w-1/6 font-serif">
                                                    ₹{(cart[k].qty) * (cart[k].price)}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}

                            {Object.keys(cart).length == 0 ? <></> :
                                <><div className="text-black flex flex-col gap-y-2 my-2">
                                    <hr />

                                    <div className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">

                                        <div className="product w-1/2 ">Summary --&gt; </div>
                                        <div className="item-info flex font-serif w-1/3 gap-x-2 ">
                                            <div className="">Items: </div>
                                            <div className="count text-slate-800">{totalItem}</div>

                                        </div>
                                        <div className="item-total w-1/6 font-serif">
                                            ₹{subTotal}
                                        </div>
                                    </div>

                                </div>
                                    <div className="flex justify-around">
                                        <div className="">
                                            <Link href={'/order'}>
                                                <button className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><BsFillBagCheckFill />Pay ₹ {subTotal}</button>
                                            </Link>
                                        </div>
                                        <div className="">
                                            <button onClick={(_) => {
                                                clearCart()
                                                toast.success('Cart is cleared');
                                            }} className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] rounded-md px-2 md:px-4 py-1 flex items-center gap-x-2'><RiDeleteBin6Line />Clear</button>
                                        </div>
                                    </div>
                                    <Toaster />
                                </>

                            }

                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout