import Link from 'next/link';
import React, { useRef } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { BiNotepad } from 'react-icons/bi'
import { CgProfile, CgCloseO } from 'react-icons/cg'
import { HiOutlineLogout, HiOutlineMinusCircle } from 'react-icons/hi'
import { RiAddCircleLine } from 'react-icons/ri'

const Navbar = () => {
    const sideCartRef = useRef();
    const toggleCart = () => {
        if (sideCartRef.current.classList.contains('translate-x-full')) {
            sideCartRef.current.classList.remove('translate-x-full')
            sideCartRef.current.classList.add('translate-x-0')
            // sideCartRef.current.classList.remove('hidden')
        }
        else if (!sideCartRef.current.classList.contains('translate-x-full')) {
            sideCartRef.current.classList.remove('translate-x-0')
            sideCartRef.current.classList.add('translate-x-full')
            // sideCartRef.current.classList.add('hidden')
        }
    }
    return (
        <nav className="flex flex-col items-center justify-around px-5 py-3 md:flex-row gap-y-2 tracking-wide md:py-7 sticky top-0 bg-white backdrop-blur-lg bg-opacity-70">
            <div className="brand font-bold text-xl cursor-pointer md:text-3xl italic text-[#b6464c] font-head tracking-widest -rotate-12">
                <Link href={'/'}>
                    Vastram
                </Link>
            </div>
            <ul className="flex gap-x-5 text-sm  font-medium md:text-lg">
                <Link href={'/product/suits'}>
                    <li className="">Suits</li>
                </Link>
                <Link href={'shirts'}>
                    <li className="hidden lg:flex">Shirts</li>
                </Link>
                <Link href={'/traditional'}>
                    <li className="">Traditional</li>
                </Link>
                <Link href={'/product/ethentic'}>
                    <li className="">Ethentic</li>
                </Link>
            </ul>
            <ul className="flex gap-x-5 text-sm font-medium md:text-lg justify-between items-center lg:gap-x-8 cursor-pointer">
                {/* <Link href={'/checkout'}> */}
                    <li onClick={toggleCart} className=""><RiShoppingCartFill className='text-base md:text-lg lg:text-[25px]' /></li>
                {/* </Link> */}
                <Link href={'/order'}>
                    <li className=""><BiNotepad className='text-base md:text-lg lg:text-[25px]' /></li>
                </Link>
                <Link href={'/logout'}>
                    <li className=""><HiOutlineLogout className='text-base md:text-lg lg:text-[25px]' /></li>
                </Link>
            </ul>
            <div ref={sideCartRef} className="sideCart absolute top-24 right-24 flex flex-col gap-y-5 p-10 bg-white bg-opacity-95 rounded-xl md:top-0 right-0 tracking-wide transform transition-transform translate-x-full w-72 md:w-96">
                <div onClick={toggleCart} className="flex justify-center text-2xl cursor-pointer"><CgCloseO /></div>
                <h2 className="heading font-semibold text-base md:text-xl">Shopping Cart</h2>
                <ol className="list-decimal font-normal flex flex-col w-full gap-y-2 text-sm md:text-lg pl-2">
                    <li className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">
                        <div className="product w-2/3 ">Product Name</div>
                        <div className="item-info w-1/6 font-serif flex items-center gap-x-2 w-fit">
                            <div className="incr text-lg text-slate-700"><RiAddCircleLine /></div>
                            <div className="count text-slate-800">5</div>
                            <div className="decr text-slate-700"><HiOutlineMinusCircle /></div>
                        </div>
                        <div className="item-total w-1/6 font-serif">
                        ₹500.00
                        </div>
                    </li>
                    <li className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">
                        <div className="product w-2/3 ">Product Name</div>
                        <div className="item-info w-1/6 font-serif flex items-center gap-x-2 w-fit">
                            <div className="incr text-lg text-slate-700"><RiAddCircleLine /></div>
                            <div className="count text-slate-800">5</div>
                            <div className="decr text-slate-700"><HiOutlineMinusCircle /></div>
                        </div>
                        <div className="item-total w-1/6 font-serif">
                        ₹500.00
                        </div>
                    </li>
                    <li className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">
                        <div className="product w-2/3 ">Product Name</div>
                        <div className="item-info w-1/6 font-serif flex items-center gap-x-2 w-fit">
                            <div className="incr text-lg text-slate-700"><RiAddCircleLine /></div>
                            <div className="count text-slate-800">5</div>
                            <div className="decr text-slate-700"><HiOutlineMinusCircle /></div>
                        </div>
                        <div className="item-total w-1/6 font-serif">
                        ₹500.00
                        </div>
                    </li>
                    <li className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">
                        <div className="product w-2/3 ">Product Name</div>
                        <div className="item-info w-1/6 font-serif flex items-center gap-x-2 w-fit">
                            <div className="incr text-lg text-slate-700"><RiAddCircleLine /></div>
                            <div className="count text-slate-800">5</div>
                            <div className="decr text-slate-700"><HiOutlineMinusCircle /></div>
                        </div>
                        <div className="item-total w-1/6 font-serif">
                        ₹500.00
                        </div>
                    </li>
                </ol>
            </div>
        </nav>
    );
}

export default Navbar