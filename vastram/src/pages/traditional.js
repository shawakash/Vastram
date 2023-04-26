import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import mongoose from 'mongoose'
import Product from '../../models/Product';

const Traditional = ({ products }) => {
    return (
        <>
            <section>
                <div className="flex flex-wrap gap-12 justify-center product[item]s-center">
                    {!products? <div className="text-lg font-medium">No traditional Stocks, Stay Tunned!</div>  : ''}
                    {products && Object.keys(products).map((item) => {
                        return (
                            <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
                                <div className="flex flex-col gap-y-2 shadow-xl hover:shadow-2xl tracking-wide transition-all rounded-2xl items-center justify-center p-4">

                                    <img width={300} height={50} src={`${products[item].img}`} alt='Shirt Image' className='object-scale-down object-top h-72 rounded-2xl shadow-lg' />
                                    <p className="text-base font-serif font-extralight text-slate-500">{products[item].category.toUpperCase()}</p>
                                    <h3 className="text-3xl font-head font-bold text-[#b6464c]">{products[item].title}</h3>
                                    <p className="desc w-48 text-center text-clip overflow-hidden font-normal text-slate-800 py-2">{products[item].desc.slice(0, 50)} ...</p>
                                    <p className="price font-serif font-semibold text-slate-700">₹ {products[item].price}</p>
                                    <div className="size w-full justify-around font-serif font-light text-slate-600 flex  items-center gap-x-4 gap-y-2 ">
                                        <div className="flex flex-col gap-y-2">

                                            <div className='font-semibold font-sans w-fit'>Size/s: </div>
                                            <div className="">
                                                {products[item].size.includes('S') && <span className='border border-gray-500 mx-1 p-1'>S</span>}
                                                {products[item].size.includes('M') && <span className='border border-gray-500 mx-1 p-1'>M</span>}
                                                {products[item].size.includes('L') && <span className='border border-gray-500 mx-1 p-1'>L</span>}
                                                {products[item].size.includes('XL') && <span className='border border-gray-500 mx-1 p-1'>XL</span>}
                                                {products[item].size.includes('XXL') && <span className='border border-gray-500 mx-1 p-1'>XXL</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <div className='font-semibold font-sans w-fit'>Color/s: </div>
                                            <div className="">
                                                {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('White') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around w-full my-2 text-base font-medium text-gray-600">
                                        <div className="">Stocks: </div>
                                        <div className="font-serif font-semibold">{products[item].availqty}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                </div>
            </section>
        </>
    )
}

// export async function getServerSideProps(context) {

//     let products = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/getProducts`).then(a => a.json()).then(b => b.result);
//     // console.log('Products', products)

//     return {
//         props: { products }
//     }
// }

//  Use the below while production

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
    let products = await Product.find({category: 'traditional'});
    let traditional = {};

    for(let item of products) {
        if (item.title in traditional) {
            if (!traditional[item.title].color.includes(item.color) && item.availqty) {
                // traditional[item.title].color = [...traditional[item.title].color, item.color];
                (traditional[item.title].color).push(item.color);
            }
            if (!traditional[item.title].size.includes(item.size) && item.availqty) {
                // traditional[item.title].size = [...traditional[item.title].size, product[item].size];
                (traditional[item.title].size).push(item.size);
            }
            traditional[item.title].availqty += item.availqty;

        } else {
            traditional[item.title] = JSON.parse(JSON.stringify(item));

            if (item.availqty > 0) {
                traditional[item.title].color = [item.color];
                traditional[item.title].size = [item.size];
                traditional[item.title].availqty += item.availqty;
            }

        }
    }
    return {
        props: {
            products: JSON.parse(JSON.stringify(traditional)),
        }
    }
}

export default Traditional