import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import mongoose from 'mongoose';

const Orders = () => {
    const router = useRouter();
    let [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            if (!localStorage.getItem("accessToken")) {
                return router.push('/login');
            }
            const body = {
                accessToken: localStorage.getItem("accessToken")
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/orders`, {
                method: 'POST',
                body: JSON.stringify(body)
            });

            const data = await response.json();
            setOrders(data.result)
        }
        if(!localStorage.getItem("accessToken")) {
            router.push('/login');
        } else {
            fetchOrders()
        }
    }, [router])
    return (
        <>

            <div className="flex flex-col w-full h-full">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            OrderId
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Amount
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => {
                                    return (
                                    <tr key={order._id} className="bg-gray-100  border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{}</td>
                                        <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {order.orderId}
                                        </td>
                                        <td className="text-sm font-serif text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        ₹ {order.amount}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {order.status}
                                        </td>
                                    </tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Orders