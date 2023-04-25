import Footer from 'bring/components/Footer';
import Navbar from 'bring/components/Navbar';
import 'bring/styles/globals.css'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value: null});
  const [key, setKey] = useState();
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse((localStorage.getItem("cart"))));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      } else {
        setCart({});
        saveCart({});
      }
    } catch (err) {
      console.error(err);
      localStorage.clear()
    }
    const token = localStorage.getItem("accessToken");
    if(token) {
      setUser({value: token});
      setKey(Math.random()*1000)
    }
  }, [])    // either put router.query in dependency array or setUser after successfull login
  
  const saveCart = async (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    for(let item in myCart) {
      subt += (myCart[item].qty)*(myCart[item].price);
    }
    setSubTotal(subt);
  }

  const addInCart = (itemCode, qty, price, size, name, color) => {
    const myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty += qty;
    } else {
      myCart[itemCode] = {
        qty,
        price,
        size,
        name,
        color
      };
    }
    setCart(myCart);
    saveCart(myCart)
  }

  const buyNow = (itemCode, qty, price, size, name, color) => {
    setCart({});
    let myCart ={};
    myCart[itemCode] = {
      qty,
        price,
        size,
        name,
        color
    }
    setCart(myCart);
    saveCart(myCart);
    router.push(`/checkout`);
  }

  const clearCart = (_) => {
    setCart({});
    saveCart({});
  }

  const removeFromCart = (itemCode, qty) => {
    const myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty -= qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode]
    }
    setCart(myCart);
    saveCart(myCart);
  }

  return (<>
    <Head>
      <title>Vastram - Ethentic Wears</title>
      <meta name="description" content="Vastram, clothes, ethentic, tradition clothes" />
      <link rel="shortcut icon" href={'public/logo.png'} type="image/x-icon" />
      <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0" />
    </Head>
    <Navbar key={key} user={user} addInCart={addInCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 px- py-5 ">
      <Component {...pageProps} setUser={setUser} buyNow={buyNow} addInCart={addInCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>
    </main>
    <Footer />
  </>
  );
}
