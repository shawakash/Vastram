import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full tracking-wide">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className="mx-auto" src={'/logo.jpg'} width={150} height={40} alt="Vastram" />
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#b6464c] outline-none px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#b6464c] sm:text-sm sm:leading-6 transition-all" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link href={'/forgot'} className="font-semibold text-[#b6464c] hover:text-[#b6464c]">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#b6464c] outline-none px-2 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#b6464c] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-[#b6464c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#b6464c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6464c]">Login</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-x-3">
                        Not a member?
                        <Link href={'/signup'} className="font-semibold leading-6 text-[#b6464c] hover:text-[#b6464c]"><span> SignUp</span></Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login