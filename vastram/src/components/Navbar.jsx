import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { RiAccountCircleFill, RiShoppingCartFill } from 'react-icons/ri'
import { BiNotepad } from 'react-icons/bi'
// import { IoLogIn } from 'react-icons/io'
import { CgProfile, CgCloseO } from 'react-icons/cg'
import { HiOutlineLogin, HiOutlineLogout, HiOutlineMinusCircle } from 'react-icons/hi'
import { RiAddCircleLine, RiDeleteBin6Line } from 'react-icons/ri'
import { BsFillBagCheckFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast';


const Navbar = ({ user, addInCart, removeFromCart, cart, subTotal, clearCart, logout }) => {
    const sideCartRef = useRef();
    let totalItem = 0;
    Object.keys(cart).map(item => {
        totalItem += parseInt(cart[item].qty);
    });
    const [dropDown, setDropDown] = useState(false);
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
                <Link href={'/suits'}>
                    <li className="">Suits</li>
                </Link>
                <Link href={'/shirts'}>
                    <li className="hidden lg:flex">Shirts</li>
                </Link>
                <Link href={'/traditional'}>
                    <li className="">Traditional</li>
                </Link>
                <Link href={'/ethentic'}>
                    <li className="">Ethentic</li>
                </Link>
            </ul>
            <ul className="flex gap-x-5 text-sm font-medium md:text-lg justify-between items-center lg:gap-x-8 cursor-pointer">
                {/* <Link href={'/checkout'}> */}
                <li onClick={toggleCart} className="" title='Cart'><RiShoppingCartFill className='text-base md:text-lg lg:text-[25px]' /></li>
                {/* </Link> */}
                <Link href={'/orders'}>
                    <li className="" title='Order'><BiNotepad className='text-base md:text-lg lg:text-[25px]' /></li>
                </Link>
                {user.value &&
                    <Link href={'/profile'} onMouseOver={(_) => setDropDown(true)} onMouseOut={(_) => setDropDown(false)}>
                        <li className="" title='Profile'><RiAccountCircleFill className='text-base md:text-lg lg:text-[25px]' /></li>

                        {dropDown &&

                            <ul className={`absolute right-24 backdrop-blur-lg bg-opacity-80 top-24 md:right-64 md:px-7 md:py-2 md:top-14 md:text-lg text-sm flex flex-col px-3 py-2 bg-[#e5bfc1] rounded-lg gap-y-1 transition-all tracking-wide text-slate-600 `}>
                                <Link href={'/profile'}><li className="cursor-pointer hover:text-gray-50 transition-all ">Profile</li></Link>
                                <Link href={'/order'}><li className="cursor-pointer hover:text-gray-50 transition-all ">Orders</li></Link>
                                <li className="cursor-pointer hover:text-gray-50 transition-all " onClick={logout}>Logout</li>
                            </ul>

                        }
                    </Link>
                }
                {!user.value &&
                    <Link href={'/login'}>
                        <li className="" title='Login'><HiOutlineLogin className='text-base md:text-lg lg:text-[25px]' /></li>
                    </Link>
                }

                <li className="" title='logout' onClick={logout}><HiOutlineLogout className='text-base md:text-lg lg:text-[25px]' /></li>
            </ul>
            <div ref={sideCartRef} className={`sideCart absolute overflow-y-scroll top-24  flex flex-col gap-y-5 p-10 bg-[#e5bfc1] bg-opacity-95 rounded-xl md:rounded-t-none md: rounded-r-none md:top-0 right-0 tracking-wide transform transition-transform ${Object.keys(cart).length != 0 ? 'translate-x-0' : 'translate-x-full'} w-72 md:w-96 z-50`}>
                <div onClick={toggleCart} className="flex justify-center text-2xl cursor-pointer"><CgCloseO /></div>
                <h2 className="heading font-semibold md:font-bold text-[] text-base md:text-xl">Shopping Cart</h2>
                <ol className="list-disc list-outside font-normal flex flex-col w-full gap-y-2 text-sm md:text-lg pl-2 text-black">
                    {Object.keys(cart).length == 0 ? <div className='font-medium text-lg'>Add items to use this</div> :
                        Object.keys(cart).map((k) => {
                            return (
                                <li className="" key={k}>
                                    <div className="flex text-sm md:gap-x-4 gap-x-2 items-center text-[14.5px] md:text-lg">

                                        <div className="product w-1/2 tracking-tighter text-base">{cart[k]?.name}</div>
                                        <div className="item-info w-1/3 font-serif flex items-center gap-x-2">
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
                                <div className="item-info flex font-serif gap-x-2 w-1/3">
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
                                    <Link href={'/checkout'}>
                                        <button onClick={toggleCart} className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'><BsFillBagCheckFill />CheckOut</button>
                                    </Link>
                                </div>
                                <div className="">
                                    <button onClick={(_) => {
                                        clearCart()
                                        toast.success('Cart is cleared');
                                    }} className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] rounded-md px-2 md:px-4 py-1 flex items-center gap-x-2'><RiDeleteBin6Line />Clear</button>
                                </div>
                            </div>
                        </>

                    }

                </ol>
            </div>
        </nav>
    );
}

export default Navbar