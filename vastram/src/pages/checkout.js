import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { RiAddCircleLine, RiDeleteBin6Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Script from 'next/script';

const Checkout = ({ cart, removeFromCart, addInCart, subTotal, clearCart, setUser, user }) => {
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);
    const zipRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        if (
            nameRef.current.value &&
            emailRef.current.value &&
            addressRef.current.value &&
            phoneRef.current.value &&
            zipRef.current.value &&
            cityRef.current.value &&
            stateRef.current.value) {
            setDisabled(false);
        }
    }

    const initiatePayment = async () => {
        //  add the mid to carry on;
        //  INITIATE ORDER DATA WITH STATUS = PENDING
        let oid = Math.floor(Math.random() * Date.now());
        // Get a transaction Token and then initiate the transacttion
        let data = {
            cart, subTotal, oid,
            email: emailRef.current.value,
            address: addressRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            zipCode: zipRef.current.value
        };
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/preTransaction`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        let transactionResponse = await response.json();
        if (transactionResponse.status == 'error') {
            if (transactionResponse.message.includes("Cart has been tampered")) {
                toast.error('Cart has been tampered');
                clearCart();
            }
            if (transactionResponse.message.includes("OUT OF STOCK")) {
                toast.error(transactionResponse.message);
            }
        }


        let transactionToken = transactionResponse.txnToken;
        console.log(transactionToken);

        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": oid, /* update order id */
                "token": transactionToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": subTotal /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
            clearCart()
        }).catch(function onError(error) {
            console.log("error => ", error);
        });

    }

    let totalItem = 0;
    Object.keys(cart).map(item => {
        totalItem += parseInt(cart[item].qty);
    })
    console.log(user)
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />

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
                                <input ref={nameRef} onChange={handleChange} type="text" name='name' required className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="email" className="font-medium text-slate-700 text-sm md:text-base ">Email</label>
                                {user.email ?
                                    <input  value={user.email} ref={emailRef} onChange={handleChange} type="email" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" readOnly />
                                    :
                                    <input required ref={emailRef} onChange={handleChange} type="email" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="address" className="font-medium text-slate-700 text-sm md:text-base ">Address</label>
                            <textarea required ref={addressRef} onChange={handleChange} rows={'5'} cols={'10'} type="text" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                        <div className="flex gap-x-2 md:gap-x-8">
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="Phone" className="font-medium text-slate-700 text-sm md:text-base ">Phone</label>
                                <input required ref={phoneRef} onChange={handleChange} type="number" name='Phone' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="pincode" className="font-medium text-slate-700 text-sm md:text-base ">Zip/Pin code</label>
                                <input required ref={zipRef} onChange={async () => {
                                    if (zipRef.current.value.length == 6) {
                                        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/pincode`, {
                                            method: 'POST',
                                            body: JSON.stringify({ pincode: zipRef.current.value })
                                        });
                                        const data = await response.json();
                                        if (data.value) {
                                            stateRef.current.value = data.code.state;
                                            cityRef.current.value = data.code.city;
                                        }
                                    }
                                    handleChange()
                                }} type="number" name='pincode' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>

                        </div>
                        <div className="flex gap-x-2 md:gap-x-8">
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="state" className="font-medium text-slate-700 text-sm md:text-base ">State</label>
                                <input ref={stateRef} onChange={handleChange} type="text" name='state' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            </div>
                            <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                                <label htmlFor="city" className="font-medium text-slate-700 text-sm md:text-base ">City</label>
                                <input ref={cityRef} onChange={handleChange} type="text" name='city' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
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
                                        <div className=""
                                            onMouseOver={() => {
                                                console.log(disabled)
                                                if (disabled) {
                                                    toast.error("Please Fill the Checkout Details First :)");
                                                }
                                            }}
                                        >
                                            {/* <Link href={'/orders'} disabled={disabled} > */}
                                            <button
                                                disabled={disabled}
                                                onClick={() => {
                                                    if (disabled) {
                                                        toast.error("Please Fill the Checkout Details First :)");
                                                    }
                                                    initiatePayment()
                                                }}
                                                className='disabled:bg-[#d58d91] md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><BsFillBagCheckFill />Pay ₹ {subTotal}</button>
                                            {/* </Link> */}
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