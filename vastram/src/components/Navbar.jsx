import Link from 'next/link';
import React from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { BiNotepad } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineLogout } from 'react-icons/hi'

const Navbar = () => {
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
            <ul className="flex gap-x-5 text-sm font-medium md:text-lg justify-between items-center lg:gap-x-8">
                <Link href={'/checkout'}>
                    <li className=""><RiShoppingCartFill className='text-base md:text-lg lg:text-[25px]'/></li>
                </Link>
                <Link href={'/order'}>
                    <li className=""><BiNotepad className='text-base md:text-lg lg:text-[25px]'/></li>
                </Link>
                <Link href={'/logout'}>
                    <li className=""><HiOutlineLogout className='text-base md:text-lg lg:text-[25px]'/></li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar