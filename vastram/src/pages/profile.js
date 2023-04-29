/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { RiAddCircleLine, RiDeleteBin6Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import User from '../../models/User';

const Profile = ({ user, setUser }) => {
    const router = useRouter();
    const nameRef = useRef('');
    const emailRef = useRef('');
    const addressRef = useRef('');
    const phoneRef = useRef('');
    const zipRef = useRef('');
    const passRef = useRef('');
    const cPassRef = useRef('');
    const oPassRef = useRef('');
    const [dbuser, setDbuser] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [disabled2, setDisabled2] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push('/login');
        } else {

            setDbuser(JSON.parse(localStorage.getItem("user")))
        }
    }, [router, router.query])

    const handleChange = (e) => {
        if (
            nameRef.current.value &&
            emailRef.current.value &&
            addressRef.current.value &&
            phoneRef.current.value &&
            zipRef.current.value) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        if (passRef.current.value == cPassRef.current.value) {
            setDisabled2(false);
        } else {
            setDisabled2(true)
        }
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        const data = {
            email: dbuser.email,
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            pincode: zipRef.current.value,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/updateUser`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const resJson = await response.json();
        if (resJson.status == 'error') {
            toast.error(resJson.message);
        } else {
            localStorage.setItem("user", JSON.stringify(resJson.result.user));
            localStorage.setItem("accessToken", resJson.result.accessToken);
            setUser({ value: resJson.result.accessToken });
            toast.success('Updated Your Profile');
            router.push('/profile')
        }


    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        if (passRef.current.value != cPassRef.current.value) {
            toast.error("Password is not equal to Confirm Password");
        } else {

            const data = {
                email: dbuser.email,
                password: passRef.current.value,
                oldPassword: oPassRef.current.value
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/updateUserPassword`, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const resJson = await response.json();
            console.log(resJson)

            if (resJson.status == 'error') {
                toast.error(resJson.message);
            } else {
                localStorage.setItem("user", JSON.stringify(resJson.result.user));
                localStorage.setItem("accessToken", resJson.result.accessToken);
                setUser({ value: resJson.result.accessToken });
                toast.success('Updated Your Password');
                passRef.current.value = '';
                cPassRef.current.value = '';
                oPassRef.current.value = '';
                router.push('/profile')
            }
        }

    }


    return (<>
        <Head>
            <title>Your Account - Vastram</title>
        </Head>
        <div className="checkout flex flex-col sm:w-3/4 w-80 gap-y-6 md:gap-y-20 pb-8 ">
            <div className="head flex justify-center items-center text-2xl md:text-4xl text-[#b6464c] font-head font-semibold">
                Account Details
            </div>
            <div className="details flex flex-col gap-y-2">
                <div className="font-medium text-base md:text-lg w-fit px-2 rounded-lg hover:shadow-lg transition-all">1. Delivery Details</div>
                <form spellCheck='false' onSubmit={handleSubmit1} className="details flex flex-col shadow-md rounded-lg gap-y-4 py-10 px-8 md:px-10 tracking-wide">
                    <div className="flex gap-x-2 md:gap-x-8">
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="name" className="font-medium text-slate-700 text-sm md:text-base ">Name</label>
                            <input ref={nameRef} defaultValue={dbuser.name} onChange={handleChange} type="text" name='name' required className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="email" className="font-medium text-slate-700 text-sm md:text-base ">Email (Can't be changed)</label>
                            {user.email ?
                                <input title="Can't be changed" value={user.email} ref={emailRef} onChange={handleChange} type="email" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" readOnly />
                                :
                                <input required ref={emailRef} onChange={handleChange} type="email" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" readOnly />
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="address" className="font-medium text-slate-700 text-sm md:text-base ">Address</label>
                        <textarea required ref={addressRef} defaultValue={dbuser.address} onChange={handleChange} rows={'5'} cols={'10'} type="text" name='email' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                    </div>
                    <div className="flex gap-x-2 md:gap-x-8">
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="Phone" className="font-medium text-slate-700 text-sm md:text-base ">Phone Number</label>
                            <input required ref={phoneRef} defaultValue={dbuser.phone} onChange={handleChange} placeholder='Your 10 Digit Phone Number' type="number" name='Phone' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="pincode" className="font-medium text-slate-700 text-sm md:text-base ">Zip/Pin code</label>
                            <input required ref={zipRef} defaultValue={dbuser.pincode} placeholder='Valid 6 Digit Pincode' onChange={async () => {
                                if (zipRef.current.value.length == 6) {
                                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/pincode`, {
                                        method: 'POST',
                                        body: JSON.stringify({ pincode: zipRef.current.value })
                                    });
                                    const data = await response.json();
                                    if (data.value) {
                                        toast.success('Pin is Serviceable :)');
                                    }
                                    else {
                                        toast.error("Sorry we don't delivery there");
                                    }
                                }
                                handleChange()
                            }} type="number" name='pincode' className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                    </div>
                    <div className="">
                        <button disabled={disabled} type='submit' className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] disabled:bg-[#cf8b8f] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'>Submit</button>
                    </div>
                </form>
            </div>
            <div className="details flex flex-col gap-y-2">
                <div className="font-medium text-base md:text-lg w-fit px-2 rounded-lg hover:shadow-lg transition-all">2. Password</div>
                <form onSubmit={handleSubmit2} action="" className="details flex flex-col shadow-md rounded-lg gap-y-4 py-10 px-8 md:px-10 tracking-wide">
                    <div className="flex gap-x-2 md:gap-x-8">
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="password" className="font-medium text-slate-700 text-sm md:text-base ">Old Password</label>
                            <input ref={oPassRef} onChange={handleChange} defaultValue={''} type="password" name='password' required className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                    </div>
                    <div className="flex gap-x-2 md:gap-x-8">
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="password" className="font-medium text-slate-700 text-sm md:text-base ">Password</label>
                            <input ref={passRef} onChange={handleChange} defaultValue={''} type="password" name='password' required className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                        </div>
                        <div className="flex flex-col w-1/2 md:w-1/2 gap-y-2">
                            <label htmlFor="password" className="font-medium text-slate-700 text-sm md:text-base ">Confirm Password</label>
                            <input ref={cPassRef} onChange={handleChange} defaultValue={''} type="password" name='password' required className="border-2 border-slate-300 rounded-md focus:border-[#db7075] py-[0.5px] transition-all outline-none px-2 md:py-1 text-sm md:text-xl" />
                            {/* {disabled2? <p className="text-sm text-red-500 tracking-wide font-medium">Passwords doesn't match :|</p> : <p className='opacity-0'>Passwords matched :)</p> } */}
                            <p className={`text-sm text-red-500 tracking-wide font-medium ${(disabled2) ? '' : 'opacity-0'}`}>Passwords doesn't match :|</p>
                        </div>


                    </div>
                    <div className="">
                        <button disabled={disabled2} type='submit' className='md:text-lg text-sm text-white font-medium cursor-pointer bg-[#b6464c] disabled:bg-[#cf8b8f] rounded-md md:px-4 px-2 py-1 flex items-center gap-x-2'>Submit</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>

    </>
    )
}




export default Profile