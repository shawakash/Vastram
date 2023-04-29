import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const Forgot = () => {

    const router = useRouter();
    const emailRef = useRef(null)
    const passRef = useRef(null);
    const cPassRef = useRef(null);
    const [user, setUser] = useState({});
    const [disabled2, setDisabled2] = useState(true)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [router, router.query])

    const handleChange = () => {
        if ((passRef.current.value == cPassRef.current.value) && (passRef.current.value || cPassRef.current.value)) {
            setDisabled2(false);
        } else {
            setDisabled2(true);
        }
    }

    const sendResetEmail = async (e) => {
        e.preventDefault();
        const data = {email: emailRef.current.value}
        
        console.log(data)
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/forgot`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if(responseData.status == 'error') {
            toast.error(responseData.message);
        } else {
            console.log(responseData.result)
            setUser(responseData.result.user)
            toast.success('Password Reset Email has been sent to your email');
            // router.push(`/forgot?token=${responseData.result.token}`)
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        if (passRef.current.value != cPassRef.current.value) {
            toast.error("Password is not equal to Confirm Password");
        } else {

                const data = {
                    password: passRef.current.value,
                    token: router.query.token
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/resetPassword`, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const resJson = await response.json();
                console.log(resJson)

                if (resJson.status == 'error') {
                    toast.error(resJson.message);
                } else {
                    if(!localStorage.getItem("accessToken")) {
                        toast.success("You are Logged in with your new password :) ")
                    }
                    localStorage.setItem("user", JSON.stringify(resJson.result.user));
                    localStorage.setItem("accessToken", resJson.result.accessToken);
                    setUser({ value: resJson.result.accessToken });
                    setTimeout(() => {
                        toast.success('Updated Your Password');
                        passRef.current.value = '';
                        cPassRef.current.value = '';
                    }, 1500)
                    router.push('/profile')
                }
            }

        }
    

    return (
        <>
            <Head>
                <title>Forgot Password - Vastram</title>
            </Head>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full tracking-wide">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                    <Image className="mx-auto" src={'/logo.jpg'} width={150} height={40} alt="Vastram" />
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password ?</h2>
                    <p className="">or <Link href={'/login'}><span className='font-medium text-[#b6464c]'> Login</span></Link></p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {router.query.token &&
                        <form className="space-y-6" onSubmit={resetPassword}>
                            <div>
                                <label htmlFor="pass" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                                <div className="mt-2">
                                    <input ref={passRef} onChange={handleChange} id="pass" name="pass" type="password"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#b6464c] outline-none px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#b6464c] sm:text-sm sm:leading-6 transition-all" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cpass" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>
                                <div className="mt-2">
                                    <input ref={cPassRef} onChange={handleChange} id="cpass" name="cpass" type="password"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#b6464c] outline-none px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#b6464c] sm:text-sm sm:leading-6 transition-all" />
                                </div>
                            </div>

                            <div>
                                <button disabled={disabled2} type="submit" className="flex w-full justify-center rounded-md bg-[#b6464c] disabled:bg-[#db9396] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#b6464c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6464c]">Continue</button>
                            </div>
                        </form>
                    }
                    {!router.query.token &&
                        <form className="space-y-6" onSubmit={sendResetEmail}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input ref={emailRef} defaultValue={user?.email} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#b6464c] outline-none px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#b6464c] sm:text-sm sm:leading-6 transition-all" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-[#b6464c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#b6464c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6464c]">Continue</button>
                            </div>
                        </form>}

                    <p className="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-x-3">
                        Not a member?
                        <Link href={'/signup'} className="font-semibold leading-6 text-[#b6464c] hover:text-[#b6464c]"><span> SignUp</span></Link>
                    </p>
                </div>
                <Toaster />
            </div>
        </>
    )
}

export default Forgot