import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillBagCheckFill, BsQuestionCircle } from 'react-icons/bs';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Product from '../../../models/Product';
import mongoose from 'mongoose';
import Head from 'next/head';
import Error from 'next/error';


const Slug = ({ addInCart, product, variants, buyNow, cart, errorStatusCode, title }) => {
    const router = useRouter();
    const { slug } = router.query;
    const pincodeRef = useRef();
    const [servicePin, setServicePin] = useState(null);
    const [color, setColor] = useState(product?.color);
    const [qty, setQty] = useState(0);
    const [avail, setAvail] = useState(0);
    const [size, setSize] = useState(product?.size[0])
    const sizeRef = useRef();
    
    
    
    useEffect(() => {
        if (product) {
            setColor(product.color);
            setSize(product.size);
            setAvail(product.availqty);
        }
    }, [router, router.query, product])
    if(errorStatusCode) {
        return <Error statusCode={errorStatusCode} title={title} />;
    }
    
    const pincodeCheck = async (e) => {
        e.preventDefault()
        const body = {
            pincode: parseInt(pincodeRef.current.value)
        }
        body.pincode && await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/pincode`, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(a => a.json()).then(({ value }) => {
            console.log(value)
            if (value) {
                toast.success('We are ready to delivery at your doorstep :)');
            } else {
                toast.error("Sorry, But we are Expanding fastly :)");
            }
            setServicePin(value)
        })
    }
    const refreshSlug = (size, color) => {
        let url = `${process.env.NEXT_PUBLIC_BASEURL}/product/${variants[color][size]['slug']}`;
        router.push(url);
    }
    const selectColor = (e) => {
        setColor(e.target.id);
        setSize(Object.keys(variants[e.target.id])[0])
        refreshSlug(Object.keys(variants[e.target.id])[0], e.target.id);
    }
    return (
        <>
            <Head>
                <title>Product - Vastram</title>
            </Head>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5  pt-12 mx-auto">
                    <div className="lg:w-4/5 mx-auto lg:flex-nowrap lg:flex-row flex flex-wrap items-center justify-center ">
                        <img alt="ecommerce" className="lg:w-[250px]  lg:h-[400px] object-scale-down object-top h-72  rounded" src={`${product?.img}`} />
                        <div className=" w-2/3 lg:pl-10 lg:py-6 mt-6 lg:mt-0 justify-start items-start flex md:justify-center md:items-center flex-col">
                            <h2 className="text-lg md:text-xl title-font text-gray-500 tracking-widest">Vastram</h2>
                            <h1 className="text-gray-900 text-3xl title-f font-medium mb-1">{product?.title} ({size}/{color})</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed md:w-2/3">{product?.desc}</p>
                            <div className="flex mt-6 md:gap-x-4 w-fit md:flex-row flex-wrap md:flex-nowrap gap-y-4 justify-around items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex ">
                                    <span className="mr-2">Color</span>
                                    <div className="">
                                        {/* {Object.keys(variants).map(cl => {
                                        console.log(cl)
                                        return (
                                            <button key={cl} onClick={selectColor}  id={cl} className={`border-2 border-gray-300 ml-1 bg-${cl}-500  rounded-full w-6 h-6 focus:outline-none`}></button>
                                        );
                                    })} */}
                                        {Object.keys(variants).includes('Red') && <button onClick={(e) => {
                                            selectColor(e)
                                        }} id='Red' className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color == 'Red' ? 'border-black' : 'border-gray-400'}`}></button>}
                                        {Object.keys(variants).includes('Black') && <button onClick={(e) => {
                                            selectColor(e)
                                        }} id='Black' className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color == 'Black' ? 'border-black' : 'border-gray-400'}`}></button>}
                                        {Object.keys(variants).includes('Brown') && <button onClick={(e) => {
                                            selectColor(e)
                                        }} id='Brown' className={`border-2 ml-1 bg-amber-700 rounded-full w-6 h-6 focus:outline-none ${color == 'Brown' ? 'border-black' : 'border-gray-400'}`}></button>}
                                        {Object.keys(variants).includes('Blue') && <button onClick={(e) => {
                                            selectColor(e);
                                        }} id='Blue' className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color == 'Blue' ? 'border-black' : 'border-gray-400'}`}></button>}
                                        {Object.keys(variants).includes('Green') && <button onClick={(e) => {
                                            selectColor(e);
                                        }} id='Green' className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color == 'Green' ? 'border-black' : 'border-gray-400'}`}></button>}
                                        {Object.keys(variants).includes('White') && <button onClick={(e) => {
                                            selectColor(e)
                                        }} id='White' className={`border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${color == 'White' ? 'border-black' : 'border-gray-400'}`}></button>}

                                    </div>
                                </div>
                                <div className="flex mx-1 items-center ">
                                    <span className="mr-3">Size</span>
                                    <div className="relative -z-20">
                                        <select ref={sizeRef} onChange={(e) => {
                                            setSize(e.target.value)
                                            refreshSlug(e.target.value, color);
                                        }} className=" rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10">
                                            {(Object.keys(variants[color])).map(size => <option value={size} key={size} className="">{size}</option>
                                            )}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3 flex gap-x-8">
                                    <input type="number" onChange={(e) => setQty(parseInt(e.target.value))} className="border-b-2 font-serif focus:border-[#b6464c] outline-none transition-all text-base md:text-lg py-1 w-40 text-clip cursor-pointer focus:cursor-text overflow-hidden" placeholder='Quantity' required />
                                    <button disabled={(product.availqty < qty || product.availqty <= 0) ? true : false} onClick={() => {
                                        if (qty <= product.availqty) {
                                            disabled(true);
                                            addInCart(variants[color][size]['slug'], qty, product.price, size, `${product.title}(${sizeRef.current.value}, ${color})`, `${color}`)
                                            if (qty > 0) {
                                                toast.success("Added item in cart :) ")
                                            } else {
                                                toast.error("Please Increase the Quantity :)");
                                            }
                                        } else {
                                            toast.error("That much quantity is out of stock, Please select less quantity :|");
                                        }
                                    }} className='md:text-xl text-lg  text-white font-medium cursor-pointer bg-[#b6464c] disabled:bg-[#cf8b8f] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><MdAddCircle /></button>
                                </div>
                            </div>
                            <div className="flex gap-6 justify-start md:justify-center w-full flex-wrap md:flex-nowrap items-center md:gap-x-8">
                                <span className="title-font font-medium font-serif md:text-xl  text-lg text-gray-900 w-fit sm:w-fit">{(product.availqty < qty || product.availqty <= 0) ? " Out Of Stock! " : `₹ ${product.price}`}</span>
                                <Link href={'/checkout'}>
                                    <button disabled={(product.availqty < qty || product.availqty <= 0) ? true : false} onClick={() => {
                                        buyNow(variants[color][size]['slug'], 1, product.price, size, `${product.title}(${sizeRef.current.value}, ${color})`, `${color}`)
                                        toast.success("Checking Out :) ")
                                    }} className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] disabled:bg-[#cf8b8f] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><BsFillBagCheckFill />BuyNow</button>
                                </Link>
                                <div className=" flex gap-x-4 items-center">
                                    <Link href={'/checkout'}>
                                        <button disabled={((product.availqty < qty || product.availqty <= 0) ) ? true : false} className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] disabled:bg-[#e3868a] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><BsFillBagCheckFill />CheckOut</button>
                                    </Link>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={pincodeCheck} className="flex w-fit gap-6 mt-7 md:gap-x-16 flex-wrap items-center justify-start">
                                <input type="number" ref={pincodeRef} className="border-b-2 font-serif focus:border-[#b6464c] outline-none transition-all text-base md:text-lg py-1 w-40 text-clip cursor-pointer focus:cursor-text overflow-hidden" placeholder='Pincode To Check' />
                                <button onClick={pincodeCheck} className='md:text-lg text-sm text-white font-medium cursor-pointer  bg-[#b6464c] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><FaRegQuestionCircle className='text-xl' />Check</button>
                                <p className="flex gap-x-4 font-medium text-base"><span className=''>Available Quantity:</span><span className="font-serif">{avail}</span></p>
                            </form>
                            {servicePin == null || !(pincodeRef.current.value) ? <></> : <div className="mt-2">
                                {servicePin ? <span className='text-green-600 tracking-wide'>We deliver in this pin :)</span> : <span className='text-red-500 tracking-wide'>Sorry, But we are Expanding fastly :)</span>}
                            </div>
                            }
                            <Toaster />
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGOOSE_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
        )
            .then((e) => console.log('Database Connected.'))
            .catch(console.error);
    }
    try {

        let product = await Product.findOne({ slug: context.query.slug });
        if (!product) {
            return {
                props: {
                    errorStatusCode: 404,
                    title: "Sorry, such Product Doesn't Exist!!"
                }
            }
        }
        const variants = await Product.find({ title: product?.title, category: product.category });
        let colorSizeSlug = {}  // {red: {xl: {slug: "the camis"}}}
        for (let item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item?.slug };
            } else {
                colorSizeSlug[item.color] = {};
                colorSizeSlug[item.color][item.size] = { slug: item?.slug };
            }
        }

        return {
            props: {
                product: JSON.parse(JSON.stringify(product)),
                variants: JSON.parse(JSON.stringify(colorSizeSlug))
            }
        }
    } catch (error) {
        return {
            props: {
                errorStatusCode: 404,
                title: "Sorry, such Product Doesn't Exist!!"
            }
        }
    }
}


export default Slug