import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import mongoose from 'mongoose'
import Product from '../../models/Product';

const Shirts = ({ products }) => {
    return (
        <>
            <section>
                <div className="flex flex-wrap gap-12 justify-center items-center">
                    {products.map((item) => {
                        return (
                            <Link passHref={true} key={item._id} href={`/product/${item.slug}`}>
                                <div className="flex flex-col gap-y-2 shadow-xl hover:shadow-2xl tracking-wide transition-all rounded-2xl items-center justify-center p-4">

                                    <img width={300} height={50} src={`${item.img}`} alt='Shirt Image' className='object-fill rounded-2xl shadow-lg ' />
                                    <p className="text-lg font-serif font-normal">{item.category.toUpperCase()}</p>
                                    <h3 className="text-3xl font-head font-bold text-[#b6464c]">{item.title}</h3>
                                    <p className="desc w-48 text-center text-clip overflow-hidden font-normal text-slate-800 py-2">{item.desc.slice(0, 50)} ...</p>
                                    <p className="price font-serif font-semibold text-slate-700">₹ {item.price}</p>
                                    <p className="size font-serif font-bold text-slate-600 flex gap-x-4">
                                        <span className='font-semibold font-sans'>Available Size/s: </span>
                                        {item.size} ({item.color})</p>
                                </div>
                            </Link>
                        );
                    })}

                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    
    let products = await fetch(`http://localhost:3000/api/getProducts`).then(a => a.json()).then(b => b.result);
    // console.log('Products', products)
    
    return {
        props: { products }
    }
}

//  Use the below while production

// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGOOSE_URI,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             },
//         )
//             .then((e) => console.log('Database Connected.'))
//             .catch(console.error);
//     }
//     let products = await Product.find();

//     return {
//         props: {
//             product: JSON.parse(JSON.stringify(products)),
//         }
//     }
// }

export default Shirts