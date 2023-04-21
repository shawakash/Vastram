import Footer from 'bring/components/Footer';
import Navbar from 'bring/components/Navbar';
import 'bring/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Vastram - Ethentic Wears</title>
      <meta name="description" content="Vastram, clothes, ethentic, tradition clothes" />
      <link rel="shortcut icon" href={'public/logo.png'} type="image/x-icon" />
    </Head> 
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>
  );
}
